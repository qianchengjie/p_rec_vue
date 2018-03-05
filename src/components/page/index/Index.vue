<template>
  <div class="index-page">
    <div v-show="isArticleList || isArticle">
      <x-header v-if="isArticle" style="position: abosolute; width: 100vw; top: 0; z-index: 2000;" @on-click-back="$router.push('/')" :title="loading ? '' : article.title">
      </x-header>
      <x-header v-else style="position: abosolute; width: 100vw; top: 0; z-index: 2000" :left-options="{showBack: false}" >
        <x-icon @click="changeDrawerVisibility" slot="overwrite-left" type="navicon" size="35" style="fill:#fff;position:relative;top:-8px;left:-3px;"></x-icon>
      </x-header>
    </div>
    <div v-loading="loading || (isArticleList && articleListLoading)" class="content" :style="isArticle || isArticleList ? 'padding-top: 46px;margin-top: -46px;box-sizing: border-box;' : ''">
      <router-view style="position: absolute; z-index: 2001; width: 100vw;" />
      <div v-if="!isArticleList" style="background: #FFF; height: 100%; position: absolute; top: 0; width: 100vw; z-index: 2000"></div>
      <article-list :style="isArticleList && !articleListLoading && !isArticle ? '' : 'visibility: hidden'"></article-list>
    </div>
  </div>
</template>

<script>
import { XHeader } from 'vux'
import { mapGetters, mapActions } from 'vuex'

export default {
  components: {
    XHeader,
    ArticleList: () => import('@/components/page/index/article/ArticleList')
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
    this.getThemeList()
    this.getArticleList()
  },
  methods: {
    ...mapActions([
      'getArticleList',
      'updateLoading',
      'changeDrawerVisibility',
      'getThemeList'
    ])
  },
  watch: {
    $route: {
      handler (val, oldVal) {
        this.isArticleList = val.fullPath === '/'
        if (this.isArticleList) {
          this.updateLoading(false)
        }
        this.isArticle = val.name === 'article'
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
