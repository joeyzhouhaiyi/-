//index.js
//获取应用实例
var Bmob = require('../../utils/bmob.js');
var common = require('../../utils/common.js');
const app = getApp()
var Post = Bmob.Object.extend("post");
var query = new Bmob.Query(Post);
var that;
Page({
  data: {
    navBar: ['二手转让', '二手求购'],
    subNavBar: ['标签1','标签2','标签3','标签4','标签5'],
    currentTab: 0,
    subCurrentTab: 0,
    itemName: [],
    price:[],
    phoneNumber:[],
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  navBarTap: function (e) {
    this.setData({
      currentTab: e.currentTarget.dataset.idx
    })
  },

  subNavTap: function (e){
    this.setData({
      subCurrentTab: e.currentTarget.dataset.idx
    })
  },
  //发布请求
  postRequest: function(){
    wx.navigateTo({
      url: '../request/request?id=1'
    })
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
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
    //
    that = this;
    var Post = Bmob.Object.extend("post");
    var query = new Bmob.Query(Post);
    // 按照priority逆序排列
    query.descending('postId');
    // 查询所有数据
    query.find({
      success: function (results) {
        // 请求成功将数据存入article_list
        that.setData({
          article_list: results
        });
      },
      error: function (error) {
        alert("查询失败: " + error.code + " " + error.message);
      }
    });
    //
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  onPullDownRefresh: function(){
    //拉取云端数据
   
  wx.stopPullDownRefresh();
  }
})
