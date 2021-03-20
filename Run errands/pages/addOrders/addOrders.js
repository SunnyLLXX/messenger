// pages/addOrders/addOrders.js
const Upyun = require('../../utils/upyun-wxapp-sdk')
const upyun = new Upyun({
  bucket: 'kinlon-upyun',
  operator: 'supermessager',
  getSignatureUrl: 'https://messager.kinlon.work/get_signatureUrl'
})

Page({

  /**
   * 页面的初始数据
   */
  data: {
    arrayType: ['学习辅导', '跑腿代取','其他类型'],
    index: -1,
    pickValue: '请选择服务',
    address: '',
    tel: '',
    type: '',
    name: '',
    time: null,
    minutes: '',
    money: '',
    title: '',
    describe: '',
    typeDaiqu: false,
    state:'抢单',
    //图片临时路径
    tempFilePaths: [],
    picStr:[],
    personInfo:[],
  },
  /**地址输入 */
  bindAddressInput: function(e){
    var that=this;
    that.setData({
      address: e.detail.value
    })
  },
  /**标题输入 */
  bindTitleInput: function (e) {
    var that=this;
    that.setData({
      title: e.detail.value
    })
  },
  /**手机号输入 */
  bindTelInput: function(e){
    var that = this;
    that.setData({
      tel: e.detail.value
    })
  },
  /**姓名输入 */
  bindNameInput: function(e){
    var that = this;
    that.setData({
      name: e.detail.value
    })
  },
/**订单描述输入 */
bindStateInput: function (e) {
  var that = this;
  that.setData({
    describe: e.detail.value
  })
},
  /**时间送达 */
  bindTimeInput: function(e){
    var that = this;
    that.setData({
      time: e.detail.value
    })
  },
  /**酬劳输入 */
  bindMoneyInput: function(e){
    var that = this;
    that.setData({
      money: e.detail.value
    })
  },
  /**选择跑腿类型 */
  bindPickerChange: function(e) {
    var that = this;
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value,
      pickValue: that.data.arrayType[e.detail.value],
      type: that.data.arrayType[e.detail.value]
    })
    
    if(e.detail.value == '1'){
      that.setData({
        typeDaiqu:true
      })
    }else{
      that.setData({
        typeDaiqu:false
      })
    }
  },

  /**提交订单 */
  addClick:function(){
    var that=this;
    if(that.data.title == '' || that.data.money == '' || that.data.date == '' || that.data.type == ''){
      wx.showToast({
        title: '必填项未填',
        icon: 'none',
        duration: 2000
      })
    }else{
        /** * 上传完成后把文件上传到服务器*/
          //上传文件
          console.log(that.data.tempFilePaths)
          if(that.data.tempFilePaths.length != 0){
            let picArr = []
            that.data.tempFilePaths.forEach((item,index)=>{
                var imageSrc = item;
                var filename = imageSrc.substr(imageSrc.lastIndexOf('.') - 44,imageSrc.lastIndexOf('.'));
                console.log("上传文件时的图片地址")
                console.log(imageSrc)
                console.log(filename)
                upyun.upload({
                  localPath: imageSrc,
                  remotePath: '/wx_img/'+wx.getStorageSync('openid')+"/"+filename,
                  success: function (res) {
                    console.log("又拍云图片上传成功")
                    console.log(res);
                    console.log("又拍云提交图片地址:");
                    console.log(imageSrc);
                    let str="https://cdn.kinlon.work/wx_img/"+wx.getStorageSync('openid')+"/"+filename
                    picArr.push(str)
                    that.setData({
                      picStr: picArr
                    })
                    console.log("拼接后的图片字符串")
                    console.log(that.data.picStr)
                    console.log(that.data.picStr.length)
                    if(that.data.picStr.length == that.data.tempFilePaths.length){
                      that.submitOrder()
                    }
                  },
                  fail: function (res) {
                    wx.hideToast();
                    wx.showModal({
                      title: '错误提示',
                      content: '上传图片失败',
                      showCancel: false,
                      success: function (res) { }
                    })
                  }
                })  
            })
          }else{
             //提交订单
             that.submitOrder()
          }
          
    }
    
  },
  /**图片选择 */
  ChooseImage() {
    wx.chooseImage({
      count: 4, 
      sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album','camera'], //从相册选择
      success: (res) => {
        if (this.data.tempFilePaths.length != 0) {
          this.setData({
            tempFilePaths: this.data.tempFilePaths.concat(res.tempFilePaths)
          })
        } else {
          this.setData({
            tempFilePaths: res.tempFilePaths
          })
        }
      }
    });
  },
  /**图片的预览 */
  ViewImage(e) {
    wx.previewImage({
      urls: this.data.tempFilePaths,
      current: e.currentTarget.dataset.url
    });
  },
  /**图片删除 */
  DelImg(e) {
    wx.showModal({
      title: '提示',
      content: '确定要删除这张图片吗？',
      cancelText: '再看看',
      confirmText: '再见',
      success: res => {
        if (res.confirm) {
          this.data.tempFilePaths.splice(e.currentTarget.dataset.index, 1);
          this.setData({
            tempFilePaths: this.data.tempFilePaths
          })
        }
      }
    })
  },

  /**订单提交 */
  submitOrder:function(){
    let that = this
    console.log('订单提交图片地址：'+that.data.picStr.join(';'))
    wx.request({
      url: 'https://messager.kinlon.work/add_order', 
      data: {
        openid: wx.getStorageSync('openid'),
        real_name: that.data.name,
        type: that.data.type,
        address:that.data.address,
        add_minutes: that.data.time,
        describes: that.data.describe,
        describes_img:that.data.picStr.join(';'),
        real_phone: that.data.tel,
        money:that.data.money,
        title:that.data.title,
        state:that.data.state
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      method: 'POST',
      success (res) {
        console.log('订单提交成功:'+res.data)
        if(res.data.res_code == '200'){
            wx.showToast({
            title: '添加订单成功',
            icon: 'success',
            duration: 2000,
            success: function(){
                wx.switchTab({
                  url: '/pages/home/home',
                })
            }
          })
          
        }else{
          wx.showToast({
            title: '添加订单失败',
            icon: 'none',
            duration: 2000
          })
        }
      },
      fail (res) {
        wx.showToast({
          title: '添加订单失败',
          icon: 'none',
          duration: 2000
        })
      }
    })
  },

/**订阅消息下发 */
messageSubscription:function(){
  // 订阅消息
  var that = this;
  //获取下发权限
  wx.requestSubscribeMessage({
  tmplIds: ['JlVai90fsBIYoIUEqQ1iLRjOnggB8C5jFO1-5V7ghPE'],  // 模板ID
  success (res) {
      if(res1['JlVai90fsBIYoIUEqQ1iLRjOnggB8C5jFO1-5V7ghPE'] == "accept"){
          console.log('消息订阅成功');
          // 调用后端订阅消息接口   
          //that.acceptMessage(); 
      }else {
      console.log('拒绝推送订阅消息');
      wx.showModal({
          title: '温馨提示',
          content: '请允许我们向您发送订阅消息，请打开设置勾选订阅消息，这样能够随时接收到提醒',
          showCancel: false,
          success (res) {
              console.log(res);
              wx.openSetting({
                  withSubscriptions: true,
                  success(res) {
                  console.log(res);
                      // 调用后端订阅消息接口
                      //that.acceptMessage();     
                  }
              })
          }
      })
      
      }
  },
  fail (res) {
      console.log(res);
  },
  complete (res) {
      console.log(res);
  }
  })
},

/**消息订阅推送 */
acceptMessage:function(){
  var that = this
  wx.request({
    url: 'https:xxxxxx',
    data:{

    },
    method: 'POST', 
    header: {
    'content-type': 'application/json'
    },
    success (res) {
        console.log('调用后端返回的订阅消息结果');
        console.log(res.data)
        wx.showToast({
            title: '订阅成功',
            icon: 'success',
            duration: 3000
        })
    },
    fail(res){
        console.log('调用后端接口失败')
        console.log(res)
        wx.showToast({
            title: '订阅失败',
            duration: 3000
        })   
    }
})
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
          personInfo:res.data.data,
          name:res.data.data.name,
          tel:res.data.data.phone
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
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
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

  }
})