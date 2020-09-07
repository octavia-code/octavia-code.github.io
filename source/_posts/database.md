---
title: 常用SQL总结
date: 2020-09-04 15:14:47
categories:
- 技术相关
- 数据库
---


##  SQL注入
如何防止SQL注入攻击？<br>
使用PrepareStatement取代Statement可以有效防止SQL注入<br>
 ![PrepareStatement截图](http://note.youdao.com/yws/res/856/WEBRESOURCE66b4f3d5774e5af2aca9414e94f9288c)  
原因：使用占位符？先确定sql语句格式，再通过用户输入替代掉占位符，可以有效降低用户对sql语句的操作程度，同时setString方法在处理用户输入的时候会自动将用户输入值用单引号包裹
当用户手动添加单引号时，该方法会将单引号转义

 ![PrepareStatement截图](http://note.youdao.com/yws/res/867/WEBRESOURCEcc210820d5fa2903cfe9ca7ee4216ed2)  
显然这样的sql语句是无法执行的<br>

当用户手动添加不需单引号的额外条件时会被包裹在单引号中
![PrepareStatement截图](http://note.youdao.com/yws/res/873/WEBRESOURCEb474737e27fb176f994ab4f9d74f4351)
这样的语句也是无法执行的，所以PrepareStatement的安全性要远大于Statement，我们应当使用PrepareStatement
有关Mybatis防止SQL注入的方式大致与上文所述相同，区别在与#与$，详情参见
[mybatis是如何防止SQL注入的](https://blog.csdn.net/bwh0520/article/details/80102040)
[在java中"#"与"$"的区别](https://blog.csdn.net/zps925458125/article/details/100550711)
