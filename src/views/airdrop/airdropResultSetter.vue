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
      <el-form :model="confirmAirdrop" :rules="rules" ref="editedAirdropForm" label-width="200px" class="demo-ruleForm">
        <el-form-item label="期数" prop="issue">
          <el-input v-model="confirmAirdrop.airdropPhase" :disabled="true" class="raffle-editor-phase"></el-input>
        </el-form-item>
        <el-form-item label="本期空投奖励lpg总额" prop="issue">
          <el-input v-model="confirmAirdrop.lpgTotalCount" class="raffle-editor-phase"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleClose">取消</el-button>
          <el-button @click="handleConfirm" :disabled="!operateAvailable">确认</el-button>
        </el-form-item>
      </el-form>
    </el-drawer>
  </div>
</template>
<script>
export default {
  props: {
    airdropPhase: {
      type: String,
      default: () => {
        return ''
      }
    },
    dialogVisible: {
      type: Boolean,
      default: false
    },
    operateAvailable: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    airdropPhase: 'watchAirdropPhase'
  },
  data () {
    return {
      direction: 'rtl',
      rules: {},
      confirmAirdrop: {
        airdropPhase: '',
        lpgTotalCount: ''
      },
      available: false
    }
  },
  methods: {
    watchAirdropPhase () {
      this.confirmAirdrop.airdropPhase = this.airdropPhase
    },
    handleClose () {
      this.$emit('closeSendAirdrop')
    },
    handleConfirm () {
      try {
        this.$emit('confirmSendAirdrop', this.confirmAirdrop)
      } catch (e) {
        console.log(e)
      }
    }
  }
}
</script>

<style lang="scss">
.raffle-editor-phase {
  width: 300px;
}
.el-drawer.rtl {
  overflow: scroll
}
</style>
