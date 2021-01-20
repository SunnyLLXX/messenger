// pages/orderPickDetails/orderPickDetails.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //抢单页面传递的订单编号
    id: '',
    pickupDetail:[],
  },

  /**获得具体的抢单订单详情 */

  getOrderPickDetail: function(){
    var that = this;
    wx.request({
      url: 'https://messager.kinlon.work/get_order_detail',
      data: {
        order_id: that.data.id
      },
      header: {
        'content-type': 'application/json'
      },
      success (res) {
        console.log(res.data)
        that.setData({
          pickupDetail:res.data
        })
      }
    })
  },

  /**抢单功能 */
  grabOrder: function(){
    var that = this;
    wx.request({
      url: '/order/grabOrder',
      data: {

      },
      method: 'POST',
      header: {
        'content-type': 'application/json'
      },
      success (res) {
        console.log("抢单请求数据："+res.data)
      }
    })
  },
  getPeopleInfo:function(){
    wx.navigateTo({
      url: '/pages/peopleInfo/peopleInfo'
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    that.getOrderPickDetail();
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