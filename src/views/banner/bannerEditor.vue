<template>
  <div>
    <el-drawer
      :visible.sync="visible"
      :direction="direction"
      :close-on-press-escape="false"
      :modal="false"
      :wrapperClosable="false"
      :show-close="false"
      :withHeader="false"
      size="60%"
      :before-close="handleClose">
      <el-form :model="editedBanner" :rules="rules" ref="editedBannerForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="白名单名称" prop="title">
          <el-input v-model="editedBanner.title" class="white-paper-editor-title"></el-input>
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
          <el-button @click="handleConfirm">确认</el-button>
          <el-button type="primary" @click="handleClose">取消</el-button>
        </el-form-item>
      </el-form>
    </el-drawer>
  </div>
</template>
<script>
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import { quillEditor, Quill } from 'vue-quill-editor'
import {container, ImageExtend, QuillWatch} from 'quill-image-extend-module'
import httpRequest from '@/utils/httpRequest'
import _ from 'lodash'
Quill.register('modules/ImageExtend', ImageExtend)

export default {
  components: {
    quillEditor
  },
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    isCreate: {
      type: Boolean,
      default: false
    },
    banner: {
      type: Object,
      default: () => {}
    }
  },
  data () {
    return {
      content: '',
      direction: 'rtl',
      editedBanner: {},
      rules: {},
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
        }
      }
    }
  },
  watch: {
    banner: 'watchBanner'
  },
  methods: {
    onEditorBlur (quill) {
    },
    onEditorFocus (quill) {
    },
    onEditorReady (quill) {
    },
    handleClose () {
      this.$emit('editorClose', false)
    },
    watchBanner () {
      if (this.visible) {
        if (this.$refs['editedBannerForm']) {
          this.$refs['editedBannerForm'].resetFields()
        }
        this.editedBanner = _.cloneDeepWith(this.banner)
        this.content = this.editedBanner.content
      }
    },
    async handleConfirm () {
      try {
        await this.$refs['editedBannerForm'].validate()
        this.editedBanner.content = this.content
        this.$emit('editorConfirm', _.cloneDeep(this.editedBanner), this.isCreate)
        this.editedBanner = {}
      } catch (e) {
        console.log(e)
      }
    }
  }
}
</script>

<style lang="scss">
.el-drawer.rtl {
  overflow: scroll
}
</style>
