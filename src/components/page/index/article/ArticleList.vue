<template>
  <div class="article-list">
    <top-sliderbar
    v-model="ind"
    :moveEnable="moveEnable"
    :list="list">
      <div ref="container" class="container">
        <div>
          <swiper v-preventMove :list="topList"/>
          <article-item @on-item-click="showArticle" @on-dislike-click="showDislike" :list="articleList"></article-item>
        </div>
        <div
        @scroll="saveScrollTop(themeArticle, $event)"
        :class="themeArticle.loading ? 'el-loading-parent--relative' : ''"
        :style="'background: url(' + themeArticle.content.background + ')'"
        v-for="(themeArticle, index) of themeArticleList">
          <article-item v-if="Math.abs(themeArticleListIndex - index - 1) < 2" @on-item-click="showArticle" @on-dislike-click="showDislike" :list="themeArticle.content.stories"></article-item>
          <div v-if="themeArticle.loading" class="el-loading-mask" style="">
            <div class="el-loading-spinner">
              <svg viewBox="25 25 50 50" class="circular">
                <circle cx="50" cy="50" r="20" fill="none" class="path"></circle>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </top-sliderbar>

    <div v-transfer-dom>
      <x-dialog v-model="dislikeDialog.show" :hide-on-blur="true">
        <div class="dislike-dialog">
          <div class="dislike-dialog-header">
            <small>可选理由</small>
            <el-tag v-if="dislikeDialog.reason.length === 0" class="dislike-tag" @click.native="dislike">不感兴趣</el-tag>
            <el-tag v-else @click.native="dislike" class="dislike-tag">确定</el-tag>
          </div>
           <checker v-model="dislikeDialog.reason" type="checkbox" default-item-class="el-tag tag" selected-item-class="el-tag tag tag-selected">
            <checker-item :value="1">看过了</checker-item>
            <checker-item :value="2">内容太水</checker-item>
          </checker>
        </div>
      </x-dialog>
    </div>
  </div>
</template>

<script>
import { TransferDomDirective as TransferDom, XDialog, Swiper, Panel, Tab, TabItem, Checker, CheckerItem } from 'vux'
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
    },
    TransferDom
  },
  components: {
    XDialog,
    Swiper,
    Panel,
    Tab,
    TabItem,
    Checker,
    CheckerItem,
    ArticleItem: () => import('./ArticleItem'),
    TopSliderbar: () => import('@/components/common/TopSliderbar')
  },
  data () {
    return {
      dislikeDialog: {
        reason: [],
        show: false,
        item: null
      },
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
  activated () {
    this.resetScrollTop()
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
    },
    showDislike (item) {
      this.dislikeDialog.reason = []
      this.dislikeDialog.show = true
      this.dislikeDialog.item = item
    },
    dislike () {
      this.dislikeDialog.show = false
    },
    saveScrollTop (item, event) {
      if (event.target.scrollTop !== 0) {
        item.scrollTop = event.target.scrollTop
      }
    },
    resetScrollTop () {
      let items = this.$refs.container.children
      let i = this.themeArticleListIndex
      items[i].scrollTop = this.themeArticleList[i - 1].scrollTop
      if (i + 1 < items.length) {
        items[i + 1].scrollTop = this.themeArticleList[i + 1].scrollTop
      }
      if (i > items.length) {
        items[i - 1].scrollTop = this.themeArticleList[i - 1].scrollTop
      }
    }
  },
  watch: {
    themeArticleListIndex (val, oldVal) {
      this.$nextTick(_ => {
        this.resetScrollTop()
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
    }
  }
  .dislike-dialog {
    font-size: 18px;
    padding: 15px;
    text-align: left;
    .dislike-dialog-header {
      position: relative;
      padding-bottom: 15px;
      .dislike-tag {
        font-size: 14px;
        position: absolute;
        right: 0;
        width: 8em;
        border-radius: 16px;
        color: #FFF;
        background-color: #D73C50;
        border: 0;
        display: -webkit-inline-flex;
        align-items: center;
        justify-content: center;
      }
    }
    .tag {
      font-size: 14px;
      text-align: center;
      margin-top: 5px;
      background-color: #FFF;
      color: #000;
      border-color: #DDD;
      display: -webkit-inline-flex;
      align-items: center;
      justify-content: center;
    }
    .tag-selected {
      color: #D73C50;
      border-color: #D73C50;
    }
  }
</style>