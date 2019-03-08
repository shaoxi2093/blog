---
author: 勺夕
date: 2018-11-28 14:51:11
title: Sentinel和Cluster   
tags:  
  - web
  - redis
  - javascript
  - 前端
---
# Sentinel和Cluster

Redis是一个单线程的，可基于内存亦可持久化的日志型、Key-Value数据库。一旦崩溃了，重启带来的数据丢失和服务不可用都是一种巨大的伤害。因此会有一些高可用（high availability）解决方案。  

- Redis单副本
- Redis多副本-主从模式（master-slave）
- Redis Sentinel哨兵模式
- Redis Cluster分布式集群模式
- 其他

node模块`ioredis`就是支持这里的sentinel和cluster，可以通过配置它的连接，来实现。

## Redis Sentinel

Redis Sentinel哨兵模式，其实就是通过创建Sentinel是独立的进程，而且具有和Master同样的数据和能力，并且定时监控redis的运行情况，一旦发现Master宕机了，会主动从Sentinels中选出一个，切换成Master继续提供服务。

## Redis Cluster

当出现redis所提供的服务不够使用的情况下，一般会采用纵向扩展和横向扩展两种解决方式，纵向扩展如内存配置从原来的2G扩展到4G，但是这种受制于硬件严重，无论如何内存也无法扩展到机器支持的最大内存。因此会有横向扩展，多连接几个服务器启动redis，这就是集群模式扩展。至于集群模式是如何实现数据共享、同步、备份这些，需要继续学习了解。