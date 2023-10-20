<template>
  <div>
    <el-form :inline="true" :model="searchInfo" class="demo-form-inline">
      <el-form-item>
        <el-button type="primary" @click="handleCreate">新建公告</el-button>
      </el-form-item>
    </el-form>
    <el-table
      :data="banners"
      border
      style="width: 100%">
      <el-table-column
        prop="id"
        label="ID"
        width="150">
      </el-table-column>
      <el-table-column
        prop="title"
        label="标题"
        width="250">
      </el-table-column>
      <el-table-column
        prop="content"
        label="内容">
      </el-table-column>
      <el-table-column
        prop="status"
        width="150"
        label="状态">
        <template slot-scope="scope">
          {{scope.row.status === 'ENABLE' ? '启用中' : '禁用'}}
        </template>
      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作"
        width="300">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="() => handleChangeStatus(scope.row)" v-if="scope.row.status === 'ENABLE'">禁用</el-button>
          <el-button type="primary" size="mini" @click="() => handleChangeStatus(scope.row)" v-else>启用</el-button>
          <el-button type="primary" size="mini" @click="() => handleModify(scope.row)">修改</el-button>
        </template>
      </el-table-column>
    </el-table>
    <search-pagination :total="total"
                       :pageSize="pageSize"
                       :currentPage="currentPage"
                       @handleCurrentChange="handleCurrentChange"/>
    <BannerEditor
      :visible="editorVisible"
      :is-create="isCreate"
      :banner="currentBanner"
      @editorClose="handleEditorClose"
      @editorConfirm="handleEditorConfirm"
    />
  </div>
</template>

<script>
import {
  create,
  search,
  update
} from '@/service/banner.js'
import SearchPagination from '@/components/admin-table-components/searchPagination.vue'
import BannerEditor from './bannerEditor.vue'
import _ from 'lodash'

export default {
  components: {
    BannerEditor,
    SearchPagination
  },
  data () {
    return {
      searchInfo: {},
      banners: [],
      pageSize: 20,
      currentPage: 1,
      total: 0,
      editorVisible: false,
      isCreate: false,
      currentBanner: {}
    }
  },
  mounted () {
    this.search({
      page: this.currentPage,
      pageSize: this.pageSize
    })
  },
  methods: {
    async search (val) {
      const d = await search(val)
      this.total = d.data.data.total
      this.banners = d.data.data.banners
    },
    handleCurrentChange (cp) {
      this.currentPage = cp
      this.search({
        page: this.currentPage,
        pageSize: this.pageSize
      })
    },
    async handleChangeStatus (row) {
      const t = _.cloneDeep(row)
      t.status = t.status === 'ENABLE' ? 0 : 1
      await update(t)
      await this.search({
        page: this.currentPage,
        pageSize: this.pageSize
      })
    },
    handleCreate (val) {
      this.currentBanner = {
        title: '',
        content: ''
      }
      this.isCreate = true
      this.editorVisible = true
    },
    handleEditorClose (val) {
      this.editorVisible = false
    },
    async handleEditorConfirm (val, isCreate) {
      if (isCreate) {
        await create(val)
      } else {
        val.status = null
        await update(val)
      }
      await this.search({
        page: this.currentPage,
        pageSize: this.pageSize
      })
      this.editorVisible = false
    },
    handleModify (val) {
      this.isCreate = false
      this.currentBanner = val
      this.editorVisible = true
    }
  }
}
</script>

<style lang="scss">
</style>
