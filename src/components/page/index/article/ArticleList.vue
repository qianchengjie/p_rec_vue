<template>
  <div class="article-list">
    <top-sliderbar v-model="ind" :moveEnable="moveEnable" :list="list">
      <div class="container">
        <div>
          <swiper v-preventMove :list="topList"/>
          <panel :list="articleList" type="5" @on-click-item="showArticle"></panel>
        </div>
        <div :class="item.loading ? 'el-loading-parent--relative' : ''" :style="'background: url(' + item.content.background + ')'" v-for="(item, index) of themeArticleList">
          <panel :list="item.content.stories" type="5" @on-click-item="showArticle"></panel>
          <div v-if="item.loading" class="el-loading-mask" style=""><div class="el-loading-spinner"><svg viewBox="25 25 50 50" class="circular"><circle cx="50" cy="50" r="20" fill="none" class="path"></circle></svg></div></div>
        </div>
      </div>
    </top-sliderbar>
  </div>
</template>

<script>
import { Swiper, Panel, Tab, TabItem } from 'vux'
import { mapActions, mapGetters } from 'vuex'

export default {
  directives: {
    preventMove: {
      inserted: function (el, Vue, vnode) {
        el.ontouchstart = () => {
          vnode.context.moveEnable = false
        }
        el.ontouchend = () => {
          vnode.context.moveEnable = true
        }
      }
    }
  },
  components: {
    Swiper,
    Panel,
    Tab,
    TabItem,
    TopSliderbar: () => import('@/components/common/TopSliderbar')
  },
  data () {
    return {
      moveEnable: true
    }
  },
  computed: {
    ...mapGetters([
      'articleList',
      'topList',
      'themeList',
      'themeArticleList',
      'themeArticleListIndex'
    ]),
    list () {
      let list = []
      list.push('首页')
      for (let item of this.themeList) {
        list.push(item.name)
      }
      return list
    },
    ind: {
      set (val) {
        this.setThemeArticleListIndex({ index: val })
        if (val === 0) { return }
        for (let item of this.themeArticleList) {
          if (item.themeId === this.themeList[val - 1].id) {
            if (item.loading) {
              this.getThemeArticleList({themeId: this.themeList[val - 1].id}).then(res => {
              })
            }
          }
        }
        return val
      },
      get () {
        return this.themeArticleListIndex
      }
    }
  },
  mounted () {
  },
  methods: {
    ...mapActions([
      'getThemeArticleList',
      'setThemeArticleListIndex'
    ]),
    showArticle (item) {
      this.$router.push({
        path: 'article/' + item.id
      })
    }
  }
}
</script>

<style scoped lang="less">
  .article-list {
    overflow-x: hidden;
    height: 100%;
    .container {
      height: 100%;
      & > div {
        overflow-y: auto;
        height: 100%;
      }
    }
  }
</style>