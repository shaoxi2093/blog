# webpack使用-html

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



---
参考文章：  
强烈推荐《[webpack4.0各个击破 系列文章](https://www.cnblogs.com/dashnowords/category/1284284.html)》  
《[细说 webpack 之流程篇](http://taobaofed.org/blog/2016/09/09/webpack-flow/)》