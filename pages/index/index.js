// pages/index/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    flashAnimation: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    var animation = wx.createAnimation({
      duration: 1500
    })
    animation.opacity(1).step()
    this.setData({
      flashAnimation: animation
    })
    // setTimeout(function () {
    //   // 关闭当前页面，跳转到应用内的某个页面
    //   wx.redirectTo({
    //     url: '/pages/playground/playground'
    //   })
    // }, 3000)
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

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
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },

  /**
   * 页面跳转
   */
  onGotoPage: function(e) {
    console.log(e.target.id)
    switch (e.target.id) {
      case "launch":
        wx.navigateTo({
          url: '/pages/launch/launch'
        })
        break
      case "playground":
        wx.navigateTo({
        url: '/pages/playground/playground'
      })
        break
    }
  }
})