import request from '@/utils/request'

export function getList(data) {
  return request({
    url: '/data/class',
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
// 获取下拉框中的学院列表
export function getInstitutionList() {
  return request({
    url: '/data/class/getInstitutionList',
    method: 'get'
  })
}
// 新建学院
export function addClass(data) {
  return request({
    url: '/data/class',
    method: 'post',
    data
  })
}
// 校验名称
export function checkName(className) {
  return request({
    url: '/data/class/checkName',
    method: 'get',
    params: { className }
  })
}
// 编辑班级
export function updateClass(data) {
  return request({
    url: '/data/class',
    method: 'put',
    params: data
  })
}

export function deleteClass(id) {
  return request({
    url: '/data/class',
    method: 'delete',
    params: { id }
  })
}
