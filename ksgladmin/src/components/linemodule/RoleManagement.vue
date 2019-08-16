<template>
  <div>
    <el-row>
      <el-col :span="6" :offset="6">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>角色管理</el-breadcrumb-item>
        </el-breadcrumb>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="18" :offset="2">
        <el-tabs value="first">
          <el-tab-pane label="角色管理" name="first">
            <el-form
              :model="UserRole"
              status-icon
              ref="UserRole"
              :rules="rules"
              label-width="100px"
              class="demo-UserRole"
            >
              <el-row v-if="isAddRole">
                <el-col :span="10">
                  <el-form-item label="角色名" prop="role_name">
                    <el-input v-model="UserRole.role_name" autocomplete="off"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="10">
                  <el-form-item label="默认角色">
                    <el-select v-model="UserRole.defaultrole">
                      <el-option label="用户" value="1"></el-option>
                      <el-option label="教师" value="2"></el-option>
                      <el-option label="管理员" value="3"></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="14">
                  <el-form-item label="角色描述" prop="description">
                    <el-input v-model="UserRole.description" autocomplete="off"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="14">
                  <el-form-item label="是否为管理员">
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
          </el-tab-pane>
        </el-tabs>
      </el-col>
      <el-col :span="4">
        <el-button type="primary" @click="clearRole();isAddRole=!isAddRole">
          添加角色
          <span v-if="!isAddRole" class="el-icon-caret-bottom"></span>
          <span v-if="isAddRole" class="el-icon-caret-top"></span>
        </el-button>
      </el-col>
    </el-row>
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
      UserRole: {
        rid: "",
        role_name: "",
        defaultrole: "1",
        description: "",
        isadmin: false
      },
      rules: {
        role_name: [{ validator: validateRole_Name, trigger: "blur" }],
        description: [{ validator: validateDescription, trigger: "blur" }]
      }
    };
  },
  components: {},
  methods: {
    clearRole() {},
    submitForm(formName) {
      console.log(this.UserRole);
      // this.$refs[formName].validate(valid => {
      //   if (valid) {
      //     alert("submit!");
      //   } else {
      //     console.log("error submit!!");
      //     return false;
      //   }
      // });
    }
  }
};
</script>

<style>
</style>
