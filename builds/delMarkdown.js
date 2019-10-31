// 此文件在编译后执行，目的是将每个 Markdown 文件的 comment 组件移除
// 因为我们只想让 comment 组件打包到编译后的文件中，而非工程文件。
const fs = require('fs')
const findMarkdown = require('./findMarkdown')
const rootDir = './docs'
 
findMarkdown(rootDir,delComponents)
 
function delComponents(dir){
    fs.readFile(dir,'utf-8', (err, content) => {
        if (err) throw err
 
        fs.writeFile(dir, content.replace(/\n \n <comment-comment\/> \n /g,''), (err) => {
            if (err) throw err
            console.log(`del components from ${dir}`)
          })
      })
}