<template>
  <div class="finance-lgp-panel">
    <search-form @onSubmit="onSubmit"/>
    <el-table
      :data="currentLpgs"
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
        prop="chargeAmount"
        label="已完成充值数量"
        width="150">
      </el-table-column>
      <el-table-column
        prop="bambooToLpg"
        label="竹子兑换成LPG数量"
        width="180">
      </el-table-column>
      <el-table-column
        prop="lpgFromAirdrop"
        label="空投获得的LPG数量"
        width="180">
      </el-table-column>
      <el-table-column
        prop="shareLpg"
        label="分享获得LPG数量"
        width="180">
      </el-table-column>
      <el-table-column
        prop="exchangeLpg"
        label="内部交易出售LPG数量"
        width="180">
      </el-table-column>
      <el-table-column
        prop="exchangeLpgCharge"
        label="内部交易出售LPG手续费"
        width="180">
      </el-table-column>
      <el-table-column
        prop="withdrawingLpg"
        label="LPG提现中数量"
        width="180">
      </el-table-column>
      <el-table-column
        prop="withdrawingLpgCharge"
        label="LPG提现中订单手续费"
        width="180">
      </el-table-column>
      <el-table-column
        prop="withdrawedLpg"
        label="LPG提现完成数量"
        width="180">
      </el-table-column>
      <el-table-column
        prop="withdrawedLpgCharge"
        label="LPG提现完成订单手续费"
        width="180">
      </el-table-column>
      <el-table-column
        prop="lpgAmount"
        label="即时余额"
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
import SearchForm from '@/components/admin-table-components/searchForm.vue'
import SearchPagination from '@/components/admin-table-components/searchPagination.vue'
import {
  statistics
} from '@/service/lpg.js'
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
      currentLpgs: [],

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
          this.lpgStatistics(this.timeRange[0].getTime(), this.timeRange[1].getTime(), this.page, this.pageSize, true, this.keyword)
        } else {
          this.$message.error('请选择时间段')
        }
      } finally {
        this.clickFlag = false
      }
    },
    handleCurrentChange (val) {
      this.page = val
      this.lpgStatistics(this.timeRange[0].getTime(), this.timeRange[1].getTime(), this.page, this.pageSize, true, this.keyword)
    },
    async lpgStatistics (startTimestamp, endTimestamp, page, pageSize, needSummary, keyword) {
      const res = await statistics(startTimestamp, endTimestamp, page, pageSize, needSummary, keyword)
      if (res.status === 200 && res.data.code === 0) {
        this.currentLpgs = res.data.data.lpgs
        this.total = res.data.data.total
      }
    }
  }
}
</script>

<style lang="scss">
</style>
