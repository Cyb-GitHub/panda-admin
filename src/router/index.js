/**
 * 全站路由配置
 *
 * 建议:
 * 1. 代码中路由统一使用name属性跳转(不使用path属性)
 */
import Vue from 'vue'
import Router from 'vue-router'
import http from '@/utils/httpRequest'
import { isURL } from '@/utils/validate'
import { clearLoginInfo } from '@/utils'

Vue.use(Router)

// 开发环境不使用懒加载, 因为懒加载页面太多的话会造成webpack热更新太慢, 所以只有生产环境使用懒加载
const _import = require('./import-' + process.env.NODE_ENV)

// 全局路由(无需嵌套上左右整体布局)
const globalRoutes = [
  { path: '/404', component: _import('common/404'), name: '404', meta: { title: '404未找到' } },
  { path: '/login', component: _import('common/login'), name: 'login', meta: { title: '登录' } }
]

// 主入口路由(需嵌套上左右整体布局)
const mainRoutes = {
  path: '/',
  component: _import('main'),
  name: 'main',
  redirect: { name: 'home' },
  meta: { title: '主入口整体布局' },
  children: [
    // 通过meta对象设置路由展示方式
    // 1. isTab: 是否通过tab展示内容, true: 是, false: 否
    // 2. iframeUrl: 是否通过iframe嵌套展示内容, '以http[s]://开头': 是, '': 否
    // 提示: 如需要通过iframe嵌套展示内容, 但不通过tab打开, 请自行创建组件使用iframe处理!
    { path: '/home', component: _import('common/home'), name: 'home', meta: { title: '首页' } },
    { path: '/theme', component: _import('common/theme'), name: 'theme', meta: { title: '主题' } },
    { path: '/demo-echarts', component: _import('demo/echarts'), name: 'demo-echarts', meta: { title: 'demo-echarts', isTab: true } },
    { path: '/demo-ueditor', component: _import('demo/ueditor'), name: 'demo-ueditor', meta: { title: 'demo-ueditor', isTab: true } },
    // member
    { path: '/member-user', component: _import('member/user/user'), name: 'member-user', meta: { title: '会员资料', isTab: true } },
    { path: '/member-invest', component: _import('member/invest/invest'), name: 'member-invest', meta: { title: '充值记录', isTab: true } },
    { path: '/member-withdraw', component: _import('member/withdraw/withdraw'), name: 'member-withdraw', meta: { title: '提现记录', isTab: true } },
    // finance
    { path: '/finance-usdt', component: _import('finance/usdt/usdt'), name: 'finance-usdt', meta: { title: 'USDT流水统计', isTab: true } },
    { path: '/finance-lpg', component: _import('finance/lpg/lpg'), name: 'finance-lpg', meta: { title: 'LPG流水统计', isTab: true } },
    { path: '/finance-bamboo', component: _import('finance/bamboo/bamboo'), name: 'finance-bamboo', meta: { title: '竹子流水统计', isTab: true } },
    { path: '/finance-raffle', component: _import('finance/raffle/raffle'), name: 'finance-raffle', meta: { title: '抽奖券', isTab: true } },
    { path: '/finance-airdrop', component: _import('finance/airdrop/airdrop'), name: 'finance-airdrop', meta: { title: '空投券', isTab: true } },
    { path: '/finance-open', component: _import('finance/open/open'), name: 'finance-open', meta: { title: '待开奖统计', isTab: true } },
    { path: '/finance-statistic', component: _import('finance/statistic/statistic'), name: 'finance-statistic', meta: { title: '中奖统计', isTab: true } },
    // reward
    { path: '/reward-cooperate', component: _import('reward/cooperate/cooperate'), name: 'reward-cooperate', meta: { title: '共建奖励', isTab: true } },
    { path: '/reward-share', component: _import('reward/share/share'), name: 'reward-share', meta: { title: '分享奖励', isTab: true } },
    { path: '/vote-vote', component: _import('vote/vote'), name: 'vote-vote', meta: { title: '投票管理', isTab: true } },
    // white-paper
    { path: '/wp-wp', component: _import('white-paper/white-paper'), name: 'wp-wp', meta: { title: '白皮书管理', isTab: true } },
    // raffle
    { path: '/raffle-raffle', component: _import('raffle/raffle'), name: 'raffle-raffle', meta: { title: '抽奖管理', isTab: true } },
    // airdrop
    { path: '/airdrop-airdrop', component: _import('airdrop/airdrop'), name: 'airdrop-airdrop', meta: { title: '空投管理', isTab: true } },
    // customer-service
    { path: '/cs-cs', component: _import('customer-service/imServer'), name: 'cs-cs', meta: { title: '客服服务', isTab: true } },
    // banner
    { path: '/banner-banner', component: _import('banner/banner'), name: 'banner-banner', meta: { title: '公告管理', isTab: true } },
    // 费率管理
    { path: '/param-param', component: _import('param/param'), name: 'param-param', meta: { title: '费率管理', isTab: true } }
  ],
  beforeEnter (to, from, next) {
    let token = Vue.cookie.get('token')
    if (!token || !/\S/.test(token)) {
      clearLoginInfo()
      next({ name: 'login' })
    }
    next()
  }
}

