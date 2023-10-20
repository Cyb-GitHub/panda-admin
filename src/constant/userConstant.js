export const USER_STATUS = {
  ENABLE: {
    status: 1,
    text: '正常'
  },
  DISABLE: {
    status: 0,
    text: '禁用'
  }
}

export const ACCOUNT_TYPE = {
  NORMAL_USER: {
    type: 0
  },
  NORMAL_ADMIN: {
    type: 1
  },
  FINANCE_ADMIN: {
    type: 2
  },
  ROOT_ADMIN: {
    type: 4
  }
}

export default {
  USER_STATUS,
  ACCOUNT_TYPE
}
