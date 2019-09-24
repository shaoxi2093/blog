# canvas色彩

## 填充色彩
`ctx.fillStyle`赋值颜色：
1. 支持常见颜色名称，如`red`、`black`、`gray`等等
2. 支持十六进制色彩字符串，如：`#ffffff`白色等
3. `rgba()`、`rgb()`方法
4. `hsla()`、`hsl()`色相、饱和度、明度三个通道，来配置颜色

## 渐变色
### 线性渐变
canvas本身提供了`createLinearGradient`的方法来，实现线性渐变，创建渐变-渐变色-应用
```js
var grad = ctx.createLinearGradient(xstart,ystart,xend,yend);
grad.addColorStop(stop,color);  //color参考上面填充色彩

ctx.fillStyle = grad
ctx.strokeStyle = grad
```

### 径向渐变
canvas本身提供了`createRadialGradient`的方法，来实现径向渐变，步骤同线性渐变。
```js
var grad = ctx.createRadialGradient(x0,y0,r0,x1,y1,r1);
grad.addColorStop(stop,color);  //color参考上面填充色彩

ctx.fillStyle = grad
ctx.strokeStyle = grad
```