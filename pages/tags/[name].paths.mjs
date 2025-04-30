import { getAllPosts, getAllType } from "../../.vitepress/theme/utils/getPostData.mjs";

const postData = await getAllPosts();
const tagsData = getAllType(postData);

export default {
  paths() {
    const pages = [];
    Object.keys(tagsData).forEach((key) => {
      pages.push({ params: { name: key.toString() } });
    });
    console.info("Tag dynamic routing: ", pages);
    return pages;
  },
};
