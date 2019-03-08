# CORS

CORS是目前个人使用最多的跨域解决方案了，通过响应头`Access-Control-Allow-Origin`支持所有请求来源，所以闲暇时间了解学习下CORS跨域的原理，发现还是有很多东西是使用中不知道的。  

1. 兼容性：目前大部分主流浏览器都支持CORS，IE10及以上。
2. 过程：浏览器是根据请求去判断是否跨域，但是并不是所有都直接发送完整请求给服务器
3. cookie：对于跨域的cookie传递方案
4. 再次使用：跨域的请求是否按请求个数，每次都验证

## 跨域背景

首先，浏览器是根据请求的URL决定是否跨域，包括协议、域名、端口号。对于跨域的场景，无法查看其他域下的cookie、localStorage等，也无法获取其他域下dom对象，最后就是跨域请求被拦截。但并不是浏览器直接拦截请求，而是请求响应后的数据无法通过脚本读取、使用。（当然，这是针对目前主流浏览器的说明）  

## CORS过程

当浏览器，发现请求是跨域的后，会进行判断，是否是简单请求（[参考这里](http://www.ruanyifeng.com/blog/2016/04/cors.html)）。  

1. 是简单请求，直接发送完整请求后，并在请求头里添加`Origin`头，再得到服务器返回后，根据响应头决定，是传会js正常解析，还是直接抛出跨域请求异常不给js响应内容
2. 非简单请求，先发送"预检"请求（preflight）一个`OPTIONS`请求发给服务器验证是否允许跨域的较小的请求，之后服务器如果返回允许，则再发送完整请求。如果服务器不允许，则抛异常给js线程。
   ```js
   OPTIONS /cors HTTP/1.1
   Origin: http://api.bob.com
   Access-Control-Request-Method: PUT
   Access-Control-Request-Headers: X-Custom-Header
   Host: api.alice.com
   Accept-Language: en-US
   Connection: keep-alive
   User-Agent: Mozilla/5.0...
   ```
   （1）Access-Control-Request-Method  
   该字段是必须的，用来列出浏览器的CORS请求会用到哪些HTTP方法，上例是PUT。
   （2）Access-Control-Request-Headers  
   该字段是一个逗号分隔的字符串，指定浏览器CORS请求会额外发送的头信息字段，上例是X-Custom-Header。服务器也会响应返回。

## CORS缓存

`Access-Control-Max-Age`用来指定本次预检请求的有效期，单位为秒。在此期间，不用发出另一条预检请求。

## CORS过程中的其他http头

- `Access-Control-Allow-Credentials`响应头，跨域时是否需要cookie（当前跨域请求URL下的cookie）
- `Access-Control-Allow-Headers`相应头，和“预检”请求头中的`Access-Control-Request-Headers`对应，但不限于返回请求头中的可以多加
- `Access-Control-Allow-Methods`响应头，允许的跨域请求方式
- `Access-Control-Expose-Headers`响应头，允许浏览器读跨域请求响应头中的其他header部分

---
参考文章：  
《[跨域资源共享 CORS 详解](http://www.ruanyifeng.com/blog/2016/04/cors.html)》


