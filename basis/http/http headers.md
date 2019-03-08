---
author: 勺夕
date: 2018-07-19 13:09:24
title: Http headers   
tags:  
  - web
  - 浏览器
  - http
---

# Http headers

HTTP消息头是在，客户端请求（Request）或服务器响应（Response）时传递的，位请求或响应的第一行，HTTP消息体（请求或响应的内容）是其后传输。HTTP消息头，以明文的字符串格式传送，是以冒号分隔的键/值对，如：Accept-Charset: utf-8，每一个消息头最后以回车符(CR)和换行符(LF)结尾。HTTP消息头结束后，会用一个空白的字段来标识，这样就会出现两个连续的CR-LF。

自定专用消息头可通过'X-' 前缀来添加；但是这种用法被IETF在2012年6月发布的 RFC5548 中明确弃用，原因是其会在非标准字段成为标准时造成不便；其他的消息头在 IANA 注册表 中列出, 其原始内容在 RFC 4229 中定义。 此外，IANA 还维护着被提议的新HTTP 消息头注册表.

根据不同上下文，可将消息头分为：

- 一般头General: 同时适用于请求和响应消息，但与最终消息主体中传输的数据无关的消息头。
- 请求头Request: 包含更多有关要获取的资源或客户端本身信息的消息头。
- 响应头Response: 包含有关响应的补充信息，如其位置或服务器本身（名称和版本等）的消息头。
- 实体头Entity: 包含有关实体主体的更多信息，比如主体长(Content-Length)度或其MIME类型。  

> 其他（来自http header mdn）
> - 端到端消息头  
>   这类消息头必须被传输到最终的消息接收者，也即，请求的服务器或响应的客户端。中间的代理服务器必须转发未经修改的端到端消息头，并且必须缓存它们。
> - 逐跳消息头  
>   这类消息头仅对单次传输连接有意义，不能通过代理或缓存进行重新转发。这些消息头包括 Connection, Keep-Alive, Proxy-Authenticate, Proxy-Authorization, TE, Trailer, Transfer-Encoding 及 Upgrade。注意，只能使用 Connection 来设置逐跳一般头。

## Request headers

以下列举下，个人日常经常遇到的一些请求头，（不是科普文，查询所有头用法的[点击这里](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers)）:  

| Header            | 解释                                                                                      | 示例                                                |
| ----------------- | ----------------------------------------------------------------------------------------- | --------------------------------------------------- |
| Accept            | 指定客户端能够接收的内容类型                                                              | Accept: text/plain, text/html                       |
| Accept-Charset    | 浏览器可以接受的字符编码集。                                                              | Accept-Charset: iso-8859-5                          |
| Accept-Encoding   | 指定浏览器可以支持的web服务器返回内容压缩编码类型。                                       | Accept-Encoding: compress, gzip                     |
| Accept-Language   | 浏览器可接受的语言                                                                        | Accept-Language: en,zh                              |
| Connection        | 表示是否需要持久连接。（HTTP 1.1默认进行持久连接）                                        | Connection: close                                   |
| Cookie            | HTTP请求发送时，会把保存在该请求域名下的所有cookie值一起发送给web服务器。                 | Cookie: $Version=1; Skin=new;                       |
| Content-Length    | 请求的内容长度                                                                            | Content-Length: 348                                 |
| Content-Type      | 请求的与实体对应的MIME信息                                                                | Content-Type: application/x-www-form-urlencoded     |
| Date              | 请求发送的日期和时间                                                                      | Date: Tue, 15 Nov 2010 08:12:31 GMT                 |
| Host              | 指定请求的服务器的域名和端口号                                                            | Host: www.zcmhi.com                                 |
| Referer           | 先前网页的地址，当前请求网页紧随其后,即来路                                               | Referer: http://www.zcmhi.com/archives/71.html      |
| User-Agent        | User-Agent的内容包含发出请求的用户信息                                                    | User-Agent: Mozilla/5.0 (Linux; X11)                |
| Cache-Control     | 指定请求和响应遵循的缓存机制                                                              | Cache-Control: no-cache                             |
| If-Modified-Since | 如果请求的部分在指定时间之后被修改则请求成功，未被修改则返回304代码                       | If-Modified-Since: Sat, 29 Oct 2010 19:43:31 GMT    |
| If-None-Match     | 如果内容未改变返回304代码，参数为服务器先前发送的Etag，与服务器回应的Etag比较判断是否改变 | If-None-Match: “737060cd8c284d8af7ad3082f209582d” |
| Accept-Ranges     | 可以请求网页实体的一个或者多个子范围字段                                                  | Accept-Ranges: bytes                                |
| If-Range          | 如果实体未改变，服务器发送客户端丢失的部分，否则发送整个实体。参数也为Etag                | If-Range: “737060cd8c284d8af7ad3082f209582d”      |
| Range             | 只请求实体的一部分，指定范围                                                              | Range: bytes=500-999                                |
| Transfer-Encoding | 文件传输编码                                                                              | Transfer-Encoding:chunked                           |

