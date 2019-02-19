# Linux常用命令
随笔。  
这里只记录Linux常用命令，和一些node服务器牵扯到的一些功能和使用方法记录，并不是操作系统原理。23333～  
如果今后有对系统层的blog总结，那么，它将会出现在`others/`下的某个角落。  

## 根据查看日志命令的拆解
查看日志算是程序猿们常见操作了。大概就是下面这样：
```Shell
~ rm -rf /
```

哦，不对，掏错了，这是删文件跑路的。  

==是下面这个==，`/xxx`是你log文件所在的目录  
```Shell
~ cd /xxx
~ tail -f xxx.log
~ tail -30 xxx.log | grep '需要查关键字'
```
主要用到的有3个命令，`cd`、`tail`和`grep`
### cd
跳转到路径，后面可接相对路径和绝对路径。

### tail
tail [ -f ] [ -c Number | -n Number | -m Number | -b Number | -k Number ] [ File ]
参数解释：
-f 该参数用于监视File文件增长。
-c Number 从 Number 字节位置读取指定文件
-n Number 从 Number 行位置读取指定文件。
-m Number 从 Number 多字节字符位置读取指定文件，比方你的文件假设包括中文字，假设指定-c参数，可能导致截断，但使用-m则会避免该问题。
-b Number 从 Number 表示的512字节块位置读取指定文件。
-k Number 从 Number 表示的1KB块位置读取指定文件。
上述命令中，都涉及到number，假设不指定，默认显示10行。Number前面可使用正负号，表示该偏移从顶部还是从尾部開始计算。
tail可运行文件一般在/usr/bin/以下。

### grep
grep命令是一种强大的文本搜索工具，它能使用正则表达式搜索文本，并匹配行打印出来。
grep [-abcDEFGHhIiJLlmnOoqRSsUVvwxZ] [-A num] [-B num] [-C[num]]
[-e pattern] [-f file] [--binary-files=value] [--color=when]
[--context[=num]] [--directories=action] [--label] [--line-buffered]
[--null] [pattern] [file ...]  
参数解释：
-c：计算匹配到的行数，并显示结果；
-C 2：显示匹配行，并显示之前与之后的两行，也就是一共显示5行；
-A 2：显示匹配行，并显示之后的两行；
-v：显示不包含匹配行的所有行；
-color：显示匹配内容，并用不同颜色突出显示；  


## 遇到的其他命令

### service
如```service nginx start```

### ls
如`ls`、`ll`等

### vi
如`vi`、`vim`等

