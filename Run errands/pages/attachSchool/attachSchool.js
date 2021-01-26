// pages/attachSchool/attachSchool.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // arrayType: ['男','女'],
    // index: -1,
    // pickValue: '请选择性别',
    name:'',
    school:'',
    sex:'',
    phone:'',
  },
/**选择性别类型 */
bindPickerChange: function(e) {
  var that = this;
  console.log('picker发送选择改变，携带值为', e.detail.value)
  this.setData({
    index: e.detail.value,
    pickValue: that.data.arrayType[e.detail.value]
  })
},

/**姓名输入 */
bindNameInput:function(e){
  var that=this;
  that.setData({
    name:e.detail.value
  })
},

/**性别输入 */
bindSexInput:function(e){
  var that=this;
  that.setData({
    sex:e.detail.value
  })
},

/**手机号输入 */
bindPhoneInput:function(e){
  var that=this;
  that.setData({
    phone:e.detail.value
  })
},

/**学号输入 */
bindSchoolInput:function(e){
  var that=this;
  that.setData({
    school:e.detail.value
  })
},

/**信息绑定 */
submitInfo:function(){
  var that=this;
  if(that.data.name == '' || that.data.school == '' || that.data.phone == '' || that.data.sex == ''){
    wx.showToast({
      title: '均为必填项，请继续填写',
      icon: 'none',
      duration: 2000
    })
  }else{
    var reg = /^1[3456789]\d{9}$/
    if(!reg.test(that.data.phone)){
      wx.showToast({
        title: '手机格式不对,请重新填写',
        icon: 'none',
        duration: 2000
      })
    }else{
        wx.request({
        url: 'https://messager.kinlon.work/add_user',
        data: {
          openid:wx.getStorageSync('openid'),
          name:that.data.name,
          sex:that.data.sex,
          college:that.data.school,
          phone:that.data.phone
        },
        method: 'POST',
        header: {
          'content-type': 'application/json' // 默认值
        },
        success: function(res){
          console.log(res.data)
          if(res.data.res_code == '200'){  
            wx.reLaunch({
              url: '/pages/pickup/pickup'
            })
            wx.showToast({
              title: '信息绑定成功',
              icon: 'success',
              duration: 2000
            })
          }else{
            wx.showToast({
              title: '信息绑定失败',
              icon: 'none',
              duration: 2000
            })
          }
          
        },
        fail:function(res){
          console.log(res.data)
          wx.showToast({
            title: '信息绑定失败',
            icon: 'none',
            duration: 2000
          })
        }
      })
    }
    
  }
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