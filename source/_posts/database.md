---
title: 常用SQL总结
date: 2020-09-04 15:14:47
categories:
- Octavia之技术文档
- 数据库
---

##  SQL注入
如何防止SQL注入攻击？<br>
使用PrepareStatement取代Statement可以有效防止SQL注入<br>
 ![PrepareStatement截图](http://note.youdao.com/yws/res/856/WEBRESOURCE66b4f3d5774e5af2aca9414e94f9288c)  
原因：使用占位符'？'先确定sql语句格式，再通过用户输入替代掉占位符，可以有效降低用户对sql语句的侵入程度，同时setString方法在处理用户输入的时候会自动将用户输入值用单引号包裹
当用户手动添加单引号时，该方法会将单引号转义

 ![PrepareStatement截图](http://note.youdao.com/yws/res/867/WEBRESOURCEcc210820d5fa2903cfe9ca7ee4216ed2)  
显然这样的sql语句是无法执行的<br>

当用户手动添加不需单引号的额外条件时会被包裹在单引号中
![PrepareStatement截图](http://note.youdao.com/yws/res/873/WEBRESOURCEb474737e27fb176f994ab4f9d74f4351)
这样的语句也是无法执行的，所以PrepareStatement的安全性要远大于Statement，我们应当使用PrepareStatement
有关Mybatis防止SQL注入的方式大致与上文所述相同，区别在与#与$，详情参见
[mybatis是如何防止SQL注入的](https://blog.csdn.net/bwh0520/article/details/80102040)
[在java中"#"与"$"的区别](https://blog.csdn.net/zps925458125/article/details/100550711)

## SQL SELECT TOP 子句
ELECT TOP 子句用于规定要返回的记录的数目。
SELECT TOP 子句对于拥有数千条记录的大型表来说，是非常有用的。
mysql无法识别TOP关键字，使用LIMIT代替
```
    SELECT
   	*
    FROM
   	student
    LIMIT 2
```
LIMIT接收两个参数的情况，第一个参数表示第一行记录的偏移量（并非从0开始而是1），第二个参数表示返回的行数
```
-- 返回3-5行记录
SELECT
	*
FROM
	student
LIMIT 2,3
```
## SQL LIKE 操作符
%为通配符，替换多个字符
