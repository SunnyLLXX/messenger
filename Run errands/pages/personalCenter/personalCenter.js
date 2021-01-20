// pages/personalCenter/personalCenter.js
//获取应用实例
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {}
  },

  /**跳转提现页面 */
  toWithdraw: function(e){
    wx.navigateTo({
      url: '/pages/withdraw/withdraw'
    })
  },

  /**跳转接单页面 */
  toGetOrders: function(e){
    wx.navigateTo({
      url: '/pages/getOrdersList/getOrdersList'
    })
  },
  /**跳转订单列表 */
  toGetCurrentOrders: function (){
    wx.navigateTo({
      url: '/pages/currentOrders/currentOrders'
    })
  },
  /**跳转账单 */
  toAccount: function (){
    wx.navigateTo({
      url: '/pages/accout/account'
    })
  },
/**跳转关于我们页面 */
toAboutMe:function () {
  wx.navigateTo({
    url: '/pages/aboutMe/aboutMe'
  })
},
/**跳转闲聊页面 */
toChat: function (){
  wx.navigateTo({
    url: '/pages/chatting/chatting'
  })
},
/**跳转设置页面 */
toSetting: function () {
  wx.navigateTo({
    url: '/pages/setting/setting'
  })
},
  /**跳转个人信息页面 */
  toPersonalInfo:function(){
    wx.navigateTo({
      url: '/pages/personalInfo/personalInfo'
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.getUserInfo({
      success: res => {
        app.globalData.userInfo = res.userInfo
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    if (typeof this.getTabBar === 'function' &&
    this.getTabBar()) {
    this.getTabBar().setData({
      selected: 3
    })
  }
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})