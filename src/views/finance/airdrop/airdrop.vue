<template>
  <div class="finance-airdrop-panel">
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
        prop="beforeBalance"
        label="开始前余额">
      </el-table-column>
      <el-table-column
        prop="feedBamboo"
        label="已投喂竹子数量">
      </el-table-column>
      <el-table-column
        prop="feedAwardAmount"
        label="投喂竹子赠送的空投券数量">
      </el-table-column>
      <el-table-column
        prop="useAmount"
        label="使用的空投券数量">
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
  airdropStatistic
} from '@/service/statistic.js'

export default {
  components: {
    SearchForm,
    SearchPagination
  },
  data () {
    return {
      total: 0,
      page: 1,
      pageSize: 20,

      airdrops: [],
      currentAirdrops: []
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
          this.currentRaffles = []
          this.total = 0
          this.airdropStatistics(this.timeRange[0].getTime(), this.timeRange[1].getTime(), this.page, this.pageSize, true, this.keyword)
        } else {
          this.$message.error('请选择时间段')
        }
      } finally {
        this.clickFlag = false
      }
    },
    handleCurrentChange (val) {
      this.page = val
      this.airdropStatistics(this.timeRange[0].getTime(), this.timeRange[1].getTime(), this.page, this.pageSize, true, this.keyword)
    },
    async airdropStatistics (startTimestamp, endTimestamp, page, pageSize, needSummary, keyword) {
      const res = await airdropStatistic(startTimestamp, endTimestamp, page, pageSize, needSummary, keyword)
      if (res.status === 200 && res.data.code === 0) {
        this.currentRaffles = res.data.data.airdrops
        this.total = res.data.data.total
      }
    }
  }
}
</script>

<style lang="scss">
</style>
