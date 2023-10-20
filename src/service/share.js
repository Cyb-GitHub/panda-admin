import httpRequest from '@/utils/httpRequest'

export const shareRewardStatistic = (startTimestamp, endTimestamp, page, pageSize, needSummary, accountKeyword) => {
  const params = {
    'startTimestamp': startTimestamp,
    'endTimestamp': endTimestamp,
    'page': page,
    'pageSize': pageSize,
    'needSummary': needSummary,
    'accountKeyword': accountKeyword
  }
  return httpRequest({
    url: httpRequest.adornUrl('/admin/share/reward/statistic'),
    method: 'post',
    data: httpRequest.adornData(params)
  })
}
