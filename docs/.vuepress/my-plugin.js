module.exports = {
    markdown: {
        config: md => {
            md.set({ breaks: true })
            md.use(require('markdown-it-table-of-contents'),{
                "lineNumbers": true,
                "markerPattern": /^\[toc\]/im,
                "includeLevel": [1,2,3],
            })
        }
    }
}
// module.exports = {
//     markdown: {
//         config: md => {
//             md.set({
//                 breaks: true
//             })
//             md.use(require('markdown-it-table-of-contents'), {
//                 "lineNumbers": true,
//                 "markerPattern": /^\[toc\]/im,
//                 "includeLevel": [1,2,3],
//             })
//         }
//     },
    // blog: {
    //     config: blg => {
    //         blg.use(require('@vuepress/plugin-blog'), {
    //             directories: [{
    //             },   
    //         ],    
    //         })
    //     }
    // },
    // vssue: {
    //     config: vss => {
    //         vss.use(require('@vssue/vuepress-plugin-vssue'), {
    //             platform: 'github',
    //             owner: 'YuNiuyn',
    //             repo: 'YuNiuBlog',
    //             clientId: '6cb636b554f085a166bd',
    //             clientSecret: 'facac7da33bcc4c77bb121810cb9c661a09d1c45',
    //         })
    //     }
    // }


// }