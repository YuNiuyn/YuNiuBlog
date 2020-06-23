# Git

**记录使用Git过程中碰到的常用命令和遇到的坑**

[toc]



## 分支



### 新建分支

```bash
git checkout -b <branchname>
```

### 查看分支状态

```bash
git branch
```

### 查看远程仓库分支

```bash
# 查看远程分支
git branch -a
```

### 推送本地分支到远程仓库的分支

```bash
# 推送本地的my-branc分支到远程origin的feature-branch(冒号后面的)分支(没有会自动创建)
git push origin my-branch:origin-branch

# 如果提示无法关联远程仓库，这时候执行以下代码
# 关联远程仓库
git push origin HEAD:origin-branch
```

### 删除远程分支

```bash
git push origin --delete <branchname>
```



## 修改



### 暂存所有修改

```bash
# 添加本地所有修改的内容至暂存区(包含删除的文件)
git add -A
```



## 远程仓库



### 远程仓库回滚

GitHub远程仓库回滚。目前不完善，需要再研究一下。

```bash
# 重置
git reset
# 强制提交
git push origin master -f
```







## GIT相关收藏

[GIT 工作流 作者：*Lydia Hallie*](https://mp.weixin.qq.com/s?__biz=MzIzMTE1ODkyNQ==&mid=2649412898&idx=1&sn=e3f12c03fde24a60008ad7ccae6c6e34&chksm=f0b610c0c7c199d6ef060c10ee4da782fc49f94ed72cfc5cbc67b4e2d56fe745d599b3a19fdb&scene=126&sessionid=1589192356&key=974eeeca00c2ed2b58fdcfdcd7de97d8554093120d3099a6123379b925fa4ecdc24d3bc3dfc40c178fc08b16385eb5fbb080e5b04ac4fc0595c3fa3bcda5b9a5859dd6ab8bca85937a0056955434301a&ascene=1&uin=MTIwMzQ5NDI2MQ%3D%3D&devicetype=Windows+10+x64&version=62090069&lang=zh_CN&exportkey=AZYrMp8qpD0mMEJyCZOGqRQ%3D&pass_ticket=LgoOz2p4%2FyW8SNMVrzwQH3mxc0NPwaULarWQDZqSNiUuH2rX9gsXA0hYrC5byddz)

[GIT 备忘录 作者：Tong Obama](https://juejin.im/post/5eb2d6bce51d454d9d3ed14f)

