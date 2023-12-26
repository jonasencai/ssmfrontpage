<template>
  <span>
    <el-dialog id="dialog" title="作息修改" :visible.sync="dialogFormVisible">
      <el-form :model="lifeForm" :rules="rules" ref="lifeForm">
        <el-form-item label="学号" prop="stuid">
          <el-input v-model="lifeForm.stuid" autocomplete="off" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="姓名" prop="username">
          <el-input v-model="lifeForm.username" autocomplete="off" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="日期" prop="date">
          <el-input v-model="lifeForm.date" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="时间" prop="time">
          <el-input v-model="lifeForm.time" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="内容" prop="tittle">
          <el-input v-model="lifeForm.tittle" autocomplete="off" type="textarea"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm('lifeForm')">确 定</el-button>
        <el-button @click="dialogFormVisible = false">取 消</el-button>
      </div>
    </el-dialog>

    <el-dialog id="showdialog" title="新增作息" :visible.sync="dialogFormVisibleAdd">
      <el-form :model="lifeForm" :rules="rules" ref="lifeForm">
        <el-form-item label="学号" prop="stuid">
          <el-input v-model="this.user.data.stuid" autocomplete="off" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="姓名" prop="username">
          <el-input v-model="this.user.data.username" autocomplete="off" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="日期" prop="date">
          <el-input v-model="lifeForm.date" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="时间" prop="time">
          <el-input v-model="lifeForm.time" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="内容" prop="tittle">
          <el-input v-model="lifeForm.tittle" autocomplete="off" type="textarea"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitFormAdd('lifeForm')">确 定</el-button>
        <el-button @click="dialogFormVisibleAdd = false">取 消</el-button>
      </div>
    </el-dialog>
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
                this.user.data.username ? this.user.data.username : "点击此处设置用户名" }}
            </div>
          </div>
        </div>
        <el-menu>
          <el-submenu index="1" v-if="this.user.data.role == 3">
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
          <el-submenu index="2" v-if="this.user.data.role == 1">
            <template slot="title"><i class="el-icon-user"></i>系统管理</template>
            <el-menu-item-group>
              <el-menu-item index="1-1" v-on:click="showAllUser()">用户信息管理</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="3" v-if="this.user.data.role == 2">
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
          生活作息管理
          <button v-on:click="changePassword()" style="right: -78%;position: relative;">修改密码</button>
          <button v-on:click="logout()" style="right: -79%;position: relative;">退出登录</button>
        </div>
        <el-header style="
            text-align: left;
            font-size: 12px;
            width: 100%;
            background-color: aliceblue;">
          <el-button @click="AddLife()">新增作息信息</el-button>
          <span></span>
        </el-header>
        <el-main style="height: 100%; padding: 0px;">
          <el-table :data="tableData" style="width: 100%; text-align: center; height: 100%;font-size: larger;">
            <el-table-column prop="stuid" label="学号" width="300">
            </el-table-column>
            <el-table-column prop="username" label="用户名" width="240">
            </el-table-column>
            <el-table-column prop="date" label="日期" width="240">
            </el-table-column>
            <el-table-column prop="time" label="时间" width="150">
            </el-table-column>
            <el-table-column prop="tittle" label="内容" width="120">
            </el-table-column>
            <el-table-column fixed="right" label="操作" width="150">
              <template slot-scope="scope">
                <el-button type="text" size="small" @click="handleClick(scope.row)">编辑</el-button>
                <el-button type="text" size="small" @click="handledelete(scope.row)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
          <div class="block">
            <span class="demonstration"></span>
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
              :current-page="currentPage" :page-sizes="[5, 8, 10]" :page-size="pageSize"
              layout="total, sizes, prev, pager, next, jumper" :total="total" style="background-color: #eee">
            </el-pagination>
          </div>
        </el-main>
      </el-container>
    </el-container>
  </span>
