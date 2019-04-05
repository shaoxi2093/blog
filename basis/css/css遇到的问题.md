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

## iphonex 全面屏适应

描述： 使用iphonex之后之前的h5页面会出现占据时间栏和下方home区域的问题。

解决： 苹果公司提供了css `constant()`方法，但是必须是在`viewport-fit:cover`时生效。
```js
constant(safe-area-inset-top) //从视口顶部的安全区域插入量(以CSS像素为单位)。
constant(safe-area-inset-bottom) //从视口底部的安全区域插入量(以CSS像素为单位)。
constant(safe-area-inset-left //从视口左侧的安全区域插入量(以CSS像素为单位)。
constant(safe-area-inset-right) // 从视口右侧的安全区域插入量(以CSS像素为单位)。
```

## 上下拉动滚动条时卡顿、慢

描述：ios设备下，当块是`overflow`为auto或者scroll时，滑动会卡顿。
解决：  
```css
body {
 -webkit-overflow-scrolling: touch;
 overflow-scrolling: touch;
}
```

## 移动端滑动谈框层时，底层也会滑动

描述： 移动端滑动谈框层时，底层也会滑动。
解决： 模仿bootstrap框架一样，当将要弹出弹框层时，给html增加属性，固定且`overflow: hidden`。

## ios**分享**到桌面，icon

描述：ios**分享**到桌面，自定义icon
解决：  
```html
<link rel="apple-touch-icon" href="touch-icon-iphone.png" />
<link rel="apple-touch-icon" sizes="76x76" href="touch-icon-ipad.png" />
<link rel="apple-touch-icon" sizes="120x120" href="touch-icon-iphone-retina.png" />
<link rel="apple-touch-icon" sizes="152x152" href="touch-icon-ipad-retina.png" />
```