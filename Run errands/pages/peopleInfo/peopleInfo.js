// pages/peopleInfo/peopleInfo.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    openid: '',
    personInfo: [],
  },

  /**获取他人信息 */
  getPeopleInfo:function(id){
    var that=this;
  wx.request({
    url: 'https://messager.kinlon.work/get_my_info', 
    data: {
      openid: id
    },
    method:'POST',
    header: {
      'content-type': 'application/json' // 默认值
    },
    success (res) {
      console.log(res.data)
      if(res.data.res_code == '200'){
        that.setData({
          personInfo:res.data.data,
        })
      }else{
        wx.showToast({
          title: '用户信息获取失败',
          icon: 'none',
          duration: 2000
        })
      }
    }
  })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this;
    that.setData({
      openid:options.openid
    })
    that.getPeopleInfo(options.openid)
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