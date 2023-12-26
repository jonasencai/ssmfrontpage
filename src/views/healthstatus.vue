<template>
  <span>
    <el-dialog id="dialog" title="健康状况修改" :visible.sync="dialogFormVisible">
      <el-form :model="healthForm" ref="healthForm">
        <el-form-item label="学号" prop="stuid" >
          <el-input v-model="healthForm.stuid" autocomplete="off" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="生活作息选择" prop="lifeid" v-if="this.user.data.role == 3">
          <el-select v-model="healthForm.lifeid" no-data-text="请选择" >
            <el-option v-for="item in lifeoptions" :key="item.id" :label="item.tittle" :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="运动记录选择" prop="sportid" v-if="this.user.data.role == 3">
          <el-select v-model="healthForm.sportid" no-match-text="请选择">
            <el-option v-for="item in sportoptions" :key="item.tittle" :label="item.tittle" :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="疾病记录选择" prop="illid" v-if="this.user.data.role == 3">
          <el-select v-model="healthForm.illid" no-data-text="请选择">
            <el-option v-for="item in illoptions" :key="item.id" :label="item.tittle" :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="体检报告选择" prop="pexaminationid" v-if="this.user.data.role == 3">
          <el-select v-model="healthForm.pexaminationid" no-data-text="请选择">
            <el-option v-for="item in pexaminationoptions" :key="item.id" :label="item.tittle" :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="建议" prop="suggestion" v-if="this.user.data.role == 2">
          <el-input v-model="healthForm.suggestion" autocomplete="off" ></el-input>
        </el-form-item>
        <el-form-item label="健康打分" prop="healthscore" v-if="this.user.data.role == 2">
          <el-input v-model="healthForm.healthscore" autocomplete="off" ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm('healthForm')">确 定</el-button>
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
          健康状况管理
          <button v-on:click="changePassword()" style="right: -78%;position: relative;">修改密码</button>
          <button v-on:click="logout()" style="right: -79%;position: relative;">退出登录</button>
        </div>
        <el-header style="
            text-align: left;
            font-size: 12px;
            width: 100%;
            background-color: aliceblue;">

          <div v-if="this.user.data.role == 3">
            目前您的健康状况为：{{ healthstatus }},点击查看您的健康状况曲线
            <el-button @click="showData()">显示健康曲线</el-button>
            <el-button @click="displayData()">显示表格数据</el-button>

          </div>
          <div style="width: 100%; display: inline-block;" v-if="this.user.data.role == 2">
            <!-- <div style="width: 15%;height: 10%;"> -->
              学号<el-input v-model="pageForm.stuid" style="width: 15%;" ></el-input>&nbsp;  
              测试时间<el-input v-model="pageForm.date" style="width: 15%;" ></el-input>&nbsp;  
              <el-button @click="selectall">搜索</el-button>
          </div>

          <span></span>
        </el-header>
        <el-main style="height: 100%; padding: 0px;">
          <div style="height: 100%; background-color: aliceblue;">
            <div id="main" style="width: 500px;height:400px;background-color: aliceblue;position:absolute; left: 37%;"
              v-show="showLine == true">
            </div>

            <el-table :data="tableData" style="width: 100%; text-align: center; height: 100%;font-size: larger;"
              v-if="showtableData == true">
              <el-table-column prop="stuid" label="学号" width="150">
              </el-table-column>
              <el-table-column prop="lifetittle" label="生活作息" width="200">
              </el-table-column>
              <el-table-column prop="sporttittle" label="运动记录" width="200">
              </el-table-column>
              <el-table-column prop="illtittle" label="疾病记录" width="200">
              </el-table-column>
              <el-table-column prop="pexaminationtittle" label="体检报告" width="200">
              </el-table-column>
              <el-table-column prop="pic" label="体检报告图片" width="160">
                <template slot-scope="scope1">
                  <el-image style="width: 100px; height: 100px" :src=scope1.row.pic :preview-src-list=[scope1.row.pic]>
                  </el-image>
                </template>
              </el-table-column>
              <el-table-column prop="questionscore" label="问卷分数" width="100">
              </el-table-column>
              <el-table-column prop="suggestion" label="医生建议" width="200">
              </el-table-column>
              <el-table-column prop="date" label="日期" width="200">
              </el-table-column>
              <el-table-column prop="healthscore" label="健康分数" width="100">
              </el-table-column>
              <el-table-column fixed="right" label="操作" width="150" v-if="this.user.data.role == 3">
                <template slot-scope="scope" >
                  <el-button type="text" size="small" @click="handleClick(scope.row)">编辑</el-button>
                </template>
              </el-table-column>
              <el-table-column fixed="right" label="操作" width="150" v-if="this.user.data.role == 2">
                <template slot-scope="scope">
                  <el-button type="text" size="small" @click="handleClick(scope.row)">打分</el-button>
                  <el-button type="text" size="small" @click="handledelete(scope.row)" >删除</el-button>
                </template>
              </el-table-column>
            </el-table>
            <div class="block" v-if="showtableData == true">
              <span class="demonstration"></span>
              <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
                :current-page="currentPage" :page-sizes="[5, 8, 10]" :page-size="pageSize"
                layout="total, sizes, prev, pager, next, jumper" :total="total" style="background-color: #eee">
              </el-pagination>
            </div>
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
      showtableData: true,
      showLine: false,
      xAxisData: [],
      seriesData: [],
      healthForm: {
        stuid: '',
        username: '',
        date: '',
        time: '',
        tittle: '',
        lifeid:'',
        sportid:'',
        illid:'',
        pexaminationid:''
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
      lifeoptions: [],
      sportoptions: [],
      illoptions:[],
      pexaminationoptions:[],
      selectuser_type: "",
      selectaccount: "",
      healthstatus:''
    };
  },
  methods: {
    displayData() {
      this.showLine = false;
      this.showtableData = true;

    },
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
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          var url = `http://localhost:8080/SSM_war_exploded/HealthStatus/updateHealthStatus`;
          axios
            .post(url, JSON.stringify(this.healthForm), {
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
          var url = `http://localhost:8080/SSM_war_exploded/HealthStatus/insertLife`;
          this.healthForm.stuid = this.user.data.stuid;
          this.healthForm.username = this.user.data.username;
          axios
            .post(url, JSON.stringify(this.healthForm), {
              headers: { 'Content-Type': 'application/json' },
            })
            .then((res) => {
              if (res.status == 200) {
                this.$message({ message: '新增成功', type: 'success' });
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
      var url = `http://localhost:8080/SSM_war_exploded/HealthStatus/selectHealthStatusById`;
      axios
        .get(url, {
          params: {
            id: row.id,
          },
        })
        .then((res) => {
          if (res.data.status == 200) {
            this.healthForm = res.data.data
          } else {
            this.$message({ message: '错误', type: 'error' });
          }
        });
        this.optionsDataget(row);
    },
    optionsDataget(row) {
      var url = `http://localhost:8080/SSM_war_exploded/HealthStatus/optionsDataget`;
      axios
        .get(url, {
          params: {
            stuid: row.stuid,
          },
        })
        .then((res) => {
          if (res.data.status == 200) {
           this.illoptions = res.data.data[0];
            this.sportoptions = res.data.data[1];
            this.lifeoptions = res.data.data[2];
            this.pexaminationoptions = res.data.data[3];


          } else {
            this.$message({ message: '错误', type: 'error' });
          }
        });
    },
    handledelete(row) {
      var url = `http://localhost:8080/SSM_war_exploded/HealthStatus/deleteHealthStatus`;
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
      
      var url = `http://localhost:8080/SSM_war_exploded/HealthStatus/selectAll`;
      this.pageForm.pageNo = this.currentPage;
      if(this.user.data.role ==3){
        this.pageForm.stuid = this.user.data.stuid;
      };
      this.pageForm.pageSize = this.pageSize;
       
        axios
          .post(url, this.pageForm)
          .then((res) => {
            if (res.data.status == 200) {
              for (let index = 0; index < res.data.data.pages.length; index++) {
                res.data.data.pages[index].pic = "/SSM_war_exploded" + res.data.data.pages[index].pic;
                this.xAxisData.push(res.data.data.pages[index].date);
                this.seriesData.push(res.data.data.pages[index].healthscore);
              }
              this.healthstatus = res.data.data.pages[0].healthstatus;
              this.xAxisData = this.rev(this.xAxisData);
              this.seriesData = this.rev(this.seriesData);
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
    drawChart() {
      //2. 基于准备好的dom，初始化echarts实例
      var myChart = this.$echarts.init(document.getElementById('main'));
      //3. 指定图表的配置项和数据
      var option = {
        title: {
          text: 'healthStatus Line'
        },
        tooltip: {
          trigger: 'axis'
        },
        legend: {},
        toolbox: {
          show: true,
          feature: {
            dataZoom: {
              yAxisIndex: 'none'
            },
            dataView: { readOnly: false },
            magicType: { type: ['line', 'bar'] },
            restore: {},
            saveAsImage: {}
          }
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: this.xAxisData
        },
        yAxis: {
          type: 'value',
        },
        series: [
          {
            name: 'Search Engine',
            type: 'line',
            data: this.seriesData,
            markPoint: {
              data: [
                { type: 'max', name: 'Max' },
                { type: 'min', name: 'Min' }
              ]
            },
            markLine: {
              data: [{
                name: '阈值',
                yAxis: 50
              }],
              lineStyle: {
                color: '#'
              }
            }
          }
        ]
      };
      //4.使用刚指定的配置项和数据显示图表。
      myChart.setOption(option);

    },
    showData() {
      this.showLine = true;
      this.showtableData = false;
      console.log(document.getElementById('main'));

      this.drawChart();
    },
    rev(arr1) {
      var list = [];
      for (let i = arr1.length - 1; i >= 0; i--) {
        list[arr1.length - i - 1] = arr1[i];
      }
      console.log("反转后的数据：" + list);
      return list;
    }
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
