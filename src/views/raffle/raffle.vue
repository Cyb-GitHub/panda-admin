<template>
  <div>
    <el-form :inline="true" :model="searchInfo" class="demo-form-inline">
      <el-form-item>
        <el-button type="primary" @click="onCreate">新建抽奖</el-button>
      </el-form-item>
    </el-form>
    <el-table
      :data="currentRaffles"
      border
      style="width: 100%">
      <el-table-column
        prop="rafflePhase"
        label="抽奖期数"
        width="150">
        <template slot-scope="scope">
          {{`第 ${scope.row.rafflePhase} 期`}}
        </template>
      </el-table-column>
      <el-table-column
        prop="drawTime"
        label="抽奖时间"
        width="250">
      </el-table-column>
      <el-table-column
        label="抽奖状态">
        <template slot-scope="scope">
          {{RAFFLE_STATUS.TO_BE_DRAWN.status === scope.row.status ? RAFFLE_STATUS.TO_BE_DRAWN.text : RAFFLE_STATUS.DRAWN.text}}
        </template>
      </el-table-column>
      <el-table-column
        label="奖品发放状态">
        <template slot-scope="scope">
          {{RAFFLE_SEND_STATUS.SEND.status === scope.row.raffleSendStatus ? RAFFLE_SEND_STATUS.SEND.text : RAFFLE_SEND_STATUS.UNSEND.text}}
        </template>
      </el-table-column>
      <el-table-column
        prop="raffleSendTime"
        label="奖品发放时间">
      </el-table-column>
      <el-table-column
        prop="winningNumber"
        label="开奖数字">
        <template slot-scope="scope">
          <span>{{ scope.row.winningNumber ? scope.row.winningNumber.join() : '-'}}</span>
        </template>
      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作"
        width="400">
        <template slot-scope="scope">
          <el-tooltip class="item" effect="dark" content="操作按钮仅允许在抽奖时间之后操作；第一次操作过后的管理员不允许操作第二次，请切换操作" placement="top-start">
            <span>
              <el-button v-if="scope.row.status === RAFFLE_STATUS.TO_BE_DRAWN.status"
                         :disabled="!scope.row.setWinAuth"
                         type="primary" size="mini" @click="() => handleSetWinningNumber(scope.row)">
                设置中奖号码
              </el-button>
            </span>
          </el-tooltip>
          <el-tooltip class="item" effect="dark" content="延迟发放仅允许在确认中奖号码后操作" placement="top-start">
            <span>
              <el-button
                v-if="scope.row.raffleSendStatus === RAFFLE_SEND_STATUS.UNSEND.status"
                :disabled="scope.row.setDelayAuth"
                type="primary" size="mini" @click="() => handleDelay(scope.row)">
                延迟发放
              </el-button>
            </span>
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>
    <search-pagination :total="total"
                       :pageSize="pageSize"
                       :currentPage="currentPage"
                       @handleCurrentChange="handleCurrentChange"/>
    <raffle-editor
      :raffle="currentRaffle"
      :dialog-visible="editorVisible"
      :is-create="true"
      @closeEditor="handleEditorCLose"
      @confirmEditor="handleEditorConfirm"
    />
    <raffle-result-setter
      :setterVisible="setterVisible"
      :raffle-activity="currentRaffle"
      @confirmResultSetter="handleResultSetterConfirm"
      @closeResultSetter="handleResultSetterClose"
    />
  </div>
</template>

<script>
import {
  query,
  create,
  setBall,
  sendBall,
  delay
} from '@/service/raffle.js'
import _ from 'lodash'
import SearchPagination from '@/components/admin-table-components/searchPagination.vue'
import {RAFFLE_STATUS, RAFFLE_SEND_STATUS} from '@/constant/raffleConstant'
import RaffleEditor from './raffleEditor.vue'
import RaffleResultSetter from './raffleResultSetter.vue'
import moment from 'moment'

export default {
  components: {
    SearchPagination,
    RaffleEditor,
    RaffleResultSetter
  },
  data () {
    return {
      searchInfo: {},
      pageSize: 20,
      currentPage: 1,
      total: 0,
      currentRaffles: [],
      currentRaffle: {
        winningNumber: []
      },
      setterVisible: false,
      editorVisible: false,
      isCreate: false,
      rafflePhase: 0,
      hasToBeDrawn: false,
      RAFFLE_STATUS,
      RAFFLE_SEND_STATUS
    }
  },
  mounted () {
    this.search(this.currentPage)
  },
  methods: {
    setWinEnable (row) {
      if (row.firstConfirmManagerId === 0) {
        const m = moment(row.drawTime, 'YYYYMMDD hh:mm:ss')
        return m.isBefore(moment())
      } else {
        const m = moment(row.drawTime, 'YYYYMMDD hh:mm:ss')
        if (m.isAfter(moment())) {
          return false
        } else {
          if (this.$store.state.user.id === row.firstConfirmManagerId) {
            return false
          } else {
            return true
          }
        }
      }
    },
    setDelayAuth (row) {
      if (RAFFLE_STATUS.TO_BE_DRAWN.status !== row.status) {
        return false
      }
      return true
    },
    onCreate () {
      if (this.hasToBeDrawn) {
        this.$message('当前存在正在正在进行尚未开奖的活动')
        return
      }
      const drawnTime = new Date()
      this.currentRaffle = {
        rafflePhase: this.rafflePhase,
        drawTime: new Date(drawnTime.getTime() + 1000 * 24 * 60 * 60)
      }
      this.editorVisible = true
    },
    handleCurrentChange (cp) {
      this.currentPage = cp
      this.search(cp)
    },
    async handleSetWinningNumber (row) {
      this.setterVisible = true
      this.currentRaffle = row
    },
    async handleDelay (row) {
      await delay({
        rafflePhase: row.rafflePhase
      })
    },
    handleResultSetterClose () {
      this.setterVisible = false
    },
    async handleResultSetterConfirm (val) {
      this.setterVisible = false
      console.log(val)
      // 设置并确认
      if (this.currentRaffle.firstConfirmManagerId === 0) {
        console.log('firstConfirmManagerId', val)
        await setBall({
          rafflePhase: this.currentRaffle.rafflePhase,
          winningNumber: val
        })
      } else {
        await sendBall({
          rafflePhase: this.currentRaffle.rafflePhase,
          winningNumber: val
        })
      }
      this.search(this.currentPage)
    },
    handleEditorCLose (ic) {
      this.editorVisible = false
    },
    async handleEditorConfirm (val, ic) {
      this.editorVisible = false
      if (ic) {
        await create({
          rafflePhase: val.rafflePhase,
          drawTime: val.drawTime.getTime()
        })
      }
      await this.search(this.currentPage)
    },
    async search (page) {
      const raffles = await query({
        page: page,
        pageSize: this.pageSize
      })
      if (raffles.status !== 200 || raffles.data.code !== 0) {
        this.page = 1
        this.total = 0
        return
      }
      this.total = raffles.data.totalCount
      this.currentRaffles = _.map(raffles.data.data.list, (row) => {
        row.setWinAuth = this.setWinEnable(row)
        row.setDelayAuth = this.setDelayAuth(row)
        return row
      })
      this.rafflePhase = raffles.data.data.latestRafflePhase + 1
      this.hasToBeDrawn = raffles.data.data.hasToBeDrawn
    }
  }
}
</script>

<style lang="scss">
</style>
