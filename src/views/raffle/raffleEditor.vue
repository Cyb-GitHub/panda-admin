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
      <el-form :model="editedRaffle" :rules="rules" ref="editedRaffleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="期数" prop="issue">
          <el-input v-model="editedRaffle.rafflePhase" :disabled="true" class="raffle-editor-phase"></el-input>
        </el-form-item>
        <el-form-item label="抽奖时间" prop="drawTime">
          <el-date-picker
            v-model="editedRaffle.drawTime"
            type="datetime"
            placeholder="选择日期时间"
            default-time="12:00:00">
          </el-date-picker>
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

export default {
  props: {
    raffle: {
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
      direction: 'rtl',
      editedRaffle: {},
      rules: {}
    }
  },
  watch: {
    raffle: 'watchRaffle'
  },
  methods: {
    handleClose () {
      this.$emit('closeEditor', this.isCreate)
    },
    handleConfirm () {
      try {
        this.$emit('confirmEditor', this.editedRaffle, this.isCreate)
      } catch (e) {
        console.log(e)
      }
    },
    watchRaffle () {
      if (this.dialogVisible) {
        if (this.$refs['editedRaffleForm']) {
          this.$refs['editedRaffleForm'].resetFields()
        }
      }
      this.editedRaffle = _.cloneDeep(this.raffle)
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
