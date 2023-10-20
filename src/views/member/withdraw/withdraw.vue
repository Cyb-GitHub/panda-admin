<template>
  <div class="member-withdraw-panel">
    <search-form @onSubmit="onSubmit"/>
    <body>共{{ totalPage }}页{{ total }}条记录 本页共{{ currentWithdraws.length }}条记录</body>
    <body>
      完成提现USDT币种的数量共{{ summary.usdtFinishWithdrawalAmount }}
      完成提现的手续费共{{ summary.usdtFinishWithdrawalPremiumAmount }}
      应付实际的数量共{{ summary.usdtFinishWithdrawalAmount - summary.usdtFinishWithdrawalPremiumAmount }}
      提现中的USDT的数量共{{ summary.usdtProcessWithdrawalAmount }}
      提现中的手续费共{{ summary.usdtProcessWithdrawalPremiumAmount }}
    </body>
    <body>
      完成提现LPG币种的数量共{{ summary.lpgFinishWithdrawalAmount }}
      完成提现的手续费共{{ summary.lpgFinishWithdrawalPremiumAmount }}
      应付实际的数量共{{ summary.lpgFinishWithdrawalAmount - summary.lpgFinishWithdrawalPremiumAmount }}
      提现中的LPG的数量共{{ summary.lpgProcessWithdrawalAmount }}
      提现中的手续费共{{ summary.lpgProcessWithdrawalPremiumAmount }}
    </body>
    <el-table
      :data="currentWithdraws"
      border
      style="width: 100%">
      <el-table-column
        fixed
        prop="accountEmail"
        label="账号"
        width="250">
      </el-table-column>
      <el-table-column
        prop="accountName"
        label="名称"
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
        label="提现数量"
        width="250">
        <template slot-scope="scope">
          {{ Math.abs(getDec(scope.row.amount)) }}
        </template>
      </el-table-column>
      <el-table-column
        prop="premium"
        label="提现手续费"
        width="250">
        <template slot-scope="scope">
          {{ getDec(scope.row.premium) }}
        </template>
      </el-table-column>
      <el-table-column
        prop="premium"
        label="应付数量"
        width="250">
        <template slot-scope="scope">
          {{ getSub(scope.row) }}
        </template>
      </el-table-column>
      <el-table-column
        prop="outerAmountAddress"
        label="交易地址"
        width="250">
      </el-table-column>
      <el-table-column
        prop="status"
        label="状态"
        width="150">
      </el-table-column>
      <el-table-column
        prop="createTime"
        label="申请时间"
        width="150">
      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作"
        width="300">
        <template slot-scope="scope">
          <el-button
            v-if="scope.row.statusVal === 3" v-loading.fullscreen.lock="fullscreenLoading"
            type="primary"
            size="mini"
            @click="() => handleOpenConfirm(scope.row)"
          >
            通过
          </el-button>
          <el-popconfirm
            confirm-button-text='好的'
            cancel-button-text='取消'
            icon="el-icon-info"
            icon-color="red"
            title="确定不通过？"
            @onConfirm="() => handleOperate(scope.row, 0, '')"
          >
            <el-button slot="reference" v-if="scope.row.statusVal === 3" v-loading.fullscreen.lock="fullscreenLoading" type="primary" size="mini" >不通过</el-button>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
    <search-pagination :total="total"
                       :pageSize="pageSize"
                       @handleCurrentChange="handleCurrentChange"/>
    <withdraw-confirm :visible="confirmVisible" @confirm="handleConfirm" @close="confirmVisible = false"/>
  </div>
</template>

<script>
import SearchForm from '@/components/admin-table-components/searchForm.vue'
import SearchPagination from '@/components/admin-table-components/searchPagination.vue'
import {
  statistics, process, refuse
} from '@/service/withdrawal.js'
import cloneDeep from 'lodash/cloneDeep'
import Decimal from 'Decimal.js'
import WithdrawConfirm from './withdraw-confirm.vue'

