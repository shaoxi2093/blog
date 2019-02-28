# Http Connection


## Http长连接的数据传输完成识别

HTTP首部定义Connection: keep-alive后，客户端、服务端怎么知道本次传输结束呢？两部分：

静态页面通过Content-Length提前告知对方数据传输大小，具体可以参考拙作HTTP Content-Length深入实践。
动态页面不能通过Content-Length提前告知对方数据传输大小，它是分块传输（chunked），这时候就要根据chunked编码来判断，chunked编码的数据在最后有一个空chunked块，表明本次传输数据结束，HTTP头部使用Transfer-Encoding: chunked来代替Content-Length。

## Http keep-alive仍然存在的问题

在HTTP1.1中是默认开启了Keep-Alive，它解决了多次连接的问题，但是依然有两个效率上的问题：

1. 串行的文件传输。当请求a文件时，b文件只能等待，等待a连接到服务器、服务器处理文件、服务器返回文件，这三个步骤。我们假设这三步用时都是1秒，那么a文件用时为3秒，b文件传输完成用时为6秒，依此类推。（注：此项计算有一个前提条件，就是浏览器和服务器是单通道传输）
2. 连接数过多。我们假设Apache设置了最大并发数为300，因为浏览器限制，浏览器发起的最大请求数为6，也就是服务器能承载的最高并发为50，当第51个人访问时，就需要等待前面某个请求处理完成。

因此http2.0采用了多路复用的方案。这里又引出了http2.0，原理也是http2.0引入的二进制数据帧和流的概念。

---
参考文章：  
《[HTTP首部Connection实践](https://www.jianshu.com/p/eba76cfc0424)》