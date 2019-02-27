# Http Connection


## HTTP长连接的数据传输完成识别

HTTP首部定义Connection: keep-alive后，客户端、服务端怎么知道本次传输结束呢？两部分：

静态页面通过Content-Length提前告知对方数据传输大小，具体可以参考拙作HTTP Content-Length深入实践。
动态页面不能通过Content-Length提前告知对方数据传输大小，它是分块传输（chunked），这时候就要根据chunked编码来判断，chunked编码的数据在最后有一个空chunked块，表明本次传输数据结束，HTTP头部使用Transfer-Encoding: chunked来代替Content-Length。

---
参考文章：  
《[HTTP首部Connection实践](https://www.jianshu.com/p/eba76cfc0424)》