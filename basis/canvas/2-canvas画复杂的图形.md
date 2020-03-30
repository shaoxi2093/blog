# canvas画复杂的图形

## 圆形
使用canvas画圆形，`ctx.arc()`方法：
1. `ctx.beginPath()`新开始一个路径
2. `ctx.moveTo(x, y)`将笔头移到圆上
3. `ctx.arc(x, y, radius, startAngle, endAngle, anticlockwise)`: 画一个以（x,y）为圆心的以radius为半径的圆弧（圆），从startAngle开始到endAngle结束，按照anticlockwise给定的方向（默认为顺时针, bool）来生成。
4. `ctx.arcTo(x1, y1, x2, y2, radius)`: 根据给定的控制点和半径画一段圆弧，再以直线连接两个控制点
5. `ctx.stroke()`画线

> arc()函数中表示角的单位是弧度，不是角度。角度与弧度的js表达式: 弧度=(Math.PI/180)*角度。

## 椭圆

椭圆的画法，有几种：

1. canvas自带的方法`ellipse(x, y, radiusX, radiusY, rotation, startAngle, endAngle, anticlockwise)`绘制

2. 利用`arc()`方法画圆，然后用`scale`，以下贴一段demo代码
  
  ```js  
  var canvas = document.getElementById("canvas");
  canvas.width = 600;
  canvas.height = 600;
  var ctx = canvas.getContext("2d");
  ctx.lineWidth = 10;
  drawEllipseWithArcAndScale(ctx, 110, 250, 100, 30, 'orange'); //椭圆

  function drawEllipseWithArcAndScale(ctx, cx, cy, rx, ry, style) {
    ctx.save(); // save state
    ctx.beginPath();
    ctx.translate(cx-rx, cy-ry);
    ctx.scale(rx, ry);
    ctx.arc(1, 1, 1, 0, 2 * Math.PI, false);
    ctx.restore(); // restore to original state
    ctx.save();
    if(style)
      ctx.strokeStyle=style;
    ctx.stroke();
    ctx.restore();
  }
  ```

  这个方法其实是有问题的，1是无法准确的绘制指定的椭圆，2是scale压缩会把压缩地方的线绘制的更粗

3. 使用Bezier曲线绘制

  ```js  
  drawEllipseWithBezier(ctx, 10, 10, 200, 60, 'blue');
  function drawEllipseWithBezier(ctx, x, y, w, h, style) {
    var kappa = .5522848,
        ox = (w / 2) * kappa,
        oy = (h / 2) * kappa,
        xe = x + w,
        ye = y + h,
        xm = x + w / 2,
        ym = y + h / 2;

    ctx.save();
    ctx.beginPath();
    ctx.moveTo(x, ym);
    ctx.bezierCurveTo(x, ym - oy, xm - ox, y, xm, y);
    ctx.bezierCurveTo(xm + ox, y, xe, ym - oy, xe, ym);
    ctx.bezierCurveTo(xe, ym + oy, xm + ox, ye, xm, ye);
    ctx.bezierCurveTo(xm - ox, ye, x, ym + oy, x, ym);
    if(style)
      ctx.strokeStyle=style;
    ctx.stroke();
    ctx.restore();
  }
  ```

  或者另一种，根据中心点去绘制贝塞尔曲线。

  ```js  
  drawEllipseWithBezierByCenter(ctx, 110, 110, 200, 60, '#0099ff');
  function drawEllipseWithBezierByCenter(ctx, cx, cy, w, h, style) {
    drawEllipseWithBezier(ctx, cx - w/2.0, cy - h/2.0, w, h, style);
  }
  ```

4. 使用`ctx.quadraticCurveTo()`

  > 补充`quadraticCurveTo`写法：开始点：moveTo(`20,20`) 控制点：quadraticCurveTo(`20,100`,200,20) 结束点：quadraticCurveTo(20,100,`200,20`)

---
参考文档：
[绘制椭圆代码jsbin](http://jsbin.com/ovuret/722/edit?html,output)

## 多边形

多边形，其实都只是直线的连接。只要计算好每个点的坐标，就能够绘制出来。

## 其他

如❤️形等。使用贝塞尔曲线绘制吧。  
![其他图形](https://github.com/shaoxi2093/blog/blob/master/assets/canvas-other-shapes.png?raw=true)

```js
ctx.beginPath()
ctx.moveTo(280, 140)
ctx.bezierCurveTo(260, 120, 260, 150, 280, 170)
ctx.bezierCurveTo(300, 150, 300, 120, 280, 140)
ctx.stroke()
```
