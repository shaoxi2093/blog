# Dom diff

在学习dom diff之前，首先了解下dom diff的背景，和具体是为了解决什么事情。  
背景：前端页面因【用户交互】【接口数据获取展示】【数据变更】等前提下，需要动态的变更页面上的内容，这也是动态页面的最初特点。  

会产生变更的场景：  

- dom的属性或者内容更新（update）。
- dom元素类型发生变化(insert)。
- dom元素的位置发生变化，或者新增(insert)，后者删除(remove)。

动态页面，页面变更经历了几个历史：  

1. dom操作、jquery
2. template插入
3. mvvm双向绑定 如angular1开始

动态更新页面还需要解决的问题：  

1. 大量的dom操作性能问题
2. 针对指定dom更新的开发繁琐性
3. 无法进行增量更新或者变更点更新

方案：需要对比页面中需要更新的部分，肯定不能是真实dom对比，因此必须要有能直接对比的js对象————`virtual dom`，这才是react的核心，整个react框架的设计理念，都是围绕`virtual dom`进行的。

## react 3种组件类型

### ReactTextComponent
### ReactNativeComponent
### ReactCompositeComponent

## diff三个核心

1. `tree diff`是按照树的层级进行比较。也就是说，如果遇到跨层级移动时，diff是不认的，会当作新组件进行加载。  
  如下图所示：  
  ![react-tree-diff](https://github.com/shaoxi2093/blog/blob/master/assets/react-tree-diff.png?raw=true)
2. `component diff`首先判断组件的类型，如上所说的三种类型，如果不同，则直接新加载，如果相同会继续对比这个组件是否前后相同。也就是说，如果A组件和D组件下都是有BC子组件结构，diff算法也是不认的，直接新加载
3. `element diff`当有list类型，或者直接说使用同一组件生成的兄弟组件实例，react本身是无法进行简单判断前后是否一致，因此会继续遍历下去，这时候如果给所有兄弟组件都加上`key`，对框架而言就是能区分的了，提高了diff 效率
