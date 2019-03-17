# Fetch

Fetch API 是继ajax（利用XHR xmlHttpRequest）之后，新一种能够使js发起http请求的底层api。用于访问和操纵HTTP管道的部分，例如请求和响应。它还提供了一个全局 fetch()方法，该方法提供了一种简单，合理的方式来跨网络异步获取资源。

以前是使用ajax  XMLHttpRequest实现的。Fetch提供了一个更好的替代方法，可以很容易地被其他技术使用，例如 Service Workers。Fetch还提供了单个逻辑位置来定义其他HTTP相关概念，例如CORS和HTTP的扩展。

fetch规范与jQuery.ajax()主要有两种方式的不同：

- 当接收到一个代表错误的 HTTP 状态码时，从 fetch()返回的 Promise 不会被标记为 reject， 即使该 HTTP 响应的状态码是 404 或 500。相反，它会将 Promise 状态标记为 resolve （但是会将 resolve 的返回值的 ok 属性设置为 false ），仅当网络故障时或请求被阻止时，才会标记为 reject。
- 默认情况下，fetch 不会从服务端发送或接收任何 cookies, 如果站点依赖于用户 session，则会导致未经认证的请求（要发送 cookies，必须设置 `credentials` 选项）。  
  可以配置其credentials项，其有3个值：

    - `omit`: 默认值，忽略cookie的发送
    - `same-origin`: 表示cookie只能同域发送，不能跨域发送
    - `include`: cookie既可以同域发送，也可以跨域发送

## 使用

```js
var request = new Request('/users.json', {
    method: 'POST',
    mode: 'cors',
    redirect: 'follow',
    credentials: 'include',
    headers: new Headers({
        'Content-Type': 'text/plain'
    })
});

fetch(request).then(function() { /* handle response */ });
```

## 兼容性

不过，fetch是基于Promise来实现的，所以在低版本浏览器中Promise可能也未被原生支持，兼容性方面，如下图（来自 caniuse）：  
![fetch 兼容性](https://github.com/shaoxi2093/blog/blob/master/assets/js-fetch.png?raw=true)  

因此在使用过程中还需要留意兼容性方案甚至降级方案。  
兼容性方案可以考虑fetch的polyfill，首先判断浏览器是否原生支持`fetch`，否则结合`Promise`使用`XMLHttpRequest`的方式来实现；这正是`whatwg-fetch`的实现思路，而同构应用中使用的`isomorphic-fetch`，其客户端fetch的实现是直接`require` `whatwg-fetch`来实现的。  

- promise的polyfill，例如`es6-promise`、`babel-polyfill`提供的promise实现
- fetch的polyfill实现，例如`isomorphic-fetch`和`whatwg-fetch`

IE8/9则比较特殊：IE8它使用的是ES3，而IE9则对ES5部分支持。这种情况下还需要ES5的polyfill es5-shim支持了。

目前个人使用较多的fetch成熟的开源库，如`isomorphic-fetch`，还能支持浏览器，node端的通用性。

## 跨域  

fetch也是支持跨域请求的，只不过其跨域请求做法与XHR2一样，需要客户端与服务端支持；另外，fetch还支持一种跨域，不需要服务器支持的形式，具体可以通过其mode的配置项来说明。

- `same-origin`：该模式是不允许跨域的，它需要遵守同源策略，否则浏览器会返回一个error告知不能跨域；其对应的response type为`basic`。
- `cors`: 该模式支持跨域请求，顾名思义它是以CORS的形式跨域；当然该模式也可以同域请求不需要后端额外的CORS支持；其对应的response type为`cors`。
- `no-cors`: 该模式用于跨域请求但是服务器不带CORS响应头，也就是服务端不支持CORS；这也是fetch的特殊跨域请求方式；其对应的response type为`opaque`。
  > response type为`opaque`返回数据无法被js脚本读取，但是被其他api读取如`ServiceWorker`，另外，该模式返回的repsonse可以在Cache API中被存储起来以便后续的对它的使用，对加载一些资源比较实用。

## 其他

fetch没有进度、没有超时支持、也无法取消。但是可以有其他库来模仿实现这些效果，例如`setTimeOut`、`Promise.race+setTimeOut`来模拟超时逻辑。  

> 浏览器已经开始为`AbortController` 和`AbortSignal` 接口（也就是Abort API）添加实验性支持，允许像 Fetch 和 XHR 这样的操作在还未完成时被中止 。

---
总结Fetch 的几个特点：  

1. fetch不会携带/接收cookie，除非设置`credentials`
2. fetch不会根据返回状态码40x、50x进行错误处理，需要自行判断
3. fetch有兼容性问题，可以使用一些成熟库去兼容它
4. fetch没有请求进度，也无法取消abort，但是可以实用一些第三方库，或者其他hack方式来实现类似效果。

---
参考文章：
《[Fetch_API MDN](https://developer.mozilla.org/zh-CN/docs/Web/API/Fetch_API)》
《[fetch使用的常见问题及其解决办法](https://segmentfault.com/a/1190000008484070#articleHeader6)》