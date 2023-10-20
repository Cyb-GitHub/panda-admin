<template>
  <el-dialog
    title="内容"
    :visible.sync="dialogVisible"
    width="30%"
    :before-close="handleClose">
    <div v-html="wp.content" />
    <span slot="footer" class="dialog-footer">
    <el-button type="primary" @click="handleClose">确 定</el-button>
  </span>
  </el-dialog>
</template>

<script>
export default {
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
    }
  },
  data () {
    return {
    }
  },
  watch: {
  },
  methods: {
    handleClose () {
      this.$emit('closeChecker', this.dialogVisible)
    }
  }
}
</script>

<style lang="scss">
</style>
