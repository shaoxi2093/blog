# http

## http版本
- http(超文本传输协议)是一种常用于应用层的协议，它是基于文本传输内容。
- http/2（超文本传输协议第二版），他对http进行了一些升级改造
1. 新的二进制格式
2. 多路复用
3. header压缩
4. 支持server push
- https可以称为http安全版，主要是http下增加了SSL(安全套接层)或者TLS(传输层安全)，在SSL或TSL在传输层对数据进行了加密处理。




### http1.0和http1.1
HTTP1.0最早在网页中使用是在1996年，那个时候只是使用一些较为简单的网页上和网络请求上，而HTTP1.1则在1999年才开始广泛应用于现在的各大浏览器网络请求中，同时HTTP1.1也是当前使用最为广泛的HTTP协议。 主要区别主要体现在：  
1. 缓存处理，在HTTP1.0中主要使用header里的If-Modified-Since,Expires来做为缓存判断的标准，HTTP1.1则引入了更多的缓存控制策略例如Entity tag，If-Unmodified-Since, If-Match, If-None-Match等更多可供选择的缓存头来控制缓存策略。
2. 带宽优化及网络连接的使用，HTTP1.0中，存在一些浪费带宽的现象，例如客户端只是需要某个对象的一部分，而服务器却将整个对象送过来了，并且不支持断点续传功能，HTTP1.1则在请求头引入了range头域，它允许只请求资源的某个部分，即返回码是206（Partial Content），这样就方便了开发者自由的选择以便于充分利用带宽和连接。
3. 错误通知的管理，在HTTP1.1中新增了24个错误状态响应码，如409（Conflict）表示请求的资源与资源的当前状态发生冲突；410（Gone）表示服务器上的某个资源被永久性的删除。
4. Host头处理，在HTTP1.0中认为每台服务器都绑定一个唯一的IP地址，因此，请求消息中的URL并没有传递主机名（hostname）。但随着虚拟主机技术的发展，在一台物理服务器上可以存在多个虚拟主机（Multi-homed Web Servers），并且它们共享一个IP地址。HTTP1.1的请求消息和响应消息都应支持Host头域，且请求消息中如果没有Host头域会报告一个错误（400 Bad Request）。
5. 长连接，HTTP 1.1支持长连接（PersistentConnection）和请求的流水线（Pipelining）处理，在一个TCP连接上可以传送多个HTTP请求和响应，减少了建立和关闭连接的消耗和延迟，在HTTP1.1中默认开启Connection： keep-alive，一定程度上弥补了HTTP1.0每次请求都要创建连接的缺点。  


### http2.0
HTTP2.0和HTTP1.X相比的新特性

新的二进制格式（Binary Format），HTTP1.x的解析是基于文本。基于文本协议的格式解析存在天然缺陷，文本的表现形式有多样性，要做到健壮性考虑的场景必然很多，二进制则不同，只认0和1的组合。基于这种考虑HTTP2.0的协议解析决定采用二进制格式，实现方便且健壮。

多路复用（MultiPlexing），即连接共享，即每一个request都是是用作连接共享机制的。一个request对应一个id，这样一个连接上可以有多个request，每个连接的request可以随机的混杂在一起，接收方可以根据request的 id将request再归属到各自不同的服务端请求里面。

header压缩，如上文中所言，对前面提到过HTTP1.x的header带有大量信息，而且每次都要重复发送，HTTP2.0使用encoder来减少需要传输的header大小，通讯双方各自cache一份header fields表，既避免了重复header的传输，又减小了需要传输的大小。

服务端推送（server push），同SPDY一样，HTTP2.0也具有server push功能。

### https

首先，https并不是http版本的一种，是基于http和ssl/tls的加密封装版本。它并不关心http是哪个版本的，本身并不是依赖关系，只关心传输过程中加密和认证过程。不过部分浏览器的支持特性，有些http2.0必须在https下。

HTTPS协议需要到CA申请证书，一般免费证书很少，需要交费。
HTTP协议运行在TCP之上，所有传输的内容都是明文，HTTPS运行在SSL/TLS之上，SSL/TLS运行在TCP之上，所有传输的内容都经过加密的。
HTTP和HTTPS使用的是完全不同的连接方式，用的端口也不一样，前者是80，后者是443。
HTTPS可以有效的防止运营商劫持，解决了防劫持的一个大问题。

#### HTTPS的证书验证过程

一般来说，主要关注的就是SSL/TLS的握手流程，如下（简述）：

1. 浏览器请求建立SSL链接，并向服务端发送一个随机数–Client random和客户端支持的加密方法，比如RSA加密，此时是明文传输。

2. 服务端从中选出一组加密算法与Hash算法，回复一个随机数–Server random，并将自己的身份信息以证书的形式发回给浏览器 （证书里包含了网站地址，非对称加密的公钥，以及证书颁发机构等信息）

3. 浏览器收到服务端的证书后  
    - 验证证书的合法性（颁发机构是否合法，证书中包含的网址是否和正在访问的一样），如果证书信任，则浏览器会显示一个小锁头，否则会有提示
    - 用户接收证书后（不管信不信任），浏览器会生产新的随机数–Premaster secret，然后证书中的公钥以及指定的加密方法加密 Premastersecret，发送给服务器。
    - 利用Client random、Server random和Premaster secret通过一定的算法生成HTTP链接数据传输的对称加密key- session key
    - 使用约定好的HASH算法计算握手消息，并使用生成的 session key对消息进行加密，最后将之前生成的所有信息发送给服务端。

4. 服务端收到浏览器的回复
   - 利用已知的加解密方式与自己的私钥进行解密，获取 Premastersecret
   - 和浏览器相同规则生成 session key
   - 使用 session key解密浏览器发来的握手消息，并验证Hash是否与浏览器发来的一
   - 使用 session key加密一段握手消息，发送给浏览器

5. 浏览器解密并计算握手消息的HASH，如果与服务端发来的HASH一致，此时握手过程结束