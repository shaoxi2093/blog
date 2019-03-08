---
author: 勺夕
date: 2018-10-29 17:09:47
title: ajax   
tags:  
  - web
  - 浏览器
  - ajax
---
# ajax
jquery是我学习前端最早接触到的框架，最早接触ajax不是原生而是jquery。jquery一代神话，无论是其选择器系统，简洁易懂的事件绑定，dom操作，还是$.ajax、$.each、$.params、$.extend等等方法的使用，甚至大多数情况下我们都无需考虑兼容性（框架本身已经对此做的很好了），确实把我“养”的越来越“懒”。

--------------------
## jquery的$.ajax(options)

首先，我们先来学着用js写一个$.ajax，如下：

```
// 封装一个ajax
$.fn.bjax = function(options){
    var xhr = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject('Microsoft XMLHTTP');
    xhr.open(options.type || 'post' , options.url , options.async || true );   
    if(options.contentType){
        xhr.setRequestHeader('Content-Type',options.contentType);
    }
    if(options.dataType){
        xhr.setRequestHeader('accept',options.dataType);
    }
    xhr.onreadystatechange = function(){
        if(xhr.readyState == 4){
            if(xhr.status == 200){
                options.success(xhr.responseText);
            }
        }
    }
    xhr.send(options.data || "");           //发送请求
}
```

此时，ajax的基本操作，我们就已经具备了，当然其中还有很多细节方面没有完全实现，例如对于服务器返回的各种状态的操作，以及兼容性细节。

现在我们来分析下其原理。
其步骤主要分为五步：



> - 1.创建xhr对象xmlhttprequest

  

创建xhr对象首先需要判断浏览器底层提供的是哪种方法。IE7以上，其他内核主流浏览器使用的是XMLHttpRequest，而IE6及之前版本使用的是ActiveXObject，而且对应的有多个版本，主要涉及三代Microsoft.XMLHTTP、Msxml2.XMLHTTP、Msxml3.XMLHTTP。因此考虑到所有兼容性的创建方式应该如下：
```
    var xhr;
    if(window.XMLHttpRequest){
        xhr = window.XMLHttpRequest();
    }else {
        var versIE = ['Microsoft.XMLHTTP','Msxml2.XMLHTTP','Msxml3.XMLHTTP'];
        for(var i = 0; i < versIE.length; i++){
            try {
                xhr = new ActiveXObject(versIE[i]);
            }catch(e) {
                continue;
            }
        }
    }
```

> - 2.xhr.open设置请求的基本参数

   
   
```open(method, url, async, username, password)```，经常使用的还是前三个参数，```xhr.open(string,string,boolean)```，第一个参数传递请求方式'GET/POST'，当然http请求还有其他类型，如PUT、HEAD、DELETE、CONNECT、TRACE、OPTIONS，但是主要使用到的还是GET/POST，第二个参数为请求地址url，第三个参数为是否异步   true异步/false同步 。

> - 3.xhr.setRequestHeader()，设置请求头各个参数   

```setRequestHeader(name, value)```，向一个已经打开但并未发送的xhr设置请求头信息或添加一个http请求，可以设置请求头有很多，例如：
```
xhr.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
//这就是我们常见的$.ajax中contentType:'application/json;charset=UTF-8'底层。
xhr.setRequestHeader('Content-length',paramsSend.length); //get请求中设置无效，因为get请求的内容是直接写在url后的。
xhr.setRequestHeader('accept','json');  //设置接收数据类型
```
当然，请求头中我们能看到许多其他参数，例如connection、keep-alive等等，但是，很多参数是无法使用setRequestHeader来设置的，而是由xhr自动设置以保证符合http协议，如下：
- Host
- Connection
- Keep-Alive
- Accept-charset
- Accept-Encoding
- If-Modified-Since
- If-None-Match
- If-Range
- Range

> - 4.xhr.onreadystatechange = callback ,设置请求中各个阶段的处理方法   

这里要涉及的内容，有两个状态属性和四种返回数据，状态属性xhr.readyState和xhr.status，返回数据responseText和responseXML和responseBody和responseStream。
xhr.readyState有5个状态，0~4。  

- 0，对象已建立，但未初始化，未调用open
- 1，初始化，但为调用send
- 2，发送数据，但是没有xhr.status和http返回头信息
- 3，接收数据，此时接收数据不完整
- 4，完成，此时可以通过xhr.status判断状态及对返回数据进行操作  

