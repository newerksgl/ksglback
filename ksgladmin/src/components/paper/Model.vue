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
                  <el-button type="text" size="mini" @click="edit(scope.row)">编辑</el-button>
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
        <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
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
        <el-button type="primary" @click="dialogFormVisible2 = false">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeName: "first",
      tableData: [
        {
          qid: "1",
          question: "选择题"
        },
        {
          qid: "2",
          question: "填空题"
        }
      ],
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
    edit(row) {
      this.dialogFormVisible = true;
      console.log(row.reid);
      console.log(row.name);
      this.form.qid = row.qid;
      this.form.question = row.question;
    },
    goAdd() {
      this.form.question = "";
      this.dialogFormVisible2 = true;
    }
  }
};
</script>

<style>
</style>
