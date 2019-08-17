<template>
  <div>
    <el-row class="tac">
      <el-col :span="3" :offset="1">
        <el-menu router :default-active="activeIndex" class="el-menu-vertical-demo">
          <el-menu-item index="shouye">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>首页</span>
            </template>
          </el-menu-item>
          <el-menu-item index="ccie">
            <i class="el-icon-menu"></i>
            <span slot="title">证书管理</span>
          </el-menu-item>
        </el-menu>
      </el-col>
      <el-col :span="16">
        <div>
          <el-row>
            <el-col :span="6" :offset="6">
              <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item>证书管理</el-breadcrumb-item>
              </el-breadcrumb>
            </el-col>
            <el-col :span="6" :offset="6">
              <el-button type="text" size="mini" @click="goAdd()">添加证书</el-button>
            </el-col>
          </el-row>
          <el-row>
            <el-col :offset="2">
              <el-tabs v-model="activeName">
                <el-tab-pane label="证书管理" name="first">
                  <el-table :data="tableData" height="250" border style="width: 100%">
                    <el-table-column prop="id" label="ID" width="180"></el-table-column>
                    <el-table-column prop="image" label="略缩图" width="180"></el-table-column>
                    <el-table-column prop="name" label="标题"></el-table-column>
                    <el-table-column prop="price" label="价值"></el-table-column>
                    <el-table-column prop="time" label="添加时间"></el-table-column>
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
          <el-dialog title="编辑证书" :visible.sync="dialogFormVisible">
            <el-form :model="form">
              <el-form-item label="ID" :label-width="formLabelWidth">
                <el-input v-model="form.id" autocomplete="off" disabled></el-input>
              </el-form-item>
              <el-form-item label="略缩图" :label-width="formLabelWidth">
                <el-input v-model="form.image" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="标题" :label-width="formLabelWidth">
                <el-input v-model="form.name" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="价值" :label-width="formLabelWidth">
                <el-input v-model="form.price" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="添加时间" :label-width="formLabelWidth">
                <el-input v-model="form.time" autocomplete="off"></el-input>
              </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click="dialogFormVisible = false">取 消</el-button>
              <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
            </div>
          </el-dialog>
          <el-dialog title="添加证书" :visible.sync="dialogFormVisible1">
            <el-form :model="form">
              <el-form-item label="略缩图" :label-width="formLabelWidth">
                <el-input v-model="form.image" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="标题" :label-width="formLabelWidth">
                <el-input v-model="form.name" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="价值" :label-width="formLabelWidth">
                <el-input v-model="form.price" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="添加时间" :label-width="formLabelWidth">
                <el-input v-model="form.time" autocomplete="off"></el-input>
              </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click="dialogFormVisible1 = false">取 消</el-button>
              <el-button type="primary" @click="dialogFormVisible1 = false">确 定</el-button>
            </div>
          </el-dialog>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
export default {
  data() {
    return {
      activeName: "first",
      tableData: [
        {
          id: "1",
          name: "java工程师证",
          price: "100",
          time: "2019-06-03",
          image: ""
        },
        {
          id: "2",
          name: "会计证",
          price: "1",
          time: "2019-06-04",
          image: ""
        }
      ],
      activeIndex: "ccie",
      dialogFormVisible: false,
      dialogFormVisible1: false,
      form: {
        id: "1",
        name: "java工程师证",
        price: "100",
        time: "2019-06-03",
        image: ""
      },
      formLabelWidth: "120px"
    };
  },
  methods: {
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
      this.form.id = row.id;
      this.form.image = row.image;
      this.form.name = row.name;
      this.form.price = row.price;
      this.form.time = row.time;
    },
    goAdd() {
      this.form.id = "";
      this.form.image = "";
      this.form.name = "";
      this.form.price = "";
      this.form.time = "";
      this.dialogFormVisible1 = true;
    },
    handleDelete(row) {
      const id = row.id;
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
    this.getTableData();
  },
  components: {}
};
</script>
<style>
</style>
