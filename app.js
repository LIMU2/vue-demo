//app.js用来启动express服务

//1引入express模块
const express = require('express');

const fri = require('./router/fri');
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cookieParser = require('cookie-parser');

//连接上数据库
var db = mongoose.connect('mongodb://localhost:27017/myDbs');//这里的myDbs是数据库的名字

//2.创建app对象
const app = express()


//定义路由
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use('/api',fri)

//定义服务启动端口
app.listen(3000,() => {
console.log('app listening on port 3000.')
})
