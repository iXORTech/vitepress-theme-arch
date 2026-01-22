---
title: Configuration
description: Learn how to configure VitePress Theme Arch to your needs
date: 2026-01-22
order: 2
localizedTitle:
  zh-CN: 配置
localizedDescription:
  zh-CN: 了解如何根据您的需求配置 VitePress Theme Arch
---

# Configuration

In this second post of the Getting Started series, we'll explore the configuration options available in VitePress Theme Arch.

## Theme Configuration

The main theme configuration file is located at `.vitepress/theme/assets/themeConfig.mjs`. Here you can customize:

### Site Metadata

```javascript
siteMeta: {
  title: "Your Site Title",
  description: "Your site description",
  site: "https://yourdomain.com",
  lang: "en-US",
}
```

### Navigation

Configure your navigation menu with links and dropdowns:

```javascript
nav: [
  { name: "Home", link: "/" },
  { name: "Archives", link: "/archives" },
  { name: "Series", link: "/series" },
]
```

### Cover Images

Enable and configure post cover images:

```javascript
cover: {
  showCover: {
    enable: true,
    coverLayout: "both", // 'left', 'right', or 'both'
  },
}
```

## Creating Posts

Posts should be placed in the `src/posts/` directory. Each post should have frontmatter with at least a title and date:

```yaml
---
title: My First Post
date: 2026-01-22
categories:
  - Tutorial
tags:
  - getting-started
---
```

## Creating Series

Series are organized in the `src/series/` directory. Each series is a subdirectory containing:

1. An `index.mjs` file with series metadata
2. Markdown files for each post in the series

## Next Steps

Continue to the next post to learn about customizing the theme's appearance.
