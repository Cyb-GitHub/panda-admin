<template>
  <div class="finance-open-panel">
    <search-form @onSubmit="onSubmit"/>
    <el-table
      :data="currentOpens"
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
        prop="payTime"
        label="下注时间">
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
  tobeStatistic
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

      opens: [],
      currentOpens: [],

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
          this.tobeStatistics(this.timeRange[0].getTime(), this.timeRange[1].getTime(), this.page, this.pageSize, true, this.keyword)
        } else {
          this.$message.error('请选择时间段')
        }
      } finally {
        this.clickFlag = false
      }
    },
    handleCurrentChange (val) {
      this.page = val
      this.tobeStatistics(this.timeRange[0].getTime(), this.timeRange[1].getTime(), this.page, this.pageSize, true, this.keyword)
    },
    async tobeStatistics (startTimestamp, endTimestamp, page, pageSize, needSummary, keyword) {
      const res = await tobeStatistic(startTimestamp, endTimestamp, page, pageSize, needSummary, keyword)
      if (res.status === 200 && res.data.code === 0) {
        this.currentOpens = res.data.data.pageDetails
        this.total = res.data.data.total
      }
    }
  }
}
</script>

<style lang="scss">
</style>
