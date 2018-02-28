<template>
  <div>
    <x-header v-if="isArticle" style="position: abosolute; width: 100vw; top: 0; z-index: 2000;" @on-click-back="$router.push('/')"></x-header>
    <x-header v-else style="position: abosolute; width: 100vw; top: 0; z-index: 2000" :left-options="{showBack: false}" :title="title">
      <x-icon @click="changeDrawerVisibility" slot="overwrite-left" type="navicon" size="35" style="fill:#fff;position:relative;top:-8px;left:-3px;"></x-icon>
    </x-header>
    <div v-loading="loading" class="content">
      <router-view v-show="!loading" />
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
      isArticle: false
    }
  },
  props: {
    title: [String]
  },
  computed: {
    ...mapGetters([
      'loading'
    ])
  },
  mounted () {
    this.isArticle = this.$route.fullPath !== '/'
  },
  methods: {
    ...mapActions([
      'changeDrawerVisibility'
    ])
  },
  watch: {
    $route: {
      handler (val, oldVal) {
        this.isArticle = val.fullPath !== '/'
      },
      deep: true
    }
  }
}
</script>

<style scoped lang="less">
.content {
  padding-top: 46px;
  margin-top: -46px;
  box-sizing: border-box;
  height: 100vh;
  overflow-x: auto;
  z-index: 1
}
</style>
