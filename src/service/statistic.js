import httpRequest from '@/utils/httpRequest'

export const raffleStatistic = (startTimestamp, endTimestamp, page, pageSize, needSummary, accountKeyword) => {
  const params = {
    'startTimestamp': startTimestamp,
    'endTimestamp': endTimestamp,
    'page': page,
    'pageSize': pageSize,
    'needSummary': needSummary,
    'accountKeyword': accountKeyword
  }
  return httpRequest({
    url: httpRequest.adornUrl('/admin/statement/raffle/list'),
    method: 'post',
    data: httpRequest.adornData(params)
  })
}

export const airdropStatistic = (startTimestamp, endTimestamp, page, pageSize, needSummary, accountKeyword) => {
  const params = {
    'startTimestamp': startTimestamp,
    'endTimestamp': endTimestamp,
    'page': page,
    'pageSize': pageSize,
    'needSummary': needSummary,
    'accountKeyword': accountKeyword
  }
  return httpRequest({
    url: httpRequest.adornUrl('/admin/statement/airdrop/list'),
    method: 'post',
    data: httpRequest.adornData(params)
  })
}
