---
author: 勺夕
date: 2018-07-29 16:24:34
title: em和rem    
tags:  
  - web
  - 浏览器
  - css
  - 前端
---
# em和rem

rem用过，个人主要用来对移动端web自适应来使用的。em暂时还没用过，也了解学习了下。  

## em

当使用em单位时，像素值将是em值乘以使用em单位的元素的字体大小。很多情况下，本身没有定义字体大小的节点，其字体大小都是从父节点上继承下来的，因此需要找到它最后真实的字体大小值来计算。

例如：  

```css
.item1 {
  font-size: 18px;
  width: 10em;  /** 18*10 = 180px **/
  height: 2em;  /** 18*2 = 36px **/
}
```  

## rem

rem是根据根节点的字体大小去计算，根元素字体大小乘以 rem 值。  
使用rem的场景，移动端自适应，通常是结合js计算出比例，然后将算出的字体大小基数放置html节点样式中去。如flexible.js，大致js计算方式是：  

- 字体大小基数 = 设备的真实宽度/设计宽度rem值  
- 设计宽度px = 设计宽度rem值 * 倍率  
 
因此当使用rem时，能根据基数相乘得到最终的真实像素宽度。  

```html
<html style="font-size: 18px;">
  <!-- balabala -->
  <div style="width: 10rem;height: 2rem;">
    <!-- width: 18*10 = 180px; height: 18*2 = 36px -->
  </div>
</html>
```  

> 页面中元素内的字体大小，不建议使用rem，因为当使用rem计算出真实值后，会出现21px，19px这种值，导致字体难看。  

---
移动端自适应，最新方案是viewport，可以参考这里《[如何在Vue项目中使用vw实现移动端适配](https://www.w3cplus.com/mobile/vw-layout-in-vue.html)》，大概是这样的原理：  
postcss-px-to-viewport插件主要用来把px单位转换为vw、vh、vmin或者vmax这样的视窗单位，也是vw适配方案的核心插件之一。目前出视觉设计稿，我们都是使用750px宽度的，那么100vw = 750px，即1vw = 7.5px。那么我们可以根据设计图上的px值直接转换成对应的vw值。