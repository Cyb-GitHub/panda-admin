import httpRequest from '@/utils/httpRequest'

export const statistics = (startTimestamp, endTimestamp, page, pageSize, needSummary, accountKeyword) => {
  const params = {
    'startTimestamp': startTimestamp,
    'endTimestamp': endTimestamp,
    'page': page,
    'pageSize': pageSize,
    'needSummary': needSummary,
    'accountKeyword': accountKeyword
  }
  return httpRequest({
    url: httpRequest.adornUrl('/admin/recharge/statistics'),
    method: 'post',
    data: httpRequest.adornData(params)
  })
}

export const startRecharge = (params) => {
  return httpRequest({
    url: httpRequest.adornUrl('/account/admin/recharge/start'),
    method: 'post',
    data: httpRequest.adornData(params)
  })
}

export const processRecharge = (params) => {
  return httpRequest({
    url: httpRequest.adornUrl('/account/recharge/process'),
    method: 'post',
    data: httpRequest.adornData(params)
  })
}
