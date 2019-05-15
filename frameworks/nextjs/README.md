# Nextjs

加入新坑，nextjs。

## 概览

nextjs是基于React的SSR轻量级框架。  
基于目前初步入坑的一些特点总结：  
1. `getInitialProps`很关键的钩子，用来在所有动作（服务器端页面结构初始化等）之前的一些前期动作
2. nextjs 会根据`/pages`路径下的文件，进行解析得到在不同路由path访问后注入到App里的`Component`
3. nextjs内部集成了webpack的一些相关基础功能，即你不需要编写`webpack.config`

## 源码目录

之后会一点点阅读nextjs的源码，用来更加深入的理解nextjs和ssr。