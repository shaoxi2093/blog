# koa

随着Node.js开始支持ES6，Express的团队基于ES6的generator重新编写了下一代web框架koa。和Express相比，koa 1.0使用generator实现异步。之后又根据ES7开发了koa2，支持了`async`写法。同时对使用koa1开发的`middleware`提供了兼容支持，为了兼容koa1时中间件是`generators`函数，使用了`convert`将`generators`包装成一个`Promise`不过提示也说,v3时候将不再支持`generators`。

