const app = getApp();
var inputVal = '';
var msgList = [];
var windowWidth = wx.getSystemInfoSync().windowWidth;
var windowHeight = wx.getSystemInfoSync().windowHeight;
var keyHeight = 0;

/**
 * 初始化数据
 */
function initData(that) {
  inputVal = '';
  
  msgList = [{
    NicName: "server",
      msg: '你好啊！',
      avatar:"../images/avatar.png"
    },

  ]
  that.setData({
    msgList,
    inputVal
  })
}

 
Page({

  /**
   * 页面的初始数据
   */
  data: {
    AvatarAddress:'../images/avatar.png',
    userInfo: {},
    scrollHeight: '100vh',
    inputBottom: 0,
    msg: '',
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    wx.getStorage({
      key: 'TheAvatarAddress',
      success(res){
        that.setData({
          AvatarAddress:res.data
        })
      }
    })
    console.log(app)
    initData(this)
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  /**消息发送 */
  sendInfo: function(e){
    var that = this;
    console.log('点击发送按钮')
    msgList.push({
      NicName: 'customer',
      msg: that.data.msg,
      avatar:app.globalData.userInfo.avatarUrl,
    });
    inputVal = '';
    this.setData({
      msgList:msgList,
      inputVal
    });
    wx.request({
      url: 'https://messager.kinlon.work/robot_chat',
      data:{//向服务器发请求携带的参数
        question: that.data.msg
      },
      header:{
        'content-type':'application/json'
      },
      method:'POST',
    success:function(res){//请求成功的回调函数
        console.log('服务器返回数据'+res.data)
        let msgList = that.data.msgList;
        let reply = {
          NicName: "server",
          msg: res.data.data.answer,
          avatar:"../images/avatar.jpg"
        }
        msgList.push(reply)
        // 修改数据
        that.setData({
          msgList: msgList
        })
      },
      fail:function(err){//请求成功的回调函数
        console.log(err)
      }
    })
  },
  bindKeyInput: function (e) {
    console.log(e.detail.value);
    this.setData({
      msg: e.detail.value
    })
  },
  onClickdiaCenterView:function(){
    this.setData({
      showCenterDialog: !this.data.showCenterDialog
    });
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    var that = this;
    let msgList = that.data.msgList;
    var msg_send;
    var msg_reply;
    wx.getStorage({
      key: 'message_send',
      success(res){
        msg_send = res.data;
        wx.getStorage({
          key: 'message_reply',
          success(res2){
            msg_reply = res2.data;
            msgList.push({
              NicName: 'customer',
              msg: msg_send,
              avatar:app.globalData.userInfo.avatarUrl,
            });
            inputVal = '';
            setTimeout(function(){
              that.setData({
                msgList:msgList,
                inputVal
              });
            }, 500);
            setTimeout(function(){
              let reply = {
                NicName: "server",
                msg: msg_reply,
                avatar:"../images/avatar.png"
              }
              msgList.push(reply)
              // 修改数据
              that.setData({
                msgList: msgList
              })
            }, 1500);
            wx.removeStorage({
              key: 'message_send',
            });
            wx.removeStorage({
              key: 'message_reply',
            });
          }
        })
      }
    })
  },
  
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 获取聚焦
   */
  focus: function(e) {
    keyHeight = e.detail.height;
    this.setData({
      scrollHeight: (windowHeight - keyHeight) + 'px'
    });
    this.setData({
      toView: 'msg-' + (msgList.length - 1),
      inputBottom: keyHeight + 'px'
    })
    //计算msg高度
    // calScrollHeight(this, keyHeight);

  },

  //失去聚焦(软键盘消失)
  blur: function(e) {
    this.setData({
      scrollHeight: '100vh',
      inputBottom: 0
    })
    this.setData({
      toView: 'msg-' + (msgList.length - 1)
    })

  },

  /**
   * 发送点击监听
   */
  sendClick: function(e) {
    var that = this;
    console.log('键盘发送：'+e)
    msgList.push({
      NicName: 'customer',
      msg: e.detail.value,
      avatar:app.globalData.userInfo.avatarUrl,
    });
    inputVal = '';
    this.setData({
      msgList:msgList,
      inputVal
    });
    wx.request({
      url: 'https://messager.kinlon.work/robot_chat',
      data:{
        question: e.detail.value
      },
      header:{
        'content-type':'application/json'
      },
      method:'POST',//请求的方法,方法值要大写
    success:function(res){
        console.log(res.data)
        let msgList = that.data.msgList;
        let reply = {
          NicName: "server",
          msg: res.data.data.answer,
          avatar:"../images/avatar.jpg"
        }
        msgList.push(reply)
        // 修改数据
        that.setData({
          msgList: msgList
        })
      },
      fail:function(err){//请求成功的回调函数
        console.log(err)
      }
    })
   },
  /**
   * 退回上一页
   */
  toBackClick: function() {
    wx.navigateBack({})
  }

 })
  
//index.js