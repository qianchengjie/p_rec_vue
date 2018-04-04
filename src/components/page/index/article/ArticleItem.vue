<template>
  <div class="panel">
    <div
    v-for="item of list"
    @click="$emit('on-item-click', item)"
    class="panel-box">
      <div class="panel-box__bd">
        <h4 class="panel-box__title">{{item.title}}</h4>
        <div class="panel-box__info">
          作者 
          121评论 
          03-18 20:31 
          <span @click="dislike($event, item)" class="panel-box__dislike">&times;</span>
        </div>
      </div>
      <div v-if="typeof item.images !== 'undefined'" class="panel-box__hd">
        <img :src="item.images[0]" alt="" class="panel-box__thumb">
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      list: Array
    },
    methods: {
      dislike (event, item) {
        this.$emit('on-dislike-click', item)
        event.stopPropagation()
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
          font-size: 14px;
          font-weight: normal;
          color: #CCC;
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