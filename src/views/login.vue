<template>
  <div style="height: 100%;">
    <div id="login" class="a">
      <el-form id="form1" :model="userForm" status-icon ref="userForm" label-width="100px" class="demo-userForm">大学生健康管理系统<br>&nbsp;
        <el-form-item style="width: 300px;" label="用户名" prop="account">
          <el-input style="width: 300px" v-model="userForm.account"></el-input>
        </el-form-item>
        <el-form-item style="width: 300px;" label="密码" prop="password">
          <el-input type="password" v-model="userForm.password" autocomplete="off" style="width: 300px"></el-input>
        </el-form-item>
        <el-form-item style="width: 400px">
          <el-button type="primary" @click="submitForm('userForm')">登录</el-button>
          <el-button @click="resetForm('userForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import user from "./user.vue"
export default {
  components: {
    user,
  },
  data() {
    return {
      name: "login",
      userForm: {
        password: "",
        account: "",
      },
    };
  },
  methods: {
    submitForm(userForm) {
      this.$refs[userForm].validate((valid) => {
        if (valid) {
          console.log(this.userForm);
          var str = JSON.stringify(this.userForm);
          console.log(str);
          var url = `http://localhost:8080/SSM_war_exploded/login`;
          axios
            .post(url, this.userForm)
            .then((res) => {
              if (res.data.status == 200) {
                this.$message({ message: '登录成功', type: 'success' });
                this.goTo();
                localStorage.setItem("user", JSON.stringify(res.data));
              } else {
                this.$message({ message: '用户名或密码错误', type: 'error' });

              }
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    goTo() {
      //直接跳转
      this.$router.push("/index");
    },
    resetForm(userForm) {
      this.$refs[userForm].resetFields();
    },
  },
};
</script>
<style>
.a {
  width: 500px;
  margin: 0 auto;
  height: 30%;
  text-align: center;
  position: relative;
  top: 30%;
  left: 30%;
  padding-top: 4%;
}

#form1 {
  border-top: black;
  font-weight: bold;
  color: aliceblue;
}
</style>