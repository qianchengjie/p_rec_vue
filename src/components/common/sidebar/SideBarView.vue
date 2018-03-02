<template>
  <div style="height: 100vh;">
    <sidebar>
      <div slot="drawer">
        <div class="drawer-header">
          <router-link @click.native="changeDrawerVisibility" to="/user/login" class="log-reg" v-if="typeof (username) === 'undefined'">
            登录/注册
          </router-link>
          <div v-else>
          </div>
        </div>
        <div class="drawer-content">
          <div class="menu">
          </div>
        </div>
      </div>
      <router-view style="height: 100vh;" slot="routerview"></router-view>
    </sidebar>
  </div>
</template>

<script>
import { XHeader } from 'vux'
import { mapActions, mapGetters } from 'vuex'

export default {
  components: {
    XHeader,
    Sidebar: () => import('@/components/common/sidebar/Sidebar')
  },
  data () {
    return {
      username: localStorage.username,
      themeIndex: 0
    }
  },
  computed: {
    ...mapGetters({
    })
  },
  mounted () {
  },
  methods: {
    ...mapActions([
      'changeDrawerVisibility',
      'getArticleList',
      'updateLoading'
    ])
  },
  watch: {
  }
}
</script>

<style scoped lang="less">
.drawer{
  height: 100vh;
  overflow: hidden;
  .drawer-header {
    height: 18vh;
    background-color: #0099FF;
    color: #FFF;
    .log-reg {
      height: 100%;
      color: #FFF;
      font-size: 24px;
      display: -webkit-flex;
      align-items: center;
      justify-content: center;
    }
  }
  .drawer-content {
    .menu {
      height: 82vh;
      overflow-y: auto;
      .menu-item {
        padding: 0.75em;
        &.active {
          background-color: #F7F7F7;
        }
      }
    }
  }
}
</style>
