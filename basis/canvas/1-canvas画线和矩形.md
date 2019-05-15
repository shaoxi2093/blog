# canvas画线和矩形

HTML中的元素canvas只支持一种原生的图形绘制：矩形。
跟着MDN教程一步一脚印。

先看一个例子，[更多例子](https://github.com/shaoxi2093/blogTests/tree/master/canvas)（持续更新）：  
![canvas-lines](https://github.com/shaoxi2093/blog/blob/master/assets/canvas-line.png?raw=true)

## canvas画线

使用canvas画线，会用到`ctx.stroke()`。步骤一般会经历这些：

1. `ctx.beginPath()`新开始一个路径
2. `ctx.moveTo(x, y)`将笔头移到某个起点
3. 想象绘制过程，如绘制直线`ctx.lineTo(x, y)`、绘制圆弧`ctx.arc(x, y, r, start, end, anticlockwise)`、绘制贝塞尔曲线`ctx.quadraticCurveTo`和`ctx.bezierCurveTo`。
4. `ctx.stroke()`

其他还有些方法，如设置线条颜色`ctx.strokeStyle = 'rgba(x,x,x,a)'`，`ctx.closePath`首尾闭合，`ctx.fill()`默认会先闭合，再填充闭合区域等等方法。

这里踩过的注意点坑是：

1. 笔触不想连起来的话，记得下一次画之前使用`ctx.moveTo()`
2. 如果想两次绘制的线样式不同，需要先`ctx.beginPath()`重制一下

### 设置线的样式

线有什么样式好设置的？仔细想想也有不少，比如线的：粗细、颜色、类型（点、虚线、实线等）等。需要注意的是，这些属性都是【赋值】所以都是【属性=值】这种写法，而不是调用方法（除了类型）。这些canvas都有涉及提供：  

1. 粗细，`ctx.lineWidth`
2. 颜色，`ctx.strokeStyle`
3. 类型，`ctx.setLineDash()`

## 绘制矩形

和svg不一样，HTML中的元素canvas只支持一种原生的图形绘制：矩形。如果需要绘制其他形状，可以自己用线绘制，连接。

方法：  

1. `ctx.strokeRect(x, y, width, height)`绘制矩形的框子
2. `ctx.fillRect(x, y, width, height)`绘制实心的矩形