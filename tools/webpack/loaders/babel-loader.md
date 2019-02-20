# babel-loader

babel主要用于将js文件中的ES6语法转ES5。步骤就是：  
js源码 -> AST树 -> 解析并替换 -> AST树转化 -> js新代码  

1. 解析  
使用 ```babel-parse``` 将 JS 代码解析成 AST 树

2. 转换  
配合 ```babel-traverse``` 进行 AST 树的遍历, 同时使用 ```babel-core``` 对外暴露的 transform 来调用相应插件来转化 AST 树  
babal.transform(code, {
  plugins: { pluginA, pluginB }
})
3. 生成
使用 ```babel-generator``` 将 AST 树转换回 JS 代码