<template>
  <div class="search-form">
    <el-form :inline="true" :model="queryInfo" class="demo-form-inline">
      <el-form-item>
        <el-input v-model="queryInfo.query" placeholder="输入昵称或UID"></el-input>
      </el-form-item>
      <el-form-item v-if="isTimeSelection">
        <el-date-picker
          v-model="queryInfo.duration"
          type="datetimerange"
          range-separator="至"
          start-placeholder="开始时间"
          end-placeholder="结束时间">
        </el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">查询</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import moment from 'moment'

export default {
  props: {
    isTimeSelection: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      queryInfo: {
        query: '',
        duration: [
        ]
      }
    }
  },
  mounted () {
    if (!this.isTimeSelection) {
      this.onSubmit()
      return
    }
    const date = new Date()
    const moment1 = moment(date)
    const moment2 = moment(date)
    moment2.subtract(1, 'months')
    this.queryInfo.duration = [
      moment2.toDate(),
      moment1.toDate()
    ]
    this.onSubmit()
  },
  activated () {
  },
  methods: {
    onSubmit () {
      this.$emit('onSubmit', this.queryInfo)
    }
  }
}
</script>

<style lang="scss">
</style>
