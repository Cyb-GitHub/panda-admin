<template>
  <div class="reward-cooperate-panel">
    <search-form @onSubmit="onSubmit"/>

    <el-table
      :data="currentOperates"
      border
      style="width: 100%">
      <el-table-column
        fixed
        prop="name"
        label="昵称"
        width="250">
      </el-table-column>
      <el-table-column
        prop="uid"
        label="UID"
        width="250">
      </el-table-column>
      <el-table-column
        prop="lpgAmount"
        label="持有LPG数量"
        width="150">
      </el-table-column>
      <el-table-column
        prop="holdStartTime"
        label="持有开始时间"
        width="250">
      </el-table-column>
      <el-table-column
        prop="holdEndTime"
        label="持有结束时间"
        width="250">
      </el-table-column>
      <el-table-column
        prop="quality"
        label="共建奖励持有资格"
        width="250">
        <template slot-scope="scope">
          {{ scope.row.canCooperate ? '获得' : '未获得' }}
        </template>
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
import {HOLD_TYPE} from '@/constant/cooperateConstant'
import {
  cooperateLpgHoldStatistic
} from '@/service/cooperate.js'
export default {
  components: {
    SearchForm,
    SearchPagination
  },
  data () {
    return {
      holdType: HOLD_TYPE,
      total: 0,
      pageSize: 20,
      page: 1,

      currentOperates: []
    }
  },
  mounted () {
    this.currentOperates = []
    this.total = 0
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
          this.cooperateLpgHoldStatistic(this.timeRange[0].getTime(), this.timeRange[1].getTime(), this.page, this.pageSize, true, this.keyword)
        } else {
          this.$message.error('请选择时间段')
        }
      } finally {
        this.clickFlag = false
      }
    },
    handleCurrentChange (val) {
      this.page = val
      this.cooperateLpgHoldStatistic(this.timeRange[0].getTime(), this.timeRange[1].getTime(), this.page, this.pageSize, true, this.keyword)
    },
    async cooperateLpgHoldStatistic (startTimestamp, endTimestamp, page, pageSize, needSummary, keyword) {
      const res = await cooperateLpgHoldStatistic(startTimestamp, endTimestamp, page, pageSize, needSummary, keyword)
      if (res.status === 200 && res.data.code === 0) {
        this.currentOperates = res.data.data.pageDetails
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
