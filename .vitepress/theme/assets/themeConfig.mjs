// Theme and Site Configuration
// 主题与网站配置
export const themeConfig = {
  // Site Metadata | 站点数据
  siteMeta: {
    title: "VitePress Theme Arch",
    description: "Hello World",
    // The Welcome Message to be Shown on the Home Page
    // Optional, if not provided, a welcome + title message will be used.
    // welcomeMessage: "Welcome to my site.",

    // Localized versions of title, description, and welcomeMessage
    // localizedTitle: {
    //   "en-US": "VitePress Theme Arch",
    //   "zh-CN": "VitePress 主题 Arch"
    // },
    localizedDescription: {
      "en-US": "Hello World",
      "zh-CN": "你好，世界"
    },
    // localizedWelcomeMessage: {
    //   "en-US": "Welcome to my site!",
    //   "zh-CN": "欢迎访问我的网站！"
    // },

    logo: "/images/logo/logo.webp",
    // URL | 站点地址
    site: "https://example.tld",
    // Language: 'en-US' | 'zh-CN'
    // 语言: 'en-US' | 'zh-CN'
    lang: "en-US",
    // Author Information | 作者信息
    author: {
      name: "Admin",
      cover: "/images/logo/logo.webp",
      email: "admin@example.tld",
      link: "https://example.tld",
    },
  },
  // Internet Content Provider License / 备案信息
  // icp: "萌ICP备19700101号",
  // Website Established Since (A Full Unix Timestamp)
  // 建站时间（完整的 Unix 时间戳）
  since: "1970-01-01T00:00:00.000Z",
  // Number of Posts to Show per Page
  postSize: 8,
  // Inject
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
      // FontAwesome
      [
        "link",
        {
          crossorigin: "anonymous",
          rel: "stylesheet",
          href: "https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.7.2/css/all.css",
        },
      ],
      // SwiperJS
      // [
      //   "script",
      //   {
      //     src: "https://cdn.jsdelivr.net/npm/swiper@11/swiper-element-bundle.min.js",
      //   }
      // ],
      [
        "link",
        {
          rel: "stylesheet",
          href: "https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css",
        },
      ],
      // [
      //   "script",
      //   {
      //     src: "https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js",
      //   },
      // ],
      // Embed Code
      ["link", { rel: "preconnect", href: "https://use.sevencdn.com" }],
      ["link", { rel: "preconnect", href: "https://fonts.gstatic.com", crossorigin: "" }],
      // DocSearch
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
  // Navigation Bar Configuration | 导航栏配置
  // Language-specific navigation configurations
  navLocales: {
    "en-US": [
      {
        text: "Posts",
        icon: "fa-solid fa-newspaper",
        items: [
          { text: "Archives", link: "/archives", icon: "fa-solid fa-newspaper" },
          { text: "All Categories", link: "/categories", icon: "fa-solid fa-folder-open" },
          { text: "All Tags", link: "/tags", icon: "fa-solid fa-hashtag" },
        ],
      },
      {
        text: "Page Group",
        items: [
          { text: "Page 1", link: "/demo-page-1", icon: "fa-solid fa-lightbulb" },
          { text: "Page 2", link: "/demo-page-2", icon: "fa-solid fa-code-branch" },
        ],
      },
      { text: "About", link: "/about", icon: "fa-solid fa-address-card" },
    ],
    "zh-CN": [
      {
        text: "文章",
        icon: "fa-solid fa-newspaper",
        items: [
          { text: "归档", link: "/archives", icon: "fa-solid fa-newspaper" },
          { text: "全部分类", link: "/categories", icon: "fa-solid fa-folder-open" },
          { text: "全部标签", link: "/tags", icon: "fa-solid fa-hashtag" },
        ],
      },
      {
        text: "页面组",
        items: [
          { text: "页面 1", link: "/demo-page-1", icon: "fa-solid fa-lightbulb" },
          { text: "页面 2", link: "/demo-page-2", icon: "fa-solid fa-code-branch" },
        ],
      },
      { text: "关于", link: "/about", icon: "fa-solid fa-address-card" },
    ]
  },
  // Fallback for backward compatibility
  nav: [
    {
      text: "Posts",
      items: [
        { text: "Archives", link: "/archives", icon: "fa-solid fa-newspaper" },
        { text: "All Categories", link: "/categories", icon: "fa-solid fa-folder-open" },
        { text: "All Tags", link: "/tags", icon: "fa-solid fa-hashtag" },
      ],
    },
    {
      text: "Page Group",
      items: [
        { text: "Page 1", link: "/demo-page-1", icon: "fa-solid fa-lightbulb" },
        { text: "Page 2", link: "/demo-page-1", icon: "fa-solid fa-code-branch" },
      ],
    },
    { text: "About", link: "/about", icon: "fa-solid fa-address-card" },
  ],
  // Left Side Nav Menu (External Links)
  // 左侧导航栏菜单（外部链接）
  navMoreLocales: {
    "en-US": [
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
    "zh-CN": [
      {
        name: "其他",
        list: [
          {
            icon: "/images/logo/logo.webp",
            name: "GitHub",
            url: "https://github.com/Octocat",
          },
        ],
      },
    ]
  },
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
  // Post Cover Configuration | 文章封面配置
  cover: {
    // Display Two Columns of Post or Not | 是否显示两列文章
    twoColumns: false,
    // Display Cover | 是否显示封面
    showCover: {
      enable: true,
      // Cover Layout: 'left' | 'right' | 'both'
      // 封面布局: 'left' | 'right' | 'both'
      coverLayout: 'both',
      // Default Covers (displayed randomly)
      // defaultCover: [
      // ]
    }
  },
  // Enable FakeGPT or Not
  fakeGPT: true,
  // Footer Information | 页脚信息
  footer: {
    // Social Links | 社交链接
    // Make add an even number of items.
    // 添加偶数个社交链接
    social: [
      {
        // If using FA Pro, use fa-envelopes.
        icon: "fa-solid fa-envelope",
        link: "mailto:admin@example.tld",
      },
      {
        icon: "fa-brands fa-github",
        link: "https://www.github.com/",
      },
      {
        icon: "fa-brands fa-linkedin",
        link: "https://www.linkedin.com/in/",
      },
      {
        icon: "fa-brands fa-x-twitter",
        link: "https://x.com/",
      },
      {
        icon: "fa-brands fa-bluesky",
        link: "https://bsky.app/profile/",
      },
      {
        icon: "fa-brands fa-discord",
        link: "https://discord.gg/",
      },
    ],
    // Language-specific sitemap configurations
    sitemapLocales: {
      "en-US": [
        {
          text: "Blog",
          items: [
            { text: "Recent Posts", link: "/" },
            { text: "All Categories", link: "/categories" },
            { text: "All Tags", link: "/tags" },
            { text: "Archives", link: "/archives", newTab: true },
          ],
        },
        {
          text: "Others",
          items: [
            { text: "About Us", link: "/about" },
            { text: "Privacy Policy", link: "/privacy" },
            { text: "Copyright Info", link: "/copyright" },
          ],
        },
      ],
      "zh-CN": [
        {
          text: "博客",
          items: [
            { text: "最新文章", link: "/" },
            { text: "全部分类", link: "/categories" },
            { text: "全部标签", link: "/tags" },
            { text: "归档", link: "/archives", newTab: true },
          ],
        },
        {
          text: "其他",
          items: [
            { text: "关于我们", link: "/about" },
            { text: "隐私政策", link: "/privacy" },
            { text: "版权信息", link: "/copyright" },
          ],
        },
      ],
    },
    // Fallback for backward compatibility
    sitemap: [
      {
        text: "Blog",
        items: [
          { text: "Recent Posts", link: "/" },
          { text: "All Categories", link: "/categories" },
          { text: "All Tags", link: "/tags" },
          { text: "Archives", link: "/archives", newTab: true },
        ],
      },
      {
        text: "Others",
        items: [
          { text: "About Us", link: "/about" },
          { text: "Privacy Policy", link: "/privacy" },
          { text: "Copyright Info", link: "/copyright" },
        ],
      },
    ],
  },
  // Comment System | 评论系统
  comment: {
    enable: true,
    // Comment System Type | 评论系统类型
    // artalk / twikoo / waline
    type: "waline",
    // Artalk
    // https://artalk.js.org/
    artalk: {
      site: "",
      server: "",
    },
    // Twikoo
    // https://twikoo.js.org/
    twikoo: {
      js: "https://cdn.jsdelivr.net/npm/twikoo/dist/twikoo.all.min.js",
      envId: "",
      lang: "zh-CN",
    },
    waline: {
      js: "https://gcore.jsdelivr.net/npm/@waline/client@3/dist/waline.js",
      css: "https://gcore.jsdelivr.net/npm/@waline/client@3/dist/waline.css",
      meta_css: "https://gcore.jsdelivr.net/npm/@waline/client@3/dist/waline-meta.css",
      // WalineWrapper Server URL | WalineWrapper 服务器地址
      serverURL: "",
      // Custom Emoji | 自定义表情
      emoji: [
        "https://unpkg.com/@waline/emojis@1.0.1/weibo",
        "https://unpkg.com/@waline/emojis@1.0.1/alus",
        "https://unpkg.com/@waline/emojis@1.0.1/bilibili",
        "https://unpkg.com/@waline/emojis@1.0.1/qq",
        "https://unpkg.com/@waline/emojis@1.0.1/tieba",
        "https://unpkg.com/@waline/emojis@1.0.1/tw-emoji",
      ],
      // Comment Info｜评论信息
      meta: ["nick", "mail", "link"],
      // Required Comment Info｜必填评论信息
      requiredMeta: ["nick", "mail"],
      // Login Forced｜强制登录
      login: "enable",
      // Comment Per Page｜每页评论数
      pageSize: 10,
      // Post Reaction｜文章点赞
      reaction: false,
    }
  },
  // Right-Side Sidebar | 右侧边栏
  aside: {
    // Brief Description of the Site | 站点简介
    hello: {
      enable: true,
      text: "This is a simple <strong>VitePress</strong> theme.",
      localizedText: {
        "zh-CN": "这是个 <strong>VitePress</strong> 主题。",
        "en-US": "This is a simple <strong>VitePress</strong> theme."
      }
    },
    // Table of Contents | 文章目录
    toc: {
      enable: true,
    },
    // Tag Display | 标签展示
    tags: {
      enable: true,
    },
    // Site Data Display | 站点数据展示
    siteData: {
      enable: true,
    },
  },
  // AI Search | AI 搜索
  // https://www.algolia.com/
  search: {
    enable: false,
    appId: "",
    apiKey: "",
    indexName: "",
  },
  // Sponsoring | 打赏, TODO
  rewardData: {
    enable: true,
    // GitHub Sponsors | GitHub 赞助
    github: "",
    // Buy Me a Coffee
    // https://www.buymeacoffee.com/
    buyMeACoffee: "",
    // Patreon
    // https://www.patreon.com/
    patreon: "",
    // Ko-fi
    // https://ko-fi.com/
    koFi: "",
    // PayPal
    // https://www.paypal.com/
    paypal: "",
    // WeChat QR Code | 微信二维码
    wechat: "",
    // Alipay QR Code | 支付宝二维码
    alipay: "",
  },
  // Fancybox for Images | 图片灯箱
  fancybox: {
    enable: true,
    js: "https://cdn.jsdelivr.net/npm/@fancyapps/ui/dist/fancybox/fancybox.umd.min.js",
    css: "https://cdn.jsdelivr.net/npm/@fancyapps/ui/dist/fancybox/fancybox.min.css",
  },
};
