// pages/modifyPhone/modifyPhone.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    phone: '',
    open_id: '',
  },

/**手机号输入 */
bindPhoneInput:function(e){
  var that=this;
  that.setData({
    phone:e.detail.value
  })
},
  /**修改手机号 */
  modifyPhone:function(){
    var that = this
    let reg = /^1[3-9][0-9]{9}$/
    console.log(that.data.phone)
    if(reg.test(that.data.phone)){
      wx.request({
        url: 'https://messager.kinlon.work/edit_phone', 
        method: 'POST',
        data: {
          openid: that.data.open_id,
          phone_num: that.data.phone
        },
        header: {
          'content-type': 'application/json' 
        },
        success (res) {
          if(res.data.res_code == 200){
            wx.showToast({
              title: '手机号修改成功',
              icon: 'success',
              duration: 2000,
              success:function(){
                wx.redirectTo({
                  url: '/pages/personalInfo/personalInfo',
                })
              }
            })
            
          }else{
            wx.showToast({
              title: '出问题了，请稍后再试',
              icon: 'none',
              duration: 2000
            })
          }
        }
      })
    }else{
      wx.showToast({
        title: '手机号格式不正确',
        icon: 'none',
        duration: 2000
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    var that = this
    that.setData({
      open_id: options.openid
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