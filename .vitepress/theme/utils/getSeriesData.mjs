import { generateId } from "./commonTools.mjs";
import { globby } from "globby";
import matter from "gray-matter";
import fs from "fs-extra";
import path from "path";

/**
 * Get all series directories in the src/series folder.
 * @returns {Promise<string[]>} - Array of series directory names.
 */
const getSeriesDirectories = async () => {
  try {
    const seriesPath = "src/series";

    // Check if the series directory exists
    if (!(await fs.pathExists(seriesPath))) {
      console.log("Series directory does not exist, creating empty series data");
      return [];
    }

    const entries = await fs.readdir(seriesPath, { withFileTypes: true });
    return entries.filter((entry) => entry.isDirectory()).map((entry) => entry.name);
  } catch (error) {
    console.error("Error getting series directories: ", error);
    return [];
  }
};

/**
 * Load series configuration from index.mjs file.
 * @param {string} seriesName - Name of the series directory.
 * @returns {Promise<Object|null>} - Series configuration object or null if not found.
 */
const loadSeriesConfig = async (seriesName) => {
  try {
    const configPath = path.resolve(`src/series/${seriesName}/index.mjs`);

    if (!(await fs.pathExists(configPath))) {
      console.warn(`No index.mjs found for series: ${seriesName}`);
      return {
        title: seriesName,
        description: "",
        cover: null,
        icon: null,
        localizedTitle: {},
        localizedDescription: {},
        order: 0,
        // Per-series aggregation settings (null means use global default)
        aggregation: null,
      };
    }

    // Dynamic import of the series config
    const config = await import(configPath);
    return {
      title: config.default?.title || seriesName,
      description: config.default?.description || "",
      cover: config.default?.cover || null,
      icon: config.default?.icon || null,
      localizedTitle: config.default?.localizedTitle || {},
      localizedDescription: config.default?.localizedDescription || {},
      order: config.default?.order || 0,
      // Per-series aggregation settings (null/undefined means use global default)
      aggregation: config.default?.aggregation || null,
    };
  } catch (error) {
    console.error(`Error loading config for series '${seriesName}': `, error);
    return {
      title: seriesName,
      description: "",
      cover: null,
      icon: null,
      localizedTitle: {},
      localizedDescription: {},
      order: 0,
      aggregation: null,
    };
  }
};

/**
 * Get all markdown files in a series directory.
 * @param {string} seriesName - Name of the series directory.
 * @returns {Promise<string[]>} - Array of markdown file paths.
 */
const getSeriesPostPaths = async (seriesName) => {
  try {
    const paths = await globby([`src/series/${seriesName}/**/*.md`], {
      ignore: ["node_modules"],
    });
    return paths;
  } catch (error) {
    console.error(`Error getting posts for series '${seriesName}': `, error);
    return [];
  }
};

/**
 * Sort posts by order frontmatter, then by date.
 * @param {Object} obj1 - The object for the first article.
 * @param {Object} obj2 - The object for the second article.
 * @returns {number} - Result of comparison.
 */
const compareSeriesPosts = (a, b) => {
  // First compare by order if available
  const orderA = a.order ?? Infinity;
  const orderB = b.order ?? Infinity;

  if (orderA !== orderB) {
    return orderA - orderB;
  }

  // Then compare by date (ascending for series - oldest first)
  return a.date - b.date;
};

/**
 * Get all posts for a specific series.
 * @param {string} seriesName - Name of the series directory.
 * @returns {Promise<Object[]>} - Array of post objects.
 */
