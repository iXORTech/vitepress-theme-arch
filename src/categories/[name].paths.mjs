import { getAllPosts, getAllCategories } from "../../.vitepress/theme/utils/getPostData.mjs";
import {
  getAllSeries,
  getAllSeriesPosts,
  getCombinedPosts,
} from "../../.vitepress/theme/utils/getSeriesData.mjs";
import { getThemeConfig } from "../../.vitepress/init.mjs";

const postData = await getAllPosts();
const seriesData = await getAllSeries();
const themeConfig = await getThemeConfig();

// Get global aggregation settings
const globalAggregation = themeConfig.series?.aggregation ?? {};

// Get all series posts with aggregation info
const seriesPostsData = getAllSeriesPosts(seriesData, globalAggregation);

// Create combined post data for categories/tags based on aggregation settings
const combinedCatTagData = getCombinedPosts(postData, seriesPostsData, "categoriesAndTags");

const categoriesData = getAllCategories(combinedCatTagData);

export default {
  paths() {
    const pages = [];
    Object.keys(categoriesData).forEach((key) => {
      pages.push({ params: { name: key.toString() } });
    });
    console.info("Category dynamic routing: ", pages);
    return pages;
  },
};
