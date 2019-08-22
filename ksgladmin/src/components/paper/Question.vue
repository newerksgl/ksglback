<template>
  <div>
    <el-row>
      <el-col :span="24">&nbsp;</el-col>
      <el-col :span="15" :offset="6">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>试题管理</el-breadcrumb-item>
        </el-breadcrumb>
      </el-col>
      <el-col :span="2" :offset="1">
        <el-button type="primary" @click="clearExas();">添加试题</el-button>
      </el-col>
    </el-row>

    <el-row>
      <el-col :offset="1">
        <el-tabs v-model="activeName">
          <el-tab-pane label="试题列表" name="first">
            <el-table :data="exasSubjectQuestion" style="width: 100%">
              <el-table-column type="expand">
                <template slot-scope="props">
                  <el-form label-position="left" inline class="demo-table-expand">
                    <el-form-item label="科目">
                      <span>{{ props.row.s.name }}</span>
                    </el-form-item>
                    <el-form-item label="题型">
                      <span>{{ props.row.q.question }}</span>
                    </el-form-item>
                    <el-form-item label="难度">
                      <span>{{ props.row.difficulty }}</span>
                    </el-form-item>
                    <el-form-item label="题干">
                      <span>{{ props.row.questionstem }}</span>
                    </el-form-item>
                    <el-form-item label="习题解析">
                      <span>{{ props.row.problem }}</span>
                    </el-form-item>
                    <el-form-item label="参考答案">
                      <span>{{ props.row.reference }}</span>
                    </el-form-item>
                    <el-form-item label="录入时间">
                      <span>{{ props.row.date }}</span>
                    </el-form-item>
                  </el-form>
                </template>
              </el-table-column>
              <el-table-column prop="s.name" label="科目"></el-table-column>
              <el-table-column prop="q.question" label="题型"></el-table-column>
              <el-table-column prop="difficulty" label="难度"></el-table-column>
              <el-table-column prop="date" label="录入时间"></el-table-column>
              <el-table-column label="操作">
                <template slot-scope="scope">
                  <label class="el-icon-edit" @click="edit(scope.row)"></label>
                  <span>&nbsp;&nbsp;</span>
                  <label class="el-icon-circle-close" @click="remove(scope.row.eid)"></label>
                </template>
              </el-table-column>
            </el-table>
          </el-tab-pane>
        </el-tabs>
      </el-col>
    </el-row>

    <el-dialog title="修改试题" :visible.sync="dialogFormVisible">
      <el-form :model="upExas">
        <el-row>
          <el-col :span="8">
            <el-form-item label="科目">
              <el-select v-model="upExas.s.name" placeholder="选择科目">
                <el-option v-for="s in Subject" :label="s.name" v-model="s.sid"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="题型">
              <el-select v-model="upExas.q.question" placeholder="选择题型">
                <el-option v-for="q in Question" :label="q.question" v-model="q.qid"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="难度">
              <el-select v-model="upExas.difficulty" placeholder="选择难度">
                <el-option label="普通" value="普通"></el-option>
                <el-option label="一般" value="一般"></el-option>
                <el-option label="困难" value="困难"></el-option>
                <el-option label="炼狱" value="炼狱"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="题干">
              <el-input type="textarea" v-model="upExas.questionStem" autocomplete="off"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="习题解析" prop="problem">
              <el-input type="textarea" v-model="upExas.problem" autocomplete="off"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="参考答案" prop="reference">
              <el-input type="textarea" v-model="upExas.reference" autocomplete="off"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="注册时间">
              <el-col :span="8" :offset="1">
                <el-date-picker
                  type="date"
                  placeholder="选择日期"
                  v-model="upExas.date"
                  style="width: 100%;"
                ></el-date-picker>
              </el-col>
              <el-col class="line" :span="1" :offset="1">-</el-col>
              <el-col :span="8" :offset="1">
                <el-time-picker placeholder="选择时间" v-model="upExas.date" style="width: 100%;"></el-time-picker>
              </el-col>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="update()">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog title="添加试题" :visible.sync="dialogFormVisible1">
      <el-form :model="Exas">
        <el-row>
          <el-col :span="8">
            <el-form-item label="科目" prop="sid">
              <el-select v-model="Exas.sid" placeholder="科目">
                <el-option label="语文" value="1"></el-option>
                <el-option label="数学" value="2"></el-option>
                <el-option label="英语" value="3"></el-option>
                <el-option label="历史" value="4"></el-option>
                <el-option label="政治" value="5"></el-option>
                <el-option label="生物" value="6"></el-option>
                <el-option label="地理" value="7"></el-option>
                <el-option label="化学" value="8"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="题型" prop="qid">
              <el-select v-model="Exas.qid" placeholder="选择题型">
                <el-option label="选择题" value="1"></el-option>
                <el-option label="填空题" value="2"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="难度" prop="difficulty">
              <el-select v-model="Exas.difficulty" placeholder="选择难度">
                <el-option label="普通" value="普通"></el-option>
                <el-option label="一般" value="一般"></el-option>
                <el-option label="困难" value="困难"></el-option>
                <el-option label="炼狱" value="炼狱"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="题干">
              <el-input type="textarea" v-model="Exas.questionStem"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="习题解析" prop="problem">
              <el-input type="textarea" v-model="Exas.problem" autocomplete="off"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="参考答案" prop="reference">
              <el-input type="textarea" v-model="Exas.reference" autocomplete="off"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="注册时间">
              <el-col :span="8" :offset="1">
                <el-date-picker
                  type="date"
                  placeholder="选择日期"
                  v-model="Exas.date"
                  style="width: 100%;"
                ></el-date-picker>
              </el-col>
              <el-col class="line" :span="1" :offset="1">-</el-col>
              <el-col :span="8" :offset="1">
                <el-time-picker placeholder="选择时间" v-model="Exas.date" style="width: 100%;"></el-time-picker>
              </el-col>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible1 = false">取 消</el-button>
        <el-button type="primary" @click="addExas()">提 交</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      activeName: "first",
      Question: [
        { qid: "1", question: "选择题", QuestionTest: "普通试题" },
        { qid: "2", question: "填空题", QuestionTest: "普通试题" }
      ],
      Subject: [
        { sid: "1", name: "语文", image: "" },
        { sid: "2", name: "数学", image: "" },
        { sid: "3", name: "英语", image: "" },
        { sid: "4", name: "历史", image: "" },
        { sid: "5", name: "政治", image: "" },
        { sid: "6", name: "生物", image: "" },
        { sid: "7", name: "地理", image: "" },
        { sid: "8", name: "化学", image: "" }
      ],
      Exas: {
        sid: "1",
        qid: "1",
        questionStem: "",
        reference: "",
        problem: "",
        difficulty: "普通",
        eid: "",
        date: "2019-08-17 11:49:11"
      },
      upExas: {
        sid: "1",
        qid: "1",
        questionStem: "",
        reference: "",
        problem: "",
        difficulty: "普通",
        eid: "1",
        date: "2019-08-17",
        s: { sid: 1, name: "语文", image: "" },
        q: { qid: 1, question: "选择题", questionTest: "" }
      },
      exasSubjectQuestion: [
        {
          sid: "1",
          qid: "1",
          questionstem: "测试1",
          reference: "",
          problem: "",
          difficulty: "一般",
          eid: "1",
          date: "2019-08-17",
          s: { sid: 1, name: "", image: "" },
          q: { qid: 1, question: "", questionTest: "" }
        }
      ],
      dialogFormVisible: false,
      dialogFormVisible1: false,
      formLabelWidth: "120px"
    };
  },
  methods: {
    clearExas() {
      var d = new Date();
      var year = d.getFullYear();
      var month = d.getMonth();
      var day = d.getDate();
      var hour = d.getHours();
      var minute = d.getMinutes();
      var second = d.getSeconds();

      this.Exas = {
        sid: "1",
        qid: "1",
        questionStem: "",
        reference: "",
        problem: "",
        difficulty: "普通",
        eid: "",
        date:
          year +
          "-" +
          (month + 1) +
          "-" +
          day +
          " " +
          hour +
          ":" +
          minute +
          ":" +
          second
      };
      this.dialogFormVisible1 = true;
    },
    addExas() {
      let config = {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      };
      this.request
        .post("exas/add", this.Exas)
        .then(res => {
          this.getTableData();
        })
        .catch(err => {
          this.$message({
            showClose: true,
            message: "请求失败",
            type: "error",
            duration: 1000
          });
        });
      this.dialogFormVisible1 = false;
    },
    getTableData() {
      this.request
        .post("exasSubjectQuestion/find")
        .then(res => {
          this.exasSubjectQuestion = res.data.data;
        })
        .catch(err => {
          this.$message({
            showClose: true,
            message: "请求失败",
            type: "error",
            duration: 1000
          });
        });

      this.request
        .post("subject/findAll")
        .then(res => {
          this.Subject = res.data;
        })
        .catch(err => {
          this.$message({
            showClose: true,
            message: "请求失败",
            type: "error",
            duration: 1000
          });
        });

      this.request
        .post("question/findAll")
        .then(res => {
          this.Question = res.data;
        })
        .catch(err => {
          this.$message({
            showClose: true,
            message: "请求失败",
            type: "error",
            duration: 1000
          });
        });
    },
    edit(row) {
      this.upExas = {
        sid: row.s.sid,
        qid: row.q.qid,
        questionStem: row.questionstem,
        reference: row.reference,
        problem: row.problem,
        difficulty: row.difficulty,
        eid: row.eid,
        date: row.date,
        s: { sid: row.s.sid, name: row.s.name, image: row.s.image },
        q: {
          qid: row.q.qid,
          question: row.q.question,
          questionTest: row.q.questionTest
        }
      };
      this.dialogFormVisible = true;
    },
    update() {
      var exas = {
        sid: this.upExas.s.sid,
        qid: this.upExas.q.qid,
        questionStem: this.upExas.questionStem,
        reference: this.upExas.reference,
        problem: this.upExas.problem,
        difficulty: this.upExas.difficulty,
        eid: this.upExas.eid,
        date: this.upExas.date
      };
      let config = {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      };
      this.request
        .post("exas/update", exas)
        .then(res => {
          if (res.data == 1) {
            this.$message({
              showClose: true,
              message: "修改成功",
              type: "success",
              duration: 1000
            });
            this.getTableData();
          } else {
            this.$message({
              showClose: true,
              message: "修改失败",
              type: "error",
              duration: 1000
            });
          }
        })
        .catch(err => {
          this.$message({
            showClose: true,
            message: "请求失败",
            type: "error",
            duration: 1000
          });
        });
      this.dialogFormVisible = false;
    },
    remove(eid) {
      const id = { id: eid };
      if (confirm("确认要删除该试题？")) {
        this.request
          .post("exas/del", id)
          .then(res => {
            if (res.data != "") {
              this.$message({
                showClose: true,
                message: "删除成功！",
                type: "success",
                duration: 1000
              });
              this.getTableData();
            } else {
              this.$message({
                showClose: true,
                message: "删除失败!",
                type: "error",
                duration: 1000
              });
            }
          })
          .catch(err => {
            this.$message({
              showClose: true,
              message: "请求失败",
              type: "error",
              duration: 1000
            });
          });
      }
    }
  },
  mounted() {
    this.getTableData();
  },
  components: {}
};
</script>

<style>
.demo-table-expand {
  font-size: 0;
}
.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}
</style>
