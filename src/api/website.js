import request from '@/utils/request'

export function crawler_website_info(data) {
  return request({
    url: process.env.VUE_APP_PHP_API + '/website/crawler',
    method: 'GET',
    params: data
  })
}

export function insert_website(data) {
  return request({
    url: process.env.VUE_APP_PHP_API + '/website/insert',
    method: 'POST',
    data
  })
}
export function delete_website(data) {
  return request({
    url: process.env.VUE_APP_PHP_API + '/website/delete',
    method: 'POST',
    data
  })
}
export function update_website(data) {
  return request({
    url: process.env.VUE_APP_PHP_API + '/website/update',
    method: 'POST',
    data
  })
}

export function select_website_info(data) { }
export function select_website_list(data) {
  return request({
    url: process.env.VUE_APP_PHP_API + '/website/list',
    method: 'POST',
    data
  })
}

