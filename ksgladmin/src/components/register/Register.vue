<template>
  <el-row>
    <el-col :span="7" :offset="7">
      <el-form
        :model="ruleForm"
        status-icon
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="账号" prop="name">
          <el-input type="text" placeholder="请输入用户名" v-model="ruleForm.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="电子邮箱" prop="email">
          <el-input
            type="email"
            placeholder="1258956484@qq.com"
            v-model="ruleForm.email"
            autocomplete="off"
          ></el-input>
        </el-form-item>

        <el-form-item label="密码" prop="pass">
          <el-input type="password" placeholder="请输入密码" v-model="ruleForm.pass" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="checkPass">
          <el-input
            type="password"
            placeholder="再次输入密码"
            v-model="ruleForm.checkPass"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">注册</el-button>
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </el-col>
  </el-row>
</template>

<script>
export default {
  data() {
    var checkName = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入账号"));
      } else {
        this.request
          .post("Users/selectByName", { name: this.ruleForm.name })
          .then(res => {
            if (res.data > 0) {
              callback(new Error("账号已存在"));
            } else {
              callback();
            }
          })
          .catch(err => {
            console.log(err);
          });
      }
    };
    var checkEmail = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入邮箱"));
      } else {
        callback();
      }
    };
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.ruleForm.checkPass !== "") {
          this.$refs.ruleForm.validateField("checkPass");
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.ruleForm.pass) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      ruleForm: {
        pass: "",
        checkPass: "",
        name: "",
        email: ""
      },
      rules: {
        pass: [{ validator: validatePass, trigger: "blur" }],
        checkPass: [{ validator: validatePass2, trigger: "blur" }],
        name: [{ validator: checkName, trigger: "blur" }],
        email: [{ validator: checkEmail, trigger: "blur" }]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          const user = {
            name: this.ruleForm.name,
            email: this.ruleForm.email,
            pass: this.ruleForm.pass
          };
          this.request
            .post("Users/insert", user)
            .then(res => {
              alert("注册成功!立即登录!");
              this.$router.push("login");
            })
            .catch(err => {
              alert("登录失败");
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
