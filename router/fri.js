//引入express模块
const express = require("express");
//定义路由及中间件
const router = express.Router();
//引入数据模型模块
const Fri = require("../models/fri");

// 登陆接口
router.post('/login', function(req, res, next) {
  var username = req.body.username;
  var password = req.body.password;

  if(username === 'murphyli' && password === 'admin'){
    res.cookie('user',username);
    return res.send({
      status: "success",
      info: '欢迎登陆'
    });
  }

  return res.send({
    status: "fail",
    info: "登陆失败，账号或密码错误"
  });
});

//查询所有朋友信息路由
router.post("/getFriList", (req,res) => {
  var friName = req.body.friName,
      age = req.body.age,
      friSex = req.body.friSex,
      friEmail = req.body.friEmail;

  var sqlObj = {};

  if(friName){
    sqlObj.friName = friName;
  }
  if(age){
    sqlObj.age = age;
  }
  if(friSex){
    sqlObj.friSex = friSex;
  }
  if(friEmail){
    sqlObj.friEmail = friEmail;
  }

  var friList = Fri.find(sqlObj);
});


//添加一个朋友信息路由
router.post('/addFri', (req,res) => {

  //使用model上的方法
  console.log(req)//方便调试用
  Fri.create(req.body, (err, fri) => {
    if (err) {
      res.json({
        status: "fail",
        error: err
      });
    } else {
      res.json({
        status: "success",
        message: "添加成功"
      });
    }
  });
  console.log(req.body)
});


module.exports = router;
