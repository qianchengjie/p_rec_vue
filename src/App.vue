<template>
  <div id="app">
    <keep-alive include="SideBarView">
      <router-view />
    </keep-alive>
    <div v-transfer-dom :saveScrollPosition="true">
      <loading v-model="isLoading"></loading>
    </div>
  </div>
</template>

<script>
import { TransferDom, Loading } from 'vux'
import { mapGetters } from 'vuex'
export default {
  name: 'App',
  directives: {
    TransferDom
  },
  components: {
    Loading
  },
  computed: {
    ...mapGetters({
      isLoading: 'isLoading'
    })
  }
}
</script>

<style lang="less">
@import '~vux/src/styles/reset.less';
body {
  background-color: #fbf9fe;
}
html, body, #app {
  height: 100%;
  width: 100%;
  overflow-x: hidden;
}

.vux-drawer-body {
  transform: none !important;
}
.drawer-left {
  z-index: 10000;
}
.vux-header {
  background-color: #0099FF !important;
}
.vux-header .vux-header-title, .vux-header .vux-header-left {
  line-height: normal !important;
  display: -webkit-flex;
  align-items: center;
  justify-content: center;
}
.vux-header .vux-header-left .vux-header-back {
  color: #FFF
}
.vux-header .vux-header-left div.left-arrow:before {
  border: 1px solid #FFF;
  border-width: 1px 0 0 1px;
}
.weui-media-box__title {
  white-space: normal !important;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
}
.vux-header .vux-header-title > span {
  overflow: hidden;
  text-overflow:ellipsis;
  white-space: nowrap;
}
.weui-mask {
  z-index: 4000 !important;
}
.xs-plugin-pulldown-container::after {
  background-color: #F1F1F1;
  display: block;
  height: 1px;
  content: " ";
  width: 100vw;
  position: absolute;
  bottom: 0;
  left: 0;
}
.xs-container {
  height: 100%;
}
</style>

