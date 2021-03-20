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
    ],
    comp_evaluate: '',
    order_id: '',
    order_title: ''
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
      radioGroup: items,
      comp_evaluate: e.detail.value
    })
  },

  /**发布评价 */
  submitEvaluate:function(){
    var that = this
    if(that.data.comp_evaluate == '' || that.data.state == ''){
      wx.showToast({
        title: '必填项未填',
        icon: 'none',
        duration: 2000
      })
    }else{
      wx.request({
        url: 'https://messager.kinlon.work/add_evaluate', 
        data: {
          order_id: that.data.order_id,
          comp_evaluate: that.data.comp_evaluate,
          evaluate_content: that.data.state
        },
        method: 'POST',
        header: {
          'content-type': 'application/json'
        },
        success (res) {
          if(res.data.res_code == 200){
            wx.showToast({
              title: '评价成功',
              icon: 'success',
              duration: 2000,
              success: function(){
                  wx.redirectTo({
                    url: '/pages/currentOrders/currentOrders',
                  })
              }
            })
          }else{
            wx.showToast({
              title: '出问题了，请稍后再尝试',
              icon: 'none',
              duration: 2000
            })
          }
        }
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    console.log(options)
    that.setData({
      order_id: options.id,
      order_title: options.title
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