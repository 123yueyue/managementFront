import request from '@/utils/request'

export function getList(data) {
  return request({
    url: '/data/apply/getApplyDetail',
    method: 'get',
    params: data
  })
}
