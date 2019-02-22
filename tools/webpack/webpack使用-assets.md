# webpack使用-assets

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


---
参考文章：  
强烈推荐《[webpack4.0各个击破 系列文章](https://www.cnblogs.com/dashnowords/category/1284284.html)》  
《[细说 webpack 之流程篇](http://taobaofed.org/blog/2016/09/09/webpack-flow/)》