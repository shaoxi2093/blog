---
author: 勺夕
date: 2018-11-10 12:59:48
title: Http SSL/TLS验证过程   
tags:  
  - web
  - 浏览器
  - http
  - https
---
# Https SSL/TLS验证过程

验证过程：  
1. 浏览器先发送随机数A和支持的加密方式给服务器
2. 服务器收到了A，自己也生成一个随机数B，和自己选择的加密方式X、证书一起发给浏览器
3. 浏览器收到了B、加密方式A和证书（证书中有公钥，用来非对称加密）
    - 对证书进行验证是否正规机构颁布，是否认可
    - 生成随机数C，并使用公钥和加密方式X对C进行加密得到CX，并发送给服务端
    - 使用A、B、C通过++计算++(下面会解释)得到之后一直用到的堆成加密密钥==Key==
    - `change_cipher_spec`告知服务器，之后的消息要用Key加密了
    - `encrypted_handshake_message`，结合之前所有通信参数的 hash 值与其它相关信息生成一段数据，采用协商密钥 session secret 与算法进行加密xxxWithKey，然后发送给服务器用于数据与握手验证
4. 服务器先后收到公钥加密的CX，用私钥解密得到C，此时拥有ABC的服务器使用同样的计算方式计算得到和浏览器相同的==Key==，解密xxxWithKey后，发送完成握手验证。

> `alter message` 用于指明在握手或通信过程中的状态改变或错误信息，一般告警信息触发条件是连接关闭，收到不合法的信息，信息解密失败，用户取消操作等，收到告警信息之后，通信会被断开或者由接收方决定是否断开连接。

> C(Pre-master) 结合 A(random client) 和 B(random server) 两个随机数通过 PseudoRandomFunction(PRF)计算得到 Key(Master secret)

## 会话缓存握手过程

为了加快建立握手的速度，减少协议带来的性能降低和资源消耗(具体分析在后文)，TLS 协议有两类会话缓存机制：会话标识 session ID 与会话记录 session ticket。
- session ID 由服务器端支持，协议中的标准字段，因此基本所有服务器都支持，服务器端保存会话ID以及协商的通信信息，Nginx 中1M 内存约可以保存4000个 session ID 机器相关信息，占用服务器资源较多;
- session ticket 需要服务器和客户端都支持，属于一个扩展字段，支持范围约60%(无可靠统计与来源)，将协商的通信信息加密之后发送给客户端保存，密钥只有服务器知道，占用服务器资源很少。

二者对比，主要是保存协商信息的位置与方式不同，类似与 http 中的 session 与 cookie。  
二者都存在的情况下，(nginx 实现)优先使用 session_ticket。




---
参考文章：  
《[https 验证过程](https://blog.csdn.net/hherima/article/details/52469674)》