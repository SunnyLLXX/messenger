// pages/addOrders/addOrders.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    arrayType: ['外卖代取', '学习问题', '跑腿代取','其他类型'],
    index: -1,
    pickValue: '请选择服务',
    address: '',
    tel: '',
    name: '',
    time: '请选择预计完成时间',
    minutes: '',
    money: '',
    title: '',
    describe: '',
    Takeaway: '预计完成时间',
    typeDaiqu: false,
    state:'抢单',
    //图片临时路径
    tempFilePaths: [],
  },
  /**地址输入 */
  bindAddressInput: function(e){
    var that=this;
    that.setData({
      address: e.detail.value
    })
  },
  /**标题输入 */
  bindTitleInput: function () {
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
bindStateInput: function () {
  var that = this;
  that.setData({
    describe: e.detail.value
  })
},
  /**时间送达 */
  // bindDateInput: function(e){
  //   var that = this;
  //   that.setData({
  //     date: e.detail.value
  //   })
  // },
  bindTimeChange: function(e) {
    var that = this;
    console.log('picker发送选择改变，携带值为', e.detail.value)
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
      pickValue: that.data.arrayType[e.detail.value]
    })
    if(e.detail.value == '0' || e.detail.value == '2'){
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
    if(that.data.title == '' || that.data.money == '' || that.data.date == ''){
      wx.showToast({
        title: '标题或时间或酬劳未填',
        icon: 'none',
        duration: 2000
      })
    }else{
      wx.request({
      url: 'https://messager.kinlon.work/add_order', 
      data: {
        openid: wx.getStorageSync('openid'),
        real_name: '',
        type: that.data.type,
        address:that.data.address,
        add_minutes: '',
        describes: that.data.describe,
        describes_img:'',
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
        console.log(res.data)
        wx.showToast({
          title: '添加订单成功',
          icon: 'success',
          duration: 2000
        })
      },
      fail (res) {
        wx.showToast({
          title: '添加订单失败',
          icon: 'none',
          duration: 2000
        })
      }
    })
    }
    
  },

  /**图片上传 */
  upload: function () {
    let that = this;
    wx.chooseImage({
      count: 9, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function(res) {
        wx.showToast({
          title: '正在上传...',
          icon: 'loading',
          mask: true,
          duration: 1000
        })  
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        let tempFilePaths = res.tempFilePaths;

        that.setData({
          tempFilePaths: tempFilePaths
        })
        /**
         * 上传完成后把文件上传到服务器
         */
        var count = 0;
        for (var i = 0, h = tempFilePaths.length; i < h; i++) {
          //上传文件
          wx.uploadFile({
            url: HOST + '地址路径',
            filePath: tempFilePaths[i],
            name: 'uploadfile_ant',
            header: {
              "Content-Type": "multipart/form-data"
            },
            success: function (res) {
              count++;
              //如果是最后一张,则隐藏等待中  
              if (count == tempFilePaths.length) {
                wx.hideToast();
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
          });
        }  
        
      }
    })
  },

  /**预览图片 */
  listenerButtonPreviewImage: function (e) {
    let index = e.target.dataset.index;//预览图片的编号
    let that = this;
    wx.previewImage({
      current: that.data.tempFilePaths[index],//预览图片链接
      urls: that.data.tempFilePaths,//图片预览list列表
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
    if (typeof this.getTabBar === 'function' &&
    this.getTabBar()) {
    this.getTabBar().setData({
      selected: 2
    })
  }
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