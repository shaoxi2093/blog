# canvas的2d变换

2d图形变换常常结合定时绘图，可以实现一些比较简单的动画效果，毕竟是封装好的变换方法。但是综合使用下，也能够实现一些较为复杂的效果。常用的变换方法主要有三个：  
1. 平移变换 `translate(x,y)`
2. 旋转角度变换 `rotate(deg)`
3. 缩放 `scale(sx,sy)`

## 平移
canvas提供了一个平移的基础方法`translate(dx,dy)`，用于将当前的绘制原点进行平行偏移。这里的dx、dy是基于当前的原点位置的偏移。PS.如果当前已经使用过一次平移，再次使用时，是基于当前已偏移的原点，进行二次偏移。如：
```js
ctx.translate(100, 100)
ctx.translate(100, 100) //此时的xy位置都是基于200， 200的xy值
```

因此，在使用完平移后，建议将原点恢复到0，0，否则定位计算将会变的很乱。。
恢复的方法有两种：
1. 使用负偏移，还原到原点，之前平移了多少，这次就返回多少
2. 使用`ctx.save()`,`ctx.restore()`方法来还原

```js
var canvas = document.getElementById("my-canvas")
var ctx = canvas.getContext("2d")

ctx.save()
ctx.fillStyle = "#f00"
ctx.translate(100,100)
ctx.fillRect(100,100,200,100)
ctx.restore() //还原之前保存的坐标原点

ctx.save()
ctx.fillStyle = "#ddd"
ctx.translate(200,200)
ctx.fillRect(100,100,200,100)
ctx.restore()
```

## 旋转
旋转`rotate(deg)`参数是弧度，和`arc()`里的最后两个参数一样。从纵轴即y轴向上顺时针旋转，注意的是这里的旋转中心点是原点，即坐标（0, 0）。如果想要在你希望的地方作为旋转中心的话，要结合上面说的平移`translate()`平移原点，然后旋转。同时要注意的是，这里也有上面平移同样的⚠️注意点，原点平移后，记得还原。
> deg = 2 * Math.PI / 360 * 角度，之前也有说过，2π就是360度。

如下，写一个简单的旋转动画。
```js
var canvas = document.getElementById("my-canvas")
var ctx = canvas.getContext("2d")

ctx.save()
ctx.fillStyle = "#f00"
ctx.translate(100,100)
ctx.fillRect(100,100,100,100)
ctx.restore()

ctx.save()
ctx.translate(150, 150)
ctx.rotate(0.5 * Math.PI)
ctx.restore()

ctx.save()
ctx.fillStyle = "#ddd"
ctx.translate(300,100)
ctx.fillRect(100,200,200,100)
ctx.restore()

var ani = setInterval((function(){
  var deg = 0
  return function() {
    if(deg < Math.PI){
      ctx.save()
      ctx.translate(500, 350)
      ctx.clearRect(-200, -200, 400, 400)
      ctx.rotate(deg)
      ctx.fillStyle = "#ddd"
      ctx.fillRect(-100,-50,200,100)
      deg += 2 * Math.PI / 360 * 5
      ctx.restore()
    } else {
      ani && clearInterval(ani)
    }
  }
})(), 20)
```

## 缩放
缩放变换`scale(scalewidth,scaleheight)`，其中scalewidth、scaleheight分别是【缩放当前绘图的宽度】 和 【缩放当前绘图的高度】的倍数值。
第一次使用起来，觉得有点奇怪。对绘图进行缩放，1. 所有之后的绘图也会被缩放 2.定位也会被缩放 3. 感觉线的粗细这些值也被缩放了

```js
var canvas=document.getElementById("my-canvas")
var ctx=canvas.getContext("2d")

ctx.strokeRect(5,5,25,15)
ctx.scale(2,2)
ctx.strokeRect(5,5,25,15)
```

## transform
写css动画效果时，经常会用到这个`transform: translate/rotate/scale...`，学习canvas时，会发现都是相似的。canvas也提供了一个`transform`方法。

```js
/**
 * @param a 水平缩放绘图
 * @param b 水平倾斜绘图
 * @param c 垂直倾斜绘图
 * @param d 垂直缩放绘图
 * @param e 水平移动绘图
 * @param f 垂直移动绘图
 * 
 */
ctx.transform(a,b,c,d,e,f)
```

就api来看的话，translate平移对应的参数应该是`e和f`，rotate对应的是`b和c`，scale对应的是`a和d`。且注意，`transform`也会基于之前变换后绘图的基础上来进行变换的。

同时，canvas还提供了另一个方法，`setTransform()`它时不会基于之前绘图2d变换的基础上变换的
