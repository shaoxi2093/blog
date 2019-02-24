# Module

Module模块，js在之前版本一直没有官方支持的模块引入和管理方案，使得我们在最初的时间段里，通常把模块对象挂在全局对象下，供其他js使用。  
再之后出现了commonjs规范（node端）和AMD(requirejs)、CMD(seajs)规范（浏览器）。  
终于在ES6时，出现了Module模块支持。  

## AMD和CMD

AMD对应requirejs预执行，CMD对应seajs懒执行, 目前用的都比较少了，只是了解下。

区别参考这里： 《[RequireJS 的异同](https://github.com/seajs/seajs/issues/277)》《[SeaJS与RequireJS最大的区别](https://www.douban.com/note/283566440/)》

## commonjs

commonjs有以下几个特点：  

- 一个文件就是一个模块，拥有单独的作用域；
- 普通方式定义的变量、函数、对象都属于该模块内；
- 通过require来加载模块；
- 通过exports和modul.exports来暴露模块中的内容；

```js
// CommonJS模块
let { stat, exists, readFile } = require('fs');

// 等同于
let _fs = require('fs');
let stat = _fs.stat;
let exists = _fs.exists;
let readfile = _fs.readfile;
```

## ES6 Module

ES6 模块的设计思想是尽量的静态化，使得编译时就能确定模块的依赖关系，以及输入和输出的变量。ES6 模块不是对象，而是通过export命令显式指定输出的代码，再通过import命令输入。  

```js
// ES6模块
import { stat, exists, readFile } from 'fs';
```