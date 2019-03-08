---
author: 勺夕
date: 2018-09-28 11:33:43
title: babel    
tags:  
  - web
  - es6
  - javascript
  - 前端
---
# babel
由于部分浏览器不支持es6语法，无法将含有es6语法的js进行编译执行，因此出现了babel这个中折方案。babel可以将es6语法转换成es5供浏览器运行。  

## 原理  
1. 解析  
使用 ```babel-parse``` 将 JS 代码解析成 AST 树

2. 转换  
配合 ```babel-traverse``` 进行 AST 树的遍历, 同时使用 ```babel-core``` 对外暴露的 transform 来调用相应插件来转化 AST 树  
babal.transform(code, {
  plugins: { pluginA, pluginB }
})
3. 生成
使用 ```babel-generator``` 将 AST 树转换回 JS 代码