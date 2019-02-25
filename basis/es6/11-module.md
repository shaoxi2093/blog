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

### export

export命令用于规定模块的对外接口，有以下注意点：  

1. export命令规定的是对外的接口，必须与模块内部的变量建立一一对应关系
2. export语句输出的接口，与其对应的值是动态绑定关系，即通过该接口，可以取到模块内部实时的值
3. export命令可以出现在模块的任何位置，只要处于模块顶层就可以。如果处于块级作用域内，就会报错

export有以下两种写法，它俩是等价的：  

```js
// 第一种
export var abc = 1
export function func(){

}

// 第二种
var abc = 1
var func = function(){

}
export { abc, func }
```

#### export default

疑问：`import _ from 'lodash'`，这种写法不是常规的`import {xx} from xxx`。  
这是因为使用了`export default`，`export default`命令用于指定模块的默认输出。显然，一个模块只能有一个默认输出，因此`export default`命令只能使用一次。所以，import命令后面才不用加大括号，因为只可能唯一对应export default命令。

#### export from

`export from`可以直接将引入的模块，以export输出。*可以用来实现模块继承*。但是它的原理不是先引入进环境，再输出，因此无法在当前模块环境下使用模块方法。例如：  

```js
export {x} from 'moduleX'
export var abc = 1

var xcopy = x //报错，无法访问到x
```

### import

import命令用于输入其他模块提供的功能，有以下特点和注意点：  

1. import命令输入的变量都是只读的，因为它的本质是输入接口。引入对象的属性可以修改，但是不建议这么做
2. import命令具有提升效果，会提升到整个模块的头部，首先执行
3. import是静态执行，所以不能使用表达式和变量，这些只有在运行时才能得到结果的语法结构
4. import语句会执行所加载的模块，多次重复执行同一句import语句，那么只会执行一次

