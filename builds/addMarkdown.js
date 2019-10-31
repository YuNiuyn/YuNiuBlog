// 此文件将 comment 组件注册到每个 Markdown 文件的最后。
const fs = require('fs')
const findMarkdown = require('./findMarkdown')
const rootDir = './docs'
 
findMarkdown(rootDir, writeComponents)
 
function writeComponents(dir) {
  fs.appendFile(dir, `\n \n <comment-comment/> \n `, (err) => {
    if (err) throw err
    console.log(`add components to ${dir}`)
  })
}