import request from '@/utils/request'

export function getApplyInfo() {
  return request({
    url: '/data/apply/getApplyInfo',
    method: 'get'
  })
}
export function getSecondOptions(data) {
  return request({
    url: '/data/apply/getSecondOptions',
    method: 'get',
    params: data
  })
}
export function getStandardInfo(data) {
  return request({
    url: '/data/apply/getStandardInfo',
    method: 'get',
    params: data
  })
}
export function addApply(data) {
  return request({
    url: '/data/apply',
    method: 'post',
    data
  })
}

