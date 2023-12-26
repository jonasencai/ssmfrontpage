<template>
  <span>
    <el-container style="height: 100%; border: 1px solid #eee">
      <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
        <div style="
            height: 40px;
            background-color: rgb(42, 63, 84);
            display: flex;
            flex-flow: row nowrap;">
          <div style="
              width: 36px;
              height: 36px;
              position: relative;
              top: 50%;
              transform: translate(0, -50%);
              padding: 5px;">
            <img src="../static/image/head.png" class="img1" style="background-size: 5px" />
          </div>
          <div style="
              height: 40px;
              line-height: 40px;
              font-size: 15px;
              background-color: rgb(42, 63, 84);
              color: aliceblue;
              width: 200px;
              display: block;">
            大学生健康管理系统
          </div>
        </div>
        <div style="height: 7%; display: flex; flex-flow: row nowrap">
          <div style="
              width: 40px;
              height: 40px;
              position: relative;
              top: 50%;
              transform: translate(0, -50%);
              padding: 0 10px;">
            <el-avatar style="width: 100%; height: 100%" :src="circleUrl"></el-avatar>
          </div>
          <div style="display: inline-block">
            <div class="b">
              Welcome，{{
                this.user.data.username ? this.user.data.username : "点击此处设置用户名"
              }}
            </div>
          </div>
        </div>
        <el-menu>
          <el-submenu index="1" v-if="this.user.data.role==3">
            <template slot="title"><i class="el-icon-user"></i>学生信息管理</template>
            <el-menu-item-group>
              <el-menu-item index="1-1" v-on:click="showAllSport()">运动记录管理</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group>
              <el-menu-item index="1-2" v-on:click="showAllLife()">生活作息管理</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group>
              <el-menu-item index="1-3" v-on:click="showAllIll()">疾病信息管理</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group>
              <el-menu-item index="1-4" v-on:click="showAllPexamin()">体检报告信息</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group>
              <el-menu-item index="1-5" v-on:click="showAllCommentD()">留言管理</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group>
              <el-menu-item index="1-6" v-on:click="showAllQuestionnaire()">问卷管理</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group>
              <el-menu-item index="1-7" v-on:click="showAllHealthstatus()">健康状况管理</el-menu-item>
            </el-menu-item-group>
            
          </el-submenu>
          <el-submenu index="2" v-if="this.user.data.role==1">
            <template slot="title"><i class="el-icon-user"></i>系统管理</template>
            <el-menu-item-group>
              <el-menu-item index="1-1" v-on:click="showAllUser()">用户信息管理</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="3" v-if="this.user.data.role==2">
            <template slot="title"><i class="el-icon-user"></i>医生信息管理</template>
            <el-menu-item-group>
              <el-menu-item index="3-1" v-on:click="showAllQuestions()">问卷信息管理</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group>
              <el-menu-item index="3-2" v-on:click="showAllQuestionnaire()">问卷管理</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group>
              <el-menu-item index="3-3" v-on:click="showAllCommentD()">留言管理</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group>
              <el-menu-item index="3-4" v-on:click="showAllHealthstatus()">健康状况管理</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-container style="height: 100%">
        <div style="
            width: 100%;
            background-color: aliceblue;
            border-width: 2px;
            border-bottom: 5px solid silver;">
          <button v-on:click="changePassword()" style="right: -86%;position: relative;">修改密码</button>
          <button v-on:click="logout()" style="right: -87%;position: relative;">退出登录</button>
        </div>
        <el-header id="index" style="
            text-align: left;
            font-size: 30px;
            width: 100%;
            background-color: aliceblue;
            height: 100%">
          <span>欢迎你：{{
            this.user.data.username ? this.user.data.username : "点击此处设置用户名"
          }}</span>
        </el-header>
        <el-main style="height: 100%; padding: 0px;">
        </el-main>
      </el-container>
    </el-container>

  </span>
</template>
<script>
import axios from "axios";
export default {
  data() {
    return {
      circleUrl:
        "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
      sizeList: ["large", "medium", "small"],
      user_name: "2222",
      user: "",
      account: "",
    };
  },
  methods: {
    showAllHealthstatus() {
      this.$router.push("/healthstatus");
    },
    showAllCommentD() {
      this.$router.push("/commentD");
    },
    showAllQuestionnaire() {
      this.$router.push("/questionnaire");
    },
    showAllUser() {
      //直接跳转
      this.$router.push("/user");
    },
    showAllLife() {
      //直接跳转
      this.$router.push("/life");
    },
    showAllIll() {
      //直接跳转
      this.$router.push("/ill");
    },
    showAllCommentD() {
      this.$router.push("/commentD");
    },
    showAllPexamin() {
      //直接跳转
      this.$router.push("/pexamination");
    },
    changePassword() {
      this.$router.push("/password");
    },
    showAllSport() {
      //直接跳转
      this.$router.push("/sport");
    },
    showAllVisit() {
      //直接跳转
      this.$router.push("/visit");
    },
    showAllQuestions() {
      this.$router.push("/questions");
    },
    logout() {
      var url = `http://localhost:8080/SSM_war_exploded/User/logout`;
      axios
        .post(url,)
        .then((res) => {
          if (res.status == 200) {
            this.$message({ message: '退出登录成功', type: 'success' });
            this.$router.push("/login");
          } else {
            this.$message({ message: '退出登录失败', type: 'error' });
          }
          this.addUser = false;
        });
    },
  },
  created() {
    this.user = JSON.parse(localStorage.getItem("user"));
  },
  mounted() {
    console.log(JSON.parse(localStorage.getItem("user")));
  },
  updated() { },
  destroyed() { },
};
</script>
<style>
.el-header {
  background-color: #b3c0d1;
  color: #333;
  line-height: 60px;
}

.el-aside {
  color: #333;
}

.img1 {
  width: 100%;
  height: 100%;
}

.b {
  position: relative;
  top: 20px;
  word-wrap: break-word;
  text-align: center;
  line-height: 18px;
}

.selectUserText {
  flex-flow: row nowrap;
  position: relative;
  left: 15%;
}

#index {
  background-image: url(../static/image/index2.jpg);
  height: 400px;
  background-size: cover;
}
</style>
