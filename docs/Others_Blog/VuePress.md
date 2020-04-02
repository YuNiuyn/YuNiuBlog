# VuePress 个人学习记录

[toc]

[VuePress中文官方文档](https://www.vuepress.cn/)

VuePress 是以markdown为中心，依赖于Vue + webpack开发环境的一个静态站点的生成工具。

VuePress显然是一个标准的Vue轻量级的应用程序，可以在 ``md文件`` 中嵌入 ``Vue`` 语法，灵活性增强，并且针对 ``SEO`` 和 ``页面加载速度`` 做了优化，使得使用的人更能专注于内容。因此，``VuePress`` 无疑是写博客和技术文档的一个不错的选择。

并且出自 ``Vue`` 的作者 ``尤雨溪`` 之手， 这一点就可以吹爆了~ (尤大大🐂🍺~)



# 参考

[VuePress中文官方文档](https://www.vuepress.cn/)

[VuePress 手摸手教你搭建一个类Vue文档风格的技术文档/博客 作者：[**OBKoro1**]](https://segmentfault.com/a/1190000016333850)

[[toc]]

## 起步

```bash
# 安装
npm install -g vuepress # 或 yarn global add vuepress (我习惯使用npm)
# 将 VuePress 作为一个本地依赖安装
npm install -D vuepress # 或 yarn add -D vuepress

# 创建一个新项目文件夹
mkdir project
# 进入文件夹或已有项目文件夹
cd project

# 初始化项目
npm init -y # 或 yarn init -y

# 在project的根目录下新建一个 docs 文件夹 (项目文档的根目录)
mkdir docs

# 创建一个 markdown 文件
echo '# Hello VuePress' > docs/README.md

# 在docs文件夹下创建.vuepress文件夹 (存放VuePress相关的特有的文件)
mkdir .vuepress

# 在.vuepress文件夹下面创建public文件夹 (放置静态资源的，打包之后会放在.vuepress/dist/的根目录)
mkdir public

# 在.vuepress文件夹下创建config.js (VuePress必要配置文件，导出一个javascript对象)
touch config.js 
# Windows下使用 echo >config.js
# 提示 请为参数提供值： 回车，默认没有参数，建立新的空文件

# 简单配置 config.js, 打开config.js, 输入以下信息
module.exports = {
	title: 'Hello VuePress',
	description: 'Just playing around'
}

# 在project根目录下，进入package.json
cd package.json

# 添加 scripts 脚本
# 需要把脚本命令加入到json文件的scripts里
{
  "scripts": {
    "docs:dev": "vuepress dev docs",
    "docs:build": "vuepress build docs"
  }
}

# 开始编写
npm run docs:dev # 或 yarn docs:dev
# PS: 如果没有在package.json中配置 scripts脚本, 则可以输入 vuepress dev docs
# 构建静态文件同理

# 构建为静态文件
npm run docs:build # 或 yarn docs:build
```

经过以上步骤后，命令行显示

```bash
√ Client
  Compiled successfully in 89.95ms
success [10:24:47] Build a54eb8 finished in 90 ms! ( http://localhost:8080/ )
```

就表示文档构建成功了。

打开浏览器输入 http://localhost:8080/ 就可以看到一个 title 标题和一个搜索框了，以及 ``README.md`` 的Hello VuePress

>   PS: 这时遇到一个坑，我使用的是Typora，最后浏览器显示乱码，需要在md文件里重新设置。
>
>   设置方法：打开Typora	=>	文件	=>	选择编码重新打开	=>	选择 UTF-8

## 配置



### 配置文件

如果根据以上步骤或者官方文档来进行的话，此时的配置文件为 ``.\docs\.vuepress\config.js``

**[官方文档配置参考](https://www.vuepress.cn/config/#基本配置-basic-config)** 里面详细的说明了 ``config.js`` 里的一些配置选项



### 主题设置

官方文档给出了默认主题配置方法 [官方文档链接](https://www.vuepress.cn/default-theme-config/#主页-homepage)



### 插件

#### 官方插件

-   ``back-to-top`` ：@vuepress/plugin-back-to-top

    -   安装：

        ```bash
        npm install -D @vuepress/plugin-back-to-top@next
        # 或 yarn add -D @vuepress/plugin-back-to-top@next
        ```

        >   此时有个小坑，npm install -D 的是 写入devDependencies， 里面的插件只用于开发环境，不用于生产环境 

        >-S 的是 写入dependencies ， 是需要发布到生产环境的



## 将Blog部署到GitHub上

[VuePress 部署](https://vuepress.vuejs.org/zh/guide/deploy.html#github-pages)

>   个人使用的是GitHub上的GitHub Pages，所以使用git。
>
>   又因为本人比较菜，所以边学习边开着 [廖雪峰的git教程](https://www.liaoxuefeng.com/wiki/896043488029600) 进行参考，感谢廖大大~



-   在project的根目录下新创建 ``deploy.sh`` 文件，并添加以下代码

```bash
#!/usr/bin/env sh

# 确保脚本抛出遇到的错误
set -e

# 生成静态文件
npm run docs:build

# 进入生成的文件夹
cd docs/.vuepress/dist

# 如果是发布到自定义域名
# echo 'www.example.com' > CNAME

git init
git add -A
git commit -m 'deploy'

# 注意：仓库名字必须为你的username
# 如果发布到 https://<USERNAME>.github.io
# git push -f git@github.com:<USERNAME>/<USERNAME>.github.io.git master

# 如果发布到 https://<USERNAME>.github.io/<REPO>
# git push -f git@github.com:<USERNAME>/<REPO>.git master:gh-pages
# gh-pages 是最终显示的项目文件分支，因此构建好的文件push到此分支

cd -
```



-   另外：在 ``package.json`` 中 ``scripts``  也可修改为

```bash
"scripts": {
    "dev": "vuepress dev docs", # 本地运行项目 npm run dev
    "build": "vuepress build docs", # 本地构建项目 npm run build
    "deploy": "bash deploy.sh" # 部署项目 npm run deploy
}
```



-   配置好后，直接在本地仓库的根目录下运行

```bash
./deploy.sh
```



-   点击相关的 ``Github Pages`` 链接即可访问。



[markdown-it](https://juejin.im/post/5bbccf3cf265da0aee3f317b) 