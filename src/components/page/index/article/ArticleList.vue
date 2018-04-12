<template>
  <div class="article-list">
    <top-sliderbar
    v-model="ind"
    :moveEnable="moveEnable"
    :list="list">
      <div ref="container" class="container">
        <!-- <div>
          <swiper v-preventMove :list="topList"/>
          <article-item @on-item-click="showArticle" @on-dislike-click="showDislike" :list="articleList"></article-item>
        </div> -->
          <div
          @scroll="saveScrollTop(item, $event)"
          :class="item.loading ? 'el-loading-parent--relative' : ''"
          v-for="(item, index) of articleList">
            <article-item v-if="Math.abs(labelsActive - index) < 2" @on-item-click="showArticle" @on-dislike-click="showDislike" :list="item.content"></article-item>
            <div v-if="item.loading" class="el-loading-mask" style="">
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
            <el-tag v-if="dislikeDialog.reason.length === 0" class="dislike-tag" @click.native="doDislike">不感兴趣</el-tag>
            <el-tag v-else @click.native="doDislike" class="dislike-tag">确定</el-tag>
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
      'labels',
      'labelsActive'
    ]),
    list () {
      let list = []
      list.push('推荐')
      for (let item of this.labels) {
        list.push(item.labelName)
      }
      return list
    },
    ind: {
      set (val, oldVal) {
        this.setLabelsActive({ index: val })
        if (val === 0) { return }
        this.getArticlesByLabelId({ labelId: this.labels[val - 1].id })
        return val
      },
      get () {
        return this.labelsActive
      }
    }
  },
  activated () {
    this.resetScrollTop()
  },
  methods: {
    ...mapActions([
      'getArticlesByLabelId',
      'setLabelsActive',
      'dislike'
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
    doDislike () {
      this.dislikeDialog.show = false
      this.dislike({ articleId: this.dislikeDialog.item.id, flag: 1 }).then(res => {
        if (res.data.code === 0) {
        }
      })
    },
    saveScrollTop (item, event) {
      if (event.target.scrollTop !== 0) {
        item.scrollTop = event.target.scrollTop
      }
    },
    resetScrollTop () {
      let items = this.$refs.container.children
      let i = this.labelsActive
      items[i].scrollTop = this.articleList[i].scrollTop
    }
  },
  watch: {
    labelsActive (val, oldVal) {
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
      & > div {
        width: 100vw;
        height: 100%;
        float: left;
        overflow-x: hidden;
        overflow-y: scroll;
      }
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