<template>
  <div>
    <el-row>
      <el-col :span="6" :offset="6">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>试题管理</el-breadcrumb-item>
        </el-breadcrumb>
      </el-col>
      <el-col :span="6" :offset="6">
        <el-button type="text" size="mini" @click="goAdd()">添加分类</el-button>
      </el-col>
    </el-row>
    <el-row>
      <el-col :offset="2">
        <el-tabs v-model="activeName">
          <el-tab-pane label="分类管理" name="first">
            <el-table :data="tableData" height="250" style="width: 100%">
              <el-table-column prop="sid" label="ID" width="180"></el-table-column>
              <el-table-column prop="image" label="略缩图" width="180"></el-table-column>
              <el-table-column prop="name" label="名称"></el-table-column>
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
    <el-dialog title="编辑分类" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="ID" :label-width="formLabelWidth">
          <el-input v-model="form.sid" autocomplete="off" disabled></el-input>
        </el-form-item>
        <el-form-item label="略缩图" :label-width="formLabelWidth">
          <el-input v-model="form.image" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="名称" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog title="添加分类" :visible.sync="dialogFormVisible1">
      <el-form :model="form">
        <el-form-item label="略缩图" :label-width="formLabelWidth">
          <el-row>
            <el-col :span="16">
              <img :src="form.image" alt style="width:300px;" />
            </el-col>
            <el-col :span="8">
              <el-upload action="#" list-type="picture-card" :before-upload="beforeupload">
                <i slot="default" class="el-icon-plus" @click="show(file)"></i>
              </el-upload>
            </el-col>
          </el-row>
          <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt />
          </el-dialog>
        </el-form-item>
        <el-form-item label="名称" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible1 = false">取 消</el-button>
        <el-button type="primary" @click="addFenLei()">确 定</el-button>
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
      tableData: [
        {
          sid: "1",
          name: ".NET",
          image: ""
        },
        {
          sid: "2",
          name: "Java",
          image: ""
        }
      ],
      dialogImageUrl: "",
      dialogVisible: false,
      disabled: false,
      dialogFormVisible: false,
      dialogFormVisible1: false,
      form: {
        name: "",
        sid: "",
        image: ""
      },
      formLabelWidth: "120px",
      param: ""
    };
  },
  methods: {
    show(file) {
      console.log(file.url);
    },
    addFenLei() {
      //下面append的东西就会到form表单数据的fields中；
      this.param.append("name", this.form.name);
      let config = {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      };
      axios
        .post("http://192.168.43.29:9999/subject/add", this.param, config)
        .then(res => {
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

      //然后通过下面的方式把内容通过axios来传到后台
      //下面的this.$reqs 是在主js中通过Vue.prototype.$reqs = axios 来把axios赋给它;
      console.log(11);
      this.dialogFormVisible1 = false;
    },
    beforeupload(file) {
      console.log(file);
      //创建临时的路径来展示图片
      var windowURL = window.URL || window.webkitURL;

      this.form.image = windowURL.createObjectURL(file);
      //重新写一个表单上传的方法
      this.param = new FormData();
      this.param.append("image", file, file.name);
    },
    getTableData() {
      this.request
        .post("subject/findAll")
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
    },
    edit(row) {
      this.dialogFormVisible = true;
      console.log(row.sid);
      console.log(row.image);
      console.log(row.name);
      this.form.sid = row.sid;
      this.form.image = row.image;
      this.form.name = row.name;
    },
    goAdd() {
      this.form.sid = "";
      this.form.image = "";
      this.form.name = "";
      this.dialogFormVisible1 = true;
    },
    handleDelete(row) {
      const id = row.sid;
      this.request
        .post("subject/findAll", { sid: id })
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
  },
  mounted() {
    // this.getTableData();
  },
  components: {}
};
</script>

<style>
</style>
