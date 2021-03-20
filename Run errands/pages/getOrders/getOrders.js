// pages/getOrders/getOrders.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    orderDetail: [],
    id: '',
    arrive_time:'',
    create_time:'',
    money:'',
    state:'',
    type: '',
    receiver_name: '',
    receiver_phone: '',
    receiver_id: '',
    receiver_time: '',
    finish_time: '',
    describes:'',
    describes_img:'',
    arrive_add:'',
    sender_name:'',
    sender_phone:'',
    sender_id: '',
    title: '',
    images: [],
  },

  /**获得具体的订单详情 */

  getOrderDetail: function(id){
    var that = this;
    wx.request({
      url: 'https://messager.kinlon.work/get_order_detail',
      data: {
        order_id: id
      },
      method: 'POST',
      header: {
        'content-type': 'application/json'
      },
      success (res) {
        console.log(res.data)
        if(res.data.res_code =='200'){
            let detail = res.data.data;
            let path = detail.describes_img;
            let arr = [];
            if(path.length !== 0){
              arr = path.split(';')
            }
          if(detail.receiver_time !== ''){
            detail.receiver_time = that.getFormatTime(detail.receiver_time);
          }
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
            sender_name:detail.sender_name,
            sender_phone:detail.sender_phone,
            receiver_id: detail.receiver_id,
            receiver_name: detail.receiver_name,
            receiver_phone: detail.receiver_phone,
            receiver_time:detail.receiver_time,
            type: detail.type,
            finish_time: detail.finish_time,
            title: detail.title,
            sender_id: detail.sender_id,
            images: arr
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
  getPeopleInfo:function(e){
    var that=this;
    console.log(e);
    let openid = that.data.sender_id;
    wx.navigateTo({
      url: '/pages/peopleInfo/peopleInfo?openid='+openid
    })
  },


  /**预览图片 */
  listenerButtonPreviewImage: function (e) {
    let index = e.target.dataset.index;//预览图片的编号
    let that = this;
    wx.previewImage({
      current: that.data.images[index],//预览图片链接
      urls: that.data.images,//图片预览list列表
      success: function (res) {
        //console.log(res);
      },
      fail: function () {
        //console.log('fail')
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    console.log(options)
    that.setData({
      id:options.id
    })
    that.getOrderDetail(options.id);
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
   let ts=date.getTime();
   date.setTime(ts-1000*60*60*8);
    console.log("最初标准时间"+date);
    let Y = date.getFullYear() + '-';
    let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
    let D = date.getDate()<10 ? '0' + date.getDate() + ' ': date.getDate() + ' ';
    let h = date.getHours()<10 ? ('0'+ date.getHours()+ ':'): (date.getHours()+ ':');
    let m = date.getMinutes()<10 ? ('0' + date.getMinutes() + ':') : date.getMinutes() + ':';
    let s = date.getSeconds()<10 ? '0'+ date.getSeconds():date.getSeconds();
    return Y + M + D + h + m + s;
  },

})