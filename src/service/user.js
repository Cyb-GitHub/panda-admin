import httpRequest from '@/utils/httpRequest'

export const search = (params) => {
  return httpRequest({
    url: httpRequest.adornUrl('/admin/user/list'),
    method: 'post',
    data: httpRequest.adornData(params)
  })
}

export const modifyUser = (params) => {
  return httpRequest({
    url: httpRequest.adornUrl('/admin/user/updateByUid'),
    method: 'post',
    data: httpRequest.adornData(params)
  })
}
