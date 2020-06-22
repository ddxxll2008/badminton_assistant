Page({
  /**
   * 页面初试数据
   */
  data: {
    imageSrc: '/resource/image/foot_left.png',

    //状态
    state: 0,
    stateNum: 0,
    stateTotal: 20,
    //脚印
    footFlag: 0,
    footNum: 0,
    footTotal: 3,
    //箭头方向
    arrowFlag: 0,
    arrowNum: 0,
    arrowTotal: 10,
    //是否生成新的位置
    newArrowFlag: true,
    //是否二次启动
    secondLaunch: false,
    //二次启动方向
    secondFlag: 0,
    secondNum: 0,
    secondTotal: 5,
    //图片资源数组
    imageSrcArr: {
      leftFootSrc: '/resource/image/foot_left.png',
      rightFootSrc: '/resource/image/foot_right.png',
      footSrc: '/resource/image/foot.png',
      leftArrow: '/resource/image/arrow_left.png',
      rightArrow: '/resource/image/arrow_right.png',
      leftFrontArrow: '/resource/image/arrow_left_front.png',
      rightFrontArrow: '/resource/image/arrow_right_front.png',
      leftBackArrow: '/resource/image/arrow_left_back.png',
      rightBackArrow: '/resource/image/arrow_right_back.png',
    },

    innerAudioContext: null,
    playAudioFlag: false,
    current: {
      src: '/resource/audio/audio_left.mp3'
    }
  },

  onReady: function() {
    this.interval = setInterval(this.controlState, 100)
    this.innerAudioContext = wx.createInnerAudioContext()
    this.innerAudioContext.autoplay = true
  },

  onUnload: function() {
    clearInterval(this.interval)
    this.innerAudioContext.destory()
  },

  /**
   * 控制整体流程
   * 0：准备过程
   * 1：启动步
   * 2：直接启动
   * 3：二次启动
   */
  controlState: function() {
    switch (this.data.state) {
      case 0:
        this.ready()
        this.data.stateNum++
          var total = this.data.stateTotal
        if (this.data.stateNum >= total) {
          this.data.state = 1
          this.data.stateNum = 0
        }
        break
      case 1:
        this.data.footFlag = 2
        this.ready()
        this.data.footNum++
          var total = this.data.footTotal
        if (this.data.footNum >= total) {
          this.data.footNum = 0
          this.data.footFlag = 0
          if (this.data.secondLaunch) {
            this.data.state = 3
          } else {
            this.data.state = 2
          }
        }
        break
      case 2:
        this.launch()
        this.data.arrowNum++
        var total = this.data.arrowTotal
        if (this.data.arrowNum >= total) {
          this.data.state = 0
          this.data.arrowNum = 0
          this.data.newArrowFlag = true
        }
        break
      case 3:
        this.launch()
        this.data.secondNum++
        var total = this.data.secondTotal
        if (this.data.secondNum >= total) {
          this.data.state = 2
          this.data.secondNum = 0
          this.data.newArrowFlag = true
        }
        break
    }
  },

  //准备状态
  ready: function() {
    switch (this.data.footFlag) {
      case 0:
        this.setData({
          imageSrc: '/resource/image/foot_left.png'
        });
        this.data.footFlag = 1
        break
      case 1:
        this.setData({
          imageSrc: '/resource/image/foot_right.png'
        });
        this.data.footFlag = 0
        break
      case 2:
        this.setData({
          imageSrc: '/resource/image/foot.png'
        });
        break
    }
  },

  launch: function() {
    if (this.data.newArrowFlag) {
      //随机产生新的位置
      var position = Math.floor(Math.random() * 6)
      this.data.newArrowFlag = false
      switch (position) {
        case 0:
          this.setData({
            imageSrc: '/resource/image/arrow_left_front.png'
          });
          break
        case 1:
          this.setData({
            imageSrc: '/resource/image/arrow_right_front.png'
          });
          break
        case 2:
          this.setData({
            imageSrc: '/resource/image/arrow_left.png'
          });
          break
        case 3:
          this.setData({
            imageSrc: '/resource/image/arrow_right.png'
          });
          break
        case 4:
          this.setData({
            imageSrc: '/resource/image/arrow_left_back.png'
          });
          break
        case 5:
          this.setData({
            imageSrc: '/resource/image/arrow_right_back.png'
          });
          break
      }
      if (this.data.playAudioFlag & this.data.state == 2) {
        this.playAudio(position)
      }
    }
  },

  //是否二次启动
  checkboxChange: function(e) {
    if (e.detail.value == "1") {
      this.data.secondLaunch = true
    } else {
      this.data.secondLaunch = false
    }
  },

  //是否播放声音
  switchPlayAudioChange: function(e) {
    this.data.playAudioFlag = e.detail.value
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
  }
})