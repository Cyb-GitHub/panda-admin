<!-- 聊天记录 -->
<template>
  <div class="imChat-wrapper">
    <!-- 头部 -->
    <header class="imChat-header">
      <span class="name">{{storeSelectedChatEn.userId}}</span>
      <span class="time">{{getAccessTimeStr(storeSelectedChatEn.accessTime)}}</span>
      <span v-show="storeSelectedChatEn.state=='on' " class="on-line">在线</span>
      <span v-show="storeSelectedChatEn.state=='off' " class="off-line ">离线</span>
    </header>
    <main class="imChat-main">
      <!-- 聊天框区域 -->
      <common-chat ref="common_chat"
        :msgList="getMsgList"
        :chatInfoEn="storeSelectedChatEn"
        :oprRoleName="'server'"
        @showMoreMsg= "showMoreMsg"
        @sendMsg="sendMsg"></common-chat>
    </main>
  </div>
</template>

<script>
import commonChat from '@/components/im/common_chat.vue'

export default {
  components: {
    commonChat: commonChat
  },
  data () {
    return {}
  },
  props: {
    storeSelectedChatEn: {
      type: Object,
      defaul: () => {}
    },
    msgList: {
      type: Array,
      default: () => []
    }
  },
  computed: {
    storeHaveNewMsgDelegate () {
      return this.$store.getters.haveNewMsgDelegate
    },
    storeServerChatEn () {
      return this.$store.getters.serverChatEn
    },
    getMsgList () {
      return this.msgList
    }
  },
  watch: {
    storeSelectedChatEn (value) {
      this.$refs.common_chat.goEnd()
    },
    storeHaveNewMsgDelegate (value) {
      this.$refs.common_chat.goEnd()
    }
  },
  methods: {
    showMoreMsg () {
      this.$emit('showMoreMsg')
    },
    /**
     * 发送消息
     * @param {Object} rs 回调对象
     */
    sendMsg: function (rs) {
      console.log(rs)
      console.log(this.storeSelectedChatEn)
      var msg = rs.msg
      msg.role = 'server'
      msg.avatarUrl = this.storeServerChatEn.avatarUrl
      const msgInfo = {
        msgType: 1,
        sendType: 1,
        toId: this.storeSelectedChatEn.userId,
        content: msg.content,
        created: Date.now(),
        source: 1,
        userId: 0
      }
      // 1.socket发送消息
      this.$store.getters.ws.send(JSON.stringify(msgInfo))
      this.$emit('sendMsg', msgInfo) // 事件上传

      // 2.附加到此chat对象的msg集合里
      this.$store.dispatch('addChatMsg', {
        clientChatId: this.storeSelectedChatEn.clientChatId,
        msg: msg,
        successCallback: function () {
          rs.successCallbcak && rs.successCallbcak()
        }
      })
    },

    goEnd: function () {
      this.$refs.common_chat.goEnd()
    },

    /**
     * 获取chat的访问时间
     * @param {Date} accessTime 问时间
     */
    getAccessTimeStr: function (accessTime) {
      return '-'
    }
  },
  mounted () {}
}
</script>
<style lang="less">
.imChat-wrapper {
  .imChat-header {
    display: flex;
    align-items: center;
    width: 100%;
    height: 50px;
    padding-left: 10px;
    border-bottom: 1px solid #e6e6e6;
    font-size: 16px;
    span {
      margin-right: 20px;
    }
    .on-line {
      color: #70ed3a;
    }
    .off-line {
      color: #bbbbbb;
    }
  }
  .imChat-main {
    height: calc(~'100% - 50px');
  }
}
</style>
