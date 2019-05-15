# Canvas

Canvas内容太多，自己一直对这块深入不够，前端还是在用元素拼页面的程度😂。所以打算花一个月时间把canvas这块，从浅入深完整学习一下。

## 目标

能够利用canvas处理常规的需求，
1. 使用canvas对现成的图片处理，如压缩、重叠涂层、滤镜等
2. 使用canvas绘制常规图形图案
3. 利用canvas将图形处理一定的动画效果
4. 利用canvas完成图案和人机之间的交互效果
5. webgl 3d的一些基础绘制
6. webgl 3d的一些库入门，如threejs

## Tips

在使用ide开发过程中，canvas会没有自动填充和智能提示，开发很是艰难，原因也能理解：  

```js
var canvas = document.getElementById('my-canvas')
var ctx = canvas.getContext('2d')
```

像这样的初始化canvas context，首先是`document.getElementById('xxx')`这个返回的是个DomNode对象，编译器无法确定是canvas，因此也无法进行后续提示。

因此可以添加如下一行类型注释，编程软件就知道你在开发啥了： 

```js
/** @type {HTMLCanvasElement} */
var canvas = document.getElementById('my-canvas')
var ctx = canvas.getContext('2d')
```