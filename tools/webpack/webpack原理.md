# Webpack原理

对于webpack原理，之前我理解的的确是太简单了点，简直就是管中窥豹，本着洗新革面的心态，重新正视这门技术，对其原理进行学习。  

## 应用

对于webpack，首先都是从用开始的，从使用中学习它的作用，再从功能不能满足定制化需求时的loaders、plugins自我开发扩展学习其开发之道，最后深入理解它的工作原理。  

### 对html文件的处理  

在使用过程中，经常用到的plugins中就有`html-webpack-plugin`，作用也大概理解，就是通过配置文件的入口html模版文件，经过插件提供的一些特定功能进行转化。html最主要的几点就是：  

1. 模板填充功能，个性化内容填充（例如页面标题，描述，关键词）  
2. 压缩整个html文件大小，包括多余空格删除（连续多个空白字符的合并）、代码压缩（多余空白字符的合并）、去除注释
3. 对js文件，css的标签注入`<script>`、`<style>`

使用`html-webpack-plugin`配置webpack如下：  

```Js
entry:{
    "main":__dirname + "/src/index.js",
},
// ...
plugins:[
  //index.html
  new HtmlWebpackPlugin({
      title:'MainPage',
      template:'src/index.html',
      filename:'index.html',
      templateParameters:{
          param1:'tony stark',
          param2:'bruce banner'
      },
      chunks:['main'],
  })
]
```

> 对于浏览器而言，html文件是用户访问的入口点，也是所有资源的挂载点，所有资源都是通过html中的标记来进行引用的。而在webpack的构建世界里，html只是一个展示板，而entry参数中指定的javascript入口文件才是真正在构建过程中管理和调度资源的挂载点，html文件中最终展示的内容，都是webpack在加工并为所有资源打好标记以后传递给它的，业界将这种有别与浏览器的模式称之为“webpack的逆向注入”。  

上面只是针对单个页面的处理，如果是多个页面打包，同时有多个js的情况，就要考虑js引用的复用性，例如，A、B js，均引用了C，此时，如果打包后js都具有C的代码的话，不仅打包过程有所重叠，更是对用户请求两个页面直接跳转过程中，不同的js里都有C模块代码，很明显的浪费了资源和请求时间。(这让我想起了当初学前端时，jquery文件可以通过`<script>`其他公共源去引入，此时用户浏览器中可能已经有了此文件缓存，很大程度上减少了文件的请求。) 因此，必须要对公共模块进行提取。  

