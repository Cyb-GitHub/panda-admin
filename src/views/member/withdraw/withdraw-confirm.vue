<template>
  <el-dialog
    title="输入交易hash"
    :visible.sync="visible"
    width="30%"
    :before-close="handleClose">
    <el-input v-model="txHash" placeholder="请输入交易hash"></el-input>
    <span slot="footer" class="dialog-footer">
    <el-button @click="handleClose">取 消</el-button>
    <el-button type="primary" @click="handleConfirm">确 定</el-button>
  </span>
  </el-dialog>
</template>

<script>
export default {
  props: {
    visible: {
      type: Boolean,
      default: false
    }
  },
  components: {
  },
  data () {
    return {
      txHash: ''
    }
  },
  mounted () {
  },
  activated () {
  },
  methods: {
    handleConfirm () {
      if (!this.txHash) {
        this.$message('请输入交易hash')
        return
      }
      this.$emit('confirm', this.txHash)
      this.txHash = ''
    },
    handleClose () {
      this.$emit('close')
      this.txHash = ''
    }
  }
}
</script>

<style lang="scss">
</style>
