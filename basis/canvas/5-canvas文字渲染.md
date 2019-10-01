# canvas文字渲染

对于封装好的渲染功能，(这里想指的是那些不是由计算好定位然后绘制图案的操作，而是由canvas本身提供好的绘制功能。比如这里的文字，文字是自己输入的，而不是自己计算好位置，一横一竖的画出来的功能。)，很多都可以和其他的地方进行类比，比如html渲染（包括css的样式控制）  
可以类比想象到，如果canvas要实现文字渲染功能，肯定需要支持文字的**字体、字号大小、文字颜色、粗细、行高等等**基本属性配置，初次之外如果像ps那种**立体字、阴影等**也有可能会在canvas中支持。  
通过学习后，发现确实和其他的渲染有很大的相似性。  

通过配置文字属性后，通过`ctx.fillText`、`ctx.strokeText`来编写文字。

## 文字基本配置

`ctx.font`用于配置文字的绝大多数支持配置的属性，如默认值`ctx.font='10px sans-serif'`就是字体大小和文字的字体等，即css中的`font-size`和`font-family`属性。  
通过文档来看，是和css中的font支持的是一样的。```ctx.font = 'a b c d e f g h i j k'```

按照顺序来说，照着文档来写就行，其实一般情况也用不上那么多。前五个比较常用且常见： 

字母 | 含义 | 备注
---|---|---  
a | font-style | 规定字体样式normal 可以为normal、italic、oblique 
b | font-variant | 规定字体变体
c | font-weight | 规定字体的粗细，同css
d | font-size / line-height | 规定字号和行高，像素
e | font-family | 规定字体系列 

可以通过`@font-family`加载字体来使用。

### 文字对齐

canvas的文字对齐配置有垂直和水平对齐配置。  

1. 水平对齐，```ctx.textAlign="center|end|left|right|start"```
2. 垂直对齐，```ctx.textBaseline="alphabetic|top|hanging|middle|ideographic|bottom"```


