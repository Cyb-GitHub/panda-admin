import httpRequest from '@/utils/httpRequest'

export const conversations = (params) => {
  return httpRequest({
    url: httpRequest.adornUrl('/im/platform/conversations'),
    method: 'post',
    data: httpRequest.adornData(params)
  })
}
