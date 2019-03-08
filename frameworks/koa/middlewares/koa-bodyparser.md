---
author: 勺夕
date: 2018-07-08 06:41:13
title: koa-bodyparser   
tags:  
  - node
  - koa
  - web
  - middlewares
---

# koa-bodyparser

koa-bodyparser是用来对请求数据进行解析的中间件，最终返回到`context.request`中大致流程入下。

## 获取二进制数据流
1. koa-bodyparser主要是对co-body 的封装
2. co-body中主要是采用raw-body 模块获取请求报文主体的二进制数据流
3. raw-body模块通过node的http模块进行数据获取。

## 内容解码
根据请求报文投Content-Encoding来进行数据解码，也可以服务器返回Accept-Encoding响应头中告知支持的解压方式。  
inflation模块解码。

## 字符解码
主要是utf-8这些字符编码，对数据进行编码解码过程，得到字符串详情。

## 字符串解析  
字符串的二种编码方式，它们对应的Content-Type分别为：

- URL编码 application/x-www-form-urlencoded
- JSON编码 application/json
- multipart/form-data，通过form表单提交的数据， 数据被编码为一条消息，页上的每个控件对应消息中的一个部分。
- text/plain， 数据以纯文本形式(text/json/xml/html)进行编码，其中不含任何控件或格式字符。postman软件里标的是RAW。