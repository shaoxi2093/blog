# koa

随着Node.js开始支持ES6，Express的团队基于ES6的generator重新编写了下一代web框架koa。和Express相比，koa 1.0使用generator实现异步。之后又根据ES7开发了koa2，支持了`async`写法。同时对使用koa1开发的`middleware`提供了兼容支持，为了兼容koa1时中间件是`generators`函数，使用了`convert`将`generators`包装成一个`Promise`不过提示也说,v3时候将不再支持`generators`。

## koa2原理copy

首先，整理下koa2使用上的一些特点：  

1. `const app = new koa()`，初始化应用
2. `app.use(async (ctx, next) => { // ... })`，接入中间件
3. `app.listen(port)`，监听端口号，搭建服务器

好像并没那么复杂吼～😂，提供了一个服务器快速搭建的框架，里面的所有实际性的功能由中间件来实现。  
和`Express`相比，个人感觉就像是`Express`是精装修，`koa`是毛坯房。精装修虽好，上手即用，但是也会赠给你很多无用甚至不好用的部分，遇到这种情况，你要么改源码，要么提需求等版本更新（基本无望），要么还有最后一种方案，那就是放在那弃之不用，换另一个用（这又会占地方）。毛坯房`koa`虽然什么都没有，但是你想用什么装什么，如果觉得工具不好用，直接换另一个都没问题，这就是自在。扯远了...

现在开始看koa2框架源码，代码不多，总共4个文件：  
- application.js 主入口（package.json中的`main`）
- context.js
- request.js
- response.js

### 初始化应用

这里源码来自`application.js:32`：  

```js
const response = require('./response');
const context = require('./context');
const request = require('./request');
const Emitter = require('events');

module.exports = class Application extends Emitter {
  /**
   * Initialize a new `Application`.
   *
   * @api public
   */

  constructor() {
    super();

    this.proxy = false;
    this.middleware = [];
    this.subdomainOffset = 2;
    this.env = process.env.NODE_ENV || 'development';
    this.context = Object.create(context);
    this.request = Object.create(request);
    this.response = Object.create(response);
  }
  // ...
}
```

从上面源码中得到的信息：  
1. 继承node `event`模块，使用事件机制
2. `middleware`多中间件，是以数组形式储存
3. `context`、`request`、`response`来自其他三个模块输出

### 接入中间件

这里源码来自`application.js:95`：  

```js
const convert = require('koa-convert');
// ...
/**
   * Use the given middleware `fn`.
   *
   * Old-style middleware will be converted.
   *
   * @param {Function} fn
   * @return {Application} self
   * @api public
   */

  use(fn) {
    if (typeof fn !== 'function') throw new TypeError('middleware must be a function!');
    if (isGeneratorFunction(fn)) {
      deprecate('Support for generators will be removed in v3. ' +
                'See the documentation for examples of how to convert old middleware ' +
                'https://github.com/koajs/koa/blob/master/docs/migration.md');
      fn = convert(fn);
    }
    debug('use %s', fn._name || fn.name || '-');
    this.middleware.push(fn);
    return this;
  }
```

从上面源码中得到的信息：
1. 首先判断中间件是否是`function`类型，不是直接抛出错误
2. 如果是koa1的`generator`形式`function`则⚠️提醒，generator将在v3时不支持，koa2还是会帮他转成`async`格式，使用`koa-convert`
3. 将中间件存储

### 监听端口号，搭建服务器

这里源码来自`application.js:61`：  

```js
listen() {
    debug('listen');
    const server = http.createServer(this.callback());
    return server.listen.apply(server, arguments);
  }
```

从上面源码中得到的信息：  
1. 通过http模块提供的`createServer`创建服务器
2. 主要内容在`this.callback()`中

这里源码来自`application.js:125`：  

```js
const compose = require('koa-compose');
// ...
/**
   * Return a request handler callback
   * for node's native http server.
   *
   * @return {Function}
   * @api public
   */

  callback() {
    const fn = compose(this.middleware);

    if (!this.listeners('error').length) this.on('error', this.onerror);

    const handleRequest = (req, res) => {
      res.statusCode = 404;
      const ctx = this.createContext(req, res);
      const onerror = err => ctx.onerror(err);
      const handleResponse = () => respond(ctx);
      onFinished(res, onerror);
      return fn(ctx).then(handleResponse).catch(onerror);
    };

    return handleRequest;
  }
```

从上面源码中得到的信息：  

1. 使用`koa-compose`处理所有中间件（行成洋葱模型机制）
2. 其他`http.createServer`回调处理

#### koa-compose

`koa-compose`源码很短，就50多行，去掉注释后更短，如下：  

```js
'use strict'

const Promise = require('any-promise')

/**
 * Expose compositor.
 */

module.exports = compose

/**
 * Compose `middleware` returning
 * a fully valid middleware comprised
 * of all those which are passed.
 *
 * @param {Array} middleware
 * @return {Function}
 * @api public
 */

function compose (middleware) {
  if (!Array.isArray(middleware)) throw new TypeError('Middleware stack must be an array!')
  for (const fn of middleware) {
    if (typeof fn !== 'function') throw new TypeError('Middleware must be composed of functions!')
  }

  /**
   * @param {Object} context
   * @return {Promise}
   * @api public
   */

  return function (context, next) {
    // last called middleware #
    let index = -1
    return dispatch(0)
    function dispatch (i) {
      if (i <= index) return Promise.reject(new Error('next() called multiple times'))
      index = i
      let fn = middleware[i]
      if (i === middleware.length) fn = next
      if (!fn) return Promise.resolve()
      try {
        return Promise.resolve(fn(context, function next () {
          return dispatch(i + 1)
        }))
      } catch (err) {
        return Promise.reject(err)
      }
    }
  }
}
```

从上面源码中得到的信息：  

1. 通过闭包，返回处理`function (context, next)`结构函数
2. `middleware`格式校验，必须是元素为`function`的数组格式
3. 通过 递增`i`来遍历中间件执行
4. 通过`index`来控制 `next`不会在同个中间件内，多次执行
5. 通过`middleware`长度控制执行结束时机

总结：  
通过闭包形式，传递参数，返回遍历执行中间件的函数（封装）。