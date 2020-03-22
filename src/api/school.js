import request from '@/utils/request'

export function getList(data) {
  return request({
    url: '/data/school',
    method: 'get',
    params: data
  })
}
// 新建学校
export function addSchool(data) {
  return request({
    url: '/data/school',
    method: 'post',
    data
  })
}
// 校验账号
export function checkAccout(account) {
  return request({
    url: '/data/school/checkAccout',
    method: 'get',
    params: { account }
  })
}
// 校验名称
export function checkUserName(userName) {
  return request({
    url: '/data/school/checkUserName',
    method: 'get',
    params: { userName }
  })
}
// 编辑学校
export function updateSchool(data) {
  return request({
    url: '/data/school',
    method: 'put',
    params: data
  })
}

export function deleteSchool(id) {
  return request({
    url: '/data/school',
    method: 'delete',
    params: { id }
  })
}
