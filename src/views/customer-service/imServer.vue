<!-- im服务端入口 -->
<template>
  <div class="imServer-wrapper">
    <main class="imServer-main">
      <im-record class="item im-record" @selectedChat="selectedChat($event)"></im-record>
      <im-chat v-if="storeSelectedChatEn!=null" :msgList="msgList" :storeSelectedChatEn="storeSelectedChatEn"
        @sendMsg="sendMsg($event)"
        @showMoreMsg="showMoreMsg"
        ref="im_chat" class="item im-chat"></im-chat>
    </main>
  </div>
</template>

<script >
import imRecord from './imRecord.vue'
import imChat from './imChat.vue'
export default {
  components: {
    imRecord: imRecord,
    imChat: imChat
  },
  data () {
    return {
      socket: null,
      storeSelectedChatEn: null,
      timer: undefined,
      msgList: [],
      pageSize: 10,
      currentPage: 1
    }
  },
  computed: {
  },
  watch: {
  },
  methods: {
    /**
     * 选中了会话
     */
    selectedChat: function (selectedChatInfo) {
      console.log(selectedChatInfo)
      this.msgList = []
      this.storeSelectedChatEn = selectedChatInfo
      this.getHistory(this.pageSize)
      this.resetPageInfo()
    },
    resetPageInfo () {
      this.pageSize = 10
      this.currentPage = 1
    },
    sendMsg (msg) {
      this.msgList.push(msg)
      console.log(msg)
    },
    getHeartBeat () {
      return {
        content: 'HEART_BEAT'
      }
    },
    initWs () {
      if (this.$store.ws) {
        return
      }
      if (typeof (WebSocket) === 'undefined') {
        alert('error!')
      } else {
        this.socket = new WebSocket(`${window.SITE_CONFIG['ws']}/im/websocket/platform/${this.$cookie.get('token')}`)
        this.socket.onopen = this.open
        this.socket.onmessage = this.getMessage
      }
    },
    open () {
      this.$store.dispatch('createWs', this.socket).then((res) => {
        console.log(res)
        this.timer = setInterval(() => {
          this.socket.send(JSON.stringify(this.getHeartBeat()))
        }, 5000)
      })
    },
    getMessage (msg) {
      const res = JSON.parse(msg.data)
      console.log(res)
      // 获取历史消息
      if (res.type === 2) {
        this.msgList = [...res.data.records.reverse(), ...this.msgList]
        console.log(this.msgList)
      } else if (res.type === 4) {
        this.msgList.push(res.data)
        console.log(this.msgList)
      }
    },
    getHistory (size) {
      const getHistoryReq = {
        history: true,
        size: size,
        current: this.currentPage,
        toId: this.storeSelectedChatEn.userId
      }
      this.socket.send(JSON.stringify(getHistoryReq))
    },
    showMoreMsg () {
      this.getHistory(this.pageSize + this.msgList.length)
    }
  },
  mounted () {
    // this.$store.dispatch('SERVER_ON')
    this.initWs()
  },
  destroyed () {
    // this.$store.dispatch('SERVER_OFF')
    clearInterval(this.timer)
  }
}
</script>

<style lang="less">
@import '../../assets/scss/im_base.less';

.imServer-wrapper {
  #common-wrapper();
}

.imServer-wrapper {
  width: 100%;
  height: 100%;
  position: absolute;
  overflow: hidden;
  .imServer-main {
    height: 100%;
    max-width: 100%;
    position: relative;
    & > .item {
      float: left;
      border-right: 1px solid #e6e6e6;
      height: 100%;
    }
    & > .im-record {
      width: 280px;
    }
    & > .im-chat {
      width: calc(~'99% - 280px');
    }
  }
}
</style>
