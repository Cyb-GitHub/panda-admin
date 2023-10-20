<template>
  <aside class="site-sidebar" :class="'site-sidebar--' + sidebarLayoutSkin">
    <div class="site-sidebar__inner">
      <el-menu
        :default-active="menuActiveName || 'home'"
        :collapse="sidebarFold"
        :collapseTransition="false"
        class="site-sidebar__menu">
        <el-menu-item index="home" @click="$router.push({ name: 'home' })">
          <icon-svg name="shouye" class="site-sidebar__menu-icon"></icon-svg>
          <span slot="title">首页</span>
        </el-menu-item>
        <!--<el-submenu index="member">
          <template slot="title">
            <span>会员管理</span>
          </template>
          <el-menu-item index="member-user" @click="$router.push({ name: 'member-user' })">
            <icon-svg name="user" class="site-sidebar__menu-icon"></icon-svg>
            <span slot="title">会员资料</span>
          </el-menu-item>
          <el-menu-item index="member-invest" @click="$router.push({ name: 'member-invest' })">
            <icon-svg name="invest" class="site-sidebar__menu-icon"></icon-svg>
            <span slot="title">充值记录</span>
          </el-menu-item>
          <el-menu-item index="member-withdraw" @click="$router.push({ name: 'member-withdraw' })">
            <icon-svg name="withdraw" class="site-sidebar__menu-icon"></icon-svg>
            <span slot="title">提现记录</span>
          </el-menu-item>
        </el-submenu>-->
        <!--<el-submenu index="finance">
          <template slot="title">
            <span>资金管理</span>
          </template>
          <el-menu-item index="finance-usdt" @click="$router.push({ name: 'finance-usdt' })">
            <icon-svg name="finance-usdt" class="site-sidebar__menu-icon"></icon-svg>
            <span slot="title">USDT流水统计</span>
          </el-menu-item>
          <el-menu-item index="finance-lpg" @click="$router.push({ name: 'finance-lpg' })">
            <icon-svg name="finance-lpg" class="site-sidebar__menu-icon"></icon-svg>
            <span slot="title">LPG流水统计</span>
          </el-menu-item>
          <el-menu-item index="finance-bamboo" @click="$router.push({ name: 'finance-bamboo' })">
            <icon-svg name="finance-bamboo" class="site-sidebar__menu-icon"></icon-svg>
            <span slot="title">竹子流水统计</span>
          </el-menu-item>
          <el-menu-item index="finance-raffle" @click="$router.push({ name: 'finance-raffle' })">
            <icon-svg name="finance-raffle" class="site-sidebar__menu-icon"></icon-svg>
            <span slot="title">抽奖券</span>
          </el-menu-item>
          <el-menu-item index="finance-airdrop" @click="$router.push({ name: 'finance-airdrop' })">
            <icon-svg name="finance-airdrop" class="site-sidebar__menu-icon"></icon-svg>
            <span slot="title">空投券</span>
          </el-menu-item>
          <el-menu-item index="finance-open" @click="$router.push({ name: 'finance-open' })">
            <icon-svg name="finance-open" class="site-sidebar__menu-icon"></icon-svg>
            <span slot="title">待开奖统计</span>
          </el-menu-item>
          <el-menu-item index="finance-statistic" @click="$router.push({ name: 'finance-statistic' })">
            <icon-svg name="finance-statistic" class="site-sidebar__menu-icon"></icon-svg>
            <span slot="title">中奖统计</span>
          </el-menu-item>
        </el-submenu>-->
        <!--<el-submenu index="reward">
          <template slot="title">
            <span>奖励发放</span>
          </template>
          <el-menu-item index="reward-cooperate" @click="$router.push({ name: 'reward-cooperate' })">
            <icon-svg name="reward-cooperate" class="site-sidebar__menu-icon"></icon-svg>
            <span slot="title">共建奖励</span>
          </el-menu-item>
          <el-menu-item index="reward-share" @click="$router.push({ name: 'reward-share' })">
            <icon-svg name="reward-share" class="site-sidebar__menu-icon"></icon-svg>
            <span slot="title">分享奖励</span>
          </el-menu-item>
        </el-submenu>-->
        <!--<el-submenu index="system">
          <template slot="title">
            <span>系统管理</span>
          </template>
          <el-menu-item index="vote-vote" @click="$router.push({ name: 'vote-vote' })">
            <icon-svg name="vote" class="site-sidebar__menu-icon"></icon-svg>
            <span slot="title">投票管理</span>
          </el-menu-item>
          <el-menu-item index="raffle-raffle" @click="$router.push({ name: 'raffle-raffle' })">
            <icon-svg name="raffle" class="site-sidebar__menu-icon"></icon-svg>
            <span slot="title">抽奖管理</span>
          </el-menu-item>
          <el-menu-item index="wp-wp" @click="$router.push({ name: 'wp-wp' })">
            <icon-svg name="vote" class="site-sidebar__menu-icon"></icon-svg>
            <span slot="title">白皮书管理</span>
          </el-menu-item>
        </el-submenu>
        <el-submenu index="cs">
          <template slot="title">
            <span>客服服务</span>
          </template>
          <el-menu-item index="cs-cs" @click="$router.push({ name: 'cs-cs' })">
            <icon-svg name="cs" class="site-sidebar__menu-icon"></icon-svg>
            <span slot="title">客服服务</span>
          </el-menu-item>
        </el-submenu>--->
        <sub-menu
          v-for="menu in menuList"
          :key="menu.menuId"
          :menu="menu"
          :dynamicMenuRoutes="dynamicMenuRoutes">
        </sub-menu>
      </el-menu>
    </div>
  </aside>
