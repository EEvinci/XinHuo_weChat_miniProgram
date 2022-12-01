Component({
    /**
     * 组件的属性列表
     */
    properties: {
      target: Number, // 结束时间
      callback: String, // 回调
      clearTimer: Boolean // 清除定时器
    },
  
    /**
     * 组件的初始数据
     */
    data: {
      time: ''
    },
    ready() {
      this.getFinalTime();
    },
  
    /**
     * 组件的方法列表
     */
    methods: {
      init() {
        const self = this;
        setTimeout(() => {
          self.getFinalTime.call(self);
        }, 1000);
      },
      getFinalTime() {
        const data = this.data;
        const gapTime = Math.ceil((data.target - new Date().getTime())/1000); // 距离结束时间
        let time = '00:00:00';
        if(gapTime > 0) {
          let lastTime = gapTime % 86400;
          const hour = this.formatNum(parseInt(lastTime/3600));
          lastTime = lastTime % 3600;
          const minute = this.formatNum(parseInt(lastTime/60));
          const second = this.formatNum(lastTime% 60);
          time = `${hour}:${minute}:${second}`;
          if(!data.clearTimer) this.init.call(this);
        }else {
          this.endFn();
        }
        this.setData({
          time: time
        });
      },
      formatNum(num) {
        return num > 9 ? num : `0${num}`;
      },
      endFn() {
        this.triggerEvent('callback',{});
      }
    }
  })
  