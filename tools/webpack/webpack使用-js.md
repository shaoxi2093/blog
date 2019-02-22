# webpack使用-js

js打包成一个文件，可以减少多次请求，同时加上压缩和混淆功能，可以发布线上。但是js的模块化相互依赖引入关系，需要维护。

最后，综上对于js的打包要求有：  

1. 模块化引用的代码加载
2. 代码编译TS、ES6、jsx、vue等
3. 合并js
4. 代码分割
5. 代码压缩混淆

## 代码编译

这里最多的就是Es6语法转Es5，主要是为了部分浏览器（尤其是老版本）无法识别解释Es6语法的js。因此需要兼容浏览器就必须将Es6语法全部转化成Es5。这里就用到了babel。  
[babel大概原理在这](https://github.com/shaoxi2093/blog/blob/master/tools/webpack/loaders/babel-loader.md)  

Ts也有ts-loader和awesome-typescript-loader。作用和原理应该和babel一样。  

## 模块化和合并代码  

[这里曾经有写过](https://github.com/shaoxi2093/blog/tree/master/tools/webpack#%E5%B0%9D%E8%AF%95)。  

## 代码分割

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

## 代码压缩和混淆  

webpack4中已经内置了`UglifyJs`插件，当打包模式参数mode设置为`production`时就会自动开启。


---
参考文章：  
强烈推荐《[webpack4.0各个击破 系列文章](https://www.cnblogs.com/dashnowords/category/1284284.html)》  
《[细说 webpack 之流程篇](http://taobaofed.org/blog/2016/09/09/webpack-flow/)》