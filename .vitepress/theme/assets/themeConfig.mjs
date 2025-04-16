// Theme Configuration
export const themeConfig = {
  // Site Metadata
  siteMeta: {
    title: "VitePress Theme Curve",
    description: "Hello World",
    // The Welcome Message to be Shown on the Home Page
    // Optional, if not provided, a welcome + title message will be used.
    // welcomeMessage: "Welcome to my site.",
    logo: "/images/logo/logo.webp",
    // URL
    site: "https://example.tld",
    // Language, currently available: en-US, zh-CN
    lang: "en-US",
    // Author Information
    author: {
      name: "Admin",
      cover: "/images/logo/logo.webp",
      email: "admin@example.tld",
      link: "https://example.tld",
    },
  },
  // Internet Content Provider License / 备案信息
  // icp: "萌ICP备19700101号",
  // Website Established Since (A Full Timestamp)
  since: "1970-01-01T00:00:00.000Z",
  // Number of Posts to Show per Page
  postSize: 8,
  // inject
  inject: {
    // Head
    // https://vitepress.dev/zh/reference/site-config#head
    header: [
      // favicon
      ["link", { rel: "icon", href: "/favicon.ico" }],
      // RSS
      [
        "link",
        {
          rel: "alternate",
          type: "application/rss+xml",
          title: "RSS",
          href: "https://example.tld/rss.xml",
        },
      ],
      // 预载 CDN
      [
        "link",
        {
          crossorigin: "",
          rel: "preconnect",
          href: "https://s1.hdslb.com",
        },
      ],
      [
        "link",
        {
          crossorigin: "",
          rel: "preconnect",
          href: "https://mirrors.sustech.edu.cn",
        },
      ],
      // iconfont
      [
        "link",
        {
          crossorigin: "anonymous",
          rel: "stylesheet",
          href: "https://cdn2.codesign.qq.com/icons/g5ZpEgx3z4VO6j2/latest/iconfont.css",
        },
      ],
      // Embed code
      ["link", { rel: "preconnect", href: "https://use.sevencdn.com" }],
      ["link", { rel: "preconnect", href: "https://fonts.gstatic.com", crossorigin: "" }],
      // 预载 DocSearch
      [
        "link",
        {
          href: "https://X5EBEZB53I-dsn.algolia.net",
          rel: "preconnect",
          crossorigin: "",
        },
      ],
    ],
  },
  // 导航栏菜单
  nav: [
    {
      text: "文库",
      items: [
        { text: "文章列表", link: "/pages/archives", icon: "article" },
        { text: "全部分类", link: "/pages/categories", icon: "folder" },
        { text: "全部标签", link: "/pages/tags", icon: "hashtag" },
      ],
    },
    {
      text: "专栏",
      items: [
        { text: "技术分享", link: "/pages/categories/技术分享", icon: "technical" },
        { text: "我的项目", link: "/pages/project", icon: "code" },
        { text: "效率工具", link: "/pages/tools", icon: "tools" },
      ],
    },
    {
      text: "友链",
      items: [
        { text: "友链鱼塘", link: "/pages/friends", icon: "fish" },
        { text: "友情链接", link: "/pages/link", icon: "people" },
      ],
    },
    {
      text: "我的",
      items: [
        { text: "畅所欲言", link: "/pages/message", icon: "chat" },
        { text: "致谢名单", link: "/pages/thanks", icon: "reward" },
        { text: "关于本站", link: "/pages/about", icon: "contacts" },
      ],
    },
  ],
  // Left Side Nav Menu (External Links)
  navMore: [
    {
      name: "Others",
      list: [
        {
          icon: "/images/logo/logo.webp",
          name: "GitHub",
          url: "https://github.com/Octocat",
        },
      ],
    },
  ],
  // Post Cover Configuration
  cover: {
    // Display Two Columns of Post or Not
    twoColumns: false,
    // Display Cover
    showCover: {
      enable: true,
      // Cover Layout: 'left' | 'right' | 'both'
      coverLayout: 'both',
      // Default Covers (displayed randomly)
      // defaultCover: [
      // ]
    }
  },
  // Enable FakeGPT or Not
  fakeGPT: true,
  // 页脚信息
  footer: {
    // 社交链接（请确保为偶数个）
    social: [
      {
        icon: "email",
        link: "mailto:one@imsyy.top",
      },
      {
        icon: "github",
        link: "https://www.github.com/imsyy/",
      },
      {
        icon: "telegram",
        link: "https://t.me/bottom_user",
      },
      {
        icon: "bilibili",
        link: "https://space.bilibili.com/98544142",
      },
      {
        icon: "qq",
        link: "https://res.abeim.cn/api/qq/?qq=1539250352",
      },
      {
        icon: "twitter-x",
        link: "https://twitter.com/iimmsyy",
      },
    ],
    // sitemap
    sitemap: [
      {
        text: "博客",
        items: [
          { text: "近期文章", link: "/" },
          { text: "全部分类", link: "/pages/categories" },
          { text: "全部标签", link: "/pages/tags" },
          { text: "文章归档", link: "/pages/archives", newTab: true },
        ],
      },
      {
        text: "项目",
        items: [
          { text: "Home", link: "https://github.com/imsyy/home/", newTab: true },
          { text: "SPlayer", link: "https://github.com/imsyy/SPlayer/", newTab: true },
          { text: "DailyHotApi", link: "https://github.com/imsyy/DailyHotApi/", newTab: true },
          { text: "Snavigation", link: "https://github.com/imsyy/Snavigation/", newTab: true },
        ],
      },
      {
        text: "专栏",
        items: [
          { text: "技术分享", link: "/pages/categories/技术分享" },
          { text: "我的项目", link: "/pages/project" },
          { text: "效率工具", link: "/pages/tools" },
        ],
      },
      {
        text: "页面",
        items: [
          { text: "畅所欲言", link: "/pages/message" },
          { text: "关于本站", link: "/pages/about" },
          { text: "隐私政策", link: "/pages/privacy" },
          { text: "版权协议", link: "/pages/cc" },
        ],
      },
      {
        text: "服务",
        items: [
          { text: "站点状态", link: "https://status.imsyy.top/", newTab: true },
          { text: "一个导航", link: "https://nav.imsyy.top/", newTab: true },
          { text: "站点订阅", link: "https://blog.imsyy.top/rss.xml", newTab: true },
          {
            text: "反馈投诉",
            link: "https://eqnxweimkr5.feishu.cn/share/base/form/shrcnCXCPmxCKKJYI3RKUfefJre",
            newTab: true,
          },
        ],
      },
    ],
  },
  // 评论
  comment: {
    enable: false,
    // 评论系统选择
    // artalk / twikoo
    type: "artalk",
    // artalk
    // https://artalk.js.org/
    artalk: {
      site: "",
      server: "",
    },
    // twikoo
    // https://twikoo.js.org/
    twikoo: {
      // 必填，若不想使用 CDN，可以使用 pnpm add twikoo 安装并引入
      js: "https://mirrors.sustech.edu.cn/cdnjs/ajax/libs/twikoo/1.6.39/twikoo.all.min.js",
      envId: "",
      // 环境地域，默认为 ap-shanghai，腾讯云环境填 ap-shanghai 或 ap-guangzhou；Vercel 环境不填
      region: "ap-shanghai",
      lang: "zh-CN",
    },
  },
  // 侧边栏
  aside: {
    // 站点简介
    hello: {
      enable: true,
      text: "这里有关于<strong>开发</strong>相关的问题和看法，也会有一些<strong>奇技淫巧</strong>的分享，其中大部分内容会侧重于<strong>前端开发</strong>。希望你可以在这里找到对你有用的知识和教程。",
    },
    // 目录
    toc: {
      enable: true,
    },
    // 标签
    tags: {
      enable: true,
    },
    // 站点数据
    siteData: {
      enable: true,
    },
  },
  // 友链
  friends: {
    // 友链朋友圈
    circleOfFriends: "",
    // 动态友链
    dynamicLink: {
      server: "",
      app_token: "",
      table_id: "",
    },
  },
  // 搜索
  // https://www.algolia.com/
  search: {
    enable: false,
    appId: "",
    apiKey: "",
  },
  // 打赏
  rewardData: {
    enable: true,
    // 微信二维码
    wechat: "https://pic.efefee.cn/uploads/2024/04/07/66121049d1e80.webp",
    // 支付宝二维码
    alipay: "https://pic.efefee.cn/uploads/2024/04/07/661206631d3b5.webp",
  },
  // 图片灯箱
  fancybox: {
    enable: true,
    js: "https://mirrors.sustech.edu.cn/cdnjs/ajax/libs/fancyapps-ui/5.0.36/fancybox/fancybox.umd.min.js",
    css: "https://mirrors.sustech.edu.cn/cdnjs/ajax/libs/fancyapps-ui/5.0.36/fancybox/fancybox.min.css",
  },
};
