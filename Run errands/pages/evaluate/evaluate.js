// pages/evaluate/evaluate.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    state: '',
    radioGroup: [
      {value: '差评', name: '差评'},
      {value: '中评', name: '中评'},
      {value: '好评', name: '好评'},
    ]
  },

  bindStateInput: function(e){
    var that=this;
    that.setData({
      state: e.detail.value
    })
  },
  radioChange: function(e) {
    var that=this;
    console.log('radio发生change事件，携带value值为：', e.detail.value)

    const items = that.data.radioGroup
    for (let i in items) {
      items[i].checked = items[i].value === e.detail.value
    }

    this.setData({
      radioGroup: items
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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