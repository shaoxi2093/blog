# React hooks

之前，react就有class component和 function component，function component用于那些不需要复杂状态处理的纯函数组件，所有变化都是通过props传递来改变，真正做到了和函数一样，而class component主要负责处理一些需要处理复杂状态的组件。
但是class component在大型项目中，有很多地方都不尽如人意，例如：
1. 复杂的this关系，class
2. 逻辑复用性差，主要通过render props 或者 高阶组件HOC 来解决，但是又引入了嵌套地狱wrapper hell
3. 令人头痛的生命周期、重复性的生命周期操作
   
