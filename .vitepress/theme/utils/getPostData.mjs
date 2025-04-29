import { generateId } from "./commonTools.mjs";
import { globby } from "globby";
import matter from "gray-matter";
import fs from "fs-extra";

/**
 * Get all the paths of Markdown files in the posts directory.
 * @returns {Promise<string[]>} - Array of Markdown file paths.
 */
const getPostMDFilePaths = async () => {
  try {
    // Get the directory of all the Markdown files.
    let paths = await globby(["**.md"], {
      ignore: ["node_modules", "pages", ".vitepress", "README.md"],
    });
    // Filter the paths to only include those in the `posts/` directory.
    return paths.filter((item) => item.includes("posts/"));
  } catch (error) {
    console.error("Error getting post paths: ", error);
    throw error;
  }
};

/**
 * Sort posts descendingly by frontMatter date.
 * @param {Object} obj1 - The object for the first article.
 * @param {Object} obj2 - The object for the second article.
 * @returns {number} - Result of comparison.
 */
const compareDate = (obj1, obj2) => {
  return obj1.date < obj2.date ? 1 : -1;
};
const comparePostPriority = (a, b) => {
  if (a.top && !b.top) {
    return -1;
  }
  if (!a.top && b.top) {
    return 1;
  }
  return compareDate(a, b);
};

/**
 * Get all posts, read their content and parse front matter.
 * @returns {Promise<Object[]>} - Array of post objects.
 */
export const getAllPosts = async () => {
  try {
    let paths = await getPostMDFilePaths();
    // Read and process contents of all Markdowns.
    let posts = await Promise.all(
      paths.map(async (item) => {
        try {
          const content = await fs.readFile(item, "utf-8");
          // Metadata of the file
          const stat = await fs.stat(item);
          // Get the creation and last-time-modified time.
          const { birthtimeMs, mtimeMs } = stat;
          // Parse teh front matter of the file.
          const { data } = matter(content);
          const { title, date, categories, description, tags, top, cover } = data;
          const expired = Math.floor(
            (new Date().getTime() - new Date(date).getTime()) / (1000 * 60 * 60 * 24),
          );
          // Return the post object.
          return {
            id: generateId(item),
            // If the title is not defined, use the file name as the title.
            title: title ||
              item.replace(/\.md$/, "")
                .replace(/_/g, " "),
            date: date ? new Date(date).getTime() : birthtimeMs,
            lastModified: mtimeMs,
            expired,
            tags,
            categories,
            description,
            regularPath: `/${item.replace(".md", ".html")}`,
            top,
            cover,
          };
        } catch (error) {
          console.error(`Error processing file '${item}': `, error);
          throw error;
        }
      }),
    );
    // Sort the posts descendingly by date.
    posts.sort(comparePostPriority);
    return posts;
  } catch (error) {
    console.error("Error when getting all the files: ", error);
    throw error;
  }
};

/**
 * Get all the tags and statistics about articles with those tags.
 * @param {Object[]} postData - Array containing post data.
 * @returns {Object} - Object containing tag statistics.
 */
export const getAllType = (postData) => {
  const tagData = {};
  // Iterate through the post data.
  postData.map((item) => {
    // Check if it has any tags.
    if (!item.tags || item.tags.length === 0) return;
    // Process tags.
    if (typeof item.tags === "string") {
      item.tags = item.tags.split(",");
    }
    // Iterate through each tag of the article and process it.
    item.tags.forEach((tag) => {
      if (!tagData[tag]) {
        tagData[tag] = {
          count: 1,
          articles: [item],
        };
      } else {
        tagData[tag].count++;
        tagData[tag].articles.push(item);
      }
    });
  });
  return tagData;
};

/**
 * Get all categories and statistics about articles with those categories.
 * @param {Object[]} postData - Array containing post data.
 * @returns {Object} - Object containing category statistics.
 */
export const getAllCategories = (postData) => {
  const catData = {};
  // Iterate through the post data.
  postData.map((item) => {
    if (!item.categories || item.categories.length === 0) return;
    if (typeof item.categories === "string") {
      item.categories = item.categories.split(",");
    }
    item.categories.forEach((tag) => {
      if (!catData[tag]) {
        catData[tag] = {
          count: 1,
          articles: [item],
        };
      } else {
        catData[tag].count++;
        catData[tag].articles.push(item);
      }
    });
  });
  return catData;
};

/**
 * Get all the years and statistics about articles published in those years.
 * @param {Object[]} postData - Array containing post data.
 * @returns {Object} - Object containing year statistics.
 */
export const getAllArchives = (postData) => {
  const archiveData = {};
  postData.forEach((item) => {
    // Check if the article has a published date.
    if (item.date) {
      // Convert the timestamp to a Date object.
      const date = new Date(item.date);
      // Get the year from the date.
      const year = date.getFullYear().toString();
      // Process the data.
      if (!archiveData[year]) {
        archiveData[year] = {
          count: 1,
          articles: [item],
        };
      } else {
        archiveData[year].count++;
        archiveData[year].articles.push(item);
      }
    }
  });
  const sortedYears = Object.keys(archiveData).sort((a, b) => parseInt(b) - parseInt(a));
  return { data: archiveData, year: sortedYears };
};
