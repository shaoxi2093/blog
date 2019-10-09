

宽高的获取有以下几种方案：
- `window.innerWidth`和`window.innerHeight`： IE9+
- `offsetWidth`和`offsetHeight`：这两个属性返回的是元素的高度或宽度，包括元素的边框、内边距和滚动条。返回值是一个经过四舍五入的整数
- `clientHeight`和`clientWidth`：包括padding，但不包括border, margin和滚动条
- `scrollHeight`和`scrollWidth`：返回元素内容的整体尺寸，包括元素看不见的部分（需要滚动才能看见的）。返回值包括padding，但不包括margin和border

补充个网上看到的图：  
![left-right-width-height](https://github.com/shaoxi2093/blog/blob/master/assets/lrtb.png?raw=true)

#### 窗体的宽高
`window.innerWidth`, `window.innerHeight`：只读。视口（viewport）的尺寸，包含滚动条。

备选方案：  
`document.documentElement.clientHeight`；