</template>

<script>
  import SubMenu from './main-sidebar-sub-menu'
  import { isURL } from '@/utils/validate'
  export default {
    data () {
      return {
        dynamicMenuRoutes: []
      }
    },
    components: {
      SubMenu
    },
    computed: {
      sidebarLayoutSkin: {
        get () { return this.$store.state.common.sidebarLayoutSkin }
      },
      sidebarFold: {
        get () { return this.$store.state.common.sidebarFold }
      },
      menuList: {
        get () { return this.$store.state.common.menuList },
        set (val) { this.$store.commit('common/updateMenuList', val) }
      },
      menuActiveName: {
        get () { return this.$store.state.common.menuActiveName },
        set (val) { this.$store.commit('common/updateMenuActiveName', val) }
      },
      mainTabs: {
        get () { return this.$store.state.common.mainTabs },
        set (val) { this.$store.commit('common/updateMainTabs', val) }
      },
      mainTabsActiveName: {
        get () { return this.$store.state.common.mainTabsActiveName },
        set (val) { this.$store.commit('common/updateMainTabsActiveName', val) }
      }
    },
    watch: {
      $route: 'routeHandle'
    },
    created () {
      this.menuList = JSON.parse(sessionStorage.getItem('menuList') || '[]')
      this.dynamicMenuRoutes = JSON.parse(sessionStorage.getItem('dynamicMenuRoutes') || '[]')
      this.routeHandle(this.$route)
    },
    methods: {
      // 路由操作
      routeHandle (route) {
        if (route.meta.isTab) {
          // tab选中, 不存在先添加
          var tab = this.mainTabs.filter(item => item.name === route.name)[0]
          if (!tab) {
            if (route.meta.isDynamic) {
              route = this.dynamicMenuRoutes.filter(item => item.name === route.name)[0]
              if (!route) {
                return console.error('未能找到可用标签页!')
              }
            }
            tab = {
              menuId: route.meta.menuId || route.name,
              name: route.name,
              title: route.meta.title,
              type: isURL(route.meta.iframeUrl) ? 'iframe' : 'module',
              iframeUrl: route.meta.iframeUrl || '',
              params: route.params,
              query: route.query
            }
            this.mainTabs = this.mainTabs.concat(tab)
          }
          this.menuActiveName = tab.menuId + ''
          this.mainTabsActiveName = tab.name
        }
      }
    }
  }
</script>
