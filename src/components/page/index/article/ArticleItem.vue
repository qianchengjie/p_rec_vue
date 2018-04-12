<template>
  <div class="panel"
    style="height: 100%">
    <scroller
    style="height: 100%"
    :value="{ pulldownStatus: '哈哈哈' }" 
    lock-x
    @on-pulldown-loading="load"
    ref="scroller"
    :use-pulldown="true" 
    :pulldown-config="downobj">
      <div style="height: 100%; background-color:#FFF">
        <div
        v-for="item of list"
        @click="$emit('on-item-click', item)"
        class="panel-box">
          <div class="panel-box__bd">
            <h4 class="panel-box__title">{{item.title}}</h4>
            <div class="panel-box__info">
              {{ item.author }} 
              {{ item.plNum ? item.plNum + '评论' : '' }}
              {{ item.time | dateStr }} 
              <span @click="dislike($event, item)" class="panel-box__dislike">&times;</span>
            </div>
          </div>
          <div v-if="typeof item.images !== 'undefined'" class="panel-box__hd">
            <img :src="item.images[0]" alt="" class="panel-box__thumb">
          </div>
        </div>
      </div>
    </scroller>
  </div>
</template>

<script>
  import { Scroller } from 'vux'
  export default {
    components: {
      Scroller
    },
    data () {
      return {
        downobj: {
          downContent: '下拉刷新',
          height: 40,
          autoRefresh: false,
          upContent: '施放立即刷新',
          loadingContent: '加载中...'
        }
      }
    },
    props: {
      list: Array
    },
    methods: {
      dislike (event, item) {
        this.$emit('on-dislike-click', item)
        event.stopPropagation()
      },
      load () {
        setTimeout(() => {
          this.$nextTick(_ => {
            this.$refs.scroller.donePulldown()
          })
        }, 1000)
      }
    },
    filters: {
      dateStr (dateTimeStamp) {
        let now = new Date().getTime()
        let diffValue = now - dateTimeStamp
        if (diffValue < 0) {
          return
        }
        let datetime = new Date()
        datetime.setTime(dateTimeStamp)
        // let Nyear = datetime.getFullYear()
        let Nmonth = datetime.getMonth() + 1 < 10 ? '0' + (datetime.getMonth() + 1) : datetime.getMonth() + 1
        let Ndate = datetime.getDate() < 10 ? '0' + datetime.getDate() : datetime.getDate()
        let Nhour = datetime.getHours() < 10 ? '0' + datetime.getHours() : datetime.getHours()
        let Nminute = datetime.getMinutes() < 10 ? '0' + datetime.getMinutes() : datetime.getMinutes()
        return Nmonth + '-' + Ndate + ' ' + Nhour + ':' + Nminute
      }
    }
  }
</script>

<style scoped lang="less">
  .panel {
    background-color: #FFFFFF;
    position: relative;
    overflow: hidden;
    .panel-box {
      padding: 15px;
      position: relative;
      display: -webkit-box;
      display: -ms-flexbox;
      display: flex;
      align-items: center;
      &::after {
        background-color: #F1F1F1;
        display: block;
        height: 1px;
        content: " ";
        width: 100vw;
        position: absolute;
        bottom: 0;
        left: 0;
      }
      .panel-box__hd {
        padding-left: 10px;
        width: 80px;
        height: 80px;
        line-height: 80px;
        .panel-box__thumb {
          width: 100%;
          max-height: 100%;
          vertical-align: top;
        }
      }
      .panel-box__bd {
        flex: 1;
        .panel-box__title {
          padding-right: 0;
          margin-bottom: 8px;
          font-weight: 400;
          font-size: 17px;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
          overflow: hidden;
        }
        .panel-box__info {
          font-size: 12px;
          font-weight: normal;
          color: #888;
          position: relative;
          .panel-box__dislike {
            font-size: 20px;
            line-height: 1em;
            position: absolute;
            right: 15px;
            bottom: 0;
          }
        }
      }
    }
  }
</style>