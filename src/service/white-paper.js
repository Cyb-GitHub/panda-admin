import httpRequest from '@/utils/httpRequest'

export const search = (params) => {
  return httpRequest({
    url: httpRequest.adornUrl('/white-paper'),
    method: 'post',
    data: httpRequest.adornData(params)
  })
}

export const update = (id, params) => {
  return httpRequest({
    url: httpRequest.adornUrl(`/white-paper/update/${id}`),
    method: 'post',
    data: httpRequest.adornData(params)
  })
}

export const create = (params) => {
  return httpRequest({
    url: httpRequest.adornUrl(`/white-paper/create`),
    method: 'post',
    data: httpRequest.adornData(params)
  })
}

export const deleteWp = (id) => {
  return httpRequest({
    url: httpRequest.adornUrl(`/white-paper/delete/${id}`),
    method: 'post',
    data: httpRequest.adornData({})
  })
}
