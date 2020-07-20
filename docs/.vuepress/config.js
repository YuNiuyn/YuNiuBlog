module.exports = {
    title: 'Yu Niu',
    description: 'Life is beautiful',
    head: [
      ['link', { rel: 'icon', href: '/docs/.vuepress/public/panpan.ico', size: '32x32' }],
      ['meta', { name: 'viewport', content: 'width=device-width, initial-scale=1, maximum-scale=1'}],
    ],
    base: '/YuNiuBlog/',
    port: 9494,
    evergreen: true,
    markdown: {
      lineNumbers: true,
      toc: {
        "markerPattern": /^\[toc\]/im,
        "includeLevel": [1,2,3],
      },
    },
    themeConfig: {
      nav: [
          { text: 'Home', link: '/' },
          { text: 'Front End',
            items: [
              { text: 'JavaScript', link: '/JavaScript_Blog/' },
              { text: 'CSS', link: '/CSS_Blog/' }
            ]
          },
          { text: 'Project',
            items: [
              { text: 'Vue', link: '/Vue_Blog/' },
              { text: 'NodeJS', link: '/NodeJS_Blog/' },
              { text: 'Webpack', link: '/Webpack_Blog/' },
            ]
          },
          { text: 'Mini Program', link: '/MiniProgram_Blog/' },
          { text: 'Others', link: '/Others_Blog/' },
      ],
      lastUpdated: 'Last Updated',
      repo: 'YuNiuyn/YuNiuBlog',
      repoLabel: 'GitHub',
      docsRepo: 'YuNiuyn/YuNiuBlog',
      docsDir: 'docs',
      docsBranch: 'master',
      editLinks: true,
      editLinkText: '在GitHub上编辑此页',
      smoothScroll: false,
      sidebar: {
        '/JavaScript_Blog/': [
          '',
          'JavaScript',
          'jsES6',
          'jsWEB',
          'DesignPatterns'
        ],
        '/CSS_Blog/': [
          'CSS'
        ],
        '/Vue_Blog/': [
          '',
          'Vue.js',
          'VueRouter',
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
      }
    },
    plugins: {
      '@vuepress/back-to-top': {},
      '@vssue/vuepress-plugin-vssue': {
        platform: 'github',
        owner: 'YuNiuyn',
        repo: 'YuNiuBlog',
        clientId: '6cb636b554f085a166bd',
        clientSecret: 'facac7da33bcc4c77bb121810cb9c661a09d1c45',
      },
      // 'vuepress-plugin-comment': {
      //   choosen: 'valine', 
      //   // options选项中的所有参数，会传给Valine的配置
      //   options: {
      //     el: '#valine-vuepress-comment',
      //     appId: '6cb636b554f085a166bd',
      //     appKey: 'facac7da33bcc4c77bb121810cb9c661a09d1c45'
      //   }
      // }
    },
};