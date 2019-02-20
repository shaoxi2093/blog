# cluster
cluster（集群）主要是针对`child_process`（子进程）的一个利用和封装。实现node应用的多实例化，充分利用多核cpu。
> 单个 Node.js 实例运行在单个线程中。 为了充分利用多核系统，有时需要启用一组 Node.js 进程去处理负载任务。
cluster 模块可以创建共享服务器端口的子进程。 --nodejs文档

## 实际应用  
利用cluster构建一个多实例的node服务器应用，来避免单个实例出现未捕获的异常时，整个服务崩溃的问题。同时cluster内部实现了负载均衡，解决了应用在高并发请求时的处理能力。常见的应用是，pm2管理node应用。  
使用cluster后node应用的特点：  
1. node多实例
2. 多实例可以共用同一端口 
3. 负载均衡

## 原理  
### 多实例
cluster是在master进程上，利用了 `child_process.fork`来创建工作进程。同时，给工作进程分配一个唯一的`NODE_UNIQUE_ID`，而cluster也是通过它来[判断是主进程还是工作进程的](https://github.com/nodejs/node/blob/master/lib/cluster.js)。
```
const childOrMaster = 'NODE_UNIQUE_ID' in process.env ? 'child' : 'master';
```


```
// lib/cluster.js
// ...
const fork = require('child_process').fork

function createWorkerProcess(id, env) {
  // ...
  workerEnv.NODE_UNIQUE_ID = '' + id;

  // ...
  return fork(cluster.settings.exec, cluster.settings.args, {
    env: workerEnv,
    silent: cluster.settings.silent,
    execArgv: execArgv,
    gid: cluster.settings.gid,
    uid: cluster.settings.uid
  });
}
```

### 共用端口
其实并不是共用端口，只有主进程才监听端口，其他工作进程都不是主动监听端口，而是主进程将请求再分发给工作进程处理，显示出“共用端口”的假象。  
主要操作有以下几步：  
1. 创建master进程
2. 根据master进程创建工作进程，并分配唯一ID
3. 工作进程创建成功后，向master注册当前工作进程worker
4. master进程创建TCP服务器，建立与工作进程之间的IPC通信网络`RoundRobinHandle`
5. master进程和工作进程都开始准备创建服务器端口监听
6. 通过`cluster.isMaster`区分master和工作进程，master正常初始化监听端口，工作进程不监听


### 负载均衡  
知道了工作进程不监听端口，以及master和工作进程之间存在通信网，这两点后，可以想象到，当master接受到请求后，会通过通信网络分发给旗下工作进程处理，处理完成后再通过通信网返回结果，然后由master通过端口通信传递出去。那么负载均衡的位置就很明显，是在master收到请求后，如何处理选择发给哪个工作进程了。    

> cluster模块支持两种连接分发模式（将新连接安排给某一工作进程处理）。  
第一种方法（也是除Windows外所有平台的默认方法），是循环法。由主进程负责监听端口，接收新连接后再将连接循环分发给工作进程。在分发中使用了一些内置技巧防止工作进程任务过载。  
第二种方法是，主进程创建监听socket后发送给感兴趣的工作进程，由工作进程负责直接接收连接。  --Nodejs 中文网-cluster  

这里只总结第一种循环法RoundRobinHandle。  
Cluster模块的做法是，监听该内部TCP服务器的connection事件，在监听器函数里，有负载均衡地挑选出一个worker，向其发送newconn内部消息（消息体对象中包含cmd: 'NODE_CLUSTER'属性）以及一个客户端句柄（即connection事件处理函数的第二个参数），相关代码如下：  
```
// lib/cluster.js
// ...

function RoundRobinHandle(key, address, port, addressType, backlog, fd) {
  // ...
  this.server = net.createServer(assert.fail);
  // ...

  var self = this;
  this.server.once('listening', function() {
    // ...
    self.handle.onconnection = self.distribute.bind(self);
  });
}

RoundRobinHandle.prototype.distribute = function(err, handle) {
  this.handles.push(handle);
  var worker = this.free.shift();
  if (worker) this.handoff(worker);
};

RoundRobinHandle.prototype.handoff = function(worker) {
  // ...
  var message = { act: 'newconn', key: this.key };
  var self = this;
  sendHelper(worker.process, message, handle, function(reply) {
    // ...
  });
};
```  

Worker进程通过监听`internalMessage`，当接收到了newconn消息后，根据传递过来的句柄，调用实际的业务逻辑处理并返回：  
```
// lib/cluster.js
// ...

// 该方法会在Node.js初始化时由 src/node.js 调用
cluster._setupWorker = function() {
  // ...
  process.on('internalMessage', internal(worker, onmessage));

  // ...
  function onmessage(message, handle) {
    if (message.act === 'newconn')
      onconnection(message, handle);
    // ...
  }
};

function onconnection(message, handle) {
  // ...
  var accepted = server !== undefined;
  // ...
  if (accepted) server.onconnection(0, handle);
}
```


---
参考文章：  
《[Nodejs 中文网-cluster](http://nodejs.cn/api/cluster.html)》  
《[cluster 模块的主要功能实现](https://cnodejs.org/topic/56e84480833b7c8a0492e20c)》