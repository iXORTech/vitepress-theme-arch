// Theme and Site Configuration
// 主题与网站配置
export const themeConfig = {
  // Site Metadata | 站点数据
  siteMeta: {
    title: "VitePress Theme Curve",
    description: "Hello World",
    // The Welcome Message to be Shown on the Home Page
    // Optional, if not provided, a welcome + title message will be used.
    // welcomeMessage: "Welcome to my site.",
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
      // iconfont
      [
        "link",
        {
          crossorigin: "anonymous",
          rel: "stylesheet",
          href: "https://cdn2.codesign.qq.com/icons/g5ZpEgx3z4VO6j2/latest/iconfont.css",
        },
      ],
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
  // 左侧导航栏菜单（外部链接）
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
    // Sitemap | 网站地图
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
  // Comment System | 评论系统
  comment: {
    enable: false,
    // Comment System Type | 评论系统类型
    // artalk / twikoo
    type: "artalk",
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
  },
  // Right-Side Sidebar | 右侧边栏
  aside: {
    // Brief Description of the Site | 站点简介
    hello: {
      enable: true,
      text: "This is a simple <strong>VitePress</strong> theme.",
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
  // AI Search | AI 搜索
  // https://www.algolia.com/
  search: {
    enable: false,
    appId: "",
    apiKey: "",
  },
  // Sponsoring | 打赏, TODO
  rewardData: {
    enable: false,
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
