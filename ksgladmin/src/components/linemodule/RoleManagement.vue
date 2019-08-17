<template>
  <div>
    <el-row>
      <el-col :span="24">&nbsp;</el-col>
      <el-col :span="15" :offset="6">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>角色管理</el-breadcrumb-item>
        </el-breadcrumb>
      </el-col>
      <el-col :span="2" :offset="1">
        <el-button type="primary" @click="clearRole();isAddRole=!isAddRole">
          添加角色
          <span v-if="!isAddRole" class="el-icon-caret-bottom"></span>
          <span v-if="isAddRole" class="el-icon-caret-top"></span>
        </el-button>
      </el-col>
      <el-col v-if="isAddRole">
        <el-col :span="24">&nbsp;</el-col>
        <el-col :offset="1">
          <el-form
            :model="UserRole"
            status-icon
            ref="UserRole"
            :rules="rules"
            label-width="100px"
            class="demo-UserRole"
          >
            <el-row>
              <el-col :span="10">
                <el-form-item label="角色名称" prop="role_name">
                  <el-input v-model="UserRole.role_name" autocomplete="off"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="10" :offset="4">
                <el-form-item label="默认角色">
                  <el-select v-model="UserRole.defaultrole">
                    <el-option label="用户" value="1"></el-option>
                    <el-option label="学生" value="2"></el-option>
                    <el-option label="教师" value="3"></el-option>
                    <el-option label="管理员" value="4"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="16">
                <el-form-item label="角色描述" prop="description">
                  <el-input v-model="UserRole.description" autocomplete="off"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="10">
                <el-form-item label="管理员身份">
                  <el-checkbox v-model="UserRole.isadmin">管理员</el-checkbox>
                </el-form-item>
              </el-col>
              <el-col :span="6" :offset="7">
                <el-form-item>
                  <el-button type="primary" @click="submitForm('UserRole')">提交</el-button>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </el-col>
      </el-col>
      <el-col :span="24">&nbsp;</el-col>
    </el-row>

    <el-row>
      <el-col :offset="1">
        <el-tabs value="first">
          <el-tab-pane label="角色列表" name="first"></el-tab-pane>
          <el-table :data="UserRoles" height="550" style="width: 100%">
            <el-table-column prop="role_name" label="角色名"></el-table-column>
            <el-table-column prop="defaultrole" label="默认角色"></el-table-column>
            <el-table-column prop="description" label="角色描述"></el-table-column>
            <el-table-column prop="isadmin" label="管理员身份">
              <template slot-scope="props">
                <span v-if="props.row.isadmin">是</span>
                <span v-if="!props.row.isadmin">否</span>
              </template>
            </el-table-column>
            <el-table-column label="操 作">
              <template slot-scope="scope">
                <label class="el-icon-edit" @click="edit(scope.row)"></label>
                <span>&nbsp;&nbsp;</span>
                <label class="el-icon-circle-close" @click="remove(scope.row.rid)"></label>
              </template>
            </el-table-column>
          </el-table>
        </el-tabs>
      </el-col>
    </el-row>

    <el-dialog title="修改角色" :visible.sync="dialogFormVisible">
      <el-form :model="upUserRole">
        <el-form-item label="角色名" :label-width="formLabelWidth">
          <el-input v-model="upUserRole.role_name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="默认角色" :label-width="formLabelWidth">
          <el-input v-model="upUserRole.defaultrole" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="角色描述" :label-width="formLabelWidth">
          <el-input v-model="upUserRole.description" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="是否为管理员" :label-width="formLabelWidth">
          <el-checkbox v-model="upUserRole.isadmin">管理员</el-checkbox>
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
import { callbackify } from "util";
export default {
  data() {
    var validateRole_Name = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入角色名"));
      } else {
        callback();
      }
    };
    var validateDescription = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入角色描述"));
      } else {
        callback();
      }
    };
    return {
      isAddRole: false,
      dialogFormVisible: false,
      formLabelWidth: "120px",
      UserRole: {
        rid: "",
        role_name: "",
        defaultrole: "1",
        description: "",
        isadmin: true
      },
      upUserRole: {
        rid: "",
        role_name: "",
        defaultrole: "1",
        description: "",
        isadmin: false
      },
      UserRoles: [
        {
          rid: "1",
          role_name: "用户",
          defaultrole: "1",
          description: "测试数据",
          isadmin: false
        },
        {
          rid: "2",
          role_name: "学生",
          defaultrole: "2",
          description: "测试数据",
          isadmin: false
        },
        {
          rid: "3",
          role_name: "教师",
          defaultrole: "3",
          description: "测试数据",
          isadmin: false
        },
        {
          rid: "4",
          role_name: "管理员",
          defaultrole: "4",
          description: "测试数据",
          isadmin: true
        }
      ],
      rules: {
        role_name: [{ validator: validateRole_Name, trigger: "blur" }],
        description: [{ validator: validateDescription, trigger: "blur" }]
      }
    };
  },
  components: {},
  methods: {
    clearRole() {
      this.UserRole = {
        rid: "",
        role_name: "",
        defaultrole: "1",
        description: "",
        isadmin: false
      };
    },
    clearupUser() {
      this.upUserRole = {
        rid: "",
        role_name: "",
        defaultrole: "1",
        description: "",
        isadmin: false
      };
      this.dialogFormVisible = false;
    },
    submitForm(formName) {
      console.log(this.UserRole);
      this.$refs[formName].validate(valid => {
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    remove(id) {
      console.log(id);
    },
    edit(row) {
      console.log(row);
      this.upUserRole.rid = row.id;
      this.upUserRole.role_name = row.role_name;
      this.upUserRole.defaultrole = row.defaultrole;
      this.upUserRole.description = row.description;
      this.upUserRole.isadmin = row.isadmin;

      this.dialogFormVisible = true;
    }
  }
};
</script>

<style>
</style>
