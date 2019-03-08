---
author: 勺夕
date: 2018-05-23 09:35:04
title: Javascript面向对象   
tags:  
  - web
  - 浏览器
  - javascript
  - 前端
---
# Javascript面向对象

## 类的声明
1. 工厂模式
```js
function createPerson(name, age, job){
    var obj = new Object()
    obj.name = name
    obj.age = age
    obj.job = job
    obj.sayName = function(){
        console.log(obj.name)
    }
    return obj
}

var zhangsan = createPerson('zhangsan',26,'worker')
var lisi = createPerson('lisi',22,'doctor')
```
2. 构造器模式
```js
function Person(name, age, job){
    this.name = name
    this.age = age
    this.job = job
    this.sayName = function(){
        console.log(this.name)
    }
}

var zhangsan = new Person('zhangsan',26,'worker')
var lisi = new Person('lisi',22,'doctor')
```

`new`关键字的作用：  
- 新建一个对象
- 把this赋值给这个新对象
- 执行构造函数里的代码
- 返回这个新对象

缺点：  
- 每次创建时，方法如`sayName`都会创建一个新的匿名函数，占用内存，实际可以公用

3. 原型模式
```js
function Person(){
    
}
Person.prototype.name = 'initName'
Person.prototype.age = 'initAge'
Person.prototype.job = 'initJob'
Person.prototype.sayName = function (){
    console.log(this.name)
}

var zhangsan = new Person()
zhangsan.name = 'zhangsan'
zhangsan.age = 26
zhangsan.job = 'worker'
zhangsan.sayName()
```

缺点：  
- 属性如果是引用类型则无法隔离独立，例如新增一个`friends`属性，有三个好友，当新建的某一个实例对friends进行修改，则会引起所有实例的`friends`变动。

4. 组合模式
将私有属性进行构造函数模式，共享属性方法通过原型模式声明。
```js
function Person(name, age, job){
    this.name = name
    this.age = age
    this.job = job
}
Person.prototype.sayName = function (){
    console.log(this.name)
}

var zhangsan = new Person('zhangsan',26,'worker')
var lisi = new Person('lisi',22,'doctor')

zhangsan.sayName()
lisi.sayName()
```

5. ES6的`class`
```
class Person {
    constructor(name, age, job){
        this.name = name
        this.age = age
        this.job = job
    }
    sayName(){
        console.log(this.name)
    }
}

var zhangsan = new Person('zhangsan',26,'worker')
zhangsan.sayName()
```

## 继承
1. 原型链模式
```js
function Parents(fa,mo){
    this.father = fa
    this.mother = mo
}
function Children(name){
    this.name = name
}
Children.prototype = new Parents()
var chi = new Children('gang')
chi instanceof Children //true
chi instanceof Parents //true
```
缺点： 无法带参数初始化继承的内部属性。

2. 利用构造函数继承
```js
function Parents(fa,mo){
    this.father = fa
    this.mother = mo
}
Parents.prototype.callDad = function(){
    console.log(this.father)
}
function Children(fa,mo,name){
    Parents.call(this,fa || 'papa', mo || 'mama')
    this.name = name
}

var chi = new Children('die','niang','bao')
chi instanceof Children //true
chi instanceof Parents //false
chi.father //爹
```
缺点：无法识别继承自Parents.prototype的方法

3. 组合继承
```
function Parents(fa,mo){
    this.father = fa
    this.mother = mo
}
Parents.prototype.callDad = function(){
    console.log(this.father)
}
function Children(fa,mo,name){
    Parents.call(this,fa || 'papa', mo || 'mama')
    this.name = name
}
Children.prototype = new Parents()
var chi = new Children('die','niang','bao')
chi instanceof Children //true
chi instanceof Parents //true
chi.father //爹
chi.callDad()
```

虽然很完美，但是仍有缺点:  
有两次执行超类方法： `Parents.call`、`Children.prototype = new Parents()`，浪费资源，选择最后一种寄生组合继承

4. 寄生继承
5. 寄生组合继承
```
function initExtends(Ch,Pa){
    Ch.prototype = Object.create(Pa.prototype) //继承方法只是复制，不执行
    Ch.prototype.constructor = Ch //让ch回归ch
}
function Parents(fa,mo){
    this.father = fa
    this.mother = mo
}
Parents.prototype.callDad = function(){
    console.log(this.father)
}
function Children(fa,mo,name){
    Parents.call(this,fa || 'papa', mo || 'mama')
    this.name = name
}
// Children.prototype = new Parents() //改写这里
initExtends(Children, Parents)
var chi = new Children('die','niang','bao')
chi instanceof Children //true
chi instanceof Parents //true
chi.father //爹
chi.callDad()
```

6. ES6继承
```js
class Parents {
    
}
class Children extends Parents{
    constructor(){
        super()
    }
}
```

## ES6与ES5

这里我们利用下babel官方的转化工具来做前后对比。[转化点击这里](https://www.babeljs.cn/repl/#?babili=false&browsers=&build=&builtIns=false&code_lz=MYGwhgzhAEAKYCcCmA7ALjA3gKAL7dEhgGEALASxABNkVokAPNVKmeWjaHaaYAexQQ0CAK7A0fBAAoADgj4yIASm49oEETKTS5C5dh75cQA&debug=false&forceAllTransforms=false&shippedProposals=false&circleciRepo=&evaluate=true&fileSize=false&lineWrap=false&presets=latest%2Creact%2Cstage-2&prettier=true&targets=&version=6.26.0&envVersion=)  

### ES6

```js
class Parents {
}
class Children extends Parents {
  constructor(props){
    super(props)
  }
}
```

### 转化后ES5

```js
"use strict";

function _possibleConstructorReturn(self, call) {
  if (!self) {
    throw new ReferenceError(
      "this hasn't been initialised - super() hasn't been called"
    );
  }
  return call && (typeof call === "object" || typeof call === "function")
    ? call
    : self;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError(
      "Super expression must either be null or a function, not " +
        typeof superClass
    );
  }
  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });  // 相当于上面的ES5中寄生组合模式的Ch.prototype = Object.create(Pa.prototype) Object.create新建一个对象来隔离引用类型
  if (superClass)
    Object.setPrototypeOf
      ? Object.setPrototypeOf(subClass, superClass)
      : (subClass.__proto__ = superClass);  
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

var Parents = function Parents() {
  _classCallCheck(this, Parents);
};

var Children = (function(_Parents) {
  _inherits(Children, _Parents);

  function Children(props) {
    _classCallCheck(this, Children);

    return _possibleConstructorReturn(
      this,
      (Children.__proto__ || Object.getPrototypeOf(Children)).call(this, props)
    );
  }

  return Children;
})(Parents);
```