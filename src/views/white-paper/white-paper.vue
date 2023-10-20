<template>
  <div>
    <el-form :inline="true" :model="searchInfo" class="demo-form-inline">
      <el-form-item>
        <el-button type="primary" @click="onCreate">新建白皮书</el-button>
     </el-form-item>
    </el-form>
    <el-table
      :data="currentWps"
      border
      style="width: 100%">
      <el-table-column
        prop="order"
        label="顺序"
        width="150">
      </el-table-column>
      <el-table-column
        prop="title"
        label="标题">
      </el-table-column>
      <el-table-column
        prop="createTime"
        label="创建时间">
      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作"
        width="300">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="() => handleEdit(scope.row)">编辑</el-button>
          <el-button type="primary" size="mini" @click="() => handleCheck(scope.row)">查看</el-button>
          <el-popconfirm
            confirm-button-text='好的'
            cancel-button-text='取消'
            icon="el-icon-info"
            icon-color="red"
            title="删除白皮书？"
            @onConfirm="handleDelete(scope.row)"
          >
            <el-button slot="reference" type="warn" size="mini">删除</el-button>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
    <search-pagination :total="total"
                       :pageSize="pageSize"
                       :currentPage="currentPage"
                       @handleCurrentChange="handleCurrentChange"/>
    <white-paper-checker :wp="currentWp"
                         :dialog-visible="checkVisible"
                         @closeChecker="handleCheckerCLose"
    />
    <white-paper-editor
      :wp="currentWp"
      :dialog-visible="editorVisible"
      :is-create="isCreate"
      @closeEditor="handleEditorCLose"
      @confirmEditor="handleEditorConfirm"
    />
  </div>
</template>

<script>
import {
  search,
  create,
  update,
  deleteWp
} from '@/service/white-paper.js'
import WhitePaperChecker from './whitePaperChecker.vue'
import WhitePaperEditor from './whitePaperEditor.vue'
import SearchPagination from '@/components/admin-table-components/searchPagination.vue'

export default {
  components: {
    SearchPagination,
    WhitePaperChecker,
    WhitePaperEditor
  },
  data () {
    return {
      searchInfo: {},
      pageSize: 20,
      currentPage: 1,
      total: 0,
      currentWps: [],
      currentWp: {},
      checkVisible: false,
      editorVisible: false,
      isCreate: false
    }
  },
  mounted () {
    this.search(1)
  },
  methods: {
    async search (cp) {
      const pms = await search({})
      if (pms.status === 200 && pms.data.code === 0) {
        this.currentWps = pms.data.data.list
        this.total = pms.data.data.total
      } else {
        this.total = 0
        this.currentWps = []
      }
    },
    onCreate () {
      this.isCreate = true
      this.currentWp = {
        title: '',
        content: ''
      }
      this.editorVisible = true
    },
    handleCurrentChange (cp) {
      this.currentPage = cp
      this.search(cp)
    },
    handleCheckerCLose () {
      this.checkVisible = false
    },
    handleEditorCLose (ic) {
      this.editorVisible = false
      if (ic) {
        this.currentWp = {}
      }
    },
    async handleEditorConfirm (val, ic) {
      this.editorVisible = false
      if (ic) {
        await create(val)
      } else {
        await update(val.id, val)
      }
      await this.search(this.currentPage)
    },
    handleEdit (row) {
      this.isCreate = false
      this.currentWp = row
      this.editorVisible = true
    },
    handleCheck (row) {
      this.currentWp = row
      this.checkVisible = true
    },
    async handleDelete (row) {
      await deleteWp(row.id)
      await this.search(this.currentPage)
    }
  }
}
</script>

<style lang="scss">
</style>
