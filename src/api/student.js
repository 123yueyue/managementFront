import request from '@/utils/request'

export function getList(data) {
  return request({
    url: '/data/student',
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
// 获取下拉框中的学生列表
export function getClassList() {
  return request({
    url: '/data/student/getClassList',
    method: 'get'
  })
}
// 新建学生
export function addStudent(data) {
  return request({
    url: '/data/student',
    method: 'post',
    data
  })
}
// 校验名称
export function checkName(account) {
  return request({
    url: '/data/student/checkName',
    method: 'get',
    params: { account }
  })
}
// 编辑学生
export function updateStudent(data) {
  return request({
    url: '/data/student',
    method: 'put',
    params: data
  })
}

export function deleteStudent(id) {
  return request({
    url: '/data/student',
    method: 'delete',
    params: { id }
  })
}
