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
            <div v-for="(item, index) of themeList" @click="themeIndex=index" :key="item.id" :class="'menu-item' + (index === themeIndex ? ' active' : ' ')">
              {{item.name}}
            </div>
          </div>
        </div>
      </div>
      <router-view :title="typeof (themeList[themeIndex]) !== 'undefined' ? themeList[themeIndex].name : ''" style="height: 100vh;" slot="routerview"></router-view>
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
      themeList: 'themeList'
    })
  },
  mounted () {
    this.getThemeList()
  },
  methods: {
    ...mapActions([
      'changeDrawerVisibility',
      'getThemeList',
      'getArticleList',
      'updateLoading'
    ])
  },
  watch: {
    themeIndex (val, oldVal) {
      this.updateLoading(true)
      this.changeDrawerVisibility().then(res => {
        this.getArticleList().then(res => {
          this.updateLoading(false)
        })
      })
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
      color: #FFF;
      display: block;
      font-size: 24px;
      line-height: 18vh;
      text-align: center;
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