xhr.status，具有的状态较多100~500段，列举如下：  

  - 100 Continue 初始的请求已经接受，客户应当继续发送请求的其余部分
  - 101 Switching Protocols 服务器将遵从客户的请求转换到另外一种协议
  - 200 OK 一切正常，对GET和POST请求的应答文档跟在后面。
  - 201 Created 服务器已经创建了文档，Location头给出了它的URL。
  - 202 Accepted 已经接受请求，但处理尚未完成。
  - 203 Non-Authoritative Information 文档已经正常地返回，但一些应答头可能不正确，因为使用的是文档的拷贝
  - 204 No Content 没有新文档，浏览器应该继续显示原来的文档。如果用户定期地刷新页面，而Servlet可以确定用户文档足够新，这个状态代码是很有用的
  - 205 Reset Content 没有新的内容，但浏览器应该重置它所显示的内容。用来强制浏览器清除表单输入内容
  - 206 Partial Content 客户发送了一个带有Range头的GET请求，服务器完成了它
  - 300 Multiple Choices 客户请求的文档可以在多个位置找到，这些位置已经在返回的文档内列出。如果服务器要提出优先选择，则应该在Location应答头指明。
  - 301 Moved Permanently 客户请求的文档在其他地方，新的URL在Location头中给出，浏览器应该自动地访问新的URL。
  - 302 Found 类似于301，但新的URL应该被视为临时性的替代，而不是永久性的。
  - 303 See Other 类似于301/302，不同之处在于，如果原来的请求是POST，Location头指定的重定向目标文档应该通过GET提取
  - 304 Not Modified 客户端有缓冲的文档并发出了一个条件性的请求（一般是提供If-Modified-Since头表示客户只想比指定日期更新的文档）。服务器告诉客户，原来缓冲的文档还可以继续使用。
  - 305 Use Proxy 客户请求的文档应该通过Location头所指明的代理服务器提取
  - 307 Temporary Redirect 和302（Found）相同。许多浏览器会错误地响应302应答进行重定向，即使原来的请求是POST，即使它实际上只能在POST请求的应答是303时才能重定向。由于这个原因，HTTP 1.1新增了307，以便更加清除地区分几个状态代码：当出现303应答时，浏览器可以跟随重定向的GET和POST请求；如果是307应答，则浏览器只能跟随对GET请求的重定向。
  - 400 Bad Request 请求出现语法错误。
  - 401 Unauthorized 客户试图未经授权访问受密码保护的页面。应答中会包含一个WWW-Authenticate头，浏览器据此显示用户名字/密码对话框，然后在填写合适的Authorization头后再次发出请求。
  - 403 Forbidden 资源不可用。
  - 404 Not Found 无法找到指定位置的资源
  - 405 Method Not Allowed 请求方法（GET、POST、HEAD、Delete、PUT、TRACE等）对指定的资源不适用。
  - 406 Not Acceptable 指定的资源已经找到，但它的MIME类型和客户在Accpet头中所指定的不兼容
  - 407 Proxy Authentication Required 类似于401，表示客户必须先经过代理服务器的授权。
  - 408 Request Timeout 在服务器许可的等待时间内，客户一直没有发出任何请求。客户可以在以后重复同一请求。
  - 409 Conflict 通常和PUT请求有关。由于请求和资源的当前状态相冲突，因此请求不能成功。
  - 410 Gone 所请求的文档已经不再可用，而且服务器不知道应该重定向到哪一个地址。它和404的不同在于，返回407表示文档永久地离开了指定的位置，而404表示由于未知的原因文档不可用。
  - 411 Length Required 服务器不能处理请求，除非客户发送一个Content-Length头
  - 412 Precondition Failed 请求头中指定的一些前提条件失败
  - 413 Request Entity Too Large 目标文档的大小超过服务器当前愿意处理的大小。如果服务器认为自己能够稍后再处理该请求，则应该提供一个Retry-After头
  - 414 Request URI Too Long URI太长
  - 416 Requested Range Not Satisfiable 服务器不能满足客户在请求中指定的Range头
  - 500 Internal Server Error 服务器遇到了意料不到的情况，不能完成客户的请求
  - 501 Not Implemented 服务器不支持实现请求所需要的功能。例如，客户发出了一个服务器不支持的PUT请求
  - 502 Bad Gateway 服务器作为网关或者代理时，为了完成请求访问下一个服务器，但该服务器返回了非法的应答
  - 503 Service Unavailable 服务器由于维护或者负载过重未能应答。例如，Servlet可能在数据库连接池已满的情况下返回503。服务器返回503时可以提供一个Retry-After头
  - 504 Gateway Timeout 由作为代理或网关的服务器使用，表示不能及时地从远程服务器获得应答
  - 505 HTTP Version Not Supported 服务器不支持请求中所指明的HTTP版本
其中常见的有200，400，403，404，405，502，503，504。

四种返回数据：
  - ResponseText 返回数据为字符性文本数据，数据源为任何文本性数据。 
  - ResponseXML 返回数据为DOM对象，可以用JS通过DOM进行加工控制的，单源数据必须是XML。 
  - ResponseBody 返回某一格式的服务器返回数据
  - ResponseStream 以Ado Stream对象形式返回响应信息

> - 5.xhr.send()，发送请求  

```send(body)```，如果通过调用 open() 指定的 HTTP 方法是 POST 或 PUT，body 参数指定了请求体，作为一个字符串或者 Document 对象。如果请求体不适必须的话，这个参数就为 null。这就是我们常用jquery中$.ajax的参数对象属性data:data。当调用send方法之后，readyState就会被赋值为2，同时触发readystatechange。

**简单来说，步骤1~4为准备工作，5为最终的发送。**  

---
> **补充**  

$.ajax()在发送请求时会添加一个下划线_参数，具体含义是：  
使用缓存会在请求中加上下划线的参数，jQuery默认开启缓存，设置cache为 false将在 HEAD和GET请求中正常工作。  
它的工作原理是在GET请求参数中附加"_={timestamp}"（译者注：时间戳）。   
该参数不是其他请求所必须的，除了在IE8中，当一个POST请求一个已经用GET请求过的URL。