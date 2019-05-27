import Vue from 'vue'
import axios from 'axios'

// 设置基准路径
axios.defaults.baseURL = 'http://127.0.0.1:8899/api/public/v1/'

// 拦截器
axios.interceptors.request.use(function (config) {
  return config
})

// 适配器
axios.defaults.adapter = function (config) {
  return new Promise((resolve, reject) => {
    wx.showLoading({
      title: "Loading"
    })
    wx.request({
      url: config.url,
      data: config.data,
      method: config.method, // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      // todo:
      // header: {}, // 设置请求的 header
      success: res => {
        resolve(res)
      },
      fail: err => {
        // fail
        reject(err)
      },
      complete: res => {
        wx.hideLoading()
      }
    })
  })
}
axios.ab=10

Vue.prototype.$axios = axios
