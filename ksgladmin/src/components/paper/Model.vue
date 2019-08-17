<template>
  <div>
    <el-row>
      <el-col :span="6" :offset="6">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>题型管理</el-breadcrumb-item>
        </el-breadcrumb>
      </el-col>
      <el-col :span="6" :offset="6">
        <el-button type="text" size="mini" @click="goAdd()">添加题型</el-button>
      </el-col>
    </el-row>
    <el-row>
      <el-col :offset="2">
        <el-tabs v-model="activeName">
          <el-tab-pane label="地区设置" name="first">
            <el-table :data="tableData" height="250" style="width: 100%">
              <el-table-column prop="qid" label="ID" width="180"></el-table-column>
              <el-table-column prop="question" label="名称" width="180"></el-table-column>
              <el-table-column label="操作">
                <template slot-scope="scope">
                  <el-button type="text" size="mini" @click="goedit(scope.row)">编辑</el-button>
                  <el-button size="mini" type="danger" @click="handleDelete(scope.row)">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-tab-pane>
        </el-tabs>
      </el-col>
    </el-row>

    <el-dialog title="编辑题型" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="ID" :label-width="formLabelWidth">
          <el-input v-model="form.qid" autocomplete="off" disabled></el-input>
        </el-form-item>
        <el-form-item label="名称" :label-width="formLabelWidth">
          <el-input v-model="form.question" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="edit()">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog title="添加题型" :visible.sync="dialogFormVisible2">
      <el-form :model="form">
        <el-form-item label="名称" :label-width="formLabelWidth">
          <el-input v-model="form.question" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible2 = false">取 消</el-button>
        <el-button type="primary" @click="addModel()">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeName: "first",
      tableData: [],
      form: {
        qid: "",
        question: ""
      },
      dialogFormVisible: false,
      dialogFormVisible2: false,
      formLabelWidth: "120px"
    };
  },
  components: {},
  methods: {
    handleDelete(row) {
      if (confirm("确认删除吗?\n此操作不可以恢复！")) {
        console.log(row.qid);
        this.request
          .post("question/del", { id: row.qid })
          .then(res => {
            this.$message({
              showClose: true,
              message: "删除成功",
              type: "success",
              duration: 1000
            });
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
      }
    },
    goedit(row) {
      this.dialogFormVisible = true;
      console.log(row.qid);
      console.log(row.question);
      this.form.qid = row.qid;
      this.form.question = row.question;
    },
    goAdd() {
      this.form.qid = "";
      this.form.question = "";
      this.dialogFormVisible2 = true;
    },
    edit() {
      const question = {
        qid: this.form.qid,
        question: this.form.question
      };
      this.request
        .post("question/update", question)
        .then(res => {
          this.$message({
            showClose: true,
            message: "修改成功",
            type: "success",
            duration: 1000
          });
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

      this.dialogFormVisible = false;
    },
    addModel() {
      const question = {
        question: this.form.question
      };
      this.request
        .post("question/add", question)
        .then(res => {
          this.$message({
            showClose: true,
            message: "添加成功",
            type: "success",
            duration: 1000
          });
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

      this.dialogFormVisible2 = false;
    },
    getTableData() {
      this.request
        .post("question/findAll")
        .then(res => {
          this.tableData = res.data;
          console.log(res.data);
          //   }
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
  },
  mounted() {
    this.getTableData();
  }
};
</script>

<style>
</style>
