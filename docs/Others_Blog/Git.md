# Git

**记录使用Git过程中碰到的常用命令和遇到的坑**

[[toc]]



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

