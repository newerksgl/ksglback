<template>
  <div>
    <el-row>
      <el-col :span="6" :offset="6">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>地区设置</el-breadcrumb-item>
        </el-breadcrumb>
      </el-col>
      <el-col :span="6" :offset="6">
        <el-button type="text" size="mini" @click="goAdd()">添加地区</el-button>
      </el-col>
    </el-row>
    <el-row>
      <el-col :offset="2">
        <el-tabs v-model="activeName">
          <el-tab-pane label="地区设置" name="first">
            <el-table :data="tableData" height="250" style="width: 100%">
              <el-table-column prop="reid" label="ID" width="180"></el-table-column>
              <el-table-column prop="name" label="名称" width="180"></el-table-column>
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

    <el-dialog title="编辑地区" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="ID" :label-width="formLabelWidth">
          <el-input v-model="form.reid" autocomplete="off" disabled></el-input>
        </el-form-item>
        <el-form-item label="名称" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="edit()">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog title="添加地区" :visible.sync="dialogFormVisible2">
      <el-form :model="form">
        <el-form-item label="名称" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off"></el-input>
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
        reid: "",
        name: ""
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
        console.log(row.reid);
        this.request
          .post("region/del", { id: row.reid })
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
      console.log(row.reid);
      console.log(row.name);
      this.form.reid = row.reid;
      this.form.name = row.name;
    },
    goAdd() {
      this.form.reid = "";
      this.form.name = "";
      this.dialogFormVisible2 = true;
    },
    edit() {
      const question = {
        reid: this.form.reid,
        name: this.form.name
      };
      this.request
        .post("region/update", question)
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
        name: this.form.name
      };
      this.request
        .post("region/add", question)
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
        .post("region/findAll")
        .then(res => {
          this.tableData = res.data;

          console.log(res.data);
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
