import request from '@/utils/request'

export function crawler_script_info(data) {
  return request({
    url: process.env.VUE_APP_PHP_API + '/script/crawler',
    method: 'GET',
    params: data
  })
}

export function insert_script(data) {
  return request({
    url: process.env.VUE_APP_PHP_API + '/script/insert',
    method: 'POST',
    data
  })
}
export function delete_script(data) {
  return request({
    url: process.env.VUE_APP_PHP_API + '/script/delete',
    method: 'POST',
    data
  })
}
export function update_script(data) {
  return request({
    url: process.env.VUE_APP_PHP_API + '/script/update',
    method: 'POST',
    data
  })
}

export function select_script_info(data) { }
export function select_script_list(data) {
  return request({
    url: process.env.VUE_APP_PHP_API + '/script/list',
    method: 'POST',
    data
  })
}

export const upload_script = process.env.VUE_APP_PHP_API + '/script/upload';

export const select_script_keywords = (keyword = '') => request({
  url: process.env.VUE_APP_PHP_API + '/script/keywords',
  method: 'POST',
  data: {
    keyword
  }
})
