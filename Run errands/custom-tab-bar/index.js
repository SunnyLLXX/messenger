Component({
  data: {
    selected: 0,
    color: "#8a8a8a",
    selectedColor: "#0066ff",
    list: [{
      pagePath: "/pages/home/home",
      iconPath: "/pages/images/home-default.png",
      selectedIconPath: "/pages/images/home-active.png",
      text: "首页",
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