<template>
  <div>
    <el-row>
      <el-col :span="24">&nbsp;</el-col>
      <el-col :span="15" :offset="6">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>用户管理</el-breadcrumb-item>
        </el-breadcrumb>
      </el-col>
      <el-col :span="2" :offset="1">
        <el-button type="primary" @click="clearUser();isAddUser=!isAddUser">
          添加用户
          <span v-if="!isAddUser" class="el-icon-caret-bottom"></span>
          <span v-if="isAddUser" class="el-icon-caret-top"></span>
        </el-button>
      </el-col>
    </el-row>

    <el-row v-if="isAddUser">
      <el-col :span="24">&nbsp;</el-col>
      <el-col :offset="1">
        <el-form
          :model="User"
          status-icon
          :rules="rules"
          ref="User"
          label-width="100px"
          class="demo-User"
        >
          <el-row>
            <el-col :span="10">
              <el-form-item label="用户名" prop="name">
                <el-input type="test" v-model="User.name" autocomplete="off"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="14">
              <el-form-item label="注册时间">
                <el-col :span="11">
                  <el-date-picker
                    type="date"
                    placeholder="选择日期"
                    v-model="User.date"
                    style="width: 100%;"
                  ></el-date-picker>
                </el-col>
                <el-col class="line" :span="2">-</el-col>
                <el-col :span="11">
                  <el-time-picker placeholder="选择时间" v-model="User.time" style="width: 100%;"></el-time-picker>
                </el-col>
              </el-form-item>
            </el-col>

            <el-col :span="10">
              <el-form-item label="密码" prop="password">
                <el-input type="password" v-model="User.password" autocomplete="off"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="14">
              <el-form-item label="邮箱" prop="email">
                <el-input type="email" v-model="User.email" autocomplete="off"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="11">
              <el-form-item label="用户组">
                <el-select v-model="UserRole.role_name" placeholder="用户类型">
                  <el-option label="默认用户" value="1"></el-option>
                  <el-option label="学生" value="2"></el-option>
                  <el-option label="管理员" value="3"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6" :offset="7">
              <el-form-item>
                <el-button type="primary" @click="submitForm('User')">提交</el-button>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </el-col>
      <el-col :span="24">&nbsp;</el-col>
    </el-row>

    <el-row>
      <el-col :offset="1">
        <el-tabs value="first">
          <el-tab-pane label="用户列表" name="first"></el-tab-pane>
          <el-table :data="Users" height="550" style="width: 100%">
            <el-table-column prop="name" label="用户名"></el-table-column>
            <el-table-column prop="email" label="邮箱"></el-table-column>
            <el-table-column prop="password" label="密码"></el-table-column>
            <el-table-column prop="users_ip" label="注册IP"></el-table-column>
            <el-table-column prop="integral" label="积分点数"></el-table-column>
            <el-table-column prop="rid" label="角色"></el-table-column>
            <el-table-column prop="register" label="注册时间"></el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <label class="el-icon-edit" @click="edit(scope.row)"></label>
                <span>&nbsp;&nbsp;</span>
                <label class="el-icon-circle-close" @click="remove(scope.row.pri_id)"></label>
              </template>
            </el-table-column>
          </el-table>
        </el-tabs>
      </el-col>
    </el-row>

    <el-dialog title="修改用户" :visible.sync="dialogFormVisible">
      <el-form :model="upUser">
        <el-form-item label="用户名" :label-width="formLabelWidth">
          <el-input v-model="upUser.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" :label-width="formLabelWidth">
          <el-input v-model="upUser.email" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" :label-width="formLabelWidth">
          <el-input v-model="upUser.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="注册IP" :label-width="formLabelWidth">
          <el-input v-model="upUser.users_ip" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="积分点数" :label-width="formLabelWidth">
          <el-input v-model="upUser.integral" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="角色" :label-width="formLabelWidth">
          <el-input v-model="upUser.rid" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="注册时间" :label-width="formLabelWidth">
          <el-input v-model="upUser.register" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="clearupUser();">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    var validateName = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入用户名"));
      } else {
        callback();
      }
    };
    var validateEmail = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入邮箱"));
      } else {
        callback();
      }
    };
    var validatePassWord = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        callback();
      }
    };
    return {
      User: {
        pri_id: 1,
        name: "",
        email: "",
        password: "",
        users_ip: "",
        integral: 0,
        rid: 1,
        register: ""
      },
      upUser: {
        pri_id: 1,
        name: "",
        email: "",
        password: "",
        users_ip: "",
        integral: 0,
        rid: 1,
        register: ""
      },
      isAddUser: false,
      dialogFormVisible: false,
      formLabelWidth: "120px",
      Users: [
        {
          pri_id: 1,
          name: "王小虎",
          email: "wangxiaohu@163.com",
          password: "123456",
          users_ip: "192.168.43.29",
          integral: 0,
          rid: 1,
          register: "2019-08-15"
        }
      ],
      UserRole: {
        rid: 1,
        role_name: "默认用户",
        defaultrole: "",
        description: "",
        isadmin: ""
      },
      rules: {
        name: [{ validator: validateName, trigger: "blur" }],
        email: [{ validator: validateEmail, trigger: "blur" }],
        password: [{ validator: validatePassWord, trigger: "blur" }]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    getTableData() {
      this.request
        .post("Users/findAll")
        .then(res => {
          this.Users = res.data;
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

      this.request
        .post("Userrole/findAll")
        .then(res => {
          this.UserRole = res.data;
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
    },
    remove(id) {
      const priId = { priId: id };
      console.log(id);
      this.request
        .post("Users/delete", priId)
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
    },
    edit(row) {
      console.log(row);
      this.upUser = {
        id: row.id,
        name: row.name,
        email: row.email,
        date: row.date,
        time: row.password,
        password: row.password,
        users_ip: row.users_ip,
        integral: row.integral,
        rid: row.rid,
        register: row.register
      };

      this.dialogFormVisible = true;
    },
    clearUser() {
      this.User = {
        id: "",
        name: "",
        email: "",
        date: "",
        time: "",
        password: "",
        users_ip: "",
        integral: "",
        rid: "",
        register: ""
      };
    },
    clearupUser() {
      this.upUser = {
        id: "",
        name: "",
        email: "",
        date: "",
        time: "",
        password: "",
        users_ip: "",
        integral: "",
        rid: "",
        register: ""
      };
      this.dialogFormVisible = false;
    }
  },
  mounted() {
    this.getTableData();
  }
};
</script>

<style>
</style>
