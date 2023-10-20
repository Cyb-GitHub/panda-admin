<template>
  <div>
    <el-drawer
      :visible.sync="dialogVisible"
      :direction="direction"
      :close-on-press-escape="false"
      :modal="false"
      :wrapperClosable="false"
      :show-close="false"
      :withHeader="false"
      size="60%"
      :before-close="handleClose">
      <el-form :model="editedWp" :rules="rules" ref="editedVoteForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="白名单名称" prop="title">
          <el-input v-model="editedWp.title" class="white-paper-editor-title"></el-input>
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
    wp: {
      type: Object,
      default: () => {
        return {}
      }
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
      editedWp: {},
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
    wp: 'watchWp'
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
        this.editedWp.content = this.content
        this.$emit('confirmEditor', this.editedWp, this.isCreate)
      } catch (e) {
        console.log(e)
      }
    },
    handleUe () {
    },
    watchWp (val) {
      if (this.dialogVisible) {
        // this.$refs.myQuillEditor.quill.getModule('toolbar').addHandler('image', this.imgHandler)
        if (this.$refs['editedVoteForm']) {
          this.$refs['editedVoteForm'].resetFields()
        }
        this.editedWp = _.cloneDeepWith(this.wp)
        this.content = this.editedWp.content
        this.$nextTick(() => {
        })
      }
    }
  }
}
</script>

<style lang="scss">
.white-paper-editor-title {
  width: 300px;
}
.el-drawer.rtl {
  overflow: scroll
}
</style>
