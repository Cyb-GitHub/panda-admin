<template>
  <div class="member-invest-panel">
    <search-form @onSubmit="onSubmit"/>
    <body>共{{ totalPage }}页{{ total }}条记录 本页共{{ currentInvests.length }}条记录</body>
    <body>充值USDT币种的数量共{{ summary.usdtTotalRechargeAmount }} 实际到账数量共{{ summary.usdtActualRechargeAmount }}</body>
    <body>充值LPG币种的数量共{{ summary.lpgTotalRechargeAmount }} 实际到账数量共{{ summary.lpgActualRechargeAmount }}</body>
    <el-table
      :data="currentInvests"
      border
      style="width: 100%">
      <el-table-column
        fixed
        prop="createTime"
        label="充值时间"
        width="250">
      </el-table-column>
      <el-table-column
        prop="accountEmail"
        label="账号"
        width="250">
      </el-table-column>
      <el-table-column
        prop="accountName"
        label="昵称"
        width="250">
      </el-table-column>
      <el-table-column
        prop="accountUid"
        label="UID"
        width="250">
      </el-table-column>
      <el-table-column
        prop="amountType"
        label="充值币种"
        width="250">
      </el-table-column>
      <el-table-column
        prop="amount"
        label="充值数量"
        width="250">
        <template slot-scope="scope">
          {{ getDec(scope.row.amount) }}
        </template>
      </el-table-column>
      <el-table-column
        prop="actualRechargeAmount"
        label="实际到账数量"
        width="250">
      </el-table-column>
      <el-table-column
        prop="status"
        label="状态"
        width="150">
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
} from '@/service/recharge.js'
import Decimal from 'Decimal.js'

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
      totalPage: 0,
      pageCount: 0,
      timeRange: [],
      keyword: undefined,
      currentInvests: [],
      summary: {
        usdtTotalRechargeAmount: 0,
        lpgTotalRechargeAmount: 0,
        usdtActualRechargeAmount: 0,
        lpgActualRechargeAmount: 0
      },
      clickFlag: false
    }
  },
  mounted () {
  },
  activated () {
  },
  methods: {
    getDec (amount) {
      const t = new Decimal(amount)
      return t.toFixed()
    },
    onSubmit (queryInfo) {
      this.clickFlag = true
      try {
        this.timeRange = queryInfo.duration
        this.keyword = queryInfo.query
        if (this.timeRange != null && this.timeRange.length === 2) {
          this.rechargeStatistics(this.timeRange[0].getTime(), this.timeRange[1].getTime(), this.page, this.pageSize, true, this.keyword)
        } else {
          this.$message.error('请选择时间段')
        }
      } finally {
        this.clickFlag = false
      }
    },
    handleCurrentChange (val) {
      this.page = val
      this.rechargeStatistics(this.timeRange[0].getTime(), this.timeRange[1].getTime(), this.page, this.pageSize, false, this.keyword)
    },
    /**
     * 充值统计
     */
    async rechargeStatistics (startTimestamp, endTimestamp, page, pageSize, needSummary, keyword) {
      const res = await statistics(startTimestamp, endTimestamp, page, pageSize, needSummary, keyword)
      if (res.status === 200 && res.data.code === 0) {
        this.currentInvests = res.data.data.pages.list
        this.total = res.data.data.pages.totalCount
        this.page = res.data.data.pages.currPage
        this.pageSize = res.data.data.pages.pageSize
        this.totalPage = res.data.data.pages.totalPage
        if (needSummary) {
          this.summary.usdtTotalRechargeAmount = res.data.data.usdtTotalRechargeAmount
          this.summary.lpgTotalRechargeAmount = res.data.data.lpgTotalRechargeAmount
          this.summary.usdtActualRechargeAmount = res.data.data.usdtActualRechargeAmount
          this.summary.lpgActualRechargeAmount = res.data.data.lpgActualRechargeAmount
        }
      }
    }
  }
}
</script>

<style lang="scss">
</style>
