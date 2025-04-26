import { createContentLoader } from "vitepress";
import { writeFileSync } from "fs";
import { Feed } from "feed";
import path from "path";

/**
 * Generate RSS
 * @param {*} config VitePress buildEnd
 * @param {*} themeConfig theme configuration
 */
export const createRssFile = async (config, themeConfig) => {
  // Config Instance
  const siteMeta = themeConfig.siteMeta;
  const hostLink = siteMeta.site;
  // Feed Instance
  const feed = new Feed({
    title: siteMeta.title,
    description: siteMeta.description,
    id: hostLink,
    link: hostLink,
    language: "zh",
    generator: siteMeta.author.name,
    favicon: siteMeta.author.cover,
    copyright: `Copyright © ${siteMeta.author.name}`,
    updated: new Date(),
  });
  // Load Posts
  let posts = await createContentLoader("posts/**/*.md", {
    render: true,
  }).load();
  // Sort Posts
  posts = posts.sort((a, b) => {
    const dateA = new Date(a.frontmatter.date);
    const dateB = new Date(b.frontmatter.date);
    return dateB - dateA;
  });
  for (const { url, frontmatter } of posts) {
    // Only keep the latest 10 posts.
    if (feed.items.length >= 10) break;
    // Post Data
    let { title, description, date } = frontmatter;
    // Process Date
    if (typeof date === "string") date = new Date(date);
    // Add Post
    feed.addItem({
      title,
      id: `${hostLink}${url}`,
      link: `${hostLink}${url}`,
      description,
      date,
      // updated,
      author: [
        {
          name: siteMeta.author.name,
          email: siteMeta.author.email,
          link: siteMeta.author.link,
        },
      ],
    });
  }
  writeFileSync(path.join(config.outDir, "rss.xml"), feed.rss2(), "utf-8");
};
