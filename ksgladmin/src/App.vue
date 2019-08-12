<template>
  <div>
    <el-container>
      <el-header>
        <div class="div1"></div>
        <el-row>
          <el-col :span="3" :offset="4">
            <div class="bg-purple"></div>
          </el-col>
          <el-col :span="6" :offset="1">
            <el-input v-model="input" placeholder="请输入内容"></el-input>
          </el-col>
          <el-col :span="1">
            <el-button icon="el-icon-search" type="primary">搜索</el-button>
          </el-col>
          <el-col :span="4" :offset="2">
            <div v-if="user==null">
              <el-button @click="goLogin()">登录</el-button>
              <el-button @click="goRegister()">注册</el-button>
            </div>
            <div v-else>
              <el-button type="text" @click="goPersonal()">
                <i class="el-icon-user el-icon--left"></i>
                {{user.name}}
              </el-button>
            </div>
          </el-col>
        </el-row>
      </el-header>

      <el-menu
        router
        :default-active="$router.path"
        class="el-menu-demo"
        mode="horizontal"
        @select="handleSelect"
        background-color="#4682b4"
        text-color="#333"
        active-text-color="#fff"
      >
        <el-menu-item index="shouye">
          <h4>全局</h4>
        </el-menu-item>
        <el-menu-item index="kecheng">
          <h4>用户模块</h4>
        </el-menu-item>
        <el-menu-item index="kaoshi">
          <h4>考试模块</h4>
        </el-menu-item>
        <el-menu-item index="zhengshu">
          <h4>文件模块</h4>
        </el-menu-item>
        <el-menu-item index="zhengshu">
          <h4>内容模块</h4>
        </el-menu-item>
        <el-menu-item index="zhengshu">
          <h4>财务模块</h4>
        </el-menu-item>
        <el-menu-item index="course">
          <h4>课程模块</h4>
        </el-menu-item>
        <el-menu-item index="ccie">
          <h4>证书模块</h4>
        </el-menu-item>
        <el-menu-item index="zhengshu">
          <h4>文档模块</h4>
        </el-menu-item>
      </el-menu>
      <el-main>
        <router-view></router-view>
      </el-main>

      <el-footer height="80px">
        在线考试系统&nbsp;著作权登记号：2019 SR 666666
        Copyright@ksgl java 2019
      </el-footer>
    </el-container>
  </div>
</template>

<script>
import PubSub from "pubsub-js";

export default {
  data() {
    return {
      // activeName: "second",
      input: "",
      user: null
    };
  },
  mounted() {
    // 是否在此发ajax消息  是点击search后
    // 订阅搜索的消息
    PubSub.subscribe("search", (msg, user) => {
      this.user = user;
    });
  },
  methods: {
    // handleClick(tab, event) {
    //   console.log(tab, event);
    // }
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },
    goLogin() {
      this.activeIndex = "";
      this.$router.push("login");
    },
    goRegister() {
      this.$router.push("register");
    },
    goPersonal() {
      this.$router.push("personal");
    }
  }
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
}

.div1 {
  margin-top: 20px;
}

.el-header {
  margin-bottom: 20px;
}

.el-menu {
  margin-bottom: 20px;
}

.el-footer {
  background: #4682b4;
  text-align: center;
  font-size: 13px;
  line-height: 60px;
}
.container {
  border-bottom: 1px solid #dcdfe6;
  width: 1140px;
  margin: 0 auto;
}
.el-main {
  text-align: center;
}

.el-col {
  border-radius: 4px;
}
.bg-purple-dark {
  background: #99a9bf;
}
.bg-purple {
  /* background: #409eff; */
  background: #4682b4;
  background-image: url("./assets/logo-white.png");
  background-repeat: no-repeat;
  background-size: 136px;
  border-radius: 4px;
  min-height: 36px;
}
.bg-purple-light {
  background: #e5e9f2;
}
</style>
