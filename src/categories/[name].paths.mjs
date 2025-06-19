import { getAllPosts, getAllCategories } from "../../.vitepress/theme/utils/getPostData.mjs";

const postData = await getAllPosts();
const categoriesData = getAllCategories(postData);

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
