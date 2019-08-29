<template>
  <div>
    <el-row>
      <el-col :span="6" :offset="6">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>课程管理</el-breadcrumb-item>
        </el-breadcrumb>
      </el-col>
      <el-col :span="6" :offset="6">
        <el-button type="text" size="mini" @click="goAddKc()">添加课程</el-button>
      </el-col>
    </el-row>
    <el-row>
      <el-col :offset="2">
        <el-tabs v-model="activeName">
          <el-tab-pane label="课程管理" name="first">
            <el-table :data="tableData" height="250" style="width: 100%">
              <el-table-column prop="id" label="ID" width="180"></el-table-column>
              <el-table-column prop="title" label="标题" width="180"></el-table-column>
              <el-table-column prop="image" label="略缩图" width="180">
                <template slot-scope="scope">
                  <img :src="scope.row.image" />
                </template>
              </el-table-column>
              <el-table-column prop="address" label="视频地址" width="180"></el-table-column>
              <el-table-column prop="introduce" label="课程介绍"></el-table-column>
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
    <el-dialog title="添加课程" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="ID" :label-width="formLabelWidth">
          <el-input v-model="form.id" autocomplete="off" disabled></el-input>
        </el-form-item>
        <el-form-item label="标题" :label-width="formLabelWidth">
          <el-input v-model="form.title" autocomplete="off"></el-input>
        </el-form-item>
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
        <el-form-item label="章节" :label-width="formLabelWidth">
          <el-select v-model="form.ctid" placeholder="请选择">
            <el-option value="" key="" label="请选择"></el-option>
            <el-option
              v-for="item in chapterTestdata"
              :key="item.ctid"
              :label="item.catalog"
              :value="item.ctid">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="视频地址" :label-width="formLabelWidth">
          <el-input v-model="form.address" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="课程介绍" :label-width="formLabelWidth">
          <el-input v-model="form.introduce" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleAdd()">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog title="编辑课程" :visible.sync="dialogFormVisible1">
      <el-form :model="form">
        <el-form-item label="ID" :label-width="formLabelWidth">
          <el-input v-model="form.id" autocomplete="off" disabled></el-input>
        </el-form-item>
        <el-form-item label="标题" :label-width="formLabelWidth">
          <el-input v-model="form.title" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="略缩图" :label-width="formLabelWidth">
          <el-input v-model="form.image" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="视频地址" :label-width="formLabelWidth">
          <el-input v-model="form.address" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="课程介绍" :label-width="formLabelWidth">
          <el-input v-model="form.introduce" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible1 = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible1 = false">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import axios from "axios"
export default {
  data() {
    return {
      activeName: "first",
      dialogFormVisible: false,
      dialogFormVisible1: false,
      form: {
        title: "",
        image: "",
        address: "",
        introduce: "",
        ctid:null
      },
      chapterTestdata:[],
      tableData: [
        {
          id: "1",
          title: "西游记",
          image: "",
          address: "",
          introduce: ""
        },
        {
          id: "2",
          title: "水浒传",
          image: "",
          address: "",
          introduce: ""
        }
      ],
      dialogImageUrl: "",
      dialogVisible: false,
      formLabelWidth: "120px",
      param: ""
    };
  },
  methods: {
    getTableData(){
      this.request
        .post("curriculumstypes/findAll")
        .then(res => {
            this.tableData = res.data;
        })
        .catch(err => {
          this.$message({
            showClose: true,
            message: '请求失败',
            type: 'error',
            duration: 1000
          });
        });
    },
    goAddKc() {
      this.form.id = "";
      this.form.title = "";
      this.form.image = "";
      this.form.address = "";
      this.form.introduce = "";
      this.dialogFormVisible = true;
    },
    edit(row) {
      this.dialogFormVisible1 = true;

      this.form.id = row.id;
      this.form.title = row.title;
      this.form.image = row.image;
      this.form.address = row.address;
      this.form.introduce = row.introduce;
    },
    handleDelete(row) {
      const id = row.id;
      this.request
        .post("curriculumstypes/del", { id: id })
        .then(res => {
          if (res.data != "") {
            this.$message({
              showClose: true,
              message: "删除成功！",
              type: "success",
              duration: 1000
            });
            this.getTableData();z
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
    },
    getChapterTestData(){
      this.request
        .post("chaptertest/findAll")
        .then(res => {
            this.chapterTestdata = res.data;
        })
        .catch(err => {
          this.$message({
            showClose: true,
            message: '请求失败',
            type: 'error',
            duration: 1000
          });
        });
    },
    handleAdd(){
      this.param.append("title", this.form.title);
      this.param.append("introduce", this.form.introduce);
      this.param.append("ctid", this.form.ctid);
      this.param.append("address", this.form.address);
      let config = {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      };
      axios
        .post("http://localhost:9999/curriculumstypes/add", this.param, config)
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
  },
  components: {},
  mounted(){
    this.getTableData();
    this.getChapterTestData();
  }
};
</script>

<style>
</style>
