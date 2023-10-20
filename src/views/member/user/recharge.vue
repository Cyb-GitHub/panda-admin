<template>
  <el-drawer
    title="充值功能"
    size="30%"
    :visible.sync="visible"
    direction="rtl"
    :before-close="handleCloseRecharge">
    <el-form ref="form" :model="rechargeInfo" label-width="80px">
      <el-form-item label="充值类型" prop="accountType">
        <el-radio-group v-model="rechargeInfo.accountType">
          <el-radio v-for="(item, index) in RECHARGE_TYPE" :key=index :label="item.value">{{item.label}}</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="数量">
        <el-input-number v-model="rechargeInfo.accountAmount" :min="1" :max="100000000"></el-input-number>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">立即创建</el-button>
        <el-button @click="handleCloseRecharge">取消</el-button>
      </el-form-item>
    </el-form>
  </el-drawer>
</template>

<script>
import {RECHARGE_TYPE} from '@/constant/rechargeConstant'
import _ from 'lodash'

export default {
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    user: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  data () {
    return {
      rechargeInfo: {
        accountType: 1,
        accountAmount: 0
      },
      rules: {
        accountType: [
          { required: true, message: '请选择充值类型' }
        ]
      },
      RECHARGE_TYPE
    }
  },
  methods: {
    handleCloseRecharge () {
      this.rechargeInfo = {
        accountType: 1,
        accountAmount: 1
      }
      this.$emit('closeRecharge', false)
    },
    onSubmit () {
      this.$emit('confirmRecharge', _.cloneDeep(this.rechargeInfo))
      this.rechargeInfo = {
        accountAmount: 1,
        accountType: 1
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
