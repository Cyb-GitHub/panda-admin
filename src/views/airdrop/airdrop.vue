<template>
<div>
    <el-form :inline="true" :model="searchInfo" class="demo-form-inline">
      <el-form-item>
        <el-button type="primary" @click="onCreate">新建空投</el-button>
      </el-form-item>
    </el-form>
    <el-table
      :data="currentAirdrops"
      border
      style="width: 100%">
      <el-table-column
        prop="airdropPhase"
        label="空投期数"
        width="150">
      </el-table-column>
      <el-table-column
        prop="lpgTotalCount"
        label="空投LPG数"
        width="250">
      </el-table-column>
      <el-table-column
        prop="airdropTicketCount"
        label="本期空投券总量(发放空投后计算)"
        width="250">
      </el-table-column>
      <el-table-column
        prop="actLpgAmountPerTicket"
        label="每张空投券可获lpg数量(发放空投后计算)"
        width="250">
      </el-table-column>
      <el-table-column
        prop="airdropActivityStatus"
        label="空投活动状态">
        <template slot-scope="scope">
          {{getAirdropActivityStatusText(scope.row.airdropActivityStatus)}}
        </template>
      </el-table-column>
      <el-table-column
        prop="createTime"
        label="创建时间">
      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作"
        width="400">
        <template slot-scope="scope">
          <el-tooltip class="item" effect="dark" content="" placement="top-start">
            <span>
              <el-button v-if="scope.row.airdropActivityStatus === 1"
                         :disabled="scope.row.airdropActivityStatus !== 1"
                         type="primary" size="mini" @click="() => handleSendAirdrop(scope.row)">
                发送空投奖励
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
    <airdrop-editor
      :dialog-visible="editorVisible"
      @closeEditor="handleEditorCLose"
      @confirmEditor="handleEditorConfirm"
    />
    <airdrop-result-setter
      :dialog-visible="sendAirdropVisible"
      :airdrop-phase="sendAirdropPhase"
      :operate-available="sendAirdropAvailable"
      @confirmSendAirdrop="handleSendAirdropConfirm"
      @closeSendAirdrop="handleSendAirdropClose"
    />
  </div>
</template>

<script>
import {
  search,
  create,
  send
} from '@/service/airdrop.js'
import _ from 'lodash'
import SearchPagination from '@/components/admin-table-components/searchPagination.vue'
import {getAirdropActivityStatusText} from '@/constant/airdropConstant'
import AirdropEditor from './airdropEditor.vue'
import AirdropResultSetter from './airdropResultSetter.vue'
export default {
  name: 'airdrop',
  components: {
    SearchPagination,
    AirdropResultSetter,
    AirdropEditor
  },
  data () {
    return {
      searchInfo: {
        startAirdropPhase: '1970-01-01',
        endAirdropPhase: '2999-01-01'
      },
      pageSize: 20,
      currentPage: 1,
      total: 0,
      currentAirdrops: [],
      editorVisible: false,
      sendAirdropVisible: false,
      sendAirdropPhase: undefined,
      sendAirdropAvailable: false
    }
  },
  mounted () {
    this.search(this.currentPage)
  },
  methods: {
    getAirdropActivityStatusText,
    handleCurrentChange (cp) {
      this.currentPage = cp
      this.search(cp)
    },
    handleEditorCLose () {
      this.editorVisible = false
    },
    async handleEditorConfirm (val) {
      this.editorVisible = false
      const res = await create(val.airdropPhase, val.lpgTotalCount)
      if (res.status !== 200 || res.data.code !== 0) {
        console.log(res.data.msg)
        return
      }
      await this.search(this.currentPage)
    },
    handleSendAirdropClose () {
      this.sendAirdropAvailable = false
      this.sendAirdropVisible = false
    },
    async handleSendAirdropConfirm (val) {
      this.sendAirdropAvailable = false
      const res = await send(val.airdropPhase, val.lpgTotalCount)
      if (res.status !== 200 || res.data.code !== 0) {
        console.log(res.data.msg)
      }
      this.sendAirdropVisible = false
      await this.search(this.currentPage)
    },
    onCreate () {
      console.log('abc')
      this.editorVisible = true
    },
    handleSendAirdrop (row) {
      console.log(row.airdropPhase)
      this.sendAirdropPhase = row.airdropPhase
      this.sendAirdropVisible = true
      this.sendAirdropAvailable = true
    },
    async search (page) {
      const airdrops = await search({
        page: page,
        pageSize: this.pageSize,
        startAirdropPhase: this.searchInfo.startAirdropPhase,
        endAirdropPhase: this.searchInfo.endAirdropPhase
      })
      if (airdrops.status !== 200 || airdrops.data.code !== 0) {
        this.page = 1
        this.total = 0
        return
      }
      this.total = airdrops.data.totalCount
      this.currentAirdrops = _.map(airdrops.data.data.list, (row) => {
        return row
      })
    }
  }
}
</script>

<style lang="scss">

</style>
