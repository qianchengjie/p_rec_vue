<template>
  <div>
    <x-header style="position: fixed; width: 100vw; top: 0;" @on-click-back="$router.push('/')" title="我的收藏">
    </x-header>
    <article-item
    style="margin-top: 46px;"
    @on-item-click="showArticle"
    @on-dislike-click="showDisCollect"
    :list="collectList"></article-item>
  </div>
</template>

<script>
import { XHeader } from 'vux'
import { mapActions, mapGetters } from 'vuex'
export default {
  components: {
    XHeader,
    ArticleItem: () => import('@/components/page/index/article/ArticleItem')
  },
  data () {
    return {
      userinfo: localStorage.userinfo ? JSON.parse(localStorage.userinfo) : null
    }
  },
  mounted () {
    this.getCollectList({ userId: this.userinfo.id })
  },
  computed: {
    ...mapGetters([
      'collectList'
    ])
  },
  methods: {
    ...mapActions([
      'getCollectList'
    ]),
    showArticle (item) {
      this.$router.push({
        path: 'article/' + item.id
      })
    },
    checkLogin () {
      if (!this.userinfo) {
        this.$vux.toast.text('请先登录', 'bottom')
        this.$router.push('/')
        return false
      }
      return true
    },
    showDisCollect (item) {
      const _this = this
      this.$vux.confirm.show({
        content: '是否取消收藏',
        onCancel () {
        },
        onConfirm () {
          for (let i = 0; i < _this.articleList.length; i++) {
            if (_this.articleList[i].id === item.id) {
              _this.articleList.splice(i, 1)
            }
          }
          _this.$vux.toast.text('已取消收藏', 'bottom')
        }
      })
    }
  }
}
</script>

<style scoped lang="less"></style>