# Webpack

[toc]

## 核心概念

```javascript
const path = require('path'); // nodejs 模块
const HtmlWebpackPlugin = require('html-webpack-plugin'); // 通过 npm 安装
const webpack = require('webpack'); // 用于访问内置插件

module.exports = {
  	/** 入口 */
  	entry: './path/to/my/entry/file.js', 
  	/** 出口 */
  	output: {
    	path: path.resolve(__dirname, 'dist'), // 将路径或路径片段的序列解析为绝对路径, __dirname路径前缀
    	filename: 'my-first-webpack.bundle.js' // 输出的webpack bundle的名称
  	},
  	/** loader */
    module: {
    	rules: [
      	{ test: /\.txt$/, use: 'raw-loader' }
    	]
  	// test 属性，用于标识出应该被对应的 loader 进行转换的某个或某些文件
  	// use 属性，表示进行转换时，应该使用哪个 loader。
  	},
 	/** plugins */
	plugins: [
        new HtmlWebpackPlugin({template: './src/index.html'})
    ],
	mode: 'production' // or 'development'
};

module.exports = config;
```

