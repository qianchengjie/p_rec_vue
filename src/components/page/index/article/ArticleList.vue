<template>
  <div class="article-list">
    <top-sliderbar :moveEnable="moveEnable" :list="list">
      <div>
        <div>
          <swiper v-preventMove :list="topList"/>
          <panel :list="articleList" type="5" @on-click-item="showArticle"></panel>
        </div>
        <div>
          <swiper v-preventMove :list="topList"/>
          <panel :list="articleList" type="5" @on-click-item="showArticle"></panel>
        </div>
        <div>
          <swiper v-preventMove :list="topList"/>
          <panel :list="articleList" type="5" @on-click-item="showArticle"></panel>
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
      'themeList'
    ]),
    list () {
      let list = []
      for (let item of this.themeList) {
        list.push(item.name)
      }
      return list
    }
  },
  mounted () {
    this.updateLoading(true)
    this.getArticleList().then(res => {
      this.updateLoading(false)
    })
  },
  methods: {
    a () {
      alert()
    },
    ...mapActions([
      'getArticleList',
      'updateLoading'
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
  }
</style>