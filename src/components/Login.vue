<!--HTML部分-->
<template>
  <div class="login-container"><!--style里有对应样式-->
    <el-form ref="form" :model="form" label-width="80px" :rules="loginRules" class="login-form"><!--下面css(style)里
    也可找到对应不一一解释-->

      <h1 class="title">{{title}}</h1><!--大括号里title可在script找到对应-->

      <el-form-item prop="username"><!--要在main.js引入element组件化框架-->
        <el-input v-model="form.username"  prefix-icon="iconfont icon-mima" placeholder="账号"></el-input>
      </el-form-item>

      <el-form-item prop="password">
        <el-input v-model="form.password" prefix-icon="iconfont icon-denglu" placeholder="密码" :type="passwordType"><i slot="suffix" class="iconfont icon-eye" @click="showPwd"></i></el-input><!--slot方式输入图标-->
      </el-form-item>

      <div class="login">
        <el-button round type="info" @click="login" class="login-btn" :loading="isloading">登录</el-button>
        <router-link :to="{name: 'List'}">点击跳转</router-link><!--这个可以跳转，用push没法跳转。。。-->
      </div>

      <p class="userinfo"><span>账号:</span>murphyli<span>密码:</span>admin</p>
      
    </el-form>
  </div>
</template>


<!--JS部分-->
<script>
import request from '@/utils/request';
import { isvalidUsername } from "@/utils/validate"
export default {
  name: "login-page",
  data: function() {
      // 判断账号是否合法
      const validateUsername = (rule, value, callback) => {
        if (!isvalidUsername(value)) {
          callback(new Error('请输入正确的账号'))
        } else {
          callback()
        }
      }
      //判断密码是否合法
      const validatePass = (rule, value, callback) => {
        if (value.length < 5) {
          callback(new Error('密码不能小于5位'))
        } else {
          callback()
        }
      }
    return {//看不懂
      title:"vue-demo",
      loginUrl:"./login",
      form: {
        username: "",
        password: ""
      },
      loginRules:{
        username: [{ required: true, trigger: 'blur', validator: validateUsername }],
        password: [{ required: true, trigger: 'blur', validator: validatePass }]
      },
      passwordType:"password",
      isloading:false//false是默认值
    };
  },
  methods: {//看不太懂
    // 登录按钮，实现跳转
    login() {//@click触发
        var $this = this;//this是return里的信息
        this.$refs.form.validate(valid => {
              if (valid) {
                this.isloading = true;
                request({
                  url:this.loginUrl,
                  method:"post",
                  data:this.form,
              })
              .then(response => {
                  //模拟异步请求时间
                  setTimeout(function(){
                    $this.isloading = false;
                    $this.$router.push({name: 'List'})//页面跳转
                  },3000)

              })
              .catch((error) => {
                  console.log("error")
              });
          } else {
            console.log("不请求")
          }
      })

        
    },
    // 切换密码框（这功能我还没做，图标eye没下）
    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
    },

  },
  mounted: function() {//钩子函数，暂时没完全理解

  }
};
</script>


<!--CSS样式部分-->
<style lang="scss" rel="stylesheet/scss">
.login-container{
  width: 100%;
  height: 100%;
  background-image: url("../assets/image/loginBg.png");
  background-repeat:no-repeat;
  background-size: cover;
  position: fixed;
  color: rgb(17, 17, 17);
    .title{
      font-size: 60px;
      margin: 0;
      padding: 50px 0;
    }
    .el-input__inner{
      padding-left: 20px;
    }
    .el-form-item{
      margin-bottom:40px;
    }
    .el-input{
      width: 80%;
      input{
        background: transparent;//透明的
        color: rgb(12, 12, 12);
        height: 40px;
      }
    }
    .login-form{
      text-align: center;
      position: absolute;
      left: 0;
      right: 100;
      top: 100;
      bottom:0;
      width: 620px;
      padding: 35px 50px 15px;
      margin: 120px auto;
  }
  .title,.login{
    text-align: center;//居中对齐
  }
  .login-btn{
    width: 150px;
  }
  .userinfo{
    font-size: 15px;
    text-align: center;
    font-style: italic;
    span{
      padding:0 10px;
    }
  }
} 
</style>


