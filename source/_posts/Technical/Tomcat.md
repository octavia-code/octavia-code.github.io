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

## Tomcat认识
当我们初次接触web项目时，很可能会有这样的疑问：
程序的入口在哪里？
在我们编写应用程序时都会有主函数（main方法）用于启动应用，这也被称为应用程序的主入口。
而在web项目中并没有这样的主函数，开发者也无法直接执行web应用，所以我们需要用到服务器，将项目发布到服务器上，从而运行项目。
简而言之，Tomcat就是一个解析请求并返回数据的容器。

## Tomcat初步使用
以在Idea中使用Tomcat为例
第一步：新建一个web项目
![1](/img/Tomcat/1.png)
第二步：配置Tomcat 地址选择本地存放目录
![2](/img/Tomcat/2.png)
第三步：为项目命名
![3](/img/Tomcat/3.png)
项目加载完毕后会自动生成一个index.jsp范例，运行Tomcat
![4](/img/Tomcat/4.png)
正常情况下应该运行成功，浏览器跳转 http://localhost:8080/tomcatDemo_war_exploded/ 正常显示页面.

### 解决控制台输出乱码问题
首先打开vm option
![5](/img/Tomcat/5.png)
在末尾添加
`-Dfile.encoding=UTF-8`
同时要确保settings=>File Encoding中字符编码格式为UTF-8
重启idea即可

## Tomcat进阶使用
在idea中，默认配置的项目会在项目本地生成编译后的项目，在本例中我的本地项目地址为D:/ideaspace/tomcatDemo，idea所生成的编译文件存放于D:\ideaspace\tomcatDemo\out\artifacts
![6](/img/Tomcat/6.png)
项目名正是上文中浏览器跳转的地址名，artifacts的作用是整合编译后的 java 文件，资源文件等，有不同的整合方式，比如war、jar、war exploded 等，其中 war 和 war exploded 区别就是后者不压缩，开发时选后者便于看到修改文件后的效果。

在实际的开发中，开发者一般不会把编译后的项目放在本地项目中而是采用以下几种方式：
1.将构建完成后的项目放到%TOMCAT_HOME%/webapps 下，在启动tomcat时会自动启动webapps文件夹下的所有项目。
2.配置虚拟路径，打开%TOMCAT_HOME%/config/server.xml，在
`<Host name="localhost" appBase="webapps" unpackWARs="true" autoDeploy="true">`下新增
`<Context docBase="D:\xx\xx" path="/xxx"></Context>`，保存。
D:\xx\xx就是文件存放目录，\xxx及虚拟路径，此时在地址栏中输入`http://localhost:8080/xxx`即可访问服务。
3.在%TOMCAT_HOME%/conf/Catalina/localhost下新建xml文件，文件名自定义，文件内容如下
`<Context path="/hello" docBase="D:/ideaspace/tomcatDemo" debug="0" privileged="true"></Context>`
docBase后填写项目地址。

### Tomcat启动方式

启动Tomcat除了借助开发工具外还可以藉由%TOMCAT_HOME%/bin/startup.bat这一批处理文件来启动。
启动前需要配置环境变量CATALINA_HOME与CATALINA_BASE，全部指向本地存放Tomcat文件目录，例如E:\apache-tomcat-9.0.38。
Cataline脚本用于启动和关闭Tomcat服务，是整个Tomcat服务中最为关键的脚本.Catalina是太平洋中靠近洛杉矶的一个小岛，因为其风景秀丽而著，曾被评为全美最漂亮的小岛。
除此之外还需在文件头加上JAVA和TOMCAT环境变量配置，展开bat文件，加入
`SET JAVA_HOME=D:\Java\JavaSE1.8\jdk1.8.0_144`
`SET TOMCAT_HOME=E:\apache-tomcat-9.0.38`

启动批处理文件后，webapps文件夹下的所有项目都将启动，这种方式也是部署的常用方式。

## Tomcat配置详解

