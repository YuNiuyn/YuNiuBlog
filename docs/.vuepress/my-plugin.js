module.exports = {
    markdown: {
        config: md => {
        md.set({ breaks: true })
        md.use(require('markdown-it-table-of-contents'))
        }
    }
}