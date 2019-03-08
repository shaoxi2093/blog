---
author: 勺夕
date: 2018-08-17 08:27:15
title: vue 
tags:  
  - web
  - vue
  - javascript
  - 前端
---
# vue

## 双向绑定
简单来说就是通过数据劫持+观察者模式实现的。  
1. 数据劫持+观察者模式（发布订阅模式），Object.defineProperty，劫持get和set。  
2. 对所有get进行引用维护，然后当set时，modify通知，watcher 去应用更新。

---
数据劫持还有其他两种实现方式：  
1. proxy - vue3.0据说将会使用它来实现双向
2. object.observe - 已废弃，凉透
3. object.defineProperty - 目前vue使用的