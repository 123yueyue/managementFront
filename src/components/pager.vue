<template>
  <div v-if="total>0" class="pager-box">
    <el-pagination
      background
      layout="total, sizes, prev, pager, next, jumper"
      :current-page="currentPage"
      :page-sizes="pageSizes"
      :page-size="pageSize"
      :total="total"
      :pager-count="5"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </div>
</template>

<script>
export default {
  name: 'Pager',
  props: {
    currentPage: {
      type: Number,
      default: 1
    },
    total: {
      type: Number,
      defalut: 0
    },
    pageSizes: {
      type: Array,
      default: () => [12, 24, 30]
    },
    pageSize: {
      type: Number,
      default: 12
    }
  },
  methods: {
    handleSizeChange(val) {
      this.$emit('handleSizeChangeSub', val)
    },
    handleCurrentChange(val) {
      this.$emit('handleCurrentChangeSub', val)
    }
  }
}
</script>
<style lang="less">
  .el-pagination.is-background .el-pager li:not(.disabled).active{
    background: rgb(244, 143, 0);
  }
  .pager-box{
    padding-top: 5px;
  }
</style>
