# vue

## 双向绑定
简单来说就是通过数据劫持+观察者模式实现的。  
1. 数据劫持+观察者模式（发布订阅模式），Object.defineProperty，劫持get和set。  
2. 对所有get进行引用维护，然后当set时，modify通知，watcher 去应用更新。