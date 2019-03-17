# Fetch

Fetch API 是继ajax（利用XHR xmlHttpRequest）之后，新一种能够使js发起http请求的底层api。用于访问和操纵HTTP管道的部分，例如请求和响应。它还提供了一个全局 fetch()方法，该方法提供了一种简单，合理的方式来跨网络异步获取资源。

以前是使用ajax  XMLHttpRequest实现的。Fetch提供了一个更好的替代方法，可以很容易地被其他技术使用，例如 Service Workers。Fetch还提供了单个逻辑位置来定义其他HTTP相关概念，例如CORS和HTTP的扩展。

fetch规范与jQuery.ajax()主要有两种方式的不同：

- 当接收到一个代表错误的 HTTP 状态码时，从 fetch()返回的 Promise 不会被标记为 reject， 即使该 HTTP 响应的状态码是 404 或 500。相反，它会将 Promise 状态标记为 resolve （但是会将 resolve 的返回值的 ok 属性设置为 false ），仅当网络故障时或请求被阻止时，才会标记为 reject。
- 默认情况下，fetch 不会从服务端发送或接收任何 cookies, 如果站点依赖于用户 session，则会导致未经认证的请求（要发送 cookies，必须设置 credentials 选项）。

不过，兼容性方面，如下图（来自 caniuse）：  
![fetch 兼容性](https://github.com/shaoxi2093/blog/blob/master/assets/js-fetch.png?raw=true)  

因此在使用过程中还需要留意兼容性的降级方案。  

目前有成熟的开源库，如`isomorphic-fetch`等。