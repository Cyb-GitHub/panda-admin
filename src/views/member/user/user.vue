<template>
  <div class="user-panel">
    <search-form
      :is-time-selection="false"
      @onSubmit="onSubmit"
    />

    <el-table
      :data="currentUsers"
      border
      style="width: 100%">
      <el-table-column
        fixed
        prop="createTime"
        label="注册时间"
        width="200">
        <template slot-scope="scope">
          {{scope.row.createTime}}
        </template>
      </el-table-column>
      <el-table-column
        prop="lastLogTime"
        label="最后登陆时间"
        width="150">
      </el-table-column>
      <el-table-column
        prop="email"
        label="账号"
        width="150">
      </el-table-column>
      <el-table-column
        prop="name"
        label="昵称"
        width="120">
      </el-table-column>
      <el-table-column
        prop="uid"
        label="UID"
        width="300">
      </el-table-column>
      <el-table-column
        prop="accountAddress"
        label="USDT账户"
        width="320">
      </el-table-column>
      <el-table-column
        prop="isActivated"
        label="状态"
        width="120">
        <template slot-scope="scope">
          {{ userStatus.ENABLE.status === scope.row.isActivated ?  userStatus.ENABLE.text : userStatus.DISABLE.text }}
        </template>
      </el-table-column>
      <el-table-column
        prop="qualify"
        label="共建奖励发放资格"
        width="150">
      </el-table-column>
      <el-table-column
        prop="share"
        label="分享"
        width="120">
        <template slot-scope="scope">
          <el-button @click="handleCheckShare(scope.row)" type="text" size="small">查看</el-button>
        </template>
      </el-table-column>
      <el-table-column
        prop="recName"
        label="推荐人昵称"
        width="120">
      </el-table-column>
      <el-table-column
        prop="recUid"
        label="推荐人UID"
        width="120">
      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作"
        width="300">
        <template slot-scope="scope">
          <template>
            <el-button v-if="scope.row.isActivated === userStatus.ENABLE.status"
                       type="primary" size="mini"
                       @click="() => handleStatusChange(scope.row, userStatus.DISABLE)">禁用</el-button>
            <el-button v-else type="primary"
                       size="mini" @click="() => handleStatusChange(scope.row, userStatus.ENABLE)">启用</el-button>
          </template>
          <el-button type="primary" size="mini" @click="() => handleRecharge(scope.row)">充值</el-button>
          <el-button type="primary" size="mini" @click="() => handleResetPassword(scope.row)">修改密码</el-button>
          <el-button type="primary" size="mini" @click="() => handleChangeEmail(scope.row)">修改登陆邮箱</el-button>
          <el-button type="primary" size="mini" @click="() => handleChangeName(scope.row)">修改昵称</el-button>
          <el-button type="primary" size="mini" @click="handleFindGoogle">找回谷歌令牌</el-button>
        </template>
      </el-table-column>
    </el-table>

    <search-pagination :total="total"
                       :pageSize="pageSize"
                       :currentPage="currentPage"
                       @handleCurrentChange="handleCurrentChange"/>

    <Recharge :visible="rechargeVisible"
              :user="currentUser"
              @closeRecharge="handleRechargeClose"
              @confirmRecharge="handleRechargeConfirm"
    />
    <el-drawer
      title="分享列表"
      size="60%"
      :visible.sync="sharePanelStatus"
      direction="rtl"
      :before-close="handleCloseShare">
      <el-table
        :data="shareLists"
        border
        style="width: 100%">
        <el-table-column
          prop="email"
          label="账号"
          width="150">
        </el-table-column>
        <el-table-column
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
          prop="ownType"
          label="持有方式"
          width="150">
        </el-table-column>
        <el-table-column
          prop="lpgNum"
          label="LPG持有数量"
          width="150">
        </el-table-column>
        <el-table-column
          prop="lpgDay"
          label="LPG持有天数"
          width="150">
        </el-table-column>
        <el-table-column
          prop="qualify"
          label="共建奖励领取资格"
          width="150">
        </el-table-column>
        <el-table-column
          prop="createTime"
          label="注册时间"
          width="150">
        </el-table-column>
      </el-table>
    </el-drawer>
  </div>
