<template>
  <span>
    <el-dialog id="Qdialog" title="修改问卷" :visible.sync="dialogFormVisibleQ" style="height: 100%;">
      <el-transfer v-model="valueQ" :data="dataQ" :titles="['试题库', '已选择的问卷']"></el-transfer>
      <el-footer>
        <el-button @click="submitQList" style="position: absolute; right: 29%">提交</el-button>
        <el-button @click="dialogFormVisibleQ = false" style="position: absolute; right: 19%">取消</el-button>
      </el-footer>
    </el-dialog>

    <el-dialog id="Studialog" title="发布问卷" :visible.sync="dialogFormVisibleStu" style="height: 100%;">
      <el-transfer v-model="valueStu" :data="Studata" :titles="['所有学生', '已选择的学生']"></el-transfer>
      <el-footer>
        <el-button @click="submitStuList" style="position: absolute; right: 29%">提交</el-button>
        <el-button @click="dialogFormVisibleStu = false" style="position: absolute; right: 19%">取消</el-button>
      </el-footer>
    </el-dialog>

    <el-dialog id="dialog" title="成绩修改" :visible.sync="dialogFormVisible">
      <el-form :model="questioAnForm" ref="questioAnForm">
        <el-form-item label="题目" prop="question">
          <el-input v-model="questioAnForm.question" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="选项A" prop="optA">
          <el-input v-model="questioAnForm.optA" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="选项B" prop="optB">
          <el-input v-model="questioAnForm.optB" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="选项C" prop="optC">
          <el-input v-model="questioAnForm.optC" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm('questioAnForm')">确 定</el-button>
        <el-button @click="dialogFormVisible = false">取 消</el-button>
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
          问卷管理
          <button v-on:click="changePassword()" style="right: -80.5%;position: relative;">修改密码</button>
          <button v-on:click="logout()" style="right: -81.5%;position: relative;">退出登录</button>

        </div>
        <el-header style="
            text-align: left;
            font-size: 12px;
            width: 100%;
            background-color: aliceblue;">
          <div v-if="this.user.data.role == 2">
            目前共有{{ qnListNo }}套问卷.
            请选择第<el-select v-model="selectqnListNo" placeholder="请选择" style="width: 100px;">
              <el-option v-for="item in options" :key="item" :label="item" :value="item">
              </el-option>
            </el-select>套问卷进行
            <el-button @click="updateQuestionnare" :disabled="selectqnListNo == 0">修改</el-button>
            <el-button @click="showScore" :disabled="selectqnListNo == 0">查看成绩</el-button>

            <el-button @click="sendQuestionnare" :disabled="selectqnListNo == 0">发布问卷</el-button>
          </div>
          <div v-if="this.user.data.role == 3" style="width: 100%;background-color: aliceblue;">
            目前你有{{ DoqnListNo }}套调查问卷需要填写，请选择你需要填写的调查问卷
            <el-select v-model="selectqnListNo" placeholder="请选择" style="width: 100px;">
              <el-option v-for="item in optionsDo" :key="item" :label="item" :value="item">
              </el-option>
            </el-select>
            <el-button @click="selectQuestions" :disabled="selectqnListNo == 0">开始填写调查问卷</el-button>
          </div>
          <span></span>
        </el-header>
        <el-main style="height: 100%; padding: 0px;background-color:aliceblue">
          <div style="height: 100%;background-color: aliceblue;" v-if="this.user.data.role == 3">
            <div style="text-align: left;padding-left:30%;" v-if="showsubmitbutton == true">
              <div style="text-align: left;font-size:50px">心理健康测试</div>
              <div style="text-align: left;font-size:20px;width:500px">指导语:测试中每个问题有三种答案可供选择，请选择
                与自己实际情况最接近的一个答案。</div>
              <div v-for="(item, i) in optionsQuestions" style="text-align: left;width: 500px;">
              {{ i + 1 }}、{{item.question }} </br>
                <el-radio-group v-model="radios[i].value">
                  <el-radio :label="1" :value="1">{{ item.optA }}</el-radio>
                  <el-radio :label="2" :value="2">{{ item.optB }}</el-radio>
                  <el-radio :label="3" :value="3">{{ item.optC }}</el-radio>
                </el-radio-group>
              </div>
              <div style="text-align: right;  width: 500px;">
                <el-button @click="submitQuestion" v-if="showsubmitbutton == true">提交问卷</el-button>
              </div>
            </div>
          </div>
          <el-table :data="tableData" style="width: 100%; text-align: center; height: 100%;font-size: larger;
          "
            v-if="this.user.data.role == 2 && showTable == true">
            <el-table-column prop="id" label="序号" width="100">
            </el-table-column>
            <el-table-column prop="questionnaireid" label="卷号" width="300">
            </el-table-column>
            <el-table-column prop="stuid" label="学号" width="240">
            </el-table-column>
            <el-table-column prop="date" label="日期" width="240">
            </el-table-column>
            <el-table-column prop="score" label="分数" width="240">
            </el-table-column>
            <el-table-column fixed="right" label="操作" width="150">
              <template slot-scope="scope">
                <el-button type="text" size="small" @click="handleClick(scope.row)">编辑</el-button>
                <el-button type="text" size="small" @click="handledelete(scope.row)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
          <div class="block"   v-if="this.user.data.role == 2 && showTable == true">
            <span class="demonstration"></span>
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
              :current-page="currentPage" :page-sizes="[3, 5, 8, 10]" :page-size="pageSize"
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
    return {
      qnListNo: '',
      DoqnListNo: '',
      questionList: [],
      dataQ: [],
      valueQ: [],
      Studata: [],
      valueStu: [],
      selectqnListNo: '',
      radios: [],
      opt: {
        id: '',
        opt: ''
      },
      questioAnForm: {
        id: '',
        question: '',
        optA: '',
        optB: '',
        optC: '',
      },
      pageForm: {
        pageNo: '',
        pageSize: '',
        user_type: '',
        Account: '',
        user_name: '',
      },
      updateForm: {},
      tableData: [],
      dialogFormVisible: false,
      dialogFormVisibleAdd: false,
      dialogFormVisibleQ: false,
      dialogFormVisibleStu: false,
      circleUrl:
        "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
      sizeList: ["large", "medium", "small"],
      user_name: "2222",
      user: "",
      options: [],
      optionsDo: [],
      optionsQuestions: [],
      insertForm: {
        id: "",
        qnList: []
      },
      showTable:false,
      insertScoreForm: {},
      scoreForm: {},
      currentPage: 1,
      pageSize: 5,
      total: 99,
      submitQuestionForm: {},
      showsubmitbutton: false,
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
    submitQuestion() {
      var url = `http://localhost:8080/SSM_war_exploded/QuestionnaireScore/updateQuestionnaireScoreforScore`;
      var optS = [];
      for (var i = 0; i < this.radios.length; i++) {
        if(this.radios[i].value != '' && this.radios[i].value != null){
          optS.push(this.radios[i].value);

        }
      };
      if(optS.length!=10){
        this.$message({ message: '请选择完10题', type: 'error' });
      } else {
        this.submitQuestionForm.optlist = optS;
      this.submitQuestionForm.questionnaireid = this.selectqnListNo,
        this.submitQuestionForm.stuid = this.user.data.stuid;
      axios
        .post(url, this.submitQuestionForm)
        .then((res) => {
          if (res.status == 200) {

            this.$message({ message: '提交问卷成功', type: 'success' });
            this.selectall();
            this.showsubmitbutton = false;
            location.reload();
          } else {
            this.$message({ message: '提交问卷失败错误', type: 'error' });
          }
        });
      }
    },
    selectQuestions() {
      this.showsubmitbutton = true;
      console.log(this.radios);
      this.radios.length = 0;
      var url = `http://localhost:8080/SSM_war_exploded/QuestionnaireScore/selectQuestionSByStuid`;
      axios
        .get(url, {
          params: {
            id: this.selectqnListNo,
          },
        })
        .then((res) => {
          if (res.status == 200) {
            this.optionsQuestions = res.data.data;
            for (var i = 0; i < this.optionsQuestions.length; i++) {
              var optQ = {};
              optQ.key = i;
              optQ.value = "";
              this.radios.push(optQ);
            }
          } else {
            this.$message({ message: '查询错误', type: 'error' });
          }
          this.addUser = false;
        });
    },
    sendQuestionnare() {
      this.dialogFormVisibleStu = true;
      var url = `http://localhost:8080/SSM_war_exploded/Questionnaire/selectAllHuserByRole`;
      axios
        .get(url)
        .then((res) => {
          if (res.status == 200) {
            this.Studata = this.showStuList(res.data.data);
          } else {
            this.$message({ message: '查询错误', type: 'error' });
          }
          this.addUser = false;
        });
    },
    showScore() {
      this.showTable=true;
      var url = `http://localhost:8080/SSM_war_exploded/QuestionnaireScore/selectAll`;
      this.scoreForm.questionnaireid = this.selectqnListNo;
      this.scoreForm.pageNo = this.currentPage;
      this.scoreForm.pageSize = this.pageSize;
      axios
        .post(url, this.scoreForm)
        .then((res) => {
          if (res.status == 200) {
            this.tableData = res.data.data.pages;
            this.total = res.data.data.total;
            console.log(this.tableData.length);
            console.log(this.total);
            console.log(this.pageSize);
          } else {
            this.$message({ message: '查询失败', type: 'error' });

          }
          this.addUser = false;
        });
    },
    updateQuestionnare() {
      var url = `http://localhost:8080/SSM_war_exploded/Question/selectAll`;
      this.pageForm.pageNo = 1,
        this.pageForm.pageSize = 100,
        axios
          .post(url, this.pageForm)
          .then((res) => {
            if (res.status == 200) {
              this.dataQ = this.showQList(res.data.data.pages);
            } else {
              this.$message({ message: '退出登录错误', type: 'error' });
            }
            this.addUser = false;
          });
      this.addValue();
      this.dialogFormVisibleQ = true;
    },
    addValue() {
      var url = `http://localhost:8080/SSM_war_exploded/Questionnaire/selectQuestionnaireListById`;
      axios
        .get(url, {
          params: {
            id: this.selectqnListNo,
          },
        })
        .then((res) => {
          if (res.status == 200) {
            this.valueQ = res.data.data
            console.log(this.valueQ);
          } else {
            this.$message({ message: '查询错误', type: 'error' });
          }
          this.addUser = false;
        });
    },
    showQList(list) {
      const dataQ = [];
      for (let i = 0; i < list.length; i++) {
        dataQ.push({
          key: list[i].id,
          label: `${list[i].question}`,
        });
      }
      return dataQ;
    },
    submitStuList() {
      var url = `http://localhost:8080/SSM_war_exploded/QuestionnaireScore/insertQuestionnairesocre`;
      this.insertScoreForm.questionnaireid = this.selectqnListNo,
        this.insertScoreForm.stuidList = this.valueStu,
        axios
          .post(url, this.insertScoreForm)
          .then((res) => {
            if (res.status == 200) {
              this.$message({ message: '发布问卷成功', type: 'success' });

            } else {
              this.$message({ message: '问卷生成失败', type: 'error' });
            }
            this.dialogFormVisibleStu = false;
          });
    },
    submitQList() {
      if (this.valueQ.length != 10) {
        this.$message({ message: '问卷题目必须为10题', type: 'error' });
      } else {
        var url = `http://localhost:8080/SSM_war_exploded/Questionnaire/updateQuestionnaire`;
        this.insertForm.id = this.selectqnListNo,
          this.insertForm.qnList = this.valueQ,
          axios
            .post(url, this.insertForm)
            .then((res) => {
              if (res.status == 200) {
                this.$message({ message: '问卷修改成功', type: 'success' });

              } else {
                this.$message({ message: '问卷修改失败', type: 'error' });
              }
              this.dialogFormVisibleQ = false;
            });
      }

    },
    showStuList(list) {
      const Studata = [];
      for (let i = 0; i < list.length; i++) {
        Studata.push({
          key: list[i].stuid,
          label: `${list[i].username}`,
        });
      }
      return Studata;
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
          var url = `http://localhost:8080/SSM_war_exploded/Question/updateQuestions`;
          axios
            .post(url, JSON.stringify(this.questioAnForm), {
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
          var url = `http://localhost:8080/SSM_war_exploded/Question/insertQuestions`;
          axios
            .post(url, JSON.stringify(this.questioAnForm), {
              headers: { 'Content-Type': 'application/json' },
            })
            .then((res) => {
              if (res.status == 200) {
                this.$message({ message: '新增成功', type: 'success' });
                this.dialogFormVisibleAdd = false;
                this.selectall();
              } else {
                this.$message({ message: '新增失败', type: 'error' });
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
      var url = `http://localhost:8080/SSM_war_exploded/Question/selectQuestionsById`;
      axios
        .get(url, {
          params: {
            id: row.id,
          },
        })
        .then((res) => {
          if (res.data.status == 200) {
            this.questioAnForm = res.data.data
          } else {
            this.$message({ message: '错误', type: 'error' });
          }
        });
    },
    handledelete(row) {
      var url = `http://localhost:8080/SSM_war_exploded/Question/deleteQuestions`;
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
            this.$message({ message: '删除失败', type: 'error' });
          }
        });
    },
    selectall() {
      var url = `http://localhost:8080/SSM_war_exploded/Questionnaire/selectAll`;
      axios
        .post(url)
        .then((res) => {
          if (res.data.status == 200) {
            this.options = res.data.data;
            this.qnListNo = this.options.length;
          } else {
            this.$message({ message: '查询错误', type: 'error' });
          }
        });
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      console.log(this.tableData);
      this.pageSize = val; //动态改变
      this.showScore();
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.currentPage = val; //动态改变
      this.showScore();
    },

    selectList() {
      var url = `http://localhost:8080/SSM_war_exploded/QuestionnaireScore/selectQuestionnaireByStuid`;
      axios
        .get(url, {
          params: {
            stuid: this.user.data.stuid,
          },
        })
        .then((res) => {
          if (res.data.status == 200) {
            this.optionsDo = res.data.data;
            this.DoqnListNo = this.optionsDo.length;
          } else {
            this.$message({ message: '查询错误', type: 'error' });
          }
        });
    }
  },
  created() {
    this.user = JSON.parse(localStorage.getItem("user"));

    // this.selectallRoles();
  },
  mounted() {
    console.log(JSON.parse(localStorage.getItem("user")));
    this.selectall();
    this.selectList();
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
