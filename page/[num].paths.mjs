import { getAllPosts } from "../.vitepress/theme/utils/getPostData.mjs";
import { getThemeConfig } from "../.vitepress/init.mjs";

const postData = await getAllPosts();
const themeConfig = await getThemeConfig();

const postsPerPage = themeConfig.postSize;
const totalPages = Math.ceil(postData.length / postsPerPage);

export default {
  paths() {
    const pages = [];
    for (let pageNum = 2; pageNum <= totalPages; pageNum += 1) {
      pages.push({ params: { num: pageNum.toString() } });
    }
    console.info("Post dynamic routing: ", pages);
    return pages;
  },
};