</template>
<script>
import axios from "axios";
export default {
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'));
      } else {
        if (this.lifeForm.checkPass !== '') {
          this.$refs.lifeForm.validateField('checkPass');
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'));
      } else if (value !== this.lifeForm.password) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };
    return {
      lifeForm: {
        stuid: '',
        username: '',
        date: '',
        time: '',
        tittle: '',
      },
      rules: {
        password: [
          { required: true, validator: validatePass, trigger: 'blur' }
        ],
        checkPass: [
          { required: true, validator: validatePass2, trigger: 'blur' }
        ],
        account: [
          { required: true, message: "请输入账号", trigger: 'blur' }
        ],
        userName: [
          { required: true, message: "请输入用户名", trigger: 'blur' }
        ],
        userType: [
          { required: true, message: "请选择用户类型", trigger: 'blur' }
        ],
        departmentId: [
          { required: true, message: "请选择选择科室", trigger: "blur" },
        ]
      },
      pageForm: {
        pageNo: '',
        pageSize: '',
        user_type: '',
        Account: '',
        user_name: '',
      },
      tableData: [],
      dialogFormVisible: false,
      dialogFormVisibleAdd: false,
      currentPage: 1,
      pageSize: 5,
      total: 99,
      selectUserName: "",
      circleUrl:
        "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
      sizeList: ["large", "medium", "small"],
      user_name: "2222",
      user: "",
      account: "",
      options: [],
      selectuser_type: "",
      selectaccount: "",
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
    AddLife(){
      this.lifeForm = {};
      this.dialogFormVisibleAdd = true;
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          var url = `http://localhost:8080/SSM_war_exploded/Life/updateLife`;
          axios
            .post(url, JSON.stringify(this.lifeForm), {
              headers: { 'Content-Type': 'application/json' },
            })
            .then((res) => {
              if (res.status == 200) {
                this.$message({ message: '修改成功', type: 'success' });

                this.dialogFormVisible = false;
                this.selectall();
              } else {
                this.$message({ message: '修改失败', type: 'error' });

              }
            });
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    submitFormAdd(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          var url = `http://localhost:8080/SSM_war_exploded/Life/insertLife`;
          this.lifeForm.stuid = this.user.data.stuid;
          this.lifeForm.username = this.user.data.username;
          axios
            .post(url, JSON.stringify(this.lifeForm), {
              headers: { 'Content-Type': 'application/json' },
            })
            .then((res) => {
              if (res.status == 200) {
                this.$message({ message: '新增成功', type: 'success' });
                this.dialogFormVisibleAdd = false;
                this.selectall();
              } else {
                this.$message({ message: '新增失败', type: 'danger' });
              }
            });
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },

    handleClick(row) {
      this.dialogFormVisible = true;
      var url = `http://localhost:8080/SSM_war_exploded/Life/selectLifeById`;
      axios
        .get(url, {
          params: {
            id: row.id,
          },
        })
        .then((res) => {
          if (res.data.status == 200) {
            this.lifeForm = res.data.data
          } else {
            this.$message({ message: '错误', type: 'error' });
          }
        });
    },
    handledelete(row) {
      var url = `http://localhost:8080/SSM_war_exploded/Life/deleteLife`;
      axios
        .get(url, {
          params: {
            id: row.id,
          },
        })
        .then((res) => {
          if (res.data.status == 200) {
            this.$message({ message: '删除成功', type: 'success' });
            this.selectall();
          } else {
            this.$message({ message: '错误', type: 'error' });
          }
        });
    },
    selectall() {
      var url = `http://localhost:8080/SSM_war_exploded/Life/selectAll`;
      this.pageForm.pageNo = this.currentPage,
        this.pageForm.pageSize = this.pageSize,
        this.pageForm.stuid = this.user.data.stuid,
        axios
          .post(url, this.pageForm)
          .then((res) => {
            if (res.data.status == 200) {
              this.tableData = res.data.data.pages;
              this.total = res.data.data.total;
              console.log(this.tableData.length);
              console.log(this.total);
              console.log(this.pageSize);
            } else {
              this.$message({ message: '查询错误', type: 'error' });
            }
          });
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      console.log(this.tableData);
      this.pageSize = val; //动态改变
      this.selectall();
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.currentPage = val; //动态改变
      this.selectall();
    },
    selectone() {
      this.selectall();
    },
  },
  created() {
    this.user = JSON.parse(localStorage.getItem("user"));

    // this.selectallRoles();
  },
  mounted() {
    console.log(JSON.parse(localStorage.getItem("user")));
    this.selectall();
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
</style>
