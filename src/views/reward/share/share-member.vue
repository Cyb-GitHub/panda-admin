<template>
  <div class="reward-share-member-panel">
    <el-table
      :data="currentShares"
      border
      style="width: 100%">
      <el-table-column
        fixed
        prop="name"
        label="昵称"
        width="150">
      </el-table-column>
      <el-table-column
        prop="uid"
        label="UID"
        width="150">
      </el-table-column>
      <el-table-column
        prop="exchangeTime"
        label="兑换时间"
        width="150">
      </el-table-column>
      <el-table-column
        prop="bambooChangeLpg"
        label="竹子兑换LPG数量"
        width="250">
      </el-table-column>
      <el-table-column
        prop="feedBamboo"
        label="投喂竹子数量"
        width="250">
      </el-table-column>
      <el-table-column
        prop="airdropLpg"
        label="获得LPG空投券"
        width="250">
      </el-table-column>
      <el-table-column
        prop="airdrop"
        label="获得空投代币"
        width="250">
      </el-table-column>
      <el-table-column
        prop="lpg"
        label="LPG总计数量"
        width="250">
      </el-table-column>
      <el-table-column
        prop="reward"
        label="获得奖励数量"
        width="250">
      </el-table-column>
      <el-table-column
        prop="sharerReward"
        label="上级获得奖励数量"
        width="250">
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  components: {
  },
  props: {
    user: {
      type: Object,
      default: {}
    }
  },
  data () {
    return {
      total: 0,
      pageSize: 20,

      shares: [],
      currentShares: [],

      currentRow: {},
      panelVisible: false
    }
  },
  mounted () {
    this.shares = [{
      name: 'nae',
      uid: 'uid',
      bambooChangeLpg: 1,
      feedBamboo: 2,
      airdropLpg: 1,
      airdrop: 1,
      lpg: 21,
      reward: 1
    }]
    this.total = this.shares.length
    this.currentShares = this.shares.slice(0, this.pageSize)
    this.init()
  },
  activated () {
  },
  methods: {
    init () {}
  }
}
</script>

<style lang="scss">
</style>
