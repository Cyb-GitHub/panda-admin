import httpRequest from '@/utils/httpRequest'

export const query = (params) => {
  return httpRequest({
    url: httpRequest.adornUrl('/admin/raffle/activity/admin/query/paged'),
    method: 'post',
    data: httpRequest.adornData(params)
  })
}

export const create = (params) => {
  return httpRequest({
    url: httpRequest.adornUrl('/admin/raffle/activity/create'),
    method: 'post',
    data: httpRequest.adornData(params)
  })
}

export const setBall = (params) => {
  return httpRequest({
    url: httpRequest.adornUrl('/admin/raffle/activity/winning/number/set'),
    method: 'post',
    data: httpRequest.adornData(params)
  })
}

export const sendBall = (params) => {
  return httpRequest({
    url: httpRequest.adornUrl('/admin/raffle/activity/draw'),
    method: 'post',
    data: httpRequest.adornData(params)
  })
}

export const delay = (params) => {
  return httpRequest({
    url: httpRequest.adornUrl('/admin/raffle/activity/delay'),
    method: 'post',
    data: httpRequest.adornData(params)
  })
}

export const winStatistic = (startTimestamp, endTimestamp, page, pageSize, needSummary, accountKeyword) => {
  const params = {
    'startTimestamp': startTimestamp,
    'endTimestamp': endTimestamp,
    'page': page,
    'pageSize': pageSize,
    'needSummary': needSummary,
    'accountKeyword': accountKeyword
  }
  return httpRequest({
    url: httpRequest.adornUrl('/admin/raffle/winning/statistic'),
    method: 'post',
    data: httpRequest.adornData(params)
  })
}

export const tobeStatistic = (startTimestamp, endTimestamp, page, pageSize, needSummary, accountKeyword) => {
  const params = {
    'startTimestamp': startTimestamp,
    'endTimestamp': endTimestamp,
    'page': page,
    'pageSize': pageSize,
    'needSummary': needSummary,
    'accountKeyword': accountKeyword
  }
  return httpRequest({
    url: httpRequest.adornUrl('/admin/raffle/tobe/drawn/statistic'),
    method: 'post',
    data: httpRequest.adornData(params)
  })
}
