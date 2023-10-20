import httpRequest from '@/utils/httpRequest'

export const search = (params) => {
  return httpRequest({
    url: httpRequest.adornUrl('/admin/banner/list'),
    method: 'post',
    data: httpRequest.adornData(params)
  })
}

export const create = (params) => {
  return httpRequest({
    url: httpRequest.adornUrl('/admin/banner/create'),
    method: 'post',
    data: httpRequest.adornData(params)
  })
}

export const update = (params) => {
  return httpRequest({
    url: httpRequest.adornUrl('/admin/banner/update'),
    method: 'post',
    data: httpRequest.adornData(params)
  })
}
