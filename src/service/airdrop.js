import httpRequest from '@/utils/httpRequest'

export const search = (params) => {
  return httpRequest({
    url: httpRequest.adornUrl('/admin/airdrop/activity/query/paged'),
    method: 'post',
    data: httpRequest.adornData(params)
  })
}

export const create = (airdropPhase, lpgTotalCount) => {
  const params = {
    'airdropPhase': airdropPhase,
    'lpgTotalCount': lpgTotalCount
  }
  return httpRequest({
    url: httpRequest.adornUrl('/admin/airdrop/activity/create'),
    method: 'post',
    data: httpRequest.adornData(params)
  })
}

export const send = (airdropPhase, lpgTotalCount) => {
  const params = {
    'airdropPhase': airdropPhase,
    'lpgTotalCount': lpgTotalCount
  }
  return httpRequest({
    url: httpRequest.adornUrl('/admin/airdrop/send'),
    method: 'post',
    data: httpRequest.adornData(params)
  })
}
