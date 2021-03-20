//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: '欢迎登录超级信使小程序',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  
  onLoad: function () {
    this.loginApp()
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  /**获取用户信息 */
  getUserInfo: function(e) {
    let that = this
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          console.log('已授权')
          wx.getUserInfo({
            success(res) {
              console.log("获取用户信息成功", res)
              app.globalData.userInfo = res
            },
            fail(res) {
              console.log("获取用户信息失败", res)
            }
          })
        }else{
          that.showSettingToast()
        }
      }
    });
  },
  showSettingToast: function(e){
    let that = this
    wx.showModal({
      title: '温馨提示',
      content: '请允许小程序获取您的基本用户信息（头像和昵称），便于您后续使用小程序',
      showCancel: false,
      success (res) {
        console.log(res);
        wx.openSetting({
          success(res) {
            that.loginApp()
          }
        })
      }
    })
  },
  
  /**登录处理 */
  loginApp:function(e){
    wx.login({
      success (res) {
        if (res.code) {
          //发起网络请求
          wx.request({
            url: 'https://messager.kinlon.work/code',
            data: {
              code: res.code
            },
            method: 'POST',
            header: {
              'content-type': 'application/json' // 默认值
            },
            success: function(res){
              console.log('登录成功')
              console.log(res.data)
              wx.setStorageSync("openid", res.data.openid)
              wx.setStorageSync("session_key", res.data.session_key)
              
              if(res.data.msg == "exist"){
                wx.switchTab({
                  url: '/pages/home/home'
                })
                
              }else{
                wx.redirectTo({
                  url: '/pages/attachSchool/attachSchool'
                })
              }
            },
            fail:function(){
              console.log('登录失败')
              console.log(res.data)
            }
          })
        } else {
          console.log('获取信息失败' + res.errMsg)
        }
      }
    })
  }
})
