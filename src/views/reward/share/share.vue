<template>
  <div class="reward-share-panel">
    <search-form @onSubmit="onSubmit"/>
    <el-table
      :data="currentShares"
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
      <!-- <el-table-column
        prop="share"
        label="分享"
        width="80">
        <template slot-scope="scope">
          <el-button @click="handleCheckShare(scope.row)" type="text" size="small">查看</el-button>
        </template>
      </el-table-column> -->
      <el-table-column
        prop="bambooToLpgAmount"
        label="竹子兑换LPG数量"
        width="250">
      </el-table-column>
      <el-table-column
        prop="airdropLpgAmount"
        label="空投获得LPG"
        width="250">
      </el-table-column>
      <el-table-column
        prop="remainAmount"
        label="LPG总计数量"
        width="250">
      </el-table-column>
      <el-table-column
        prop="amount"
        label="获得奖励数量"
        width="250">
      </el-table-column>
    </el-table>
    <search-pagination
      :total="total"
      :pageSize="pageSize"
      @handleCurrentChange="handleCurrentChange"/>

    <el-drawer
      title="分享列表"
      :visible.sync="panelVisible"
      size="60%"
      :before-close="handleClose">
      <share-member :user="currentRow"/>
    </el-drawer>
  </div>
</template>

<script>
import SearchForm from '@/components/admin-table-components/searchForm.vue'
import SearchPagination from '@/components/admin-table-components/searchPagination.vue'
import ShareMember from './share-member.vue'
import {
  shareRewardStatistic
} from '@/service/share.js'

export default {
  components: {
    SearchForm,
    SearchPagination,
    ShareMember
  },
  data () {
    return {
      total: 0,
      pageSize: 20,
      page: 1,

      currentShares: [],

      currentRow: {},
      panelVisible: false
    }
  },
  mounted () {
    this.total = this.shares.length
    this.currentShares = []
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
          this.shareRewardStatistic(this.timeRange[0].getTime(), this.timeRange[1].getTime(), this.page, this.pageSize, true, this.keyword)
        } else {
          this.$message.error('请选择时间段')
        }
      } finally {
        this.clickFlag = false
      }
    },
    handleCurrentChange (val) {
      this.page = val
      this.shareRewardStatistic(this.timeRange[0].getTime(), this.timeRange[1].getTime(), this.page, this.pageSize, true, this.keyword)
    },
    async shareRewardStatistic (startTimestamp, endTimestamp, page, pageSize, needSummary, keyword) {
      const res = await shareRewardStatistic(startTimestamp, endTimestamp, page, pageSize, needSummary, keyword)
      if (res.status === 200 && res.data.code === 0) {
        this.currentShares = res.data.data.pageDetails
        this.total = res.data.data.total
      }
    },
    handleCheckShare (row) {
      this.panelVisible = true
      this.currentRow = row
    },
    handleClose () {
      this.panelVisible = false
    }
  }
}
</script>

<style lang="scss">
.el-drawer.rtl {
  overflow: scroll
}
</style>
