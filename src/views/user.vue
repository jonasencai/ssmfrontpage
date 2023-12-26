<template>
  <span>
    <el-dialog id="dialog" title="用户信息修改" :visible.sync="dialogFormVisible">
      <el-form :model="HuserForm" :rules="rules" ref="HuserForm">
        <el-form-item label="学号" prop="stuid">
          <el-input v-model="HuserForm.stuid" autocomplete="off" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="姓名" prop="username">
          <el-input v-model="HuserForm.username" autocomplete="off" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="账号" prop="account">
          <el-input v-model="HuserForm.account" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="HuserForm.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="学院" prop="college">
          <el-input v-model="HuserForm.college" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="班级" prop="classname">
          <el-input v-model="HuserForm.classname" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="电话" prop="tel">
          <el-input v-model="HuserForm.tel" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm('HuserForm')">确 定</el-button>
        <el-button @click="dialogFormVisible = false">取 消</el-button>
      </div>
    </el-dialog>
    <el-dialog id="showdialog" title="新增用户" :visible.sync="dialogFormVisibleAdd">

      <el-form :model="HuserForm" :rules="rules" ref="HuserForm">
        <el-form-item label="身份" prop="role">
          <el-select v-model="HuserForm.role" placeholder="请选择">
            <el-option v-for="item in optionRole" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="学号" prop="stuid" v-if="HuserForm.role == 3">
          <el-input v-model="HuserForm.stuid" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="姓名" prop="username">
          <el-input v-model="HuserForm.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="账号" prop="account">
          <el-input v-model="HuserForm.account" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="HuserForm.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="sex">
          <el-input v-model="HuserForm.sex" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="年龄" prop="age">
          <el-input v-model="HuserForm.age" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="学院" prop="college" v-if="HuserForm.role == 3">
          <el-input v-model="HuserForm.college" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="班级" prop="classname" v-if="HuserForm.role == 3">
          <el-input v-model="HuserForm.classname" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="电话" prop="tel">
          <el-input v-model="HuserForm.tel" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="生日" prop="birthday">
          <el-input v-model="HuserForm.birthday" autocomplete="off"></el-input>
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitFormAdd('HuserForm')">确 定</el-button>
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
          用户信息管理
          <button v-on:click="changePassword()" style="right: -78%;position: relative;">修改密码</button>
          <button v-on:click="logout()" style="right: -79%;position: relative;">退出登录</button>
        </div>
        <el-header style="
            text-align: left;
            font-size: 12px;
            width: 100%;
            background-color: aliceblue;">

          <el-button @click="AddLife()">新增用户信息</el-button>

          用户身份
          <el-select v-model="pageForm.role" placeholder="请选择" clearable>
            <el-option v-for="item in optionRole" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
          &nbsp;
          学号<el-input v-model="pageForm.stuid" style="width: 15%;"></el-input>&nbsp;
          班级<el-input v-model="pageForm.classname" style="width: 15%;"></el-input> &nbsp;
          姓名<el-input v-model="pageForm.username" style="width: 15%;"></el-input>
          &nbsp;
          <el-button @click="selectall">搜索</el-button>
          <span></span>
        </el-header>
        <el-main style="height: 100%; padding: 0px;">
          <el-table :data="tableData" style="width: 100%; text-align: center; height: 100%;font-size: larger;">
            <el-table-column prop="stuid" label="学号" width="150">
            </el-table-column>
            <el-table-column prop="username" label="用户名" width="130">
            </el-table-column>
            <el-table-column prop="account" label="账号" width="150">
            </el-table-column>
            <el-table-column prop="password" label="密码" width="150">
            </el-table-column>
            <el-table-column prop="sex" label="性别" width="150">
            </el-table-column>
            <el-table-column prop="age" label="年龄" width="150">
            </el-table-column>
            <el-table-column prop="college" label="学院" width="150">
            </el-table-column>
            <el-table-column prop="classname" label="班级" width="150">
            </el-table-column>
            <el-table-column prop="tel" label="电话" width="150">
            </el-table-column>
            <el-table-column prop="birthday" label="生日" width="150">
            </el-table-column>
            <el-table-column prop="roleName" label="身份" width="150">
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
        if (this.HuserForm.checkPass !== '') {
          this.$refs.HuserForm.validateField('checkPass');
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'));
      } else if (value !== this.HuserForm.password) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };
    return {
      optionRole: [{
        value: '1',
        label: '管理员'
      }, {
        value: '2',
        label: '医生'
      }, {
        value: '3',
        label: '学生'
      }],
      HuserForm: {
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
        role: '',
        classname: '',
        stuid: '',
        username: ''
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
    AddLife() {
      this.HuserForm = {};
      this.dialogFormVisibleAdd = true;
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
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          var url = `http://localhost:8080/SSM_war_exploded/Huser/updateHuser`;
          axios
            .post(url, JSON.stringify(this.HuserForm), {
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
          var url = `http://localhost:8080/SSM_war_exploded/Huser/insertHuser`;
          axios
            .post(url, JSON.stringify(this.HuserForm), {
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
      var url = `http://localhost:8080/SSM_war_exploded/Huser/selectHuserById`;
      axios
        .get(url, {
          params: {
            id: row.id,
          },
        })
        .then((res) => {
          if (res.data.status == 200) {
            this.HuserForm = res.data.data
          } else {
            this.$message({ message: '错误', type: 'error' });
          }
        });
    },
    handledelete(row) {
      var url = `http://localhost:8080/SSM_war_exploded/Huser/deleteHuser`;
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
      var url = `http://localhost:8080/SSM_war_exploded/Huser/selectAll`;
      this.pageForm.pageNo = this.currentPage,
        this.pageForm.pageSize = this.pageSize,
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
