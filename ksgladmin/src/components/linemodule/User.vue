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
          <el-menu-item index="usermanagement">
            <i class="el-icon-menu"></i>
            <span slot="title">用户管理</span>
          </el-menu-item>
          <el-menu-item index="rolemanagement">
            <i class="el-icon-shopping-cart-full"></i>
            <span slot="title">角色管理</span>
          </el-menu-item>
          <el-menu-item index="moduledesign">
            <i class="el-icon-notebook-2"></i>
            <span slot="title">模块设置</span>
          </el-menu-item>
          <el-menu-item index="modelmanagement">
            <i class="el-icon-notebook-2"></i>
            <span slot="title">模型管理</span>
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
