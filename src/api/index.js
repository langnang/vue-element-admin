import request from '@/utils/request'


export const jsdelivr = (pkg, version) => request({
  method: "GET",
  url: `https://data.jsdelivr.com/v1/package/npm/${pkg}@${version}`,
})
