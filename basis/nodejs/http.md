# Http

Node开发web服务器时，肯定会用到`http`模块，，及时未使用，也是框架里用到这个模块。

## 从`http.createServer`看起

### 使用

使用http模块搭建一个最简单的监听3000端口的服务器，代码如下：  

```js
var http = require('http');
http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Hello World\n');
}).listen(3000);
```

由使用方式可以看出：  

1. `http`模块提供了一个`createServer`方法，执行后返回一个对象A
2. 返回的对象A提供了一个`listen`方法，可以让我们设置端口号
3. `createServer`中传参是一个方法，且暴露出`req`和`res`这两个对象供操作
4. 理解`request` `response`都不应该是创建时产生的对象，更像是在请求过程中才会生成的，因此暂时理解成回调

### 源码分析(v8.9.0)

#### createServer

首先找到`createServer`的源码，如下：

```js
const server = require('_http_server');
const { Server } = server;

// node/lib/http.js:33
function createServer(requestListener) {
  return new Server(requestListener);
}
```

可以从源码中得到，`createServer`返回了一个`Server`实例。`listen`也肯定是它或者原型链中暴露出来的方法。

#### Server

```js
// node/lib/_http_server.js:260
function Server(requestListener) {
  if (!(this instanceof Server)) return new Server(requestListener);
  net.Server.call(this, { allowHalfOpen: true });

  if (requestListener) {
    this.on('request', requestListener);
  }

  // Similar option to this. Too lazy to write my own docs.
  // http://www.squid-cache.org/Doc/config/half_closed_clients/
  // http://wiki.squid-cache.org/SquidFaq/InnerWorkings#What_is_a_half-closed_filedescriptor.3F
  this.httpAllowHalfOpen = false;

  this.on('connection', connectionListener);

  this.timeout = 2 * 60 * 1000;
  this.keepAliveTimeout = 5000;
  this._pendingResponseData = 0;
  this.maxHeadersCount = null;
}
```

根据源码得到以下几点结论：  
1. `Server`是利用`net.Server`创建出来的
2. `Server`基于类似事件系统，使用了`on`来设置监听
3. `createServer`内传的参数方法，是用来在`Server`触发`request`事件时的回调方法。

#### net.Server

```js
// node/lib/net.js:1196
function Server(options, connectionListener) {
  if (!(this instanceof Server))
    return new Server(options, connectionListener);

  EventEmitter.call(this);

  if (typeof options === 'function') {
    connectionListener = options;
    options = {};
    this.on('connection', connectionListener);
  } else if (options == null || typeof options === 'object') {
    options = options || {};

    if (typeof connectionListener === 'function') {
      this.on('connection', connectionListener);
    }
  } else {
    throw new TypeError('options must be an object');
  }

  this._connections = 0;

  Object.defineProperty(this, 'connections', {
    get: internalUtil.deprecate(() => {

      if (this._usingSlaves) {
        return null;
      }
      return this._connections;
    }, 'Server.connections property is deprecated. ' +
       'Use Server.getConnections method instead.', 'DEP0020'),
    set: internalUtil.deprecate((val) => (this._connections = val),
                                'Server.connections property is deprecated.',
                                'DEP0020'),
    configurable: true, enumerable: false
  });

  this[async_id_symbol] = -1;
  this._handle = null;
  this._usingSlaves = false;
  this._slaves = [];
  this._unref = false;

  this.allowHalfOpen = options.allowHalfOpen || false;
  this.pauseOnConnect = !!options.pauseOnConnect;
}
util.inherits(Server, EventEmitter);
```
