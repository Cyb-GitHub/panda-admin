import httpRequest from '@/utils/httpRequest'
export const queryVote = (params) => {
  return httpRequest({
    url: httpRequest.adornUrl('/vote/admin/activity/query/paged'),
    method: 'post',
    data: httpRequest.adornData(params)
  })
}

export const updateVote = (params) => {
  return httpRequest({
    url: httpRequest.adornUrl('/vote/admin/activity/update'),
    method: 'post',
    data: httpRequest.adornData(params)
  })
}

export const createVote = (params) => {
  return httpRequest({
    url: httpRequest.adornUrl('/vote/admin/activity/create'),
    method: 'post',
    data: httpRequest.adornData(params)
  })
}