export default {
  components: {
    SearchForm,
    SearchPagination,
    WithdrawConfirm
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
      currentWithdraws: [],
      fullscreenLoading: false,
      summary: {
        usdtFinishWithdrawalAmount: 0,
        lpgFinishWithdrawalAmount: 0,
        usdtFinishWithdrawalPremiumAmount: 0,
        lpgFinishWithdrawalPremiumAmount: 0,
        usdtProcessWithdrawalAmount: 0,
        lpgProcessWithdrawalAmount: 0,
        usdtProcessWithdrawalPremiumAmount: 0,
        lpgProcessWithdrawalPremiumAmount: 0
      },
      clickFlag: false,

      confirmVisible: false,
      currentRow: {}
    }
  },
  mounted () {
  },
  activated () {
  },
  methods: {
    getSub (row) {
      const t = new Decimal(row.amount)
      const t1 = new Decimal(row.premium)
      return t.abs().sub(t1).toFixed()
    },
    getDec (amount) {
      const t = new Decimal(amount)
      return t.toFixed()
    },
    onSubmit (queryInfo) {
      this.clickFlag = true
      try {
        this.timeRange = cloneDeep(queryInfo.duration)
        this.keyword = queryInfo.query
        if (this.timeRange != null && this.timeRange.length === 2) {
          this.withdrawalStatistics(this.timeRange[0].getTime(), this.timeRange[1].getTime(), this.page, this.pageSize, true, this.keyword)
        } else {
          this.$message.error('请选择时间段')
        }
      } finally {
        this.clickFlag = false
      }
    },
    handleCurrentChange (val) {
      this.page = val
      this.withdrawalStatistics(this.timeRange[0].getTime(), this.timeRange[1].getTime(), this.page, this.pageSize, false, this.keyword)
    },
    /**
     * 提现统计
     */
    async withdrawalStatistics (startTimestamp, endTimestamp, page, pageSize, needSummary, keyword) {
      const res = await statistics(startTimestamp, endTimestamp, page, pageSize, needSummary, keyword)
      if (res.status === 200 && res.data.code === 0) {
        this.currentWithdraws = res.data.data.pages.list
        this.total = res.data.data.pages.totalCount
        this.page = res.data.data.pages.currPage
        this.pageSize = res.data.data.pages.pageSize
        this.totalPage = res.data.data.pages.totalPage
        if (needSummary) {
          this.summary.usdtFinishWithdrawalAmount = res.data.data.usdtFinishWithdrawalAmount
          this.summary.lpgFinishWithdrawalAmount = res.data.data.lpgFinishWithdrawalAmount
          this.summary.usdtFinishWithdrawalPremiumAmount = res.data.data.usdtFinishWithdrawalPremiumAmount
          this.summary.lpgFinishWithdrawalPremiumAmount = res.data.data.lpgFinishWithdrawalPremiumAmount
          this.summary.usdtProcessWithdrawalAmount = res.data.data.usdtProcessWithdrawalAmount
          this.summary.lpgProcessWithdrawalAmount = res.data.data.lpgProcessWithdrawalAmount
          this.summary.usdtProcessWithdrawalPremiumAmount = res.data.data.usdtProcessWithdrawalPremiumAmount
          this.summary.lpgProcessWithdrawalPremiumAmount = res.data.data.lpgProcessWithdrawalPremiumAmount
        }
      }
    },
    handleOpenConfirm (row) {
      this.currentRow = row
      this.confirmVisible = true
    },
    handleConfirm (txHash) {
      this.confirmVisible = false
      this.handleOperate(this.currentRow, 1, txHash)
    },
    async handleOperate (row, type, withdrawalTxHash) {
      this.fullscreenLoading = true
      if (type === 1) {
        await process(row.accountId, row.id, this.getSub(row), row.hash, withdrawalTxHash)
        await this.withdrawalStatistics(this.timeRange[0].getTime(), this.timeRange[1].getTime(), this.page, this.pageSize, false, this.keyword)
      } else if (type === 0) {
        await refuse(row.accountId, row.id, this.getSub(row), row.hash)
        await this.withdrawalStatistics(this.timeRange[0].getTime(), this.timeRange[1].getTime(), this.page, this.pageSize, false, this.keyword)
      }
      this.fullscreenLoading = false
    }
  }
}
</script>

<style lang="scss">
</style>
