module.exports = {
    title: 'Yu Niu',
    description: 'Life is beautiful',
    head: [
      ['link', { rel: 'icon', href: '/myicon.ico' }],
      ['meta', { name: 'viewport', content: 'width=device-width, initial-scale=1, maximum-scale=1'}],
    ],
    base: '/YuNiuBlog/',
    markdown: {
      lineNumbers: true,
      toc: { includeLevel: [2, 4] }
    },
    port: 9494,
    themeConfig: {
      nav: [
          { text: 'Home', link: '/' },
          { text: 'Front End',
            items: [
              { text: 'JavaScript', link: '/JavaScript_Blog/'},
            ]
          },
          { text: 'Project',
            items: [
              { text: 'Vue', link: '/Vue_Blog/' },
              { text: 'NodeJS', link: '/NodeJS_Blog/'},
              { text: 'Webpack', link: '/Webpack_Blog/' },
            ]
          },
          { text: 'Mini Program', link: '/MiniProgram_Blog/'},
          { text: 'Others', link: '/Others_Blog/'},
            // items: [
            //   { text: '微信小程序', link: '/WeChat_miniPro/' },
            //   { text: '支付宝小程序', link: '/Ali_miniPro/' }
            // ]
          // { text: 'About Me', link: 'https://github.com/YuNiuyn' }
      ],
      lastUpdated: 'Last Updated',
      repo: 'YuNiuyn/YuNiuBlog',
      repoLabel: 'GitHub',
      docsRepo: 'YuNiuyn/YuNiuBlog',
      docsDir: 'docs',
      docsBranch: 'master',
      editLinks: true,
      editLinkText: '在GitHub上编辑此页',
      smoothScroll: true,
      sidebar: {
        '/JavaScript_Blog/': [
          '',
          'JavaScript',
          'jsES6',
          'jsWEB'
        ],
        '/Vue_Blog/': [
          '',
          'Vue.js',
          'Vue Router',
          'Vuex'
        ],
        '/NodeJS_Blog/': [
          '',
          'npm'
        ],
        '/Webpack_Blog/': [
          '',
          'Webpack'
        ],
        '/MiniProgram_Blog/': [
          '',
          '微信小程序',
          '支付宝小程序'
        ],
        '/Others_Blog/': [
          '',
          'MarkDown&Typora',
          'Git',
          'VuePress'
        ],
      },
      plugins: [
        '@vuepress/back-to-top',
        ['@vssue/vuepress-plugin-vssue', {
          platform: 'github',
          owner: 'YuNiuyn',
          repo: 'YuNiuBlog',
          clientId: '6cb636b554f085a166bd',
          clientSecret: 'facac7da33bcc4c77bb121810cb9c661a09d1c45',
        }],
      ]
    }
};