<template>
  <div class="finance-statistic-panel">
    <search-form @onSubmit="onSubmit"/>
    <el-table
      :data="currentLotteries"
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
        prop="rafflePhase"
        label="期数">
      </el-table-column>
      <el-table-column
        prop="raffleNumber"
        label="下注号码">
        <template slot-scope="scope">
          {{ scope.row.raffleNumber == null ? null : scope.row.raffleNumber.join(',') }}
        </template>
      </el-table-column>
      <el-table-column
        prop="multiple"
        label="使用抽奖券数量">
      </el-table-column>
      <el-table-column
        prop="payTime"
        label="使用抽奖券时间">
      </el-table-column>
      <el-table-column
        prop="winStatus"
        label="中奖详情">
      </el-table-column>
      <el-table-column
        prop="hasSend"
        label="是否发放奖励">
        <template slot-scope="scope">
          {{ scope.row.hasSend ? '是' : '否' }}
        </template>
      </el-table-column>
      <el-table-column
        prop="rewardBambooCount"
        label="发放奖励数量">
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
  winStatistic
} from '@/service/raffle.js'
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
      lotteries: [],
      currentLotteries: [],
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
          this.winStatistics(this.timeRange[0].getTime(), this.timeRange[1].getTime(), this.page, this.pageSize, true, this.keyword)
        } else {
          this.$message.error('请选择时间段')
        }
      } finally {
        this.clickFlag = false
      }
    },
    handleCurrentChange (val) {
      this.page = val
      this.winStatistics(this.timeRange[0].getTime(), this.timeRange[1].getTime(), this.page, this.pageSize, true, this.keyword)
    },
    async winStatistics (startTimestamp, endTimestamp, page, pageSize, needSummary, keyword) {
      const res = await winStatistic(startTimestamp, endTimestamp, page, pageSize, needSummary, keyword)
      if (res.status === 200 && res.data.code === 0) {
        this.currentLotteries = res.data.data.pageDetails
        this.total = res.data.data.total
      }
    }
  }
}
</script>

<style lang="scss">
</style>
