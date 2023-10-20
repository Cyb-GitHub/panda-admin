<template>
  <div class="vote-panel">
    <el-form :inline="true" :model="searchInfo" class="demo-form-inline">
      <el-form-item>
        <el-button type="primary" @click="onCreate">新建投票</el-button>
      </el-form-item>
    </el-form>
    <el-table
      :data="currentVotes"
      border
      style="width: 100%">
      <el-table-column
        prop="id"
        label="投票活动ID"
        width="150">
      </el-table-column>
      <el-table-column
        prop="issue"
        label="主题">
      </el-table-column>
      <el-table-column
        prop="status"
        label="状态">
      </el-table-column>
      <el-table-column
        prop="startTime"
        width="200"
        label="开始时间">
      </el-table-column>
      <el-table-column
        prop="endTime"
        width="200"
        label="结束时间">
      </el-table-column>
      <el-table-column
        prop="agreeCount"
        label="同意数量">
      </el-table-column>
      <el-table-column
        prop="opposeCount"
        label="反对数量">
      </el-table-column>
      <el-table-column
        prop="absentCount"
        label="弃权数量">
      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作"
        width="300">
        <template slot-scope="scope">
          <el-button v-if="scope.row.status === '未结束'" type="primary" size="mini" @click="() => handleEdit(scope.row)">编辑</el-button>
          <el-button v-if="scope.row.status === '未结束'" type="primary" size="mini" @click="() => handleStop(scope.row)">结束投票</el-button>
          <el-button type="primary" size="mini" @click="() => handleCheck(scope.row)">查看</el-button>
        </template>
      </el-table-column>
    </el-table>
    <search-pagination :total="total"
                       :pageSize="pageSize"
                       :currentPage="currentPage"
                       @handleCurrentChange="handleCurrentChange"/>
    <vote-checker
      :vote="currentVote"
      :dialog-visible="checkVisible"
      @closeChecker="handleCheckerCLose"
    />
    <vote-editor
      :vote="currentVote"
      :dialog-visible="editorVisible"
      :is-create="isCreate"
      @closeEditor="handleEditorCLose"
      @confirmEditor="handleEditorConfirm"
    />
  </div>
</template>

<script>
import SearchPagination from '@/components/admin-table-components/searchPagination.vue'
import VoteChecker from './voteChecker.vue'
import VoteEditor from './voteEditor.vue'
import _ from 'lodash'
import {
  queryVote,
  updateVote,
  createVote
} from '@/service/vote.js'
import {WHITE_PAPER_STATUS} from '@/constant/whitePaperConstant'

export default {
  components: {
    SearchPagination,
    VoteChecker,
    VoteEditor
  },
  data () {
    return {
      searchInfo: {},
      pageSize: 20,
      currentPage: 1,
      total: 0,
      currentVotes: [],
      currentVote: {},
      checkVisible: false,
      editorVisible: false,
      isCreate: false
    }
  },
  mounted () {
    this.search(this.currentPage)
  },
  methods: {
    async search (page) {
      const votes = await queryVote({
        page: page,
        pageSize: this.pageSize
      })
      if (votes.status !== 200 || votes.data.code !== 0) {
        this.page = 1
        this.total = 0
        return
      }
      this.total = votes.data.totalCount
      this.currentVotes = votes.data.data.list
    },
    handleCurrentChange (cp) {
      this.currentPage = cp
      this.search(cp)
    },
    handleEdit (row) {
      this.isCreate = false
      this.currentVote = row
      this.editorVisible = true
    },
    async handleStop (row) {
      console.log(row)
      const params = _.cloneDeep(row)
      params.status = WHITE_PAPER_STATUS.END.status
      await updateVote(params)
      row.status = WHITE_PAPER_STATUS.END.text
    },
    handleCheck (row) {
      this.currentVote = row
      this.checkVisible = true
    },
    handleCheckerCLose () {
      this.checkVisible = false
    },
    handleEditorCLose (ic) {
      this.editorVisible = false
      if (ic) {
        this.currentVote = {}
      }
    },
    async handleEditorConfirm (val, ic) {
      this.editorVisible = false
      if (ic) {
        await createVote(val)
      } else {
        await updateVote(val)
      }
      this.search(this.currentPage)
    },
    onCreate () {
      this.isCreate = true
      this.currentVote = {
        issue: '',
        content: '',
        endTime: new Date(),
        startTime: new Date()
      }
      this.editorVisible = true
    }
  }
}
</script>

<style lang="scss">
</style>
