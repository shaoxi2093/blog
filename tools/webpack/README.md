# webpack
webpack作为现在最常用的打包工具，已经上升到了前端必备基础技能之一了，都怀疑是不是应该放到basis分类下去。  

## 干什么的  
用来打包的。

## 基本原理
webpack是我们通过loaders、plugins来将入口文件及其所有依赖关系文件打包成合并文件的工具。  

### loader和plugin
loader 用于加载某些资源文件。 因为webpack 本身只能打包commonjs规范的js文件，对于其他资源例如 css，图片，或者其他的语法集，比如 jsx， coffee，是没有办法加载的。 这就需要对应的loader将资源转化，加载进来。从字面意思也能看出，loader是用于加载的，它作用于一个个文件上。

plugin 是一个具有 apply 属性的 JavaScript 对象。apply 属性会被 webpack compiler 调用，并且 compiler 对象可在整个编译生命周期访问。主要用于解决 loader 无法实现的其他事。

### 尝试
打包后的js结构，为一个自执行函数，结构大概如下：
```
(function(modules){
    /* ... */
    function __webpack_require__(moduleId) {
        // 是否加载过
        // ...
        // 未加载过从入参 modules中找
        modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
        return module.exports
    }
    return __webpack_require__(__webpack_require__.s = 0); // 默认入口文件
})(
    [
        /* 0 默认入口文件*/
        function(module, __webpack_exports__, __webpack_require__) {
            // ... your code
        },
        /* 1 */
        function(module, __webpack_exports__, __webpack_require__) {
            // ... your code
        },
        // ...
    ]
)
```

可以看出以下几个关键点：
1. 我们写的模块，都被各个封装在了个function中，保证了变量的作用域
2. 不同模块，最后通过moduleId（根据引入顺序，0是入口文件，12345...）来相互引用，引用后，返回的是一个对象，module.export
3. 自执行函数的最终返回是，入口文件的执行，执行完成后，没有export ，返回`{}`