module.exports = {
    title: 'Yu Niu',
    description: 'Life is beautiful',
    head: [
      ['link', { rel: 'icon', href: '/myicon.ico' }],
      ['meta', { name: 'viewport', content: 'width=device-width, initial-scale=1, maximum-scale=1'}],
    ],
    base: '/YuNiuBlog/',
    markdown: {
      lineNumbers: true
    },
    port: 9494,
    themeConfig: {
        nav: [
            { text: 'Home', link: '/' },
            { text: 'Front End',
              items: [
                { text: 'Vue', link: '/Vue_Blog/README.md' },
                { text: 'JavaScript', link: '/JavaScript_Blog/README.md/'},
                { text: 'VuePress', link: '/VuePress_Blog/README.md' },
                { text: '其它', link: '/Others_Blog/README.md' }
              ]
            },
            { text: 'Mini Program',
              items: [
                { text: 'WeChat', link: '/WeChat_miniPro/README.md' },
                { text: 'Ali', link: '/Ali_miniPro/README.md' }
              ]
            },
            { text: 'About Me', link: 'https://github.com/YuNiuyn' }
        ],
      lastUpdated: 'Last Updated',
      repo: 'YuNiuyn/YuNiuBlog',
      repoLabel: 'GitHub',
      docsRepo: 'YuNiuyn/YuNiuBlog',
      docsDir: 'docs',
      docsBranch: 'master',
      editLinks: true,
      editLinkText: '在 GitHub 上编辑此页',
      sidebar: 'auto',

    },
    markdown: {
      config: md => {
        md.set({ breaks: true })
        md.use(require('markdown-it-xxx'))
      }
    }
};