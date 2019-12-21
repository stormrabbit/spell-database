# 说明

# 安装 & 运行 mongodb

1. 升级 `brew`

```
brew update
```

2. 安装 `mongodb`

```
brew install mongodb
```

3. 设定 db 位置

```
mkdir -p /Users/xxx/github/mongodb
```

4. 启动数据库
```
mongod --dbpath /Users/xxx/github/mongodb
```

> 如此启动的 mongodb 并不安全（没设定密码用户权限 and so on），仅做本机调试和练习使用。

# 使用

### 方法一

1. 安装 vscode 插件 `Azure Cosmos DB`。
2. 选择 `"Attach Database Account"` 并输入默认地址 `mongodb://127.0.0.1:27017`。
3. 新建 `.mongodb` 文件，执行命令行操作。
4. [常用命令](https://www.jianshu.com/p/0a52c672ae78)。


### 方法二

1. [Robo 3T](https://robomongo.org/download) 可视化操作。

# 初始化数据

```
node index.js
```

# 建表并导入数据

```
mongoimport  --jsonArray  --host=127.0.0.1  --db dnd_spells --collection spells --file ./mock/spells.json

mongoimport  --jsonArray  --host=127.0.0.1  --db dnd_spells --collection classes --file ./mock/classes.json

mongoimport  --jsonArray  --host=127.0.0.1  --db dnd_spells --collection spells_classes --file ./mock/spells_classes.json.json

```