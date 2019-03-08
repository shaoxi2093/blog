---
author: 勺夕
date: 2018-12-28 16:59:41
title: webpack打包优化方案
tags:  
  - web
  - webpack
  - javascript
  - 前端
---
# webpack打包优化方案

1. 通过externals配置来提取常用库
2. 利用DllPlugin和DllReferencePlugin预编译资源模块 通过DllPlugin来对那些我们引用但是绝对不会修改的npm包来进行预编译，再通过DllReferencePlugin将预编译的模块加载进来。
3. 使用Happypack 实现多线程加速编译  
要注意的第一点是，它对file-loader和url-loader支持不好，所以这两个loader就不需要换成happypack了，其他loader可以类似地换一下

4. 使用Tree-shaking和Scope Hoisting来剔除多余代码
5. 使用fast-sass-loader代替sass-loader
6. babel-loader开启缓存

2和3用过。其他没有  

---
参考文章：  
《[webpack 使用及优化](https://www.jianshu.com/p/bb1e76edc71e)》