server.xml
```$xslt
<Server port="8005" shutdown="SHUTDOWN">
  <Listener className="org.apache.catalina.startup.VersionLoggerListener" />
  <Listener className="org.apache.catalina.core.AprLifecycleListener" SSLEngine="on" />
  <Listener className="org.apache.catalina.core.JasperListener" />
  <Listener className="org.apache.catalina.core.JreMemoryLeakPreventionListener" />
  <Listener className="org.apache.catalina.mbeans.GlobalResourcesLifecycleListener" />
  <Listener className="org.apache.catalina.core.ThreadLocalLeakPreventionListener" />

  <GlobalNamingResources>
    <Resource name="UserDatabase" auth="Container"
              type="org.apache.catalina.UserDatabase"
              description="User database that can be updated and saved"
              factory="org.apache.catalina.users.MemoryUserDatabaseFactory"
              pathname="conf/tomcat-users.xml" />
  </GlobalNamingResources>

  <Service name="Catalina">
    <Connector port="8080" protocol="HTTP/1.1"
               connectionTimeout="20000"
               redirectPort="8443" />
    <Connector port="8009" protocol="AJP/1.3" redirectPort="8443" />
    <Engine name="Catalina" defaultHost="localhost">
      <Realm className="org.apache.catalina.realm.LockOutRealm">
        <Realm className="org.apache.catalina.realm.UserDatabaseRealm"
               resourceName="UserDatabase"/>
      </Realm>

      <Host name="localhost"  appBase="webapps"
            unpackWARs="true" autoDeploy="true">
        <Valve className="org.apache.catalina.valves.AccessLogValve" directory="logs"
               prefix="localhost_access_log." suffix=".txt"
               pattern="%h %l %u %t &quot;%r&quot; %s %b" />
      </Host>
    </Engine>
  </Service>
</Server>

```
文件的结构如下：
```$xslt
<Server>
    <Service>
        <Connector />
        <Connector />
        <Engine>
            <Host>
                <Context />
            </Host>
        </Engine>
    </Service>
</Server>
```
### Server、service与connector
Server元素在最顶层，代表整个Tomcat容器，一个 Server 元素中可以有一个或多个Service 元素。
一个Service可以包含多个Connector，但是只能包含一个Engine，Service在Connector和Engine外面包了一层，把它们组装在一起，对外提供服务。
Connector的主要功能是接收连接请求，创建Request和Response对象用于和请求端交换数据；然后分配线程让Engine来处理这个请求，并把产生的Request和Response对象传给Engine。
```$xslt
<Connector port="8080" protocol="HTTP/1.1" connectionTimeout="20000" redirectPort="8443" />
<Connector port="8009" protocol="AJP/1.3" redirectPort="8443" />
```
在上文第一个connector标签中
```
port代表服请求服务的端口号
protocol规定请求所履行的协议为HTTP/1.1
connectionTimeout代表连接超过20000ms即超时
redirectPort代表当请求为https时重定向至端口8 443.
```
第二个connector标签中port是端口号，protocol规定请求所履行的协议为AJP/1.3，AJP协议负责和其他的HTTP服务器(如Apache)建立连接；在把Tomcat与其他HTTP服务器集成时，就需要用到这个连接器。之所以使用Tomcat和其他服务器集成，是因为Tomcat可以用作Servlet/JSP容器，但是对静态资源的处理速度较慢，不如Apache和IIS等HTTP服务器；因此常常将Tomcat与Apache等集成，前者作Servlet容器，后者处理静态资源，而AJP协议便负责Tomcat和Apache的连接。

### engine、host与context
engine组件在一个service中是唯一的，engine执行接收connector中传递的请求并将响应返回给connector的功能。
Host虚拟主机的作用，是运行多个Web应用（一个Context代表一个Web应用），并负责安装、展开、启动和结束每个Web应用。
上文中Host配置如下：
```
<Host name="localhost" appBase="webapps" unpackWARs="true" autoDeploy="true">
```
name属性指定虚拟主机的主机名，一个Engine中有且仅有一个Host组件的name属性与Engine组件的defaultHost属性相匹配；一般情况下，主机名需要是在DNS服务器中注册的网络名，但是Engine指定的defaultHost不需要，因为默认主机是不需要在DNS服务器中注册的网络名，因为任何与所有Host名称不匹配的请求，都会路由至默认主机。
unpackWARs指定了是否将代表Web应用的WAR文件解压；如果为true，通过解压后的文件结构运行该Web应用，如果为false，直接使用WAR文件运行Web应用。
Host的autoDeploy和appBase属性，与Host内Web应用的自动部署有关.
Context 元素代表在特定虚拟主机上运行的一个Web 应用。每个Web应用基于WAR文件，或WAR文件解压后对应的目录（这里称为应用目录）。

## Tomcat的自动部署、热加载与静态部署

### 自动部署

自动部署的含义是在Tomcat服务启动之后通过不重启Tomcat的方式进行部署web应用，而静态部署则需要重启Tomcat服务。
在我们最开始获取Tomcat安装目录时，在webapps下有着如下的几个文件：
![7](/img/Tomcat/7.png)
事实上我们并未使用context标签去部署这些服务，但是在Tomcat启动时这些服务就会跟着一起启动，这是因为Tomcat会扫描webapps下所有服务。
我们只需要在Host标签中将autoDeploy设置为true即可开启自动部署，这样Tomcat将会定期自动扫描webapps检查是否有新增服务，从而实现自动部署。
其中，Host元素的appBase和xmlBase设置了检查Web应用更新的目录，appBase属性指定Web应用所在的目录，默认值是webapps，这是一个相对路径，代表Tomcat根目录下webapps文件夹。
xmlBase属性指定Web应用的XML配置文件所在的目录，默认值为conf//，例如第一部分的例子中，主机localhost的xmlBase的默认值是$TOMCAT_HOME/conf/Catalina/localhost。
### 热加载

热加载指当某个服务的.class文件发生改变时，Tomcat将会检测到并重新部署该web应用。
需要注意的是，热部署的发生场景在web服务发生改变，例如在webapps下新增web应用或者删除web应用都会触发热部署，而热加载是发生在某个应用服务内部，热加载可以理解为是热部署的一种实现。热部署的定义范围大于热加载。
热加载的实现方式：将context标签内的reloadable值设置为true即可。
还需注意的是，在开发环境Debug模式中中使用热加载可以方便开发，节约开发时间，而在生产环境中，热加载将会给服务器造成加大压力，损失服务器性能。
### 静态部署

静态部署的实现方式：在Host标签内添加子标签Context，静态部署与动态部署可以共存，然而静态部署需要频繁的重启服务，因此并不提倡。

## 文章参考来源
[tomcat 配置文件server.xml详解](https://blog.csdn.net/u_ascend/article/details/80433978#title1)
