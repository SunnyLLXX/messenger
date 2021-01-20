// components/tab/tab.js
const app = getApp();//用于获取全局数据
Component({
  /**
   * 组件的属性列表
   */
  properties: {
  tabs:{
    type:Array,
    value:[]
  }

  },

  /**
   * 组件的初始数据
   */
  data: {
    CustomBar: app.globalData.CustomBar,//用于计算组件距离顶部的距离
   

  },


  /**
   * 组件的方法列表
   */
  methods: {
    handleItemTap(e)
    {
     
      const index=e.currentTarget.dataset.index;
      this.triggerEvent("itemChange",{index})
      
    }

  }
})
