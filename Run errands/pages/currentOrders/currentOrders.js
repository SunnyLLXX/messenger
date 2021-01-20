// pages/currentOrders/currentOrders.js

Page({

  /**
   * 页面的初始数据
   */
  data: {
    /*currentOrderList: [{
      title: "标题",
      createtime:"时间",
      money:"金额",
      status:"状态"
    }]*/
  },

  /**跳转订单详情页面 */
  toOrderDetail: function(e){
    wx.navigateTo({
      url: '/pages/orderDetails/orderDetails'
    })
  },

  /**分页渲染的参数 */
QueryParams:{
  pagenum:1,
  totalPages:1
},

  /*getMoreOrders: function(){
    var that = this;
    wx.request({
      url: '/order/getAllUserOrderedOrder',
      data: {
        pageNum: that.QueryParams.pagenum
      },
      header: {
        'content-type': 'application/json',
        'Authorization': ''
      },
      success (res) {
        console.log("当前用户所有的订单："+res.data);
         //计算总的页数
         that.QueryParams.totalPages=Math.ceil(res.data.data.total/10);
         console.log("总页数："+that.QueryParams.totalPages);
         that.setData({
           currentOrderList: [...that.data.currentOrderList,...res.data.data.row]
         })
      }
    })
  },*/
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    //that.getMoreOrders()
    
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
    //tabbar
    /*if (typeof this.getTabBar === 'function' &&
    this.getTabBar()) {
    this.getTabBar().setData({
      selected: 0
    })
  }*/
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
    var that=this;
    //显示加载图标
    /*wx.showLoading({
      title: '拼命加载中',
    })
  
    //发送上拉加载请求
    if(that.QueryParams.pagenum>=that.QueryParams.totalPages)
    {
      wx.showToast({
        title: '已经到底啦',
        icon:"none"
      })
    }else{
      //页数加1
      that.QueryParams.pagenum++;
      that.getMoreOrders();
        //隐藏加载框
      wx.hideLoading();

    }*/
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})