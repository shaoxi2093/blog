# pm2
缘起，当初我还只是个单纯的切图仔，有活时就写写页面，觉得前端只要页面好看就行了。后来入坑买了个个人入门服务器搭个人博客，发现直接node启动时，当xshell关闭时，博客网站就挂了，当时也一脸懵逼，但是还是很机智的分析了问题，node执行时在当前xshell窗口下起的，起完之后还有实时log打印。就觉得当前进程是不是跟着这个会话绑一起的，就搜到了pm2。。  

## 作用
pm2的作用，主要有以下几点：  
1. 持久化，在遇到崩溃等异常情况时，通过pm2管理的应用能得到重启
2. 进程管理，应用被守护进程，例如，在后台持续运行
3. 日志管理，对应用启动时，启动后，突发异常情况，重启应用的日志
4. 零配置负载均衡器，cluster模式，通过创建多个共享相同服务器端口的子进程来扩展您的应用。这样您可以在停机时间为零的情况下重启（是`reload`不是`restart`）您的应用
5. 终端监控，在终端中监控您的应用以检查您的应用运行状况（CPU使用情况，内存使用，请求/分钟以及更多）
6. 使用ssh部署，（通过配置文件）自动完成部署，不需一对一的ssh服务器连接。  

## 原理
主要是两块内容的总结，持久化和进程管理。  
### 持久化
主要是通过Satan模块来实时监控应用异常状态，再通过God保护神来重启应用。步骤大致如下：  
1. Client启动关联Daemon
2. Daemon有start，stop，close，kill进程的方法，与God的事件发射器(EventEmitter)关联
3. Satan 定时检查当前daemon状态，pingDaemon，如果关闭则通知God
4. God进行应用重启  

---
对于pm2的两种模式fork和cluster，，区别：==这里我理解的也不太清除，仅供参考==  
- fork模式支持php、python等等，只会生成单个实例，由应用内部实现多进程   
- cluster模式只支持node，采用的是nodejs的`cluster`构建master进程和其他工作进程集群，master和工作进程之间支持的IPC通信（工作进程由child_process.fork()方法创建，因此它们可以使用IPC和父进程通信，从而使各进程交替处理连接服务。），==公用一个端口==，开启多个实例  

> The cluster mode allows networked Node.js applications (http(s)/tcp/udp server) to be scaled accross all CPUs available, without any code modifications. This greatly increases the performance and reliability of your applications, depending on the number of CPUs available. Under the hood, this uses the Node.js cluster module such that the scaled application’s child processes can automatically share server ports.  --pm2官网文档

其他的解释，还有[这里](https://stackoverflow.com/questions/34682035/cluster-and-fork-mode-difference-in-pm2)的解释:
![区别](https://github.com/shaoxi2093/blogImgs/blob/master/github/pm2-fork-cluster.png?raw=true)

> cluster公用一个端口，其实并不完全是，如下：  
cluster模块支持两种连接分发模式（将新连接安排给某一工作进程处理）。  
第一种方法（也是除Windows外所有平台的默认方法），是循环法[round-robin](https://en.wikipedia.org/wiki/Round-robin_scheduling)。由主进程负责监听端口，接收新连接后再将连接循环分发给工作进程。在分发中使用了一些内置技巧防止工作进程任务过载。  
第二种方法是，主进程创建监听socket后发送给感兴趣的工作进程，由工作进程负责直接接收连接。



### 进程管理
利用的是守护进程deamon原理。

---
以下是最常用的创建守护进程的命令（并不是说pm2也是按照这个方法来实现deamon）。
```
~ nohup node app.js &
```
1. 使用`nohup`将当前执行的node 进程与session剥离开
2. 使用`&`将当前执行的node 进程放置后台运行



## 对外接口



----
参考文章：  
《[Linux 守护进程的启动方法](http://www.ruanyifeng.com/blog/2016/02/linux-daemon.html)》
《[浅谈pm2基本工作原理](https://my.oschina.net/todosomeone/blog/783991)》