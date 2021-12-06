import request from '@/utils/request'

export function login(data) {
  return request({
    url: process.env.VUE_APP_PHP_API + '/user/login',
    method: 'POST',
    data
  })
}

export function getInfo(data = {}) {
  return request({
    url: process.env.VUE_APP_PHP_API + '/user/info',
    method: 'POST',
    data
  })
}

export function logout() {
  return request({
    url: '/vue-element-admin/user/logout',
    method: 'POST'
  })
}