webpack1-3的版本中使用`commonsChunkPlugin`插件来解决这个问题，在4.0以上的版本中废弃了原有方法，改为使用`optimization.splitChunks`和`optimization.runtimeChunk`来解决优化chunk拆分的问题，关于两者的区别可以看《[webpack4：连奏中的进化](https://www.cnblogs.com/wmhuang/p/8967639.html)》这篇博文。这块的用法在js的splitChunk会详细总结下。

### 对css文件处理

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

### 静态资源

静态资源的处理通常使用`file-loader`和`url-loader`。  

- `file-loader`，*资源打标*，处理资源文件，它会将rules规则命中的资源文件按照配置的信息（路径，名称等）输出到指定目录，并返回其资源定位地址（输出路径，用于生产环境的publicPath路径），默认的输出名是以原文件内容计算的MD5 Hash命名的。
- `url-loader`，*引用优化*，来优化项目中对于资源的引用路径，并设定大小限制，当资源的体积小于limit时将其直接进行Base64转换后嵌入引用文件，体积大于limit时可通过`fallback`参数指定的loader，比如`file-loader`进行处理。

```js
// file-loader
{
  test:/\.(jpg|png|svg|gif)/,
  use:[{
    loader:'file-loader',
    options:{
      outputPath:'imgs/'
    }
  }]
}
```

```js
//url-loader
{
  test:/\.(jpg|png|svg|gif)/,
  use:[{
    loader:'url-loader',
    options:{
      limit:8129,//小于limit限制的图片将转为base64嵌入引用位置
      fallback:'file-loader',//大于limit限制的将转交给指定的loader处理
      outputPath:'imgs/'//options会直接传给fallback指定的loader
    }
  }]
}
```

对图片尤其是小图标，通常还用到过雪碧图优化方案，就是将多张图打包成一个整体图片，最后图片引用通过position偏移来处理。webpack中也有这样的插件`webpack-spritesmith`来解决这种问题。[webpack-spritesmith github](https://github.com/mixtur/webpack-spritesmith)

### js

js打包成一个文件，可以减少多次请求，同时加上压缩和混淆功能，可以发布线上。但是js的模块化相互依赖引入关系，需要维护。

最后，综上对于js的打包要求有：  

1. 模块化引用的代码加载
2. 代码编译TS、ES6、jsx、vue等
3. 合并js
4. 代码分割
5. 代码压缩混淆

#### 代码编译

这里最多的就是Es6语法转Es5，主要是为了部分浏览器（尤其是老版本）无法识别解释Es6语法的js。因此需要兼容浏览器就必须将Es6语法全部转化成Es5。这里就用到了babel。  
[babel大概原理在这](https://github.com/shaoxi2093/blog/blob/master/tools/webpack/loaders/babel-loader.md)  

Ts也有ts-loader和awesome-typescript-loader。作用和原理应该和babel一样。  

#### 模块化和合并代码  

[这里曾经有写过](https://github.com/shaoxi2093/blog/tree/master/tools/webpack#%E5%B0%9D%E8%AF%95)。  

#### 代码分割

代码分割，原因：  

1. 第三方库代码变动频率低，可以单独打包供用户请求和缓存
2. 对于懒加载模块，不能直接打包在一个包中
3. 代码分割后，页面请求js是并行的，能一定程度上优化加载速度
4. 其他。。  

贴一个splitChunk配置：  

```js
// webpack.config.js
module.exports = {
  //...
  optimization: {
    splitChunks: {
      chunks: 'async',//默认只作用于异步模块，为`all`时对所有模块生效,`initial`对同步模块有效
      minSize: 30000,//合并前模块文件的体积
      minChunks: 1,//最少被引用次数
      maxAsyncRequests: 5,
      maxInitialRequests: 3,
      automaticNameDelimiter: '~',//自动命名连接符
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          minChunks:1,//敲黑板
          priority: -10//优先级更高
        },
        default: {
          test: /[\\/]src[\\/]js[\\/]/
          minChunks: 2,//一般为非第三方公共模块
          priority: -20,
          reuseExistingChunk: true
        }
      },
      runtimeChunk:{
          name:'manifest'
      }
    }
  }
}
```

#### 代码压缩和混淆  

webpack4中已经内置了`UglifyJs`插件，当打包模式参数mode设置为`production`时就会自动开启。

## 原理

### 模块化

webpack就是一个模块化打包工具，模块化是重点。首先webpack基于node，因此最开始支持的模块化是commonjs格式的，后来版本又支持了AMD（requirejs浏览器），和ES6 module。

### loader
loader 用于对模块的源代码进行转换。loader 可以使你在 import 或"加载"模块时预处理文件。因此，loader 类似于其他构建工具中“任务(task)”，并提供了处理前端构建步骤的强大方法。loader 可以将文件从不同的语言（如 TypeScript）转换为 JavaScript，或将内联图像转换为 data URL。loader 甚至允许你直接在 JavaScript 模块中 import CSS文件！  --webpack官网
### plugin

### others

最后放一张大图，镇楼。。
![webpack 流程](https://github.com/shaoxi2093/blogImgs/blob/master/github/TB-webpack.jpg?raw=true)




---
参考文章：  
强烈推荐《[webpack4.0各个击破 系列文章](https://www.cnblogs.com/dashnowords/category/1284284.html)》  
《[细说 webpack 之流程篇](http://taobaofed.org/blog/2016/09/09/webpack-flow/)》  
[webpack官方文档](https://www.webpackjs.com/api/)