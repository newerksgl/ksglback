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
            <el-table :data="tableData" height="250" style="width: 100%">
              <el-table-column prop="id" label="ID" width="180"></el-table-column>
              <el-table-column prop="courseName" label="科目" width="180"></el-table-column>
              <el-table-column prop="addressName" label="地区" width="180"></el-table-column>
              <el-table-column prop="number" label="开通人数" width="180"></el-table-column>
              <el-table-column prop="stateTest" label="状态" width="180"></el-table-column>
              <el-table-column prop="name" label="考场名称" width="180"></el-table-column>
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

    <el-dialog title="编辑考场" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="ID" :label-width="formLabelWidth">
          <el-input v-model="form.id" autocomplete="off" disabled></el-input>
        </el-form-item>
        <el-form-item label="科目" :label-width="formLabelWidth">
          <el-input v-model="form.courseName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="地区" :label-width="formLabelWidth">
          <el-input v-model="form.addressName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="开通人数" :label-width="formLabelWidth">
          <el-input v-model="form.number" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="考场名称" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog title="添加" :visible.sync="dialogFormVisible2">
      <el-form :model="form">
        <el-form-item label="科目" :label-width="formLabelWidth">
          <el-input v-model="form.courseName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="地区" :label-width="formLabelWidth">
          <el-input v-model="form.addressName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="开通人数" :label-width="formLabelWidth">
          <el-input v-model="form.number" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="考场名称" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off"></el-input>
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
          id: 1,
          sid: 1,
          reid: 1,
          number: 6,
          stateTest: "启用",
          name: "长沙完小",
          addressName: "湖南",
          courseName: "IT/计算机"
        },
        {
          id: 2,
          sid: 3,
          reid: 2,
          number: 2,
          stateTest: "启用",
          name: "邪术小学",
          addressName: "浙江",
          courseName: "会计"
        }
      ],
      form: {
        id: "",
        sid: "",
        reid: "",
        number: "",
        stateTest: "",
        name: "",
        addressName: "",
        courseName: ""
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
      this.form.id = row.id;
      this.form.sid = row.sid;
      this.form.number = row.number;
      this.form.stateTest = row.stateTest;
      this.form.addressName = row.addressName;
      this.form.courseName = row.courseName;
      this.form.reid = row.reid;
      this.form.name = row.name;
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
    }
  }
};
</script>

<style>
</style>
