## 导入

```
mongoimport  --jsonArray  --host=127.0.0.1  --db three_houses --collection base_attribute_charactors --file /Users/yangguang17/Desktop/ubw/github/fe_three_houses/mock/base_attribute_charactors.json
```


```
mongoimport  --jsonArray  --host=127.0.0.1  --db three_houses --collection base_attribute_classes --file /Users/yangguang17/Desktop/ubw/github/fe_three_houses/mock/base_attribute_classes.json
```

```
mongoimport  --jsonArray  --host=127.0.0.1  --db three_houses --collection grow_percent_charactors --file /Users/yangguang17/Desktop/ubw/github/fe_three_houses/mock/grow_percent_charactors.json
```


```
mongoimport  --jsonArray  --host=127.0.0.1  --db three_houses --collection grow_percent_classes --file /Users/yangguang17/Desktop/ubw/github/fe_three_houses/mock/grow_percent_classes.json
```
## 排序

- 根据职业从高到底列出力量低保数据

```

db.getCollection('base_attribute_classes').find({}).sort({clz_lvl:1, atk: -1})
```

- 根据初始值力量对起始角色进行排序

```
db.getCollection('base_attribute_charactors').find({}).sort({atk: -1})

```

- 选择中级职业中力量最高者

```

db.getCollection('base_attribute_classes').find({clz_lvl: 1}).sort({atk: -1}).limit(1)
```

- 更新中级职业 clz_lvl 值

```
db.getCollection('base_attribute_classes').update({clz_lvl: 3}, {$set: {clz_lvl: NumberInt(2)}},{multi:true})
```

- 查找高级和最高级职业力量情况(或条件)

```
db.getCollection('base_attribute_classes').find({ $or:[{clz_lvl: 4}, {clz_lvl: 3}] }).sort({matk: -1})
```