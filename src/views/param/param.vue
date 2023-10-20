<template>
  <div style="width: 80%">
    <el-form ref="form" :model="paramConfig" label-width="30%" label-position="left" @keyup.enter.native="queryConfig">
      <!-- 手续费设置部分 -->
      <el-form-item label="转换手续费设置">
      </el-form-item>
      <el-form-item>
        <template slot="label">
          竹子转LPG手续费
          <el-tooltip content="竹子转LPG手续费, 竹子 * 所填内容" placement="top" effect="light">
            <i class="el-icon-question"></i>
          </el-tooltip>
        </template>
        <el-row :gutter="20">
          <el-col :span="3">
            <el-select v-model="paramConfig.bambooToLpgPremiumType" placeholder="请选择">
              <el-option
                v-for="item in PREMIUM_TYPES"
                :key="item.type"
                :label="item.text"
                :value="item.type">
              </el-option>
            </el-select>
          </el-col>
          <el-col :span="12"><el-input v-model="paramConfig.bambooToLpgPremium" placeholder="请输入内容"></el-input></el-col>
        </el-row>
      </el-form-item>
      <el-form-item>
        <template slot="label">
          USDT转竹子手续费
          <el-tooltip content="USDT转竹子手续费, USDT * 所填内容" placement="top" effect="light">
            <i class="el-icon-question"></i>
          </el-tooltip>
        </template>
        <el-row :gutter="20">
          <el-col :span="3">
            <el-select v-model="paramConfig.usdtToBambooPremiumType" placeholder="请选择">
              <el-option
                v-for="item in PREMIUM_TYPES"
                :key="item.type"
                :label="item.text"
                :value="item.type">
              </el-option>
            </el-select>
          </el-col>
          <el-col :span="12"><el-input v-model="paramConfig.usdtToBambooPremium" placeholder="请输入内容"></el-input></el-col>
        </el-row>
      </el-form-item>
      <el-form-item>
        <template slot="label">
          竹子转USDT手续费
          <el-tooltip content="竹子转USDT手续费, 竹子数量 * 所填内容" placement="top" effect="light">
            <i class="el-icon-question"></i>
          </el-tooltip>
        </template>
        <el-row :gutter="20">
          <el-col :span="3">
            <el-select v-model="paramConfig.bambooToUsdtPremiumType" placeholder="请选择">
              <el-option
                v-for="item in PREMIUM_TYPES"
                :key="item.type"
                :label="item.text"
                :value="item.type">
              </el-option>
            </el-select>
          </el-col>
          <el-col :span="12"><el-input v-model="paramConfig.bambooToUsdtPremium" placeholder="请输入内容"></el-input></el-col>
        </el-row>
      </el-form-item>
      <!-- 提现比例设置 -->
      <el-form-item label="USDT提现手续费比例设置">
      </el-form-item>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item>
            <template slot="label">
              USDT提现手续费
              <el-tooltip content="USDT提现手续费, 固定值" placement="top" effect="light">
                <i class="el-icon-question"></i>
              </el-tooltip>
            </template>
            <el-input v-model="paramConfig.withdrawUsdtPremium" placeholder="请输入内容"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item label="LPG提现手续费比例设置">
      </el-form-item>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item>
            <template slot="label">
              LPG提现的LPG手续费
              <el-tooltip content="LPG提现手续费,扣除的是LPG数量, 小数，比如：0.03即为 LPG数量*0.03" placement="top" effect="light">
                <i class="el-icon-question"></i>
              </el-tooltip>
            </template>
            <el-input v-model="paramConfig.withdrawLpgPremiumPercent" placeholder="请输入内容"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label-width="35%">
            <template slot="label">
              LPG提现的USDT手续费
              <el-tooltip content="LPG提现手续费，USDT提现手续费, 固定值" placement="top" effect="light">
                <i class="el-icon-question"></i>
              </el-tooltip>
            </template>
            <el-input v-model="paramConfig.withdrawLpgUsdtPremium" placeholder="请输入内容"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <!-- 兑换比例设置 -->
      <el-form-item label="兑换比例设置">
      </el-form-item>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item>
            <template slot="label">
              USDT转竹子比例
              <el-tooltip content="USDT转竹子比例， 40意味着 1一个USDT换40个竹子" placement="top" effect="light">
                <i class="el-icon-question"></i>
              </el-tooltip>
            </template>
            <el-input v-model="paramConfig.usdtToBambooExchangeRate" placeholder="请输入内容"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item>
            <template slot="label">
              竹子转LPG比例
              <el-tooltip content="竹子转LPG比例, 40意味40个换一个LPG" placement="top" effect="light">
                <i class="el-icon-question"></i>
              </el-tooltip>
            </template>
            <el-input v-model="paramConfig.bambooToLpgExchangeRate" placeholder="请输入内容"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <!-- 抽奖设置 -->
      <el-form-item label="抽奖设置">
      </el-form-item>
      <el-row :gutter="20">
        <el-col :span="6">
          <el-form-item>
            <template slot="label">
              一等奖
              <el-tooltip content="一等奖奖励数" effect="light">
                <i class="el-icon-question"></i>
              </el-tooltip>
            </template>
            <el-input-number v-model="paramConfig.oneLevelReward" :precision="0" :min="1"></el-input-number>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item>
            <template slot="label">
              二等奖
              <el-tooltip content="二等奖奖励数" effect="light">
                <i class="el-icon-question"></i>
              </el-tooltip>
            </template>
            <el-input-number v-model="paramConfig.twoLevelReward" :precision="0" :min="1"></el-input-number>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item>
            <template slot="label">
              三等奖
              <el-tooltip content="三等奖奖励数" effect="light">
                <i class="el-icon-question"></i>
              </el-tooltip>
            </template>
            <el-input-number v-model="paramConfig.threeLevelReward" :precision="0" :min="1"></el-input-number>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item>
            <template slot="label">
              四等奖
              <el-tooltip content="四等奖奖励数" effect="light">
                <i class="el-icon-question"></i>
              </el-tooltip>
            </template>
            <el-input-number v-model="paramConfig.fourLevelReward" :precision="0" :min="1"></el-input-number>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item>
            <template slot="label">
              周几禁止支付
              <el-tooltip content="周几禁止支付" effect="light">
                <i class="el-icon-question"></i>
              </el-tooltip>
            </template>
            <el-select v-model="paramConfig.forbidPayRaffleWeekDay" placeholder="请选择">
              <el-option
                v-for="item in forbiddenDayOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="24">
          <el-form-item>
            <template slot="label">
              禁止支付时间段<el-button @click.prevent="addTime">增加</el-button>
              <el-tooltip content="禁止支付时间段" effect="light">
                <i class="el-icon-question"></i>
              </el-tooltip>
            </template>
            <el-form-item
              v-for="(times, index) in forbiddenTimes"
              :label="'时间段' + (index + 1)"
              :key="index.key"
            >
              <el-time-picker
                is-range
                v-model="times.value"
                :clearable="false"
                range-separator="至"
                start-placeholder="开始时间"
                end-placeholder="结束时间"
                placeholder="选择时间范围"
              >
              </el-time-picker>
              <el-button @click.prevent="removeTime(index)">删除</el-button>
            </el-form-item>
          </el-form-item>
        </el-col>
      </el-row>
      <!-- 投喂设置 -->
      <el-form-item label="投喂设置">
      </el-form-item>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item>
            <template slot="label">
              抽奖券
              <el-tooltip content="设置为n，则需要投喂n个竹子方可获得抽奖券" effect="light">
                <i class="el-icon-question"></i>
              </el-tooltip>
            </template>
            <el-input-number v-model="paramConfig.raffleFeedAmount" :precision="0" :min="1"></el-input-number>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item>
            <template slot="label">
              空投券
              <el-tooltip content="设置为n，则需要投喂n个竹子方可获得空投券" effect="light">
                <i class="el-icon-question"></i>
              </el-tooltip>
            </template>
            <el-input-number v-model="paramConfig.airdropFeedAmount" :precision="0" :min="1"></el-input-number>
          </el-form-item>
        </el-col>
      </el-row>
      <!-- 最大值设置 -->
      <el-form-item label="最大值设置">
      </el-form-item>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label-width="40%">
            <template slot="label">
              获得共建单个lpg最大奖励竹子
              <el-tooltip content="获得共建单个lpg最大奖励竹子" placement="top" effect="light">
                <i class="el-icon-question"></i>
              </el-tooltip>
            </template>
            <el-input v-model="paramConfig.cooperateMaxBambooPerLpg" placeholder="请输入内容"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label-width="40%">
            <template slot="label">
              每个空投券最大的lpg
              <el-tooltip content="每个空投券最大的lpg" placement="top" effect="light">
                <i class="el-icon-question"></i>
              </el-tooltip>
            </template>
            <el-input v-model="paramConfig.maxLpgPerAirdropTicket" placeholder="请输入内容"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <!-- 分享比例设置 -->
      <el-form-item label="分享设置">
      </el-form-item>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item>
            <template slot="label">
              分享奖励汇率
              <el-tooltip content="分享奖励汇率" placement="top" effect="light">
                <i class="el-icon-question"></i>
              </el-tooltip>
            </template>
            <el-input v-model="paramConfig.lpgShareRewardPercent" placeholder="请输入内容"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <!-- 充值赠送设置 -->
      <el-form-item label="充值赠送设置">
      </el-form-item>
      <el-row :gutter="20">
        <el-col :span="24">
          <el-form-item>
            <template slot="label">
              充值赠送<el-button @click.prevent="addGift">增加</el-button>
              <el-tooltip content="充值赠送设置" effect="light">
                <i class="el-icon-question"></i>
              </el-tooltip>
            </template>
            <el-form-item
              v-for="(gift, index) in rechargeGift"
              :label="'赠送设置' + (index + 1)"
              :key="index.key"
            >
              <span>充值范围</span><el-input-number v-model="gift.amount" :step="1"></el-input-number>
              <span>赠送数量</span><el-input-number v-model="gift.gift" :step="1"></el-input-number>
              <el-button @click.prevent="removeGift(index)">删除</el-button>
            </el-form-item>
          </el-form-item>
        </el-col>
      </el-row>
      <!-- 保存 -->
      <el-form-item>
        <el-button type="primary" v-loading.fullscreen.lock="fullscreenLoading" @click="confirm">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import {
  query,
  setParam
} from '@/service/param.js'
import {PREMIUM_TYPES} from '@/constant/paramConstant'
import _ from 'lodash'

