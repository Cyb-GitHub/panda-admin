<template>
  <div class="vote-editor-panel">
  <el-drawer
    class="vote-editor-drawer"
    :visible.sync="dialogVisible"
    :direction="direction"
    :close-on-press-escape="false"
    :modal="false"
    :wrapperClosable="false"
    :show-close="false"
    :withHeader="false"
    style="overflow: scroll"
    size="60%"
    :before-close="handleClose">
    <el-form :model="editedVote" :rules="rules" ref="editedVoteForm" label-width="100px" class="demo-ruleForm">
      <el-form-item label="投票名称" prop="issue">
        <el-input v-model="editedVote.issue" class="vote-editor-issue"></el-input>
      </el-form-item>
      <el-form-item label="活动时间" prop="timeRange">
        <el-date-picker
          v-model="editedVote.timeRange"
          type="datetimerange"
          value-format="yyyy-MM-dd HH:mm:ss"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="内容" prop="content">
        <el-row>
          <el-col :span="23" style="height: 600px">
            <quill-editor
              ref="myQuillEditor"
              style="height: 450px"
              v-model="content"
              :options="editorOption"
              @blur="onEditorBlur($event)"
              @focus="onEditorFocus($event)"
              @ready="onEditorReady($event)"
            />
          </el-col>
        </el-row>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handleClose">取消</el-button>
        <el-button @click="handleConfirm">确认</el-button>
      </el-form-item>
    </el-form>
  </el-drawer>
  </div>
</template>

<script>
import _ from 'lodash'
import moment from 'moment'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import { quillEditor, Quill } from 'vue-quill-editor'
import {container, ImageExtend, QuillWatch} from 'quill-image-extend-module'
import httpRequest from '@/utils/httpRequest'
Quill.register('modules/ImageExtend', ImageExtend)

export default {
  components: {
    quillEditor
  },
  props: {
    vote: {
      type: Object,
      default: {}
    },
    dialogVisible: {
      type: Boolean,
      default: false
    },
    isCreate: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      content: '',
      direction: 'rtl',
      editedVote: {},
      rules: {
        issue: { required: true, message: '输入活动名称', trigger: 'blur' },
        timeRange: { required: true, message: '输入选择活动时间', trigger: 'change' }
      },
      editorOption: {
        modules: {
          toolbar: {
            container: container,
            handlers: {
              'image': function () {
                QuillWatch.emit(this.quill.id)
              }
            }
          },
          ImageExtend: {
            loading: true,
            name: 'img',
            action: httpRequest.adornUrl(`/file/upload`),
            response: (res) => {
              if (res.code === 0) {
                return res.data
              }
              return false
            }
          }
        },
        placeholder: '请在这里添加产品描述',
        readyOnly: false,
        theme: 'snow',
        syntax: true
      }
    }
  },
  watch: {
    vote: 'watchVote'
  },
  mounted () {
  },
  methods: {
    onEditorBlur (quill) {
    },
    onEditorFocus (quill) {
    },
    onEditorReady (quill) {
    },
    handleClose () {
      this.$emit('closeEditor', this.isCreate)
    },
    async handleConfirm () {
      try {
        await this.$refs['editedVoteForm'].validate()
        this.editedVote.content = this.content
        const t = moment(this.editedVote.timeRange[0])
        this.editedVote.startTime = t.format('YYYY-MM-DD HH:mm:ss')
        const tt = moment(this.editedVote.timeRange[1])
        this.editedVote.endTime = tt.format('YYYY-MM-DD HH:mm:ss')
        this.$emit('confirmEditor', this.editedVote, this.isCreate)
      } catch (e) {
        console.log(e)
      }
    },
    handleUe () {
      this.ue.setContent(this.editedVote.content)
    },
    watchVote (val) {
      if (this.dialogVisible) {
        if (this.$refs['editedVoteForm']) {
          this.$refs['editedVoteForm'].resetFields()
        }
        this.editedVote = _.cloneDeepWith(this.vote)
        this.content = this.editedVote.content
        this.editedVote.timeRange = [this.editedVote.startTime, this.editedVote.endTime]
        this.$nextTick(() => {
        })
      }
    }
  }
}
</script>

<style lang="scss">
.vote-editor-issue {
  width: 300px;
}
.el-drawer.rtl {
  overflow: scroll
}
</style>
