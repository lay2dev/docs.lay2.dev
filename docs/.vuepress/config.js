module.exports = {
    title: 'Hello PW SDK',
    description: 'Just playing around',
    locales: {
      '/': {
        lang: 'en-US',
        title: 'PW SDK',
        description: 'Use PW SDK to build a CKB dApp'
      },
      '/zh/': {
        lang: 'zh-CN',
        title: 'PW SDK',
        description: '使用 PW SDK 快速构建 CKB dApp'
      }
    },
    themeConfig: {
      locales: {
        '/': {
          selectText: 'Languages',
          label: 'English',
          ariaLabel: 'Languages',
          editLinkText: 'Edit this page on GitHub',
          serviceWorker: {
            updatePopup: {
              message: "New content is available.",
              buttonText: "Refresh"
            }
          },
          algolia: {},
          nav: [
            { text: 'Home', link: '/' },
            { text: 'Guide', link: '/guide/' },
            { text: 'Demo', link: 'https://pay.lay2.dev/', target:'_blank'},
            { text: 'Github', link: 'https://github.com/lay2dev/pw-core' },
          ],
          sidebar: {
            '/guide/': [
              {
                title: 'Guide',
                collapsable: false,
                children: [
                  '/guide/',
                  '/guide/getting-started',
                  '/guide/connect-to-ethwallet',
                ]
              },
              {
                title: 'Extend',
                collapsable: false,
                children: [
                  '/guide/connect-to-eoswallet',
                  '/guide/connect-to-tronwallet'
                ],
              }
            ]
          }
        },
        '/zh/': {
          // 多语言下拉菜单的标题
          selectText: '选择语言',
          // 该语言在下拉菜单中的标签
          label: '简体中文',
          // 编辑链接文字
          editLinkText: '在 GitHub 上编辑此页',
          // Service Worker 的配置
          serviceWorker: {
            updatePopup: {
              message: "发现新内容可用.",
              buttonText: "刷新"
            }
          },
          // 当前 locale 的 algolia docsearch 选项
          algolia: {},
          nav: [
            { text: '主页', link: '/zh/' },
            { text: '教程', link: '/zh/guide/' },
            { text: 'Demo', link: 'https://pay.lay2.dev/', target:'_blank'},
            { text: 'Github', link: 'https://github.com/lay2dev/pw-core' },
          ],
          sidebar: {
            '/zh/guide/': [
              {
                title: '指南',
                collapsable: false,
                children: [
                  '/zh/guide/',
                  '/zh/guide/getting-started',
                  '/zh/guide/connect-to-ethwallet',
                  '/zh/guide/wallet-support'
                ]
              },
              {
                title: '扩展',
                collapsable: false,
                children: [
                  '/zh/guide/connect-to-eoswallet',
                  '/zh/guide/connect-to-tronwallet'
                ],
              },
              {
                title: 'Demo',
                collapsable: false,
                children: [
                  '/zh/guide/payment-demo'
                ],
              }
            ]
          }
        }
      },
      // 假如你的文档仓库和项目本身不在一个仓库：
      docsRepo: 'lay2dev/docs.pw',
      // 假如文档不是放在仓库的根目录下：
      docsDir: 'docs',
      // 假如文档放在一个特定的分支下：
      docsBranch: 'master',
      // 默认是 false, 设置为 true 来启用
      editLinks: true,
      // 默认为 "Edit this page"
      editLinkText: '帮助我们改善此页面!'
    }
  }