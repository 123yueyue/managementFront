<template>
  <div class="main-content">
    <el-card class="box-card" style="width: 100%">
      <div slot="header" class="clearfix">
        <span>学校列表</span>
      </div>
      <!-- 顶部搜索框 -->
      <div class="top-row">
        <div class="search-box">
          <el-input v-model="aname" style="width: 200px;" size="mini" placeholder="学校名称" />
          <i class="el-icon-search" @click="searchFlow" />
        </div>
        <el-button style="float: right;" type="primary" size="mini" @click="handleAdd">新建学校</el-button>
      </div>
      <el-table :data="tableData" stripe style="width: 100%">
        <el-table-column prop="date" label="日期" width="180" />
        <el-table-column prop="name" label="姓名" width="180" />
        <el-table-column prop="address" label="地址" />
      </el-table>
    </el-card>
  </div>
</template>
<script>
export default {
  data() {
    return {
      tableData: [
        {
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        },
        {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        },
        {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        },
        {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }
      ]
    }
  },
  method: {
    // 搜索流程
    searchFlow() {
      // this.getDataList();
    }
  }
}
</script>
<style lang="less" scoped>
.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both;
}

.box-card {
  width: 480px;
}
.main-content {
  .top-row {
    padding-bottom: 15px;
    font-size: 0;
    .search-box {
      width: 50%;
      position: relative;
      display: inline-block;
      .el-icon-search {
        font-size: 16px;
        position: absolute;
        top: 6px;
        left: 173px;
        cursor: pointer;
      }
    }
  }
}
</style>
