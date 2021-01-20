// pages/getOrders/getOrders.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    orderDetail: []
  },

  /**获得具体的订单详情 */

  getOrderDetail: function(){
    var that = this;
    wx.request({
      url: '/order/getOrderDetailInTaker',
      data: {
        orderId: ''
      },
      header: {
        'content-type': 'application/json'
      },
      success (res) {
        console.log("我接的单的订单详情"+res.data)
        that.setData({
          orderDetail: res.data.data
        })
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
    that.getOrderDetail();
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