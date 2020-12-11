module.exports = {
  title: "Hello PW SDK",
  description: "Just playing around",
  locales: {
    "/": {
      lang: "en-US",
      title: "Lay2 SDK",
      description: "Use PW SDK to build a CKB dApp",
    },
    "/zh/": {
      lang: "zh-CN",
      title: "Lay2 SDK",
      description: "使用 PW SDK 快速构建 CKB dApp",
    },
  },
  themeConfig: {
    locales: {
      "/": {
        selectText: "Languages",
        label: "English",
        ariaLabel: "Languages",
        editLinkText: "Edit this page on GitHub",
        serviceWorker: {
          updatePopup: {
            message: "New content is available.",
            buttonText: "Refresh",
          },
        },
        algolia: {},
        nav: [
          { text: "Home", link: "/" },
          { text: "PW-SDK", link: "/pw-sdk/" },
          { text: "Demo", link: "https://pay.lay2.dev/", target: "_blank" },
          { text: "Github", link: "https://github.com/lay2dev/pw-core" },
        ],
        sidebar: {
          "/pw-sdk/": [
            {
              title: "Introduction",
              collapsable: false,
              children: [
                "/pw-sdk/",
                "/pw-sdk/getting-started",
              ],
            },
            {
              title: "PW-Core",
              collapsable: false,
              children: [
                "/pw-sdk/pw-core/connect-to-eth",
                "/pw-sdk/pw-core/connect-to-eos",
                "/pw-sdk/pw-core/connect-to-tron",
              ],
            },
            {
              title: "PW-Lock",
              collapsable: false,
              children: [
                "/pw-sdk/pw-lock/info",
                "/pw-sdk/pw-lock/lock-eth",
                "/pw-sdk/pw-lock/lock-eos",
                "/pw-sdk/pw-lock/lock-tron",
              ],
            },
            {
              title: "Demo",
              collapsable: false,
              children: ["/pw-sdk/demo/payment-demo"],
            },
          ],
        },
      },
      "/zh/": {
        // 多语言下拉菜单的标题
        selectText: "选择语言",
        // 该语言在下拉菜单中的标签
        label: "简体中文",
        // 编辑链接文字
        editLinkText: "在 GitHub 上编辑此页",
        // Service Worker 的配置
        serviceWorker: {
          updatePopup: {
            message: "发现新内容可用.",
            buttonText: "刷新",
          },
        },
        // 当前 locale 的 algolia docsearch 选项
        algolia: {},
        nav: [
          { text: "主页", link: "/zh/" },
          { text: "PW-SDK", link: "/zh/pw-sdk/" },
          { text: "Demo", link: "https://pay.lay2.dev/", target: "_blank" },
          { text: "Github", link: "https://github.com/lay2dev/pw-core" },
        ],
        sidebar: {
          "/zh/pw-sdk/": [
            {
              title: "介绍",
              collapsable: false,
              children: [
                "/zh/pw-sdk/",
                "/zh/pw-sdk/getting-started",
              ]
            },
            {
              title: "PW-Core",
              collapsable: false,
              children: [
                "/zh/pw-sdk/pw-core/connect-to-eth",
                "/zh/pw-sdk/pw-core/connect-to-eos",
                "/zh/pw-sdk/pw-core/connect-to-tron",
              ],
            },
            {
              title: "PW-Lock",
              collapsable: false,
              children: [
                "/zh/pw-sdk/pw-lock/info",
                "/zh/pw-sdk/pw-lock/lock-eth",
                "/zh/pw-sdk/pw-lock/lock-eos",
                "/zh/pw-sdk/pw-lock/lock-tron",
              ],
            },
            {
              title: "Demo",
              collapsable: false,
              children: ["/zh/pw-sdk/demo/payment-demo"],
            },
          ],
        },
      },
    },
    // 假如你的文档仓库和项目本身不在一个仓库：
    docsRepo: "lay2dev/docs.pw",
    // 假如文档不是放在仓库的根目录下：
    docsDir: "docs",
    // 假如文档放在一个特定的分支下：
    docsBranch: "master",
    // 默认是 false, 设置为 true 来启用
    editLinks: true,
    // 默认为 "Edit this page"
    editLinkText: "帮助我们改善此页面!",
  },
};
