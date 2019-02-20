# Nginx
Nginx我目前知道的作用有，反向代理、负载均衡功能，资源gzip压缩等等。  
先挖个坑，今后补充详细。

## 反向代理
```
server {
  listen 80;
  server_name www.example.com;

  location / {
    proxy_pass 127.0.0.1:3000;  # 开启的服务器监听端口

    # ...
  }
}
```
## 负载均衡
```
upstream tomcat_server {
  server 192.168.100.10:8080 weight=20;
  server 192.168.100.10:8081 weight=20;  //不同端口

  server 192.168.100.11:8080 weight=20;  //不同服务器
}
server {
  listen 80;
  server_name www.example.com;

  location / {
    proxy_pass http://tomcat_server;

    # ...
  }
}
```
## gzip