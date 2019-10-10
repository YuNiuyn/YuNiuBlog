module.exports = {
    title: 'Yu Niu',
    description: '希望能在前端这条路上一直奔跑\nLife is beautiful, Peace',
    head: [
      ['link', { rel: 'icon', href: '/myicon.ico' }],
      ['meta', { name: 'viewport', content: 'width=device-width, initial-scale=1, maximum-scale=1'}],
    ],
    base: '/YuNiuyn.github.io/',
    markdown: {
      lineNumbers: true
    },
    themeConfig: {
        nav: [
            { text: 'Home', link: '/' },
            { text: 'Front End', link: '/guide/' },
            { text: 'Mini Program',
              items: [
                { text: '微信小程序', link: '' },
                { text: '支付宝小程序', link: '' }
              ]
            },
            { text: 'GitHub', link: 'https://github.com/YuNiuyn' },
            { text: 'About Me', link: '' }
        ],
      lastUpdated: 'Last Updated' // 文档更新时间：每个文件git最后提交的时间
    }
};