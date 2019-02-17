# react-router
react 本身只是处理UI的框架，并不关心location。因此需要一个处理location和components之间关系的存在。  

## 浏览器和URL
想要获取和更改URL，先问问浏览器。  

### hash
### history  
history是H5的接口，允许我们操作浏览器会话历史记录。history提供了一些属性和方法，主要包括：
属性：

history.length：返回值为会话历史中有多少条记录，包含当前的会话页面。
history.state：保存了触发popState事件的方法所传递的属性对象。
方法：

History.back(): 返回浏览器会话历史中的上一页，跟浏览器的回退按钮功能相同
History.forward():指向浏览器会话历史中的下一页，跟浏览器的前进按钮相同。
History.go(): 可以跳转到浏览器会话历史中的指定的某一个记录页。
History.pushState():pushState可以将给定的数据压入到浏览器会话历史栈中，该方法接收3个参数，对象，title和一串url。pushState后会改变当前页面url，但是不会伴随着刷新。
History.replaceState():replaceState将当前的会话页面的url替换成指定的数据，replaceState后也会改变当前页面的url，但是也不会刷新页面。

## react-router的封装
1. 获取和变更URL的方法封装  
2. 对`<Router />`组件封装，用来对URL-state-components的控制
3. 对`<Link />`组件的封装，用来对components-state-URL的控制    

核心当然还是第一点。封装组件和更改state数据，最后调用更改url接口这些相比之下还是可以达到的。  
- createBrowserHistory: 利用HTML5里面的history
- createHashHistory: 通过hash来存储在不同状态下的history信息
- createMemoryHistory: 在内存中进行历史记录的存储

### react-router基于history进行封装。
history是一个第三方js库，借鉴HTML5 history对象的理念，在其基础上又扩展了一些功能，用来管理历史记录，可以兼容不同的浏览器和不同的环境，根据不同的环境提供了三种不同的API。

- HashHistory：针对老版本的浏览器，主要通过Hash实现。
- BrowserHistory：针对较高版本的浏览器，主要通过H5的History实现。
- MemoryHistory：主要通过内存中的历史记录实现。

```
// 原生history对象
const history = {
    length,         // 属性，history中记录的state的数量
    state,          // 属性，pushState和replaceState时传入的对象
    back,           // 方法，后退
    forward,        // 方法，前进
    go,             // 方法，前进或后退n个记录
    pushState,      // 方法，导航到新的路由，并记录在history中
    replaceState    // 方法，替换掉当前记录在history中的路由信息
}

// 订阅history变更事件
window.onpopstate = function (event) {
    ...
}
```  
