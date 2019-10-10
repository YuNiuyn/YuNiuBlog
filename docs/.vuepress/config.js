module.exports = {
    title: 'Yu Niu',
    description: '希望能在前端这条路上一直奔跑\nLife is beautiful, Peace',
    head: [
      ['link', { rel: 'icon', href: '/favicon.ico' }], // 增加一个自定义的 favicon(网页标签的图标)
      ['meta', { name: 'viewport', content: 'width=device-width, initial-scale=1, maximum-scale=1'}],
    ],
    base: '/YuNiuyn.github.io/', // 这是部署到github相关的配置 下面会讲
    markdown: {
      lineNumbers: true // 代码块显示行号
    },
    themeConfig: {
        nav: [
            { text: 'Home', link: '/' },
            { text: 'Guide', link: '/guide/' },
            { text: 'External', link: 'https://google.com' },
            { text: 'GitHub', link: 'https://github.com/YuNiuyn' }
        ],
      lastUpdated: 'Last Updated' // 文档更新时间：每个文件git最后提交的时间
    }
};