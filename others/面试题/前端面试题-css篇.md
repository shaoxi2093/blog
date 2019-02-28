# 前端面试题-css篇

## 盒子模型介绍一下

---
延伸问题如下：  
### css怎么控制使用那种模型？
### 默认是w3c标准，有用到过IE标准吗？那么什么场景下适合用IE模型？
### 盒子模型对行内元素适用吗？比如`<a>`设置padding、margin后，可点击区域的大小。

## position有哪些取值和具体内容

---
延伸问题如下：  

### `position:absolute`后`z-index`的例子，如下，问题C、D谁会覆盖谁？

```html
<style>
.A {
  width: 500px;height: 500px;border: 1px solid #ccc;
}
.C {
  width: 300px;height: 100%;left: 0;top: 0;background-color:green;
}

.B {
  width: 500px; height: 500px; border: 1px solid #ccc; margin-top: 10px; z-index: 2;
}
.D {
  left: 0;top: -60px;height: 100%;width: 200px;background-color: red;
}
</style>
<!-- ... -->
<div style="position: relative;" class="A">
  <div style="position: absolute;z-index: 100;" class="B"></div>
</div>
<div style="position: relative;" class="C">
  <div style="position: absolute;z-index: 101;" class="D"></div>
</div>
```

## display的取值和具体含义

---
延伸问题如下：  

### display: inline-block的每个item都会有个间隔是怎么回事，怎么修复？

## 水平垂直居中的相关实现方式

---
延伸问题如下：  

### `translate(-50%,-50%)`能保证不超过父元素吗？不能的话，有什么方法能保证不超过父元素？