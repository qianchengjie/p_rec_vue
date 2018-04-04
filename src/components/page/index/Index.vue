<template>
  <div class="index-page">
    <div v-show="isArticleList || isArticle">
      <x-header v-if="!isArticle" style="position: abosolute; width: 100vw; top: 0; z-index: 2000" :left-options="{showBack: false}" >
        <x-icon @click="changeDrawerVisibility" slot="overwrite-left" type="navicon" size="35" style="fill:#fff;position:relative;top:-8px;left:-3px;"></x-icon>
      </x-header>
    </div>
    <div v-loading="loading || (isArticleList && articleListLoading)" class="content">
      <router-view style="position: absolute; z-index: 2001; width: 100vw;" />
      <div v-if="!isArticleList" style="background: #FFF; height: 100%; position: absolute; top: 0; width: 100vw; z-index: 2000"></div>
      <article-list :style="isArticleList && !articleListLoading && !isArticle ? '' : 'visibility: hidden'"></article-list>
    </div>
  </div>
</template>

<script>
import { XHeader } from 'vux'
import { mapGetters, mapActions } from 'vuex'
import ArticleList from '@/components/page/index/article/ArticleList'

export default {
  components: {
    XHeader,
    ArticleList
  },
  data () {
    return {
      isArticleList: true,
      isArticle: false
    }
  },
  props: {
    title: [String]
  },
  computed: {
    ...mapGetters([
      'articleListLoading',
      'article',
      'loading'
    ])
  },
  mounted () {
    this.isArticle = this.$route.fullPath !== '/'
    this.routeListener(this.$route)
    this.getThemeList()
    this.getArticleList()
    this.getLabels().then(res => {
      this.getArticles({ labelId: res.data.data[1].id })
    })
  },
  methods: {
    ...mapActions([
      'getArticleList',
      'updateLoading',
      'changeDrawerVisibility',
      'getThemeList',
      'getLabels',
      'getArticles'
    ]),
    routeListener (val) {
      this.isArticleList = val.fullPath === '/'
      if (this.isArticleList) {
        this.updateLoading(false)
      }
      this.isArticle = val.name === 'article'
    }
  },
  watch: {
    $route: {
      handler (val, oldVal) {
        this.routeListener(val)
      },
      deep: true
    }
  }
}
</script>

<style lang="less">
.index-page {
  & > .content {
    height: 100vh;
    overflow-x: hidden;
    z-index: 1;
    position: relative;
  }
}
</style>
