<template lang="html">

  <div class="list">
    <el-button type="primary" class="searchBtn" @click="search">查询</el-button><el-button type="primary" class="addBtn" @click="add">添加</el-button>

    <el-dialog title="查询信息" :visible.sync="searchFormVisible" class="searchArea">
      <el-table
      :data="tableData"
      stripe
      element-loading-text="拼命加载中"
      header-row-class-name="tableHeader"
      empty-text="暂时没数据"
      border
      style="width:100%">
        <el-table-column
        fixed
        prop="friName"
        label="名字"
        align="center"
        width="120">
        </el-table-column>
        <el-table-column
            prop="age"
            label="年龄"
            align="center"
            width="100">
        </el-table-column>
        <template>
          <div align="right">
        <el-button @click="searchFormVisible = false">关 闭</el-button>
        </div>
        </template>
      </el-table><!--stripe属性可以创建带斑马纹的表格-->
        
    </el-dialog>

    <el-dialog title="添加信息" :visible.sync="addFormVisible" class="addArea" modal custom-class="addFormArea" @close="closeAdd('addForm')">
 
      <el-form :model="addForm" class="addForm" :rules="rules" status-icon ref="addForm">

        <el-form-item label="英文名:" :label-width="formLabelWidth" prop="friName">
        <el-input v-model="addForm.friName" auto-complete="off" placeholder="请输入英文名"></el-input>
        </el-form-item>

        <el-form-item label="年龄:" :label-width="formLabelWidth" prop="age">
        <el-input v-model.number="addForm.age" auto-complete="off" placeholder="请输入年龄"></el-input>
        </el-form-item>

        <el-form-item label="性别:" :label-width="formLabelWidth" prop="friSex">
        <el-select v-model="addForm.friSex" class="sexArea" placeholder="请选择性别">
        <el-option label="male" value="man"></el-option>
        <el-option label="female" value="woman"></el-option>
        </el-select>
        </el-form-item>

        <el-form-item label="邮箱：":label-width="formLabelWidth" prop="friEmail">
        <el-input v-model="addForm.friEmail" auto-complete="off" placeholder="请输入邮箱账号"></el-input>
        </el-form-item>

        </el-form>

        <div slot="footer" class="dialog-footer">
        <el-button @click="addFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addSure('addForm')">确 定</el-button>
        </div>
      </el-dialog>

  </div>
</template>

<script>
import request from "@/utils/request";
import { error } from 'util';
export default {
  name: "list",
  data: function() {
    return {
      title: "hello world",
      paginationShow: true,
      friName: "",
      age: "",
      friSex: "",
      friSexs: [
        {
          label: "请选择",
          value: ""
        },
        {
          label: "male",
          value: "man"
        },
        {
          label: "female",
          value: "woman"
        }
      ],
      friEmail: "",
      // 校验规则
      rules: {
        friName: [
          { required: true, message: "请输入英文名", trigger: "blur" }
        ],
        age: [
          { required: true, message: "请输入年龄", trigger: "blur" },
          { type: "number", message: "年龄必须为数字值" }
        ],
        friSex: [
          { required: true, message: "请选择性别", trigger: "change" },
          { required: true, message: "请选择性别", trigger: "blur" }
        ],
        friEmail: [
          { required: true, message: "请输入邮箱", trigger: "blur" }
        ]
      },
      searchUrl: "./getFriList",
      addUrl: "./addFri",
      tableData: [],
      searchFormVisible: false,
      addFormVisible: false,
      addForm: {
        friName: "",
        age: "",
        friSex: "",
        friEmail: "",
      },
      formLabelWidth: "120px",
      loading: false
    };
  },
  methods: {
    //查询
    search() {
      this.searchFormVisible = true;
      this.paginationShow = false;

      var searchParmas = {
        friName: this.friName,
        age: this.age,
        friSex: this.friSex,
        friEmail: this.friEmail
      };

      this.loading = true;

      request({
        url: this.searchUrl,//getFriList
        method: "post",
        data: searchParmas
      })
        .then(response => {
          this.$nextTick(function() {//用于延迟执行一段代码
            this.paginationShow = true;
          });
          this.loading = false;
          if (response.data.status == "success") {
            this.tableData = response.data.friList;
            this.length = response.data.total;
          } else {
            this.tableData = [];
            this.$message({
              message: "查询失败，请重试",
              type: "error"
            });
          }
        })
        .catch(error => {
          this.$nextTick(function() {
            this.paginationShow = true;
          });
          console.log(error);
        });
    },

    // 添加
    add() {
      this.addFormVisible = true;
    },
    // 关闭添加页面
    closeAdd: function(formName) {
      this.$refs[formName].resetFields();
    },
    // 确认添加
    addSure(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          var that = this;
          if(that.addForm.friName==' '){alert('姓名不能为空');return;}
          that.addFormVisible = false;//到这步都没问题，能执行
          //调新增接口,在回调函数中刷新一次
          var addObj = this.addForm;
          request({
            url: this.addUrl,
            method: "post",
            data: addObj
          })
            .then(response => {
              this.loading = false;
              if (response.data.status == "success") {
                this.$message({
                  message: response.data.message,
                  type: "success",
                  onClose: function() {
                    that.search();
                  }
                });
              } else {
                this.$message({
                  message: "新增失败",
                  type: "error"
                });
              }
            })
            .catch(error => {
              console.log(error);
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    // 关闭dialog的函数
    closeModify: function(formName) {
      this.$refs[formName].resetFields();
    },
  },
};
</script>

<style lang="scss">

.list{
  width: 100%;
  height: 100%;
  background-image: url("../assets/image/loginBg.png");
  background-repeat:no-repeat;
  background-size: cover;
  position: fixed;
    .searchBtn {
      margin-left: 100px;
    }
    .addBtn {
      margin-top: 100px;
      margin-left: 50px;
    }
    .tableHeader {
      margin-top: 100px;
      margin-left: 100px;
      color: #000;
    }
div.list {
  width: 90%;
  margin: 0 auto;
}
.searchArea {
  width: 200px;
}
.addArea .el-input {
  width: 200px;
}
.addPicArea .el-input {
  width: 500px;
}
.addForm {
  overflow: hidden;
}
.addForm .el-form-item {
  float: left;
}
.sexArea {
  width: 200px;
}
.addFormArea {
  .el-dialog__body {
    height: 350px;
  }
  .el-dialog__header .el-dialog__title {
    text-align: left;
  }
}
}
</style>