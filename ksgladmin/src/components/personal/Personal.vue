<template>
  <div>
    <el-row class="tac">
      <el-col :span="3" :offset="3">
        <el-menu
          router
          default-active="2"
          class="el-menu-vertical-demo"
          @open="handleOpen"
          @close="handleClose"
        >
          <el-menu-item index="shouye">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>首页</span>
            </template>
          </el-menu-item>
          <el-menu-item index="privacy">
            <i class="el-icon-menu"></i>
            <span slot="title">隐私管理</span>
          </el-menu-item>
          <el-menu-item index="integral">
            <i class="el-icon-shopping-cart-full"></i>
            <span slot="title">充值积分</span>
          </el-menu-item>
          <el-menu-item index="4">
            <i class="el-icon-notebook-2"></i>
            <span slot="title">学习进度</span>
          </el-menu-item>
        </el-menu>
      </el-col>
      <el-col :span="12">
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
