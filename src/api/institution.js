import request from '@/utils/request'

export function getList(data) {
  return request({
    url: '/data/institution',
    method: 'get',
    params: data
  })
}
export function getSchoolList() {
  return request({
    url: '/data/institution/schoolList',
    method: 'get'
  })
}
// 新建学院
export function addInstitution(data) {
  return request({
    url: '/data/institution',
    method: 'post',
    data
  })
}
// 校验名称
export function checkName(institutionName) {
  return request({
    url: '/data/institution/checkInstitutionName',
    method: 'get',
    params: { institutionName }
  })
}
// 校验用户名
export function checkAccount(account) {
  return request({
    url: '/data/institution/checkInstitutionName',
    method: 'get',
    params: { account }
  })
}
// 编辑学校
export function updateInstitution(data) {
  return request({
    url: '/data/institution',
    method: 'put',
    params: data
  })
}

export function deleteInstitution(id) {
  return request({
    url: '/data/institution',
    method: 'delete',
    params: { id }
  })
}
