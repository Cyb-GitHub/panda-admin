export const AIRDROP_ACTIVITY_STATUS = {
  NO_DISTRIBUTE: {
    status: 1,
    text: '未发放'
  },
  DRAWN: {
    status: 2,
    text: '已开奖'
  }
}

export function getAirdropActivityStatusText (status) {
  if (AIRDROP_ACTIVITY_STATUS.NO_DISTRIBUTE.status === status) {
    return AIRDROP_ACTIVITY_STATUS.NO_DISTRIBUTE.text
  }
  if (AIRDROP_ACTIVITY_STATUS.DRAWN.status === status) {
    return AIRDROP_ACTIVITY_STATUS.DRAWN.text
  }
  return ''
}

export default {
  AIRDROP_ACTIVITY_STATUS,
  getAirdropActivityStatusText
}
