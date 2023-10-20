<template>
  <div class="finance-bamboo-panel">
    <search-form @onSubmit="onSubmit"/>
    <el-table
      :data="currentBamboos"
      border
      style="width: 100%">
      <el-table-column
        fixed
        prop="name"
        label="昵称"
        width="150">
      </el-table-column>
      <el-table-column
        prop="uid"
        label="UID"
        width="150">
      </el-table-column>
      <el-table-column
        prop="preAmount"
        label="开始前余额"
        width="150">
      </el-table-column>
      <el-table-column
        prop="usdtToBamboo"
        label="USDT兑换成竹子的数量"
        width="150">
      </el-table-column>
      <el-table-column
        prop="giftBamboo"
        label="赠送的竹子数量"
        width="180">
      </el-table-column>
      <el-table-column
        prop="bambooTransIncome"
        label="获得好友划转的竹子"
        width="180">
      </el-table-column>
      <el-table-column
        prop="transferIn"
        label="划转收入详情"
        width="180">
      </el-table-column>
      <el-table-column
        prop="bambooWinningIncome"
        label="中奖获得竹子"
        width="180">
      </el-table-column>
      <el-table-column
        prop="bambooCooperateIncome"
        label="共建奖励获得竹子"
        width="180">
      </el-table-column>
      <el-table-column
        prop="bambooTransExpend"
        label="划转给好友的竹子"
        width="180">
      </el-table-column>
      <el-table-column
        prop="transferOut"
        label="划转支出详情"
        width="180">
      </el-table-column>
      <el-table-column
        prop="bambooFeed"
        label="投喂竹子数量"
        width="180">
      </el-table-column>
      <el-table-column
        prop="bambooToUsdt"
        label="兑换成USDT的竹子数量"
        width="180">
      </el-table-column>
      <el-table-column
        prop="returnBambooToUsdt"
        label="兑换成USDT时退还的赠送竹子数量"
        width="180">
      </el-table-column>
      <el-table-column
        prop="bambooAmount"
        label="即时竹子余额"
        width="180">
      </el-table-column>
    </el-table>
    <search-pagination
      :total="total"
      :pageSize="pageSize"
      @handleCurrentChange="handleCurrentChange"/>
  </div>
</template>

<script>
import {
  statistics
} from '@/service/bamboo.js'
import SearchForm from '@/components/admin-table-components/searchForm.vue'
import SearchPagination from '@/components/admin-table-components/searchPagination.vue'
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

      bamboos: [],
      currentBamboos: [],

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
          this.bambooStatistics(this.timeRange[0].getTime(), this.timeRange[1].getTime(), this.page, this.pageSize, true, this.keyword)
        } else {
          this.$message.error('请选择时间段')
        }
      } finally {
        this.clickFlag = false
      }
    },
    handleCurrentChange (val) {
      this.page = val
      this.bambooStatistics(this.timeRange[0].getTime(), this.timeRange[1].getTime(), this.page, this.pageSize, true, this.keyword)
    },
    async bambooStatistics (startTimestamp, endTimestamp, page, pageSize, needSummary, keyword) {
      const res = await statistics(startTimestamp, endTimestamp, page, pageSize, needSummary, keyword)
      if (res.status === 200 && res.data.code === 0) {
        this.currentBamboos = res.data.data.bamboos
        this.total = res.data.data.total
      }
    }
  }
}
</script>

<style lang="scss">

</style>
