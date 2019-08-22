<template>
  <div>
    <el-row>
      <el-col :span="6" :offset="6">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>考场设计</el-breadcrumb-item>
        </el-breadcrumb>
      </el-col>
      <el-col :span="6" :offset="6">
        <el-button type="text" size="mini" @click="goAdd()">添加考场</el-button>
      </el-col>
    </el-row>
    <el-row>
      <el-col :offset="2">
        <el-tabs v-model="activeName">
          <el-tab-pane label="考场列表" name="first">
            <el-table :data="tableData" height="550" style="width: 100%">
              <el-table-column type="expand">
                <template slot-scope="props">
                  <el-form label-position="left" inline class="demo-table-expand">
                    <el-form-item label="科目">
                      <span v-for="s in Subject" v-show="s.sid==props.row.sid">{{s.name}}</span>
                    </el-form-item>
                    <el-form-item label="地区">
                      <span v-for="r in Region" v-show="r.reid==props.row.reid">{{r.name}}</span>
                    </el-form-item>
                    <el-form-item label="开通人数">
                      <span>{{ props.row.number }}</span>
                    </el-form-item>
                    <el-form-item label="状态">
                      <span>{{ props.row.stateTest }}</span>
                    </el-form-item>
                    <el-form-item label="考场名称">
                      <span>{{ props.row.name }}</span>
                    </el-form-item>
                  </el-form>
                </template>
              </el-table-column>
              <el-table-column label="科目">
                <template slot-scope="props">
                  <span v-for="s in Subject" v-show="s.sid==props.row.sid">{{s.name}}</span>
                </template>
              </el-table-column>
              <el-table-column label="地区">
                <template slot-scope="props">
                  <span v-for="r in Region" v-show="r.reid==props.row.reid">{{r.name}}</span>
                </template>
              </el-table-column>

              <el-table-column prop="name" label="考场名称"></el-table-column>

              <el-table-column label="操作">
                <template slot-scope="scope">
                  <label class="el-icon-edit" @click="edit(scope.row)"></label>
                </template>
              </el-table-column>
            </el-table>
          </el-tab-pane>
        </el-tabs>
      </el-col>
    </el-row>

    <el-dialog title="编辑考场" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-row>
          <el-col :span="10">
            <el-form-item label="考场名称" :label-width="formLabelWidth">
              <el-input v-model="form.name" autocomplete="off"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="10" :offset="1">
            <el-form-item label="开通人数" :label-width="formLabelWidth">
              <el-input type="number" v-model="form.number" autocomplete="off"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="10">
            <el-form-item label="科目" :label-width="formLabelWidth">
              <el-select v-model="form.sid" placeholder="选择科目">
                <el-option v-for="s in Subject" :label="s.name" v-model="s.sid"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="10" :offset="1">
            <el-form-item label="地区" :label-width="formLabelWidth">
              <el-select v-model="form.reid" placeholder="选择地区">
                <el-option v-for="r in Region" :label="r.name" v-model="r.reid"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="考场状态" :label-width="formLabelWidth">
              <el-input v-model="form.stateTest" autocomplete="off"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="update()">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog title="添加" :visible.sync="dialogFormVisible2">
      <el-form :model="form">
        <el-row>
          <el-col :span="10">
            <el-form-item label="考场名称" :label-width="formLabelWidth">
              <el-input v-model="form.name" autocomplete="off"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="10" :offset="1">
            <el-form-item label="开通人数" :label-width="formLabelWidth">
              <el-input type="number" v-model="form.number" autocomplete="off"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="10">
            <el-form-item label="科目" :label-width="formLabelWidth">
              <el-select v-model="form.sid" placeholder="选择科目">
                <el-option v-for="s in Subject" :label="s.name" v-model="s.sid"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="10" :offset="1">
            <el-form-item label="地区" :label-width="formLabelWidth">
              <el-select v-model="form.reid" placeholder="选择地区">
                <el-option v-for="r in Region" :label="r.name" v-model="r.reid"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible2 = false">取 消</el-button>
        <el-button type="primary" @click="insert()">确 定</el-button>
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
        id: "",
        sid: "",
        reid: "",
        number: 1,
        stateTest: "开通",
        name: ""
      },
      Subject: [{ sid: "", name: "", image: "" }],
      Region: [{ reid: "", name: "", areaCode: "" }],
      dialogFormVisible: false,
      dialogFormVisible2: false,
      formLabelWidth: "120px"
    };
  },
  components: {},
  methods: {
    insert() {
      var examinations = {
        id: this.form.id,
        sid: this.form.sid,
        reid: this.form.reid,
        number: this.form.number,
        stateTest: "开通",
        name: this.form.name
      };
      this.request
        .post("examinations/add", examinations)
        .then(res => {
          if (res.data == 1) {
            this.$message({
              showClose: true,
              message: "添加成功",
              type: "success",
              duration: 1000
            });
            this.getTableData();
          } else {
            this.$message({
              showClose: true,
              message: "添加失败",
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
      this.dialogFormVisible2 = false;
    },
    edit(row) {
      this.form.id = row.id;
      this.form.sid = row.sid;
      this.form.reid = row.reid;
      this.form.number = row.number;
      this.form.stateTest = row.stateTest;
      this.form.name = row.name;
      this.dialogFormVisible = true;
    },
    update() {
      var examinations = {
        id: this.form.id,
        sid: this.form.sid,
        reid: this.form.reid,
        number: this.form.number,
        stateTest: this.form.stateTest,
        name: this.form.name
      };
      this.request
        .post("examinations/update", examinations)
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
    goAdd() {
      this.form.id = "";
      this.form.sid = "";
      this.form.number = "";
      this.form.stateTest = "";
      this.form.addressName = "";
      this.form.courseName = "";
      this.form.reid = "";
      this.form.name = "";
      this.dialogFormVisible2 = true;
    },
    getTableData() {
      this.request
        .post("examinations/findAll")
        .then(res => {
          this.tableData = res.data;
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
        .post("region/findAll")
        .then(res => {
          this.Region = res.data;
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