const router = new Router({
  mode: 'hash',
  scrollBehavior: () => ({ y: 0 }),
  isAddDynamicMenuRoutes: false, // 是否已经添加动态(菜单)路由
  routes: globalRoutes.concat(mainRoutes)
})

router.beforeEach((to, from, next) => {
  // 添加动态(菜单)路由
  // 1. 已经添加 or 全局路由, 直接访问
  // 2. 获取菜单列表, 添加并保存本地存储
  if (router.options.isAddDynamicMenuRoutes || fnCurrentRouteType(to, globalRoutes) === 'global') {
    next()
  } else {
    http({
      url: http.adornUrl('/sys/menu/nav'),
      method: 'get',
      params: http.adornParams()
    }).then(({data}) => {
      if (data && data.code === 0) {
        fnAddDynamicMenuRoutes(data.menuList)
        router.options.isAddDynamicMenuRoutes = true
        sessionStorage.setItem('menuList', JSON.stringify(data.menuList || '[]'))
        sessionStorage.setItem('permissions', JSON.stringify(data.permissions || '[]'))
        next({ ...to, replace: true })
      } else {
        sessionStorage.setItem('menuList', '[]')
        sessionStorage.setItem('permissions', '[]')
        next()
      }
    }).catch((e) => {
      console.log(`%c${e} 请求菜单列表和权限失败，跳转至登录页！！`, 'color:blue')
      router.push({ name: 'login' })
    })
  }
})

/**
 * 判断当前路由类型, global: 全局路由, main: 主入口路由
 * @param {*} route 当前路由
 */
function fnCurrentRouteType (route, globalRoutes = []) {
  var temp = []
  for (var i = 0; i < globalRoutes.length; i++) {
    if (route.path === globalRoutes[i].path) {
      return 'global'
    } else if (globalRoutes[i].children && globalRoutes[i].children.length >= 1) {
      temp = temp.concat(globalRoutes[i].children)
    }
  }
  return temp.length >= 1 ? fnCurrentRouteType(route, temp) : 'main'
}

/**
 * 添加动态(菜单)路由
 * @param {*} menuList 菜单列表
 * @param {*} routes 递归创建的动态(菜单)路由
 */
function fnAddDynamicMenuRoutes (menuList = [], routes = []) {
  var temp = []
  for (var i = 0; i < menuList.length; i++) {
    if (menuList[i].list && menuList[i].list.length >= 1) {
      temp = temp.concat(menuList[i].list)
    } else if (menuList[i].url && /\S/.test(menuList[i].url)) {
      menuList[i].url = menuList[i].url.replace(/^\//, '')
      var route = {
        path: menuList[i].url.replace('/', '-'),
        component: null,
        name: menuList[i].url.replace('/', '-'),
        meta: {
          menuId: menuList[i].menuId,
          title: menuList[i].name,
          isDynamic: true,
          isTab: true,
          iframeUrl: ''
        }
      }
      // url以http[s]://开头, 通过iframe展示
      if (isURL(menuList[i].url)) {
        route['path'] = `i-${menuList[i].menuId}`
        route['name'] = `i-${menuList[i].menuId}`
        route['meta']['iframeUrl'] = menuList[i].url
      } else {
        try {
          route['component'] = _import(`modules/${menuList[i].url}`) || null
        } catch (e) {}
      }
      routes.push(route)
    }
  }
  if (temp.length >= 1) {
    fnAddDynamicMenuRoutes(temp, routes)
  } else {
    mainRoutes.name = 'main-dynamic'
    mainRoutes.children = routes
    router.addRoutes([
      mainRoutes,
      { path: '*', redirect: { name: '404' } }
    ])
    sessionStorage.setItem('dynamicMenuRoutes', JSON.stringify(mainRoutes.children || '[]'))
    console.log('\n')
    console.log('%c!<-------------------- 动态(菜单)路由 s -------------------->', 'color:blue')
    console.log(mainRoutes.children)
    console.log('%c!<-------------------- 动态(菜单)路由 e -------------------->', 'color:blue')
  }
}

export default router
