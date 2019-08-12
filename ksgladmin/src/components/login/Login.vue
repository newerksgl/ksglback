<template>
  <div>
    <!-- <div class="div1"></div> -->
    <el-row>
      <el-col :span="12" :offset="3">
        <img src="@/assets/shouye.png" alt height="100%" width="100%" />
      </el-col>
      <el-col :span="6">
        <h3 style="margin-top:80px;">用户登录</h3>
        <el-form
          style="margin-top: 20px;"
          :model="ruleForm"
          status-icon
          :rules="rules"
          ref="ruleForm"
          label-width="100px"
          class="demo-ruleForm"
        >
          <el-form-item label="账号" prop="name">
            <el-input
              type="text"
              placeholder="用户名/手机号码/电子邮箱"
              v-model="ruleForm.name"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="pass">
            <el-input
              type="password"
              placeholder="请输入密码"
              v-model="ruleForm.pass"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
            <el-button @click="resetForm('ruleForm')">重置</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import PubSub from "pubsub-js";
export default {
  data() {
    var checkName = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入账号"));
      } else {
        callback();
      }
    };
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        callback();
      }
    };
    return {
      ruleForm: {
        pass: "",
        name: ""
      },
      rules: {
        pass: [{ validator: validatePass, trigger: "blur" }],
        name: [{ validator: checkName, trigger: "blur" }]
      }
    };
  },
  methods: {
    // handleClick(tab, event) {
    //   console.log(tab, event);
    // }
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          const user = {
            name: this.ruleForm.name,
            password: this.ruleForm.pass
          };
          this.request
            .post("Users/login", user)
            .then(res => {
              console.log(res.data);
              if (res.data != "") {
                this.$message({
                  showClose: true,
                  message: "登录成功！",
                  type: "success",
                  duration: 1000
                });
                PubSub.publish("search", res.data);
                this.$router.push("shouye");
              } else {
                this.$message({
                  showClose: true,
                  message: "用户名或密码错误!",
                  type: "error",
                  duration: 1000
                });
              }
            })
            .catch(err => {
              this.$message({
                showClose: true,
                message: "用户名或密码错误!",
                type: "error",
                duration: 1000
              });
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
};
</script>

<style>
</style>
