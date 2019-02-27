# css遇到的问题

## margin塌陷

描述： 当父节点A包裹着子节点B，且AB均有`margin-top`属性时，只会有一个值大的生效，小的`margin-top`重叠。  
解决： 在重合元素外包裹一层容器，并触发该容器生成一个BFC。

```html
<div style="margin-top: 20px;" class="parent">
  <div>
    <div style="margin-top: 10px;" class="child">
      <!-- balabala -->
    </div>
  </div>
</div>
```

## 使用rem时，部分手机出现字体和图片会变形或被切割

描述： 使用rem对字体和图片设置大小时，文字会出现奇数值字号，图片会被切割一小块（底部）。  
解决： 文字尽量使用px做单位，图片可以采用iconfont，或者图片切图时外边缘留适量小的透明区域。  

主要是，因为rem计算后产生的小数位，不同浏览器对小数位处理（四舍五入+填充）逻辑，最后生成不同的渲染结果导致的。