这部分中：  

1. `Cache-Control`、`If-Modified-Since`、`If-None-Match`用来向服务器发起静态资源的缓存请求。详细可以查看我的 [浏览器资源文件缓存](https://github.com/shaoxi2093/blog/blob/master/basis/%E6%B5%8F%E8%A7%88%E5%99%A8/4-%E8%B5%84%E6%BA%90%E6%96%87%E4%BB%B6%E7%BC%93%E5%AD%98.md)  
2. `Accept-Ranges`、`If-Range`、`Range`用于断点续传（上传下载）请求
3. `Accept`、`Accept-Charset`、`Accept-Encoding`、`Accept-Language`用来向对方服务器告知，自己（浏览器或是其他发起者）能够接受的返回内容类型、压缩类型、字符编码类型、语言等。可以大致推测出浏览器收到返回数据后，是有 文件/内容解析->解压缩->字符解码->js回调函数处理返回数据
    > jquery ajax中的dataType可以设置json，其实并不是在请求头中通过消息头告知服务端需要返回的字符串格式，服务端也可以返回其他格式给你，只不过在jquery内部对返回的数据解析成json后（JSON.parse）再返回给回调函数。而text和xml类型返回的数据不会经过处理。数据仅仅简单的将XMLHttpRequest的responseText或responseHTML属性传递给success回调函数。
4. `Content-Type`告知服务端请求数据的格式和长度，服务器收到请求数据后的解析，可以参考[koa-bodyparser](https://github.com/shaoxi2093/blog/tree/master/frameworks/koa/middlewares/koa-bodyparser.md)对请求数据的解析。
5. `Connection`、`Transfer-Encoding`、`Content-Length`是和http1.1长链接有关。具体参考我的 [http connection](https://github.com/shaoxi2093/blog/tree/master/basis/http/http-connection.md)文章详细。
6. 其他一些需要告知服务器的，`Referer`可以在防盗链基础鉴别中利用到。
   > 在以下两种情况下，Referer 不会被发送：  
   >  - 来源页面采用的协议为表示本地文件的 "file" 或者 "data" URI；
   >  - 当前请求页面采用的是非安全协议，而来源页面采用的是安全协议（HTTPS）。

## Response headers

以下列举下，个人常见到的响应头，响应头基本上都是服务器上配置的，但是一般都由框架或者一些代理服务器如nginx上配置好了，接触到需要修改的不多，只是对于通常的200、304、401、404、502等这些状态码在前端页面时而会碰上，只是了解，谈不上很深，同上，需要查阅全部的参考这里。  

| Header            | 解释                                                                                | 示例                                                |
| ----------------- | ----------------------------------------------------------------------------------- | --------------------------------------------------- |
| Accept-Ranges     | 表明服务器是否支持指定范围请求及哪种类型的分段请求                                  | Accept-Ranges: bytes                                |
| Allow             | 对某网络资源的有效的请求行为，不允许则返回405                                       | Allow: GET, HEAD                                    |
| Cache-Control     | 告诉所有的缓存机制是否可以缓存及哪种类型                                            | Cache-Control: no-cache                             |
| Connection        | 表示是否需要持久连接。（HTTP 1.1默认进行持久连接）                                        | Connection: close                                   |
| Content-Encoding  | web服务器支持的返回内容压缩编码类型。                                               | Content-Encoding: gzip                              |
| Content-Language  | 响应体的语言                                                                        | Content-Language: en,zh                             |
| Content-Length    | 响应体的长度                                                                        | Content-Length: 348                                 |
| Content-Location  | 请求资源可替代的备用的另一地址                                                      | Content-Location: /index.htm                        |
| Content-MD5       | 返回资源的MD5校验值                                                                 | Content-MD5: Q2hlY2sgSW50ZWdyaXR5IQ==               |
| Content-Range     | 在整个返回体中本部分的字节位置                                                      | Content-Range: bytes 21010-47021/47022              |
| Content-Type      | 返回内容的MIME类型                                                                  | Content-Type: text/html; charset=utf-8              |
| Date              | 原始服务器消息发出的时间                                                            | Date: Tue, 15 Nov 2010 08:12:31 GMT                 |
| ETag              | 请求变量的实体标签的当前值                                                          | ETag: “737060cd8c284d8af7ad3082f209582d”          |
| Expires           | 响应过期的日期和时间                                                                | Expires: Thu, 01 Dec 2010 16:00:00 GMT              |
| Last-Modified     | 请求资源的最后修改时间                                                              | Last-Modified: Tue, 15 Nov 2010 12:45:26 GMT        |
| Location          | 用来重定向接收方到非请求URL的位置来完成请求或标识新的资源                           | Location: http://www.zcmhi.com/archives/94.html     |
| refresh           | 应用于重定向或一个新的资源被创造，在5秒之后重定向（由网景提出，被大部分浏览器支持） | Refresh: 5; url=http://www.atool.org/httptest.php   |
| Retry-After       | 如果实体暂时不可取，通知客户端在指定时间之后再次尝试                                | Retry-After: 120                                    |
| Server            | web服务器软件名称                                                                   | Server: Apache/1.3.27 (Unix) (Red-Hat/Linux)        |
| Set-Cookie        | 设置Http Cookie                                                                     | Set-Cookie: UserID=JohnDoe; Max-Age=3600; Version=1 |
| Transfer-Encoding | 文件传输编码                                                                        | Transfer-Encoding:chunked                           |
| Vary              | 告诉下游代理是使用缓存响应还是从原始服务器请求                                      | Vary: *                                             |
| Via               | 告知代理客户端响应是通过哪里发送的                                                  | Via: 1.0 fred, 1.1 nowhere.com (Apache/1.1)         |
| Access-Control-Allow-Headers | 服务器端允许的请求Headers |Access-Control-Allow-Headers:Content-Type,Accept |
| Access-Control-Allow-Methods | 服务器端允许的请求方法 |Access-Control-Allow-Methods: POST,GET,PUT,DELETE,OPTIONS|
| Access-Control-Allow-Origin | 服务器端允许的请求Origin头部（譬如为*）|   Access-Control-Allow-Origin: * |

个人并没有配置或者修改到以上部分，只是接触过，这部分中：  
1. `content-x`的headers都是用来帮助接收方（浏览器等）去解析返回数据使用
2. `ETag`、`Expires`、`Cache-Control`、`Last-Modified`等，是告知浏览器，静态资源缓存配置的
3. `Connection`、`Transfer-Encoding`、`Content-Length`是用来长连接的（MDN上叫控制逐段传输（hop-by-hop））
4. `Allow`等是告知浏览器允许的请求类型
5. 其他，了解的也不是很多。
   > `Retry-After` 表示用户代理需要等待多长时间之后才能继续发送请求。这个首部主要应用于以下两种场景：  
   > - 当与 503 (Service Unavailable，当前服务不存在) 响应一起发送的时候，表示服务下线的预期时长。
   > - 当与重定向响应一起发送的时候，比如 301 (Moved Permanently，永久迁移)，表示用户代理在发送重定向请求之前需要等待的最短时间。

感觉，响应头很多要和status code一起去总结一下。

如下图所示，是从csdn网站上的某一图片资源的响应头：  
![response-header](https://github.com/shaoxi2093/blogImgs/blob/master/github/response-headers.png?raw=true)  

## General headers

通用首部，通用头，一般头，中文翻译后就挺多叫法的。平时通过开发者工具查看，经常遇到的也就5个。但世纪上http header的划分是根据功能划分的，而我是根据平时的使用去划分的，其实说起来并不算准确的标准或者官方规范。  
个人截图开发者工具上的请求，如下图：  ![general-header](https://github.com/shaoxi2093/blogImgs/blob/master/github/general-headers.png?raw=true)  

1. Request URL，请求访问的地址
2. Request Method，请求访问的方式
3. Status Code，看到返回状态码，其实`Response headers`中也有一个status
4. Remote Address，实际访问的IP地址，包括端口号
5. Referrer Policy，如下：  

### Referrer-Policy（来源协议）

Referrer-Policy（来源协议）用来规定什么情况下显示Referer字段及refer字段内显示多少信息。

1. `no-referrer`，任何情况下都不发送referer
2. `no-referrer-when-downgrade`，在同等安全等级下（例如https页面请求https地址），发送referer，但当请求方低于发送方（例如https页面请求http地址），不发送referer
3. `origin`，仅仅发送origin，即protocal+host
4. `origin-when-cross-origin`，跨域时发送origin
5. `same-origin`，当双方origin相同时发送
6. `strict-origin`，当双方origin相同且安全等级相同时发送
7. `unfafe-url`，任何情况下都显示完整的referer

---
参考文章：  
《[Http Headers MDN](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers)》
《[Referrer-Policy](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/Referrer-Policy)》