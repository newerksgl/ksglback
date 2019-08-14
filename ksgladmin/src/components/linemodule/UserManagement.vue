<template>
  <div>
    <el-row>
      <el-col :span="24" :offset="1">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>用户管理</el-breadcrumb-item>
        </el-breadcrumb>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="19" :offset="1">
        <el-tabs v-model="activeName">
          <el-tab-pane label="用户列表" name="first"></el-tab-pane>
        </el-tabs>
      </el-col>
      <el-col :span="3" :offset="1"></el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return { activeName: "first" };
  },
  components: {}
};
</script>

<style>
</style>
