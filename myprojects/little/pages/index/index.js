//index.js
//获取应用实例
const app = getApp()
import {getMusicList} from '../../utils/net';
Page({
  data: {
    list:[],
    allList:[],
    num:1
  },
  onShow:function() {
    wx.showLoading({
      title:'加载中'
    })
		getMusicList().then(res=>{
			this.setData({
        allList:res,
        list:res.slice(0,10)
			},()=>{
        wx.hideLoading();
      })
		})
  },
  onReachBottom(){
    this.setData({
      num:this.data.num++,
      list:this.data.allList.slice(0,this.data.num*10)
    })
  },
  onPullDownRefresh(){
    wx.showLoading({
      title:'加载中'
    });
    setTimeout(function(){
      wx.hideLoading()
    },2000)
  },
  DClick(e){
      let index = e.currentTarget.dataset.index;
      wx.setStorageSync('list',this.data.allList)
      wx.navigateTo({
        url:'../detail/detail?index='+index
      })
  }
})