export default {
  data () {
    return {
      PREMIUM_TYPES,
      paramConfig: {
        bambooToLpgPremiumType: 2,
        bambooToLpgPremium: 0,
        usdtToBambooPremiumType: 2,
        usdtToBambooPremium: 0,
        bambooToUsdtPremiumType: 2,
        bambooToUsdtPremium: 0,
        withdrawUsdtPremium: 2,
        withdrawLpgPremiumPercent: 0,
        usdtToBambooExchangeRate: 0,
        bambooToLpgExchangeRate: 0,
        cooperateMaxBambooPerLpg: 0,
        maxLpgPerAirdropTicket: 0,
        forbidPayRaffleWeekDay: 0,
        forbidPayRaffleTime: []
      },
      fullscreenLoading: false,
      forbiddenTimes: [],
      rechargeGift: [],
      forbiddenDayOptions: [{
        value: 0,
        label: '周日'
      }, {
        value: 1,
        label: '周一'
      }, {
        value: 2,
        label: '周二'
      }, {
        value: 3,
        label: '周三'
      }, {
        value: 4,
        label: '周四'
      }, {
        value: 5,
        label: '周五'
      }, {
        value: 6,
        label: '周六'
      }]
    }
  },
  mounted () {
  },
  created () {
  },
  activated () {
    this.queryConfig()
  },
  methods: {
    async queryConfig () {
      const ret = await query()
      console.log(this.rechargeGift)
      this.paramConfig = ret.data.data
      this.formatForbidPayRaffleTime(ret.data.data.forbidPayRaffleTime)
      this.rechargeGift = ret.data.data.rechargeGift ? ret.data.data.rechargeGift : []
      console.log(this.rechargeGift)
    },
    formatForbidPayRaffleTime (forbidPayRaffleTime) {
      const times = _.chunk(forbidPayRaffleTime, 2)
      this.forbiddenTimes = times.map((t) => {
        return {
          value: [
            this.initTime(t[0]),
            this.initTime(t[1])
          ]
        }
      })
    },
    async confirm () {
      this.fullscreenLoading = true
      const ft = this.forbiddenTimes.map((t) => {
        return [
          this.formatTime(t.value[0]),
          this.formatTime(t.value[1])
        ]
      })
      this.paramConfig.forbidPayRaffleTime = _.flattenDeep(ft)
      await setParam(this.paramConfig)
      await this.queryConfig()
      this.fullscreenLoading = false
    },
    addTime () {
      this.forbiddenTimes.push([new Date(), new Date()])
    },
    removeTime (index) {
      this.forbiddenTimes.splice(index, 1)
    },
    addGift () {
      this.rechargeGift.push({
        amount: 0,
        gift: 0
      })
    },
    removeGift (index) {
      this.rechargeGift.splice(index, 1)
    },
    initTime (t) {
      const rt = new Date()
      const ts = t / 1000
      rt.setHours(ts / 3600)
      rt.setMinutes((ts % 3600) / 60)
      rt.setSeconds(ts % 60)
      return rt
    },
    formatTime (t) {
      if (t instanceof Date) {
        return (t.getHours() * 3600 + t.getMinutes() * 60 + t.getSeconds()) * 1000
      } else {
        return t
      }
    }
  }
}
</script>

<style scoped>

</style>
