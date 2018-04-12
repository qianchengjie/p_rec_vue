<template>
  <div style="height: 100vh;">
    <sidebar>
      <div slot="drawer">
        <div class="drawer-header">
          <router-link @click.native="changeDrawerVisibility" to="/user/login" class="log-reg" v-if="!userinfo">
            登录/注册
          </router-link>
          <div @click="doLogOut" class="userinfo" v-else>
            {{ userinfo.username }}
          </div>
        </div>
        <div class="drawer-content">
          <div class="menu" v-if="userinfo">
            <div class="menu-item" @click="goTo('user/model')">
              <icon name="personal-center" h="20" w="20"/>
              个人兴趣
            </div>
            <div class="menu-item" @click="goTo('user/collections')">
              <icon name="favorite" h="20" w="20"/>我的收藏
            </div>
          </div>
        </div>
      </div>
      <router-view style="height: 100vh;" slot="routerview"></router-view>
    </sidebar>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'SideBarView',
  components: {
    Sidebar: () => import('@/components/common/sidebar/Sidebar')
  },
  data () {
    return {
      themeIndex: 0
    }
  },
  computed: {
    ...mapGetters([
      'userinfo'
    ])
  },
  methods: {
    ...mapActions([
      'changeDrawerVisibility',
      'getArticleList',
      'updateLoading',
      'logOut'
    ]),
    doLogOut () {
      var _this = this
      this.changeDrawerVisibility().then(res => {
        this.$vux.confirm.show({
          title: '提示',
          content: '是否退出当前帐号',
          onConfirm: () => {
            _this.logOut()
          }
        })
      })
    },
    goTo (link) {
      this.changeDrawerVisibility()
      this.$router.push(link)
    }
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
    .userinfo {
      height: 100%;
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
        display: flex;
        align-items: center;
        svg {
          margin-right: 12px;
        }
        &.active {
          background-color: #F7F7F7;
        }
      }
    }
  }
}
</style>
