import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/data/login',
    method: 'post',
    data
  })
}

export function getInfo(token) {
  return request({
    url: '/data/login',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: '/data/login/logout',
    method: 'post'
  })
}
