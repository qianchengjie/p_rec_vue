<template>
  <div ref="top_sliderbar" class="top-sliderbar">
    <div class="header">
      <ul
      v-show="loadFinsih"
      :style="
      'width: ' + headerListStyle.width + 'px;' +
      'transform: translateX(' + headerListStyle.translateX + 'px);'
      "
      ref="header_list"
      class="header-list">
        <li
        v-for="(item, index) of list"
        @click="change(index, true)"
        :class="index === active ? 'active' : ''">
          {{item}}
        </li>
      </ul>
      <!-- 'transform: translateX(' + headerListStyle.translateX + 'px);' +  -->
      <div
      :style="
      'left: ' + sliderStyle.left + 'px;' +
      'width: ' + sliderStyle.width + 'px'"
      class="header-list_slider"></div>
    </div>
    <div
    ref="content"
    :style="
    (touch.isStart ? '' : 'transition: transform .2s;') +
    'height: ' + contentStyle.height + 'px;' + 
    'width: ' + contentStyle.width + 'px;' + 
    'transform:  translateZ(0) translateX(' + contentStyle.translateX + 'px)'"
    class="content">
      <slot name="default"></slot>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        loadFinsih: true,
        headerListStyle: {
          width: 0,
          translateX: 0
        },
        bodyWidth: 0,
        sliderStyle: {
          width: 0,
          left: 0
        },
        contentStyle: {
          width: 0,
          height: 0,
          translateX: 0
        },
        touch: {
          disX: 5,
          disY: 5,
          startX: 0,
          endX: 0,
          startY: 0,
          endY: 0,
          startTime: 0,
          isStart: true,
          isScrollX: false,
          isScrollY: false
        },
        listWidth: []
      }
    },
    model: {
      prop: 'value',
      event: 'change'
    },
    props: {
      value: Number,
      list: {
        type: Array,
        default: () => {
          return ['标题1', '标题2标题2', '标题3', '标题4', '标5', '标题6标题6标题6', '标题7标题7']
        }
      },
      // 触发百分比距离
      enablePercent: {
        type: Number,
        default: 0.6
      },
      // 触发时间和触发百分比距离
      enableTime: {
        type: Number,
        default: 300
      },
      enablePercent1: {
        type: Number,
        default: 0.1
      },
      moveEnable: {
        type: Boolean,
        default: true
      }
    },
    computed: {
      active: {
        set (val) {
          this.$emit('change', val)
        },
        get () {
          return this.value
        }
      }
    },
    mounted () {
      this.initUi()
    },
    methods: {
      initUi () {
        this.bodyWidth = document.body.clientWidth
        this.setContentStyle()
        this.setHeaderStyle()
        this.setTouchListener()
        window.onresize = () => {
          this.bodyWidth = document.body.clientWidth
          this.setHeaderStyle()
          this.setContentStyle()
        }
      },
      headerAnim () {
        // header渐变
        let percent = Math.abs((this.contentStyle.translateX + this.bodyWidth * this.active)) / this.bodyWidth % 1
        if (this.contentStyle.translateX < -this.bodyWidth * this.active) {
          this.startAnim(1, percent)
        } else {
          this.startAnim(-1, percent)
        }
      },
      startAnim (num, percent) {
        let childOffsetLeft1 = this.$refs.header_list.children[this.active].offsetLeft
        let childOffsetLeft2 = this.$refs.header_list.children[this.active + num].offsetLeft
        this.sliderStyle.width = (this.listWidth[this.active] * (1 - percent) + this.listWidth[this.active + num] * percent)
        this.sliderStyle.left = childOffsetLeft1 + percent * (childOffsetLeft2 - childOffsetLeft1) + this.headerListStyle.translateX
      },
      setTouchListener () {
        let content = this.$refs.content
        content.ontouchmove = (e) => {
          if (this.moveEnable) {
            if ((event.targetTouches.length > 1 || event.scale) && event.scale !== 1) return
            let touch = event.targetTouches[0]
            this.touch.endX = touch.pageX
            this.touch.endY = touch.pageY
            // 到达一定值开始滑动
            if ((Math.abs(this.touch.endY - this.touch.startY) > this.touch.disY && !this.touch.isScrollX) || (this.touch.isStart && this.touch.isScrollY)) {
              // console.log('y' + Math.abs(this.touch.endY - this.touch.startY))
              this.touch.isScrollY = true
            } else if ((Math.abs(this.touch.endX - this.touch.startX) > this.touch.disX && !this.touch.isScrollY) || (this.touch.isStart && this.touch.isScrollX)) {
              // console.log('x' + (Math.abs(this.touch.endX - this.touch.startX)))
              this.contentStyle.translateX = -this.bodyWidth * this.active + this.touch.endX - this.touch.startX
              if (this.contentStyle.translateX < 0 && this.contentStyle.translateX > -this.contentStyle.width + this.bodyWidth) {
                this.headerAnim()
              }
              this.touch.isScrollX = true
              e.preventDefault()
            }
          }
        }

        content.ontouchstart = () => {
          if (this.moveEnable) {
            this.touch.isStart = true
            if ((event.targetTouches.length > 1 || event.scale) && event.scale !== 1) return
            let touch = event.targetTouches[0]
            this.touch.startX = touch.pageX
            this.touch.startY = touch.pageY
            this.touch.startTime = new Date()
          }
        }

        content.ontouchend = () => {
          this.touch.isScrollX = false
          this.touch.isScrollY = false
          this.touch.startX = 0
          this.touch.startY = 0
          this.touch.endX = 0
          this.touch.endY = 0
          if (this.moveEnable) {
            this.touch.isStart = false
            let percent = Math.abs((this.contentStyle.translateX + this.bodyWidth * this.active)) / this.bodyWidth % 1
            // 判断是否为第一个或最后一个
            if (this.contentStyle.translateX > 0) {
              this.contentStyle.translateX = 0
            } else if (this.contentStyle.translateX < -this.contentStyle.width + this.bodyWidth) {
              this.contentStyle.translateX = -this.contentStyle.width + this.bodyWidth
            } else if (percent > this.enablePercent) {
              if (this.contentStyle.translateX < -this.bodyWidth * this.active) {
                this.change(++this.active)
              } else {
                this.change(--this.active)
              }
            } else {
              if (new Date() - this.touch.startTime < this.enableTime && percent > this.enablePercent1) {
                if (this.contentStyle.translateX < -this.bodyWidth * this.active) {
                  this.change(++this.active)
                } else {
                  this.change(--this.active)
                }
              } else {
                this.change(this.active)
              }
            }
          }
        }
      },
      setHeaderStyle () {
        let headerListWidth = 0
        let listWidth = []
        for (let item of this.$refs.header_list.children) {
          headerListWidth += item.offsetWidth
          listWidth.push(item.offsetWidth)
        }
        this.listWidth = listWidth
        this.headerListStyle.width = headerListWidth + 2
        this.setSliderWidth(0)
      },
      setContentStyle () {
        this.contentStyle.height = this.$refs.top_sliderbar.offsetHeight - 40
        this.contentStyle.width = this.list.length * this.bodyWidth
      },
      setSliderWidth (index) {
        this.sliderStyle.width = this.listWidth[index]
      },
      change (index, isTabClick) {
        this.active = index
        if (isTabClick) {
          this.touch.isStart = true
        } else {
          this.touch.isStart = false
        }
        let parent = this.$refs.header_list.parentNode
        let child = this.$refs.header_list.children[index]
        let childWidth = child.offsetWidth
        let childOffsetLeft = child.offsetLeft
        let parentWidth = parent.offsetWidth
        this.active = index
        if ((parentWidth - childWidth) / 2 <= childOffsetLeft && childOffsetLeft + (parentWidth + childWidth) / 2 <= this.headerListStyle.width) {
          this.headerListStyle.translateX = -childOffsetLeft + (parentWidth - childWidth) / 2
        } else if ((parentWidth - childWidth) / 2 > childOffsetLeft) {
          this.headerListStyle.translateX = 0
        } else {
          this.headerListStyle.translateX = -this.headerListStyle.width + parentWidth
        }

        this.sliderStyle.left = childOffsetLeft + this.headerListStyle.translateX

        this.contentStyle.translateX = -this.bodyWidth * index

        this.setSliderWidth(index)
      }
    },
    watch: {
      list (val, oldVal) {
        this.$nextTick(_ => {
          this.setHeaderStyle()
          this.setContentStyle()
        })
      }
    }
  }
</script>

<style scoped>
.top-sliderbar {
  height: 100%;
}
.header {
  /*color: #FFF;*/
  height: 40px;
  position: relative;
  background-color: #0099FF;
}
.header-list {
  height: 100%;
  overflow: hidden;
  white-space: nowrap;
  transition: all .2s;
}
.header-list li {
  color: #FFF;
  float: left;
  padding: 0 5px;
  height: 100%;
  display: -webkit-flex;
  align-items: center;
  justify-content: center;
}
.header-list li.active {
  color: rgb(0, 255, 255);
}
.header-list_slider {
  background-color: #00FFFF;
  height: 2px;
  position: absolute;
  width: 100px;
  bottom: 0;
  box-sizing: border-box;
  border-right: 8px solid #0099FF;
  border-left: 8px solid #0099FF;
  transition: all .2s;
}
.content {
  box-sizing: border-box;
  position: relative;
  overflow: hidden;
}
.content > div > div {
  width: 100vw;
  height: 100%;
  float: left;
  overflow-x: hidden;
  overflow-y: scroll;
}
</style>