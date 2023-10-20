export const RAFFLE_STATUS = {
  TO_BE_DRAWN: {
    status: 1,
    text: '待开奖'
  },
  DRAWN: {
    status: 2,
    text: '已开奖'
  }
}

export const RAFFLE_SEND_STATUS = {
  SEND: {
    status: 1,
    text: '已发放'
  },
  UNSEND: {
    status: 0,
    text: '未发放'
  }
}

export default {
  RAFFLE_STATUS,
  RAFFLE_SEND_STATUS
}
