// pages/playground/playground.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //圆半径
    radius: 30,
    //步伐位置
    position: 0,
    lastPosition: -1,
    //原点透明度
    alpha: 11,
    //间隔时间
    durationTime: 300,
    //显示的时间间隔
    timeShow: 3 + 's',

    typeArray: ['固定', '随机'],

    typeIndex: 0,

    current: {
      src: '/resource/audio/audio_left.mp3'
    },

    playAudioFlag: false,
    innerAudioContext: null
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
    this.drawBall()
    this.interval = setInterval(this.drawBall, this.data.durationTime)
    this.innerAudioContext = wx.createInnerAudioContext()
    this.innerAudioContext.autoplay = true
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
    clearInterval(this.interval)
    this.innerAudioContext.destroy()
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

  drawBall: function() {

    var context = wx.createContext()
    var d = this.data.alpha * 0.1
    var r = this.data.radius

    function ball(x, y) {
      context.beginPath(0)
      context.arc(x, y, r, 0, Math.PI * 2)
      context.setFillStyle('rgba(230,67,64,' + d + ')')
      context.setStrokeStyle('rgba(1,1,1,0)')
      context.fill()
      context.stroke()
    }

    //透明度递增
    this.data.alpha -= 1
    if (this.data.alpha < 0) {
      this.data.alpha = 10

      //判断训练类型
      if (this.data.typeIndex == 0) {
        this.data.position += 1
        if (this.data.position >= 6) {
          this.data.position = 0
        }
      } else {
        //随机产生新的位置
        this.data.position = Math.floor(Math.random() * 6)
        if (this.data.lastPosition == this.data.position) {
          this.data.position += 1
          if (this.data.position >= 6) {
            this.data.position = 0
          }
        }
        console.log(this.data.position + '  ' + this.data.lastPosition)
        this.data.lastPosition = this.data.position
      }
    }

    //根据位置绘制圆点
    switch (this.data.position) {
      case 0:
        ball(60, 60)
        break;
      case 1:
        ball(245, 60)
        break;
      case 2:
        ball(60, 170)
        break;
      case 3:
        ball(245, 170)
        break;
      case 4:
        ball(60, 275)
        break;
      case 5:
        ball(245, 275)
        break;
    }

    if (this.data.playAudioFlag && this.data.alpha == 10) {
      this.playAudio(this.data.position)
    }

    wx.drawCanvas({
      canvasId: 'canvas',
      actions: context.getActions()
    })
  },

  //根据位置播放音频
  playAudio: function(position) {
    switch (position) {
      case 0:
        this.data.current.src = 'resource/audio/audio_left_front.mp3'
        break;
      case 1:
        this.data.current.src = 'resource/audio/audio_right_front.mp3'
        break;
      case 2:
        this.data.current.src = 'resource/audio/audio_left.mp3'
        break;
      case 3:
        this.data.current.src = 'resource/audio/audio_right.mp3'
        break;
      case 4:
        this.data.current.src = 'resource/audio/audio_left_back.mp3'
        break;
      case 5:
        this.data.current.src = 'resource/audio/audio_right_back.mp3'
        break;
    }
    this.innerAudioContext.src = this.data.current.src
  },

  //是否播放声音
  switchPlayAudioChange: function(e) {
    this.data.playAudioFlag = e.detail.value
  },

  durationChange: function(e) {
    console.log('slide发生change事件，携带值为', e.detail.value)
    this.setData({
      durationTime: e.detail.value,
    })
    clearInterval(this.interval)
    this.interval = setInterval(this.drawBall, this.data.durationTime)
  },

  timeShowChange: function(e) {
    console.log('slide发生changing事件，携带值为', e.detail.value)
    this.setData({
      timeShow: e.detail.value / 100 + 's'
    })
  },

  typePickerChange: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      typeIndex: e.detail.value
    })
  }
})