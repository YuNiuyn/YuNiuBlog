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
      toc: { includeLevel: [2, 3] }
    },
    port: 9494,
    themeConfig: {
      nav: [
          { text: 'Home', link: '/' },
          { text: 'Front End',
            items: [
              { text: 'Vue', link: '/Vue_Blog/' },
              { text: 'JavaScript', link: '/JavaScript_Blog/'},
              { text: 'VuePress', link: '/VuePress_Blog/' },
              { text: '其它', link: '/Others_Blog/' }
            ]
          },
          { text: 'Mini Program',
            items: [
              { text: '微信小程序', link: '/WeChat_miniPro/' },
              { text: '支付宝小程序', link: '/Ali_miniPro/' }
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
      smoothScroll: true,
      // sidebar: 'auto',
      sidebar: {
        '/Vue_Blog/': [
          ''
        ],
        '/JavaScript_Blog/': [
          '',
          '页面跳转url传参'
        ],
        '/VuePress_Blog/': [
          '',
          'VuePress'
        ],
        '/Others_Blog/': [
          '',
          'MarkDown_and_Typora'
        ],
        '/WeChat_miniPro/': [
          ''
        ],
        '/Ali_miniPro/': [
          ''
        ],
        '/': [
          '',       
          ['/Vue_Blog/', 'VUE'],
          ['/JavaScript_Blog/', 'JavaScript'],
          ['/VuePress_Blog/', 'VuePress'],
          ['/Others_Blog/', '其它'],
          ['/WeChat_miniPro/', '微信小程序'],
          ['/Ali_miniPro/', '支付宝小程序']
        ]
      }
      // plugins: [
      //   '@vuepress/back-to-top',
      // ]
    }
};