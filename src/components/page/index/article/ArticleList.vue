<template>
  <div>
    <swiper :list="topList"/>
    <panel :list="articleList" type="5" @on-click-item="showArticle"></panel>
  </div>
</template>

<script>
import { Swiper, Panel } from 'vux'
import { mapActions, mapGetters } from 'vuex'

export default {
  components: {
    Swiper,
    Panel
  },
  data () {
    return {}
  },
  computed: {
    ...mapGetters([
      'articleList',
      'topList'
    ])
  },
  mounted () {
    this.updateLoading(true)
    this.getArticleList().then(res => {
      this.updateLoading(false)
    })
  },
  methods: {
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

<style scoped lang="less"></style>