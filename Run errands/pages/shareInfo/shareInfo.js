// pages/shareInfo/shareInfo.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    arrayType: ['兼职信息', '租房信息','其他类型'],
    index: -1,
    pickValue: '请选择通告类型',
    tel: '',
    type: '',
    name: '',
    title: '',
    describe: '',
    picStr:'',
    personInfo:[],
    //图片数组
    tempFilePaths:[]
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
/**通告描述输入 */
bindStateInput: function (e) {
  var that = this;
  that.setData({
    describe: e.detail.value
  })
},
/**选择通告类型 */
bindPickerChange: function(e) {
  var that = this;
  console.log('picker发送选择改变，携带值为', e.detail.value)
  this.setData({
    index: e.detail.value,
    pickValue: that.data.arrayType[e.detail.value],
    type: that.data.arrayType[e.detail.value]
  })
},
/**图片选择 */
ChooseImage() {
  wx.chooseImage({
    count: 3, //默认9
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
    var that =this;
    that.getPersonInfo()
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