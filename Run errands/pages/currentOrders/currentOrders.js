// pages/currentOrders/currentOrders.js

Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs: [{
      id: 0,
      name: "全部",
      isActive: true
    },
    {
      id: 1,
      name: "待接单",
      isActive: false
    },{
      id: 2,
      name: "待确认",
      isActive: false
    },{
      id: 3,
      name: "待评价",
      isActive: false
    }],
    getOrder: [],
    waitAcceptOrder:[],
    orderOK:[],
    orderEvaluate:[],
    isShowOrder:false,
    isShowEvaluateOrder:false,
    isShowWaitOrder:false,
    isShowOKOrder:false
  },
// tab栏
handleItemChange(e){
  console.log(e)
  const index=e.detail.index;
  let tabs=this.data.tabs;
  tabs.forEach((v,i)=>i===index? v.isActive=true : v.isActive=false);
  this.setData({
    tabs:tabs
  })  
},
  /**跳转订单详情页面 */
  toOrderDetail: function(e){
    let id=e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/pages/orderDetails/orderDetails?id='+id
    })
  },

  /**分页渲染的参数 */
QueryParams:{
  pagenum:1,
  totalPages:1
},

  getMoreOrders: function(){
    var that = this;
    let waitOrder = []
    let okOrder = []
    let evaluateOrder = []
    wx.request({
      url: 'https://messager.kinlon.work/get_my_order',
      data: {
        openid: wx.getStorageSync('openid')
      },
      method: 'POST',
      header: {
        'content-type': 'application/json' 
      },
      success (res) {
        console.log(res.data)
        if(res.data.res_code == 200){
          let list=res.data.data.send
          for(let i in list){
            let time=list[i].create_time;
            list[i].create_time = that.getFormatTime(time);
            if(list[i].state == '抢单'){
              waitOrder.push(list[i])
            }else if(list[i].state == '已接单'){
              okOrder.push(list[i])
            }else if(list[i].state == '待评价'){
              evaluateOrder.push(list[i])
            }
          }
          that.setData({
            getOrder: list,
            waitAcceptOrder:waitOrder,
            orderEvaluate:evaluateOrder,
            orderOK:okOrder
          })
          if(that.data.getOrder.length == []){
            that.setData({
              isShowOrder:true
            })
          }
          if(that.data.waitAcceptOrder.length == []){
            that.setData({
              isShowWaitOrder:true
            })
          }
          if(that.data.orderOK.length == []){
              that.setData({
                isShowOKOrder:true
              })
            }
          if(that.data.orderEvaluate.length == []){
            that.setData({
              isShowEvaluateOrder:true
            })
          }
        }else{
          wx.showToast({
            title: '获取订单失败',
            icon: 'none',
            duration: 2000
          })
        }
      }
    })
  },

  /**跳转评价页面 */
  evaluate:function(e){
    console.log(e)
    let id=e.currentTarget.dataset.id
    let title=e.currentTarget.dataset.title
    wx.redirectTo({
      url: '/pages/evaluate/evaluate?id='+id+'&title='+title
    })
  },

  /**确认订单完成 */
  submitOk:function(e){
    var that = this;
    console.log(e);
    let id  = e.currentTarget.dataset.id;//订单编号
    wx.showModal({
      title: '提示',
      content: '确定此订单已完成吗？',
      success: function (res) {
        if (res.confirm) {
          console.log('点击确定了');
          //发起请求
          wx.request({
            url: 'https://messager.kinlon.work/confirm_completion', 
            data: {
              order_id: id
            },
            method:'POST',
            header: {
              'content-type': 'application/json', 
            },
            success (res) {
              console.log(res.data);
              if(res.data.res_code == 200){
                wx.showToast({
                  title: '确认订单成功',
                  icon: 'success',
                  duration: 2000
                })
                that.getMoreOrders()
              }else{
                wx.showToast({
                  title: '出问题了，请稍后尝试',
                  icon: 'success',
                  duration: 2000
                })
              }
            }
          })
        } else if (res.cancel) {
          console.log('点击取消了');
          return false;
        }
      }
    })
  },
  /**撤单 */
  cancel: function (e) {
    var that = this;
    console.log(e);
    let id  = e.currentTarget.dataset.id;//订单编号
    wx.showModal({
      title: '提示',
      content: '确定要撤销此订单吗？',
      success: function (res) {
        if (res.confirm) {
          console.log('点击确定了');
          //发起请求
          wx.request({
            url: 'https://messager.kinlon.work/delete_order', 
            data: {
              order_id: id
            },
            method:'POST',
            header: {
              'content-type': 'application/json', // 默认值
            },
            success (res) {
              console.log(res.data);
              if(res.data.res_code == 200){
                wx.showToast({
                  title: '撤销订单成功',
                  icon: 'success',
                  duration: 2000
                })
                that.getMoreOrders()
              }
            }
          })
        } else if (res.cancel) {
          console.log('点击取消了');
          return false;
        }
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    that.getMoreOrders()
    
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