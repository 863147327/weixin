export default {
  methods: {
    chooseAddress () {
      wx.chooseAddress({
        success: res => {
          res.detailAddress = `${res.cityName}${res.countyName}${res.detailInfo}`
          this.address = res
          // 保存到本地
          wx.setStorageSync('address', res)
          // console.log(res)
        },
        fail: ({ errMsg }) => {
          if (errMsg === 'chooseAddress:fail auth deny') {
            wx.showModal({
              title: '提示', // 提示的标题,
              content: '请去我的页面打开授权', // 提示的内容,
              showCancel: false, // 是否显示取消按钮
              confirmText: '确定', // 确定按钮的文字，默认为取消，最多 4 个字符,
              confirmColor: '#ff2d4a', // 确定按钮的文字颜色,
              success: res => {
                if (res.confirm) {
                  console.log(res.confirm)
                  wx.switchTab({
                    url: '/pages/my/main'
                  })
                }
              }
            })
          }
        }
      })
    }
  }
}
