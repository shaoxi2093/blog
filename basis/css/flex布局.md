# flex布局
传统的页面布局排版主要依靠的是盒子模型，依赖 `display` 属性 + `position`属性 + `float`属性。对一些特殊排版，不太好实现，如垂直居中。  

## flex css写法
1. 对**容器**表示flex
```
display: flex;
display: inline-flex;
```
> 注意，设为 Flex 布局以后，子元素的float、clear和vertical-align属性将失效。

2. 对**容器**内部布局属性控制  
```
flex-direction: row | row-reverse | column | column-reverse;  //决定主轴的方向（即项目的排列方向）
flex-wrap: nowrap | wrap | wrap-reverse;  //换行规则
flex-flow: <flex-direction> || <flex-wrap>; //flex-direction属性和flex-wrap属性的简写形式，默认值为row nowrap
justify-content: flex-start | flex-end | center | space-between | space-around;  //项目在主轴上的对齐方式
align-items: flex-start | flex-end | center | baseline | stretch;  //项目在交叉轴上如何对齐
align-content: flex-start | flex-end | center | space-between | space-around | stretch; //定义了多根轴线的对齐方式。如果项目只有一根轴线，该属性不起作用
```

3. 对内部**项目**的属性控制
```
order: <integer>;  // 项目的排列顺序
flex-grow: <number>;  //项目的放大比例，默认为0
flex-shrink: <number>;  //项目的缩小比例，默认为1
flex-basis: <length> | auto;  //在分配多余空间之前，项目占据的主轴空间（main size）。
flex: none | [ <'flex-grow'> <'flex-shrink'>? || <'flex-basis'> ];  //是flex-grow, flex-shrink 和 flex-basis的简写，默认值为0 1 auto。后两个属性可选。
align-self: auto | flex-start | flex-end | center | baseline | stretch;  //允许单个项目有与其他项目不一样的对齐方式，可覆盖align-items属性。默认值为auto，表示继承父元素的align-items属性，如果没有父元素，则等同于stretch。
```


----
参考文章：《[flex布局-阮一峰](http://www.ruanyifeng.com/blog/2015/07/flex-grammar.html)》