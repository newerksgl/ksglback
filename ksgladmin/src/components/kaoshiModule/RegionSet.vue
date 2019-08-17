<template>
  <div>
    <el-row>
      <el-col :span="6" :offset="6">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>地区设计</el-breadcrumb-item>
        </el-breadcrumb>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="19" :offset="1">
        <el-tabs value="first">
          <el-tab-pane label="地区设置" name="first">
            <el-table :data="tableData" height="250" border style="width: 100%">
              <el-table-column
                prop="id"
                label="地区ID"
                width="180">
              </el-table-column>

              <el-table-column
                prop="quhao"
                label="区号"
                width="180">
              </el-table-column>

              <el-table-column
                prop="name"
                label="地区名称">
              </el-table-column>

              <el-table-column
                fixed="right"
                label="操作"
                width="100">
                <template slot-scope="scope">
                  <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
                  <el-button type="text" size="small">编辑</el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-tab-pane>
          
        </el-tabs>
      </el-col>
    
    </el-row>



  </div>

</template>


<script>
  export default {
    data() {
      const item = {
        id: '1',
        quhao: '123',
        name: '湖南'
      };
      return {
        tableData: Array(20).fill(item)
      }
    }
  };
  

</script>
