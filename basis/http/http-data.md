# Http data

这里的data想说的是http的请求内容实体。

请求头和实体消息之间有一个CRLF分隔，响应头部和响应实体之间用一个CRLF分隔。  
一般来说（分隔符类别）：
```
CRLF->Windows-style
LF->Unix Style
CR->Mac Style
```