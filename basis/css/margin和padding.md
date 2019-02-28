# margin和padding

`margin`和`padding`我一直以为很熟了，只要了解盒子模型就以为知道了全部，直到有一次被问到了行内元素和margin、padding一起使用，会是什么样情况时，震惊了。  

## padding-in-span

[这里有我写的一个demo](https://github.com/shaoxi2093/blogTests/blob/master/css/grid/padding-margin/test1.html)。即使不看代码，我下面有截图:  

![padding-in-span](https://github.com/shaoxi2093/blogImgs/blob/master/github/margin-padding-in-span.png?raw=true)

代码结构大概是这样的：  
```html
<div>
  <span style="padding-top: 20px">内容1</span>
</div>
<div>
  <span style="padding-bottom: 20px">内容2</span>
</div>
<div>
  <span style="padding-left: 20px">内容3</span>
</div>
<div>
  <span style="padding-right: 60px">内容4</span>
</div>
```  

可是最终展示的和我预想中的差距实在是太大了。  
1. `padding-left`、`padding-right`还算是能和预想中差别不是太远的，但是只在内容的最开始和结束行生效，因为span它并不是块
2. `padding-top`如果是只有一行内容时，不添加背景色，几乎看不出来和没有加`padding-top`有什么区别，但是确实是生效了的
3. `padding-top`出现两行时，第二行的`padding-top`会直接覆盖在第一行内容上，可以参考下图，将`padding-top`值调小后的场景。![padding-in-span2](https://github.com/shaoxi2093/blogImgs/blob/master/github/margin-padding-in-span2.png?raw=true)
4. `padding-bottom`感觉还算比较像块元素的`padding-bottom`，原本以为，如果加了第二行后，会像`padding-top`一样覆盖下一行的内容，结果并不是，只是总的`padding-bottom`会间断一下，如图![padding-in-span3](https://github.com/shaoxi2093/blogImgs/blob/master/github/margin-padding-in-span3.png?raw=true)

总之，这简直就是个潘多拉魔盒啊，查阅下资料先。。  

w3cschool上有这么一句话：行内非替换元素上设置的内边距不会影响行高计算；因此，如果一个元素既有内边距又有背景，从视觉上看可能会延伸到其他行，有可能还会与其他内容重叠。元素的背景会延伸穿过内边距。