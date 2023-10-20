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
    url: httpRequest.adornUrl('/admin/withdrawal/statistics'),
    method: 'post',
    data: httpRequest.adornData(params)
  })
}

export const process = (accountId, statementId, actualWithdrawAmount, hash, withdrawalTxHash) => {
  const params = {
    'accountId': accountId,
    'statementId': statementId,
    'actualWithdrawAmount': actualWithdrawAmount,
    'hash': hash,
    'withdrawalTxHash': withdrawalTxHash
  }
  return httpRequest({
    url: httpRequest.adornUrl('/admin/withdrawal/process'),
    method: 'post',
    data: httpRequest.adornData(params)
  })
}

export const refuse = (accountId, statementId, actualWithdrawAmount, hash) => {
  const params = {
    'accountId': accountId,
    'statementId': statementId,
    'actualWithdrawAmount': actualWithdrawAmount,
    'hash': hash
  }
  return httpRequest({
    url: httpRequest.adornUrl('/admin/withdrawal/refuse'),
    method: 'post',
    data: httpRequest.adornData(params)
  })
}
