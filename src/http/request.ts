import axios from 'axios'
import Taro from '@tarojs/taro'
import env from './env'
// create an axios instance
const service = axios.create({
  baseURL: env, // url = base url + request url
  timeout: 600000, // request timeout
  headers: {
    'Content-Type': 'application/json;charset=UTF-8'
  },
  transformResponse: [
    function (data: any) {
      try {
        data = JSON.parse(data)
        return data
      } catch (e) {
        return data
      }
    }
  ],
  transformRequest: [
    (data: any, headers: any): string => {
      if (Taro.getStorageSync('token')) {
        headers.common.Authorization = Taro.getStorageSync('token')
      }
      if (headers['Content-Type'] === 'multipart/form-data') {
        return data
      }
      return JSON.stringify(data)
    }
  ]
})

service.interceptors.request.use(
  (config) => {
    return config
  },
  (err) => {
    return Promise.reject(err)
  }
)

service.interceptors.response.use(
  (response) => {
    const data = response.data
    if (data.code === 200) {
      return data
    } else if (data.code === 1010005 || data.code === 523) {
      // 额外处理登录
      return Promise.reject(data)
    } else {
      Taro.showToast({
        title: data.msg || data.message || data,
        icon: 'none'
      })
      return Promise.reject(data)
    }
  },
  (error) => {
    Taro.showToast({
      title: error.message || error.msg,
      icon: 'none'
    })
    return Promise.reject(error)
  }
)
export default service
