---
title: Tomcat从放弃到入门
date: 2020-09-17 10:14:47
categories:
- Octatvia之技术文档
- 服务器
tags: 
- 服务器
- 放弃到入门
---

### Tomcat认识
当我们初次接触web项目时，很可能会有这样的疑问：
程序的入口在哪里？
在我们编写应用程序时都会有主函数（main方法）用于启动应用，这也被称为应用程序的主入口。
而在web项目中并没有这样的主函数，开发者也无法直接执行web应用，所以我们需要用到服务器，将项目发布到服务器上，从而运行项目。
简而言之，Tomcat就是一个解析请求并返回数据的容器。

### Tomcat初步使用
以在Idea中使用Tomcat为例
第一步：新建一个web项目
![1](/world/img/Tomcat/1.png)
第二步：配置Tomcat 地址选择本地存放目录
![2](/world/img/Tomcat/2.png)
第三步：为项目命名
![3](/world/img/Tomcat/3.png)
项目加载完毕后会自动生成一个index.jsp范例，运行Tomcat
![4](/world/img/Tomcat/4.png)
正常情况下应该运行成功，浏览器跳转 http://localhost:8080/tomcatDemo_war_exploded/ 正常显示页面

ps:解决控制台输出乱码问题
首先打开vm option
![5](/world/img/Tomcat/5.png)
在末尾添加
`-Dfile.encoding=UTF-8`
同时要确保settings=>File Encoding中字符编码格式为UTF-8
重启idea即可

### Tomcat进阶使用
在idea中，默认配置的项目会在项目本地生成编译后的项目，在本例中我的本地项目地址为D:/ideaspace/tomcatDemo,idea所生成的编译文件存放于D:\ideaspace\tomcatDemo\out\artifacts
![6](/world/img/Tomcat/6.png)
项目名正是上文中浏览器跳转的地址名,artifacts的作用是整合编译后的 java 文件，资源文件等，有不同的整合方式，比如war、jar、war exploded 等,其中 war 和 war exploded 区别就是后者不压缩，开发时选后者便于看到修改文件后的效果。
在实际的开发中，开发者一般不会把编译后的项目放在本地项目中而是采用以下几种方式：
1.将项目放到%TOMCAT_HOME%/webapps 下，在启动tomcat时会自动启动webapps文件夹下的所有项目。
2.配置虚拟路径，打开%TOMCAT_HOME%/config/server.xml，在<Host name="localhost" appBase="webapps" unpackWARs="true" autoDeploy="true">下新增<Context docBase="D:\xx\xx" path="/xxx"></Context>，保存。
D:\xx\xx就是文件存放目录，\xxx及虚拟路径，此时在地址栏中输入http://localhost:8080/xxx即可访问服务。

