import httpRequest from '@/utils/httpRequest'

export const query = () => {
  return httpRequest({
    url: httpRequest.adornUrl('/admin/param/list'),
    method: 'post',
    data: httpRequest.adornData()
  })
}

export const setParam = (params) => {
  return httpRequest({
    url: httpRequest.adornUrl('/admin/param/set'),
    method: 'post',
    data: httpRequest.adornData(params)
  })
}
