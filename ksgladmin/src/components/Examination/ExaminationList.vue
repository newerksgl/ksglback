<template>
  <div>
    <el-row>
      <el-col :span="6" :offset="6">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>考试设计</el-breadcrumb-item>
        </el-breadcrumb>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="20" :offset="2">
        <el-tabs v-model="activeName">
          <el-tab-pane label="考场列表" name="first"></el-tab-pane>
        </el-tabs>
      </el-col>
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
