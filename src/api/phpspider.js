import request from '@/utils/request'

export const select_phpspider_options = () => request({
  url: process.env.VUE_APP_PHP_API + '/phpspider/options',
  method: 'GET',
})

export function test_phpspider(data) {
  return request({
    url: process.env.VUE_APP_PHP_API + '/phpspider/test',
    method: 'POST',
    data,
  })
}

export function insert_phpspider(data) {
  return request({
    url: process.env.VUE_APP_PHP_API + '/phpspider/insert',
    method: 'POST',
    data
  })
}
export function delete_phpspider(data) {
  return request({
    url: process.env.VUE_APP_PHP_API + '/phpspider/delete',
    method: 'POST',
    data
  })
}
export function update_phpspider(data) {
  return request({
    url: process.env.VUE_APP_PHP_API + '/phpspider/update',
    method: 'POST',
    data
  })
}

export function select_phpspider_info(data) { }
export function select_phpspider_list(data) {
  return request({
    url: process.env.VUE_APP_PHP_API + '/phpspider/list',
    method: 'POST',
    data
  })
}

export const upload_phpspider = process.env.VUE_APP_PHP_API + '/phpspider/upload';

export const select_phpspider_keywords = (keyword = '') => request({
  url: process.env.VUE_APP_PHP_API + '/phpspider/keywords',
  method: 'POST',
  data: {
    keyword
  }
})
