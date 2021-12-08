import request from '@/utils/request'

export function crawler_website_info(data) {
  return request({
    url: process.env.VUE_APP_PHP_API + '/website/crawler',
    method: 'GET',
    params: data
  })
}

export function select_website_list(data) {
  return request({
    url: process.env.VUE_APP_PHP_API + '/website/list',
    method: 'POST',
    data
  })
}
