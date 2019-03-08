---
author: 勺夕
date: 2018-10-06 21:26:17
title: js数据类型与内置对象   
tags:  
  - web
  - js object
  - javascript
  - 前端
---
# js数据类型与内置对象

## js数据类型
总共有五种基本数据类型String、Number、Boolean、Undefined、Object(Function也是)，ES6中新增了Symbol。

五种基本类型可以用typeof来进行区别判断。但是有几个特殊的列举一下：  
1. `typeof null === 'object'`
2. `typeof NaN === 'number'`
3. `typeof f === 'function'`
```
var add = function(a,b) {
  return a+b;
}
typeof add === 'function' //true
```

> `typeof null === 'object'`原理是这样的，不同的对象在底层都表示为二进制，在Javascript中二进制前三位都为0的话会被判断为Object类型，null的二进制表示全为0，自然前三位也是0，所以执行typeof时会返回"object"。 --《你不知道的Javascript》


对于object类与继承关系，可以通过`instanceof` 来分辨。例如：  
```
add instanceof Function //true
```

## js内置对象  
js内置对象有Null、Number、Boolean、String、Object、Function、Array、RegExp、Error、Date、Math、Json、Global、Arguments。

---
参考书籍：《JavaScript语言精髓与编程实践》《你不知道的Javascript》