const getSeriesPosts = async (seriesName) => {
  try {
    const paths = await getSeriesPostPaths(seriesName);

    const posts = await Promise.all(
      paths.map(async (item) => {
        try {
          const content = await fs.readFile(item, "utf-8");
          const stat = await fs.stat(item);

          // Remove the `src/` prefix from the path for routing
          const relativePath = item.replace("src/", "");

          const { birthtimeMs, mtimeMs } = stat;
          const { data } = matter(content);
          const {
            title,
            date,
            description,
            order,
            cover,
            localizedTitle,
            localizedDescription,
            localizedTags,
            tags,
            categories,
          } = data;

          return {
            id: generateId(relativePath),
            title: title || relativePath.replace(/\.md$/, "").split("/").pop().replace(/_/g, " "),
            date: date ? new Date(date).getTime() : birthtimeMs,
            lastModified: mtimeMs,
            description,
            regularPath: `/${relativePath.replace(".md", ".html")}`,
            order: order ?? null,
            cover,
            localizedTitle,
            localizedDescription,
            localizedTags,
            tags: tags || null,
            categories: categories || null,
          };
        } catch (error) {
          console.error(`Error processing series post '${item}': `, error);
          return null;
        }
      }),
    );

    // Filter out null entries and sort
    return posts.filter(Boolean).sort(compareSeriesPosts);
  } catch (error) {
    console.error(`Error getting posts for series '${seriesName}': `, error);
    return [];
  }
};

/**
 * Get all series with their configuration and posts.
 * @returns {Promise<Object[]>} - Array of series objects with their posts.
 */
export const getAllSeries = async () => {
  try {
    const seriesDirectories = await getSeriesDirectories();

    const seriesData = await Promise.all(
      seriesDirectories.map(async (seriesName) => {
        const config = await loadSeriesConfig(seriesName);
        const posts = await getSeriesPosts(seriesName);

        return {
          id: generateId(`series/${seriesName}`),
          slug: seriesName,
          ...config,
          posts,
          postCount: posts.length,
        };
      }),
    );

    // Sort series by order (larger first), then alphabetically by title
    seriesData.sort((a, b) => {
      const orderA = a.order ?? 0;
      const orderB = b.order ?? 0;

      // Larger order numbers appear first (descending)
      if (orderA !== orderB) {
        return orderB - orderA;
      }

      // Same order: sort alphabetically by title
      return a.title.localeCompare(b.title);
    });

    return seriesData;
  } catch (error) {
    console.error("Error getting all series: ", error);
    return [];
  }
};

/**
 * Get a flat list of all series posts for use in routing and search.
 * @param {Object[]} seriesData - Array of series objects.
 * @param {Object} globalAggregation - Global aggregation settings from themeConfig.
 * @returns {Object[]} - Flat array of all series posts with series info attached.
 */
export const getAllSeriesPosts = (seriesData, globalAggregation = {}) => {
  const allPosts = [];

  seriesData.forEach((series) => {
    // Merge series-specific aggregation with global defaults
    const aggregation = {
      home: series.aggregation?.home ?? globalAggregation.home ?? true,
      archives: series.aggregation?.archives ?? globalAggregation.archives ?? true,
      categoriesAndTags:
        series.aggregation?.categoriesAndTags ?? globalAggregation.categoriesAndTags ?? true,
    };

    series.posts.forEach((post) => {
      allPosts.push({
        ...post,
        seriesId: series.id,
        seriesSlug: series.slug,
        seriesTitle: series.title,
        seriesLocalizedTitle: series.localizedTitle,
        // Mark this as a series post for identification
        isSeriesPost: true,
        // Include aggregation settings for filtering
        aggregation,
      });
    });
  });

  return allPosts;
};

/**
 * Combine regular posts with series posts and sort by date.
 * @param {Object[]} postData - Array of regular post objects.
 * @param {Object[]} seriesPostsData - Array of series post objects.
 * @param {string} filterType - Type of aggregation to filter by: 'home', 'archives', or 'categoriesAndTags'.
 * @returns {Object[]} - Combined and sorted array of all posts.
 */
export const getCombinedPosts = (postData, seriesPostsData, filterType = "home") => {
  // Filter series posts based on their aggregation settings
  const filteredSeriesPosts = seriesPostsData.filter((post) => {
    return post.aggregation?.[filterType] ?? true;
  });

  // Combine both arrays
  const combined = [...postData, ...filteredSeriesPosts];

  // Sort by priority (top/pinned first) then by date (newest first)
  combined.sort((a, b) => {
    // Pinned posts first
    if (a.top && !b.top) return -1;
    if (!a.top && b.top) return 1;

    // Then sort by date (newest first)
    return b.date - a.date;
  });

  return combined;
};
