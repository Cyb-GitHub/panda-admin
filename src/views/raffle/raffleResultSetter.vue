<template>
  <div>
    <el-dialog
      title="结果设置"
      :visible.sync="setterVisible"
      width="30%"
      :before-close="handleClose">
      <div v-if="raffleActivity.firstConfirmManagerId && raffleActivity.firstConfirmManagerId !== 0">
        {{`第一个管理员抽奖结果：${raffleActivity.winningNumber ? raffleActivity.winningNumber.join() : ''}`}}
      </div>
      <el-form :inline="true"
               :model="result"
               :rules="rules" ref="editedRaffleResultForm" class="demo-ruleForm">
        <el-form-item lable="球1" prop="n1">
          <el-input-number v-model="result.n1" :min="1" :max="39" label="球1"></el-input-number>
        </el-form-item>
        <el-form-item lable="球2" prop="n2">
          <el-input-number v-model="result.n2" :min="1" :max="39" label="球2"></el-input-number>
        </el-form-item>
        <el-form-item lable="球3" prop="n3">
          <el-input-number v-model="result.n3" :min="1" :max="39" label="球3"></el-input-number>
        </el-form-item>
        <el-form-item lable="球4" prop="n4">
          <el-input-number v-model="result.n4" :min="1" :max="39" label="球4"></el-input-number>
        </el-form-item>
        <el-form-item lable="球5" prop="n5">
          <el-input-number v-model="result.n5" :min="1" :max="39" label="球5"></el-input-number>
        </el-form-item>
      </el-form>
      <el-button type="primary" @click="handleClose">取消</el-button>
      <el-button @click="handleConfirm">确认</el-button>
    </el-dialog>
  </div>
</template>

<script>
import _ from 'lodash'

export default {
  props: {
    setterVisible: {
      type: Boolean,
      default: false
    },
    raffleActivity: {
      type: Object,
      default: () => {
        return {
          winningNumber: []
        }
      }
    }
  },
  data () {
    return {
      result: {
        n1: 0,
        n2: 0,
        n3: 0,
        n4: 0,
        n5: 0
      },
      rules: {}
    }
  },
  watch: {
    setterVisible: 'watchSetterVisible'
  },
  methods: {
    handleConfirm () {
      const balls = _.sortBy(_.uniq([this.result.n1, this.result.n2, this.result.n3, this.result.n4, this.result.n5]))
      if (balls.length < 5) {
        this.$message('选择号码重复')
        return
      }
      if (this.raffleActivity.firstConfirmManagerId !== 0 && balls.join() !== this.raffleActivity.winningNumber.join()) {
        this.$message('第一次抽奖号码与第二次抽奖号码不一致')
        return
      }
      this.$emit('confirmResultSetter', balls)
    },
    handleClose () {
      this.$emit('closeResultSetter')
    },
    watchSetterVisible () {
      if (this.setterVisible) {
        if (this.$refs['editedRaffleResultForm']) {
          this.$refs['editedRaffleResultForm'].resetFields()
        }
        this.result = {}
      }
    }
  }
}
</script>

<style lang="scss">
</style>
