<template>
  <div class="search-pagination">
    <el-pagination
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-size="pageSize"
      layout="total, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
  </div>
</template>

<script>
export default {
  props: {
    total: {
      type: Number,
      default: 0
    },
    pageSize: {
      type: Number,
      default: 1
    },
    currentPage: {
      type: Number,
      default: 1
    }
  },
  data () {
    return {
    }
  },
  mounted () {
  },
  activated () {
  },
  methods: {
    handleCurrentChange (val) {
      console.log('val = ', val)
      this.$emit('handleCurrentChange', val)
    }
  }
}
</script>

<style lang="scss">
</style>
