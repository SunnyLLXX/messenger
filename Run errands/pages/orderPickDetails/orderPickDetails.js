// pages/orderPickDetails/orderPickDetails.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //抢单页面传递的订单编号
    id: '',
    pickupDetail:[],
    arrive_time:'',
    create_time:'',
    money:'',
    state:'',
    describes:'',
    describes_img:'',
    sender_id: '',
    arrive_add:'',
    sender_name:'',
    sender_phone:'',
    real_name:'',
    real_phone:'',
    reState: '抢单',
    type: ''
  },

  /**获得具体的抢单订单详情 */

  getOrderPickDetail: function(id){
    var that = this;
    console.log("订单编号"+that.data.id);
    wx.request({
      url: 'https://messager.kinlon.work/get_order_detail',
      data: {
        order_id: id
      },
      method:'POST',
      header: {
        'content-type': 'application/json'
      },
      success (res) {
        console.log(res.data)
        if(res.data.res_code == '200'){
            let detail = res.data.data;
          detail.arrive_time = that.getFormatTime(detail.arrive_time);
          detail.create_time = that.getFormatTime(detail.create_time)
          that.setData({
            arrive_time:detail.arrive_time,
            create_time:detail.create_time,
            money:detail.money,
            state:detail.state,
            arrive_add:detail.arrive_add,
            describes:detail.describes,
            describes_img:detail.describes_img,
            sender_id: detail.sender_id,
            sender_name:detail.sender_name,
            sender_phone:detail.sender_phone,
            type:detail.type
          })
        }else{
          wx.showToast({
            title: '订单信息获取失败',
            icon: 'none',
            duration: 2000
          })
        }
        
      }
    })
  },

  /**抢单功能 */
  grabOrder: function(e){
    console.log(e);
    console.log("grabOrder");
    var that = this;
    if(that.data.reState == "已接单"){
      wx.showToast({
        title: '你已抢单成功，无需再次抢单',
        icon: 'none',
        duration: 2000
      })
    }else{
      wx.request({
      url: 'https://messager.kinlon.work/confirm_order',
      data: {
        openid:wx.getStorageSync('openid'),
        order_id: that.data.id,
        real_name: that.data.real_name,
        real_phone:that.data.real_phone
      },
      method: 'POST',
      header: {
        'content-type': 'application/json'
      },
      success (res) {
        console.log(res.data)
        if(res.data.res_code == '200'){
          that.setData({
            reState:'已接单'
          })
          wx.reLaunch({
            url: '/pages/pickup/pickup'
          })
          wx.showToast({
            title: '抢单成功',
            icon: 'success',
            duration: 2000
          })
        }else{
          wx.showToast({
            title: '抢单失败',
            icon: 'none',
            duration: 2000
          })
        }
      }
    })
    }
    
  },
  /**获取当前用户信息 */
getPersonInfo(){
  var that=this;
  wx.request({
    url: 'https://messager.kinlon.work/get_my_info', 
    data: {
      openid: wx.getStorageSync('openid')
    },
    method:'POST',
    header: {
      'content-type': 'application/json' // 默认值
    },
    success (res) {
      console.log(res.data)
      if(res.data.res_code == '200'){
        that.setData({
          real_name:res.data.data.name,
          real_phone:res.data.data.phone
        })
      }else{
        wx.showToast({
          title: '当前用户信息获取失败',
          icon: 'none',
          duration: 2000
        })
      }
    }
  })
},
  getPeopleInfo:function(){
    var that=this;
    console.log(e);
    let openid = that.data.sender_id;
    wx.navigateTo({
      url: '/pages/peopleInfo/peopleInfo?openid='+openid
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    that.setData({
      id:options.id
    })
    that.getOrderPickDetail(options.id);
    that.getPersonInfo();
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

  },
   /**时间格式化 */
   timeago: function (timeStamp) {	
    var minute = 1000 * 60;      //把分，时，天，周，半个月，一个月用毫秒表示
    var hour = minute * 60;
    var day = hour * 24;
    var week = day * 7;
    var month = day * 30;
    var dateTimeStamp=Date.parse(timeStamp);
    console.log("标准时间变成时间戳"+dateTimeStamp)
    var now = new Date().getTime();   //获取当前时间毫秒
    var diffValue = now - dateTimeStamp;//时间差
    if (diffValue < 0) { return; }
    var minC = diffValue / minute;  //计算时间差的分，时，天，周，月
    var hourC = diffValue / hour;
    var dayC = diffValue / day;
    var weekC = diffValue / week;
    var monthC = diffValue / month;
    var result = '';

    if (monthC >= 1) {
      result = "" + parseInt(monthC) + "月前";
    } else if (weekC >= 1) {
      result = "" + parseInt(weekC) + "周前";
    } else
      if (dayC >= 1 && dayC <= 7) {
        result = "" + parseInt(dayC) + "天前";
      }
      else if (hourC >= 1 && hourC <= 24) {
        result = "" + parseInt(hourC) + "小时前";
      } else if (minC >= 1 && minC <= 60) {
        result = "" + parseInt(minC) + "分钟前";
      } else if (minC < 1) {
        result = "刚刚";
      } else
        result = this.getFormatTime(timeStamp)		//否则输出“format”(自定义格式)的时间
    return result;
  },
  getFormatTime: function (timeStamp) {
    var dateTimeStamp=Date.parse(timeStamp);
    let date = new Date(dateTimeStamp);
    console.log("最初标准时间"+date)
    let Y = date.getFullYear() + '-';
    let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
    let D = date.getDate()<10 ? '0' + date.getDate() + ' ': date.getDate() + ' ';
    let h = date.getHours()<10 ? ('0'+ date.getHours()+ ':'): (date.getHours()+ ':');
    let m = date.getMinutes()<10 ? ('0' + date.getMinutes() + ':') : date.getMinutes() + ':';
    let s = date.getSeconds()<10 ? '0'+ date.getSeconds():date.getSeconds();
    return Y + M + D + h + m + s;
  },
})