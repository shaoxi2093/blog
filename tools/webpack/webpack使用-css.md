# webpack使用-css
就个人使用来说，最初是使用css，再后来，使用一些预编译语言Sass、Less，再再后来，使用预编译+react那种css-in-js写法。  
因此使用过的loaders大概有这些：  

- style-loader，用来将css放在js中，当加载时在生成`<style>`标签到页面中
- css-loader，用来将css转成js模块
- scss-loader，用来使webpack认识scss/sass文件，语法格式翻译成css标准
- postcss-loader+autoprefixer，用来添加css的浏览器前缀，以兼容各种浏览器

用过的插件有：  

- mini-css-extract-plugin，用来压缩和打包成css文件，而不是`<style>`标签

`optimize-css-assets-webpack-plugin`，这个我没有用过，压缩css用的，学习到了。

```js
// webpack.config.js
module.exports = {
//...
  module: {
      rules: [{
          test: /\.scss$/,
          use: [
              "style-loader", // creates style nodes from JS strings
              "css-loader", // translates CSS into CommonJS，添加?modules=true可以进行模块化
              "sass-loader" // compiles Sass to CSS, using Node Sass by default
          ]
      }]
  },
  plugins:[
    new HtmlWebpackPlugin(),//生成入口html文件
    new MiniCssExtractPlugin({
      filename: "[name].css"
    })//为抽取出的独立的CSS文件设置配置参数
  ],
  optimization:{
    //对生成的CSS文件进行代码压缩 mode='production'时生效
    minimizer:[
      new OptimizeCssAssetsPlugin()
    ]
  }
};
```

```js
//postcss.config.js
module.exports = {
    plugins:[
        require('autoprefixer')
    ]
}
```

对此，整个编译过程参考下图：  
![css-processing-chain](https://github.com/shaoxi2093/blogImgs/blob/master/github/webpack-css.png?raw=true)

---
参考文章：  
强烈推荐《[webpack4.0各个击破 系列文章](https://www.cnblogs.com/dashnowords/category/1284284.html)》  
《[细说 webpack 之流程篇](http://taobaofed.org/blog/2016/09/09/webpack-flow/)》