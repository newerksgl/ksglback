<template>
  <div>
    <el-row class="tac">
      <el-col :span="3" :offset="1">
        <el-menu router class="el-menu-vertical-demo">
          <el-menu-item index="shouye">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>首页</span>
            </template>
          </el-menu-item>
          <el-menu-item index="model">
            <i class="el-icon-shopping-cart-full"></i>
            <span slot="title">题型管理</span>
          </el-menu-item>
          <el-menu-item index="question">
            <i class="el-icon-menu"></i>
            <span slot="title">试题管理</span>
          </el-menu-item>
          <el-menu-item index="paperManger">
            <i class="el-icon-notebook-2"></i>
            <span slot="title">试卷管理</span>
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
