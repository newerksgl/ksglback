<template>
  <div>
    <el-row class="tac">
      <el-col :span="3" :offset="3">
        <el-menu router class="el-menu-vertical-demo">
          <el-menu-item index="shouye">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>首页</span>
            </template>
          </el-menu-item>

          <el-menu-item index="">
            <i class="el-icon-menu"></i>
            <span slot="title">考试设计</span>
          </el-menu-item>
          
          <el-menu-item index="regionSet">
            <span slot="title">地区设计</span>
          </el-menu-item>

        </el-menu>
      </el-col>
      <el-col :span="16">
        <router-view></router-view>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  export default {
    data() {
      return {};
    },
    components: {}
  };
</script>

<style>
</style>

