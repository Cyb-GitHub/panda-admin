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
      <el-form :model="editedAirdrop" :rules="rules" ref="editedAirdropForm" label-width="200px" class="demo-ruleForm">
        <el-form-item label="期数" prop="issue">
          <template slot="label">
            期数
            <el-tooltip content="期数格式为2023-09-01 ，保证一天只有一期空投" effect="light">
              <i class="el-icon-question"></i>
            </el-tooltip>
          </template>
          <el-input v-model="editedAirdrop.airdropPhase" class="raffle-editor-phase"></el-input>
        </el-form-item>
        <el-form-item label="本期空投奖励lpg总额" prop="issue">
          <el-input v-model="editedAirdrop.lpgTotalCount" class="raffle-editor-phase"></el-input>
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
// import _ from 'lodash'

export default {
  props: {
    // airdrop: {
    //   type: Object,
    //   default: () => {
    //     return {}
    //   }
    // },
    dialogVisible: {
      type: Boolean,
      default: false
    }
    // isCreate: {
    //   type: Boolean,
    //   default: false
    // }
  },
  data () {
    return {
      direction: 'rtl',
      rules: {},
      editedAirdrop: {
        airdropPhase: '',
        lpgTotalCount: ''
      }
    }
  },
  // watch: {
  //   raffle: 'watchAirdrop'
  // },
  methods: {
    handleClose () {
      this.$emit('closeEditor')
    },
    handleConfirm () {
      try {
        this.$emit('confirmEditor', this.editedAirdrop, this.isCreate)
      } catch (e) {
        console.log(e)
      }
    }
    // watchAirdrop () {
    //   if (this.dialogVisible) {
    //     if (this.$refs['editedAirdropForm']) {
    //       this.$refs['editedAirdropForm'].resetFields()
    //     }
    //   }
    //   // this.editedAirdrop = _.cloneDeep(this.raffle)
    // }
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
