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
  ctx.strokeStyle="black";
  EvenCompEllipse(ctx, 130, 200, 100, 20); //椭圆

  function EvenCompEllipse(ctx, x, y, a, b){
    ctx.save();
    //选择a、b中的较大者作为arc方法的半径参数
    var r = (a > b) ? a : b; 
    var ratioX = a / r; //横轴缩放比率
    var ratioY = b / r; //纵轴缩放比率
    ctx.scale(ratioX, ratioY); //进行缩放（均匀压缩）
    ctx.beginPath();
    //从椭圆的左端点开始逆时针绘制
    ctx.moveTo((x + a) / ratioX, y / ratioY);
    ctx.arc(x / ratioX, y / ratioY, r, 0, 2 * Math.PI);
    ctx.closePath();
    ctx.stroke();
    ctx.restore();
  };
  ```
  这个方法其实是有问题的，1是无法准确的绘制指定的椭圆，2是scale压缩会把压缩地方的线绘制的更粗
3. 使用Bezier曲线绘制