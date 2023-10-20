<template>
  <div class="finance-raffle-panel">
    <search-form @onSubmit="onSubmit"/>
    <el-table
      :data="currentRaffles"
      border
      style="width: 100%">
      <el-table-column
        fixed
        prop="name"
        label="昵称">
      </el-table-column>
      <el-table-column
        prop="uid"
        label="UID">
      </el-table-column>
      <el-table-column
        prop="preAmount"
        label="开始前余额">
      </el-table-column>
      <el-table-column
        prop="feedAwardAmount"
        label="喂养竹子赠送的抽奖券数量">
      </el-table-column>
      <el-table-column
        prop="useAmount"
        label="使用抽奖券数量">
      </el-table-column>
      <el-table-column
        prop="remainAmount"
        label="即时余额">
      </el-table-column>
    </el-table>
    <search-pagination
      :total="total"
      :pageSize="pageSize"
      @handleCurrentChange="handleCurrentChange"/>
  </div>
</template>

<script>
import SearchForm from '@/components/admin-table-components/searchForm.vue'
import SearchPagination from '@/components/admin-table-components/searchPagination.vue'
import {
  raffleStatistic
} from '@/service/statistic.js'
export default {
  components: {
    SearchForm,
    SearchPagination
  },
  data () {
    return {
      total: 0,
      pageSize: 20,
      page: 1,

      currentRaffles: [],
      raffles: [],
      timeRange: [],
      keyword: '',
      clickFlag: false
    }
  },
  mounted () {
  },
  activated () {
  },
  methods: {
    onSubmit (queryInfo) {
      this.clickFlag = true
      try {
        this.timeRange = queryInfo.duration
        this.keyword = queryInfo.query
        if (this.timeRange != null && this.timeRange.length === 2) {
          this.raffleStatistics(this.timeRange[0].getTime(), this.timeRange[1].getTime(), this.page, this.pageSize, true, this.keyword)
        } else {
          this.$message.error('请选择时间段')
        }
      } finally {
        this.clickFlag = false
      }
    },
    handleCurrentChange (val) {
      this.page = val
      this.raffleStatistics(this.timeRange[0].getTime(), this.timeRange[1].getTime(), this.page, this.pageSize, true, this.keyword)
    },
    async raffleStatistics (startTimestamp, endTimestamp, page, pageSize, needSummary, keyword) {
      const res = await raffleStatistic(startTimestamp, endTimestamp, page, pageSize, needSummary, keyword)
      if (res.status === 200 && res.data.code === 0) {
        this.currentRaffles = res.data.data.raffles
        this.total = res.data.data.total
      }
    }
  }
}
</script>

<style lang="scss">
  .mod-demo-echarts {
    > .el-alert {
      margin-bottom: 10px;
    }
    > .el-row {
      margin-top: -10px;
      margin-bottom: -10px;
      .el-col {
        padding-top: 10px;
        padding-bottom: 10px;
      }
    }
    .chart-box {
      min-height: 400px;
    }
  }
</style>