</template>

<script>
import {USER_STATUS} from '@/constant/userConstant'
import SearchForm from '@/components/admin-table-components/searchForm.vue'
import SearchPagination from '@/components/admin-table-components/searchPagination.vue'
import Recharge from './recharge.vue'
import {
  modifyUser,
  search
} from '@/service/user.js'
import {
  startRecharge,
  processRecharge
} from '@/service/recharge.js'
export default {
  components: {
    SearchForm,
    SearchPagination,
    Recharge
  },
  data () {
    return {
      userStatus: USER_STATUS,
      total: 0,
      pageSize: 20,
      currentPage: 0,

      currentUsers: [],
      users: [],
      sharePanelStatus: false,
      shareRow: {},
      shareLists: [],

      rechargeVisible: false,
      currentUser: {}
    }
  },
  mounted () {
    this.searchUsers({})
  },
  activated () {
  },
  methods: {
    onSubmit (queryInfo) {
      this.searchUsers({
        query: queryInfo.query,
        duration: queryInfo.duration.length === 0
          ? []
          : [queryInfo.duration[0].getTime(), queryInfo.duration[1].getTime()]
      })
    },
    handleCheckShare (row) {
      this.sharePanelStatus = true
      this.shareRow = row
    },
    handleCloseShare () {
      this.sharePanelStatus = false
    },
    handleStatusChange (row, status) {
      row.isActivated = status.status
      this.handleModify(row)
    },
    async searchUsers (queryInfo) {
      const us = await search(queryInfo)
      if (us.status === 200 && us.data.code === 0) {
        this.total = us.data.data.total
        this.users = us.data.data.accounts
        this.currentPage = 0
        this.currentUsers = this.users.slice(0, this.pageSize)
      } else {
        this.total = 0
        this.users = []
        this.currentUsers = []
      }
    },
    async handleChangeEmail (row) {
      try {
        const value = await this.$prompt('请输入邮箱', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          inputPattern: /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/,
          inputErrorMessage: '邮箱格式不正确'
        })
        row.email = value.value
        this.handleModify(row)
        console.log(modifyUser)
      } catch (e) {
        this.$message({
          type: 'info',
          message: '取消输入'
        })
      }
    },
    async handleChangeName (row) {
      try {
        const value = await this.$prompt('请输入昵称', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消'
        })
        row.name = value.value
        await this.handleModify(row)
      } catch (e) {
        this.$message({
          type: 'info',
          message: '取消输入'
        })
      }
    },
    async handleRecharge (row) {
      this.currentUser = row
      this.rechargeVisible = true
    },
    async handleResetPassword (row) {
      try {
        const value = await this.$prompt('请输入新密码', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消'
        })
        row.password = value.value
        await this.handleModify(row)
      } catch (e) {
        this.$message({
          type: 'info',
          message: '取消输入'
        })
      }
    },
    async handleRechargeConfirm (rechargeInfo) {
      const states = await startRecharge({
        accountId: this.currentUser.id,
        amountType: rechargeInfo.accountType,
        amount: rechargeInfo.accountAmount
      })
      if (states.status === 200 && states.data.code === 0) {
        for (const s in states.data.data) {
          await processRecharge({
            accountId: this.currentUser.id,
            statementId: states.data.data[s].id
          })
        }
        this.$message({
          type: 'info',
          message: '充值成功'
        })
      }
      this.rechargeVisible = false
    },
    async handleRechargeClose (s) {
      this.rechargeVisible = false
    },
    async handleModify (row) {
      const t = await modifyUser(row)
      if (t.data.code !== 0) {
        this.$message.error(t.data.msg)
      }
      return t
    },
    handleFindGoogle (row) {
      console.log('handleFindGoogle')
    },
    handleCurrentChange (val) {
      this.currentUsers = this.users.slice(this.pageSize * (val - 1), this.pageSize * val)
    }
  }
}
</script>

<style lang="scss">
.user-panel {

}
.el-drawer.rtl {
  overflow: scroll
}
</style>
