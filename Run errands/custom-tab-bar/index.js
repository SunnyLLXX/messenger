Component({
  data: {
    selected: 0,
    color: "#8a8a8a",
    selectedColor: "#FFA500",
    list: [{
      pagePath: "/pages/pickup/pickup",
      iconPath: "/pages/images/zhangdan-default.png",
      selectedIconPath: "/pages/images/zhangdan-active.png",
      text: "抢单",
      isSpecial: false
    }, {
      pagePath: "/pages/addOrders/addOrders",
      iconPath: "/pages/images/release-default.png",
      selectedIconPath: "/pages/images/release-default.png",
      text: "发布",
      isSpecial: true
    }, {
      pagePath: "/pages/message/message",
      iconPath: "/pages/images/reminds-default.png",
      selectedIconPath: "/pages/images/reminds-active.png",
      text: "消息",
      isSpecial: false
    }, {
      pagePath: "/pages/personalCenter/personalCenter",
      iconPath: "/pages/images/me-default.png",
      selectedIconPath: "/pages/images/me-active.png",
      text: "我的",
      isSpecial: false
    }
  ]
  },
  attached() {
  },
  methods: {
    switchTab(e) {
      const data = e.currentTarget.dataset
      const url = data.path
      const idx = e.currentTarget.dataset.index
      if (this.data.list[idx].isSpecial) {
        wx.navigateTo({ url })
      }
      else {
        wx.switchTab({ url })
      }
    }
  }
})