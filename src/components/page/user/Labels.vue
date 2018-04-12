<template>
  <div>
    <divider>选择您感兴趣的内容</divider>
    <checker style="height: 100vh;" v-model="chooseLabels" type="checkbox" default-item-class="el-tag" selected-item-class="tag-selected">
      <checker-item v-for="item of labels" :value="item.id" :key="item.id">{{item.labelName}}</checker-item>
    </checker>
    <x-button @click.native="nextStep" style="position: absolute; bottom: 0" type="primary">下一步</x-button>
  </div>
</template>

<script>
import { Checker, CheckerItem, Divider, XButton } from 'vux'
import { mapActions, mapGetters } from 'vuex'

export default {
  components: {
    Checker,
    CheckerItem,
    Divider,
    XButton
  },
  data () {
    return {
      chooseLabels: []
    }
  },
  computed: {
    ...mapGetters([
      'labels',
      'userinfo'
    ])
  },
  mounted () {
    this.getLabels().catch(res => {
      this.$vuex.toast.text(res.data.msg, 'top')
    })
  },
  methods: {
    ...mapActions([
      'getLabels',
      'userAddLabel'
    ]),
    nextStep () {
      this.userAddLabel({ labelIds: this.chooseLabels, userId: this.userinfo.id }).then(res => {
        console.log(res)
        if (res.data.code === 0) {
          this.$router.replace('/')
        }
      })
    }
  }
}
</script>

<style scoped lang="less">
.el-tag {
  margin-top: 15px;
  background-color: #FFF;
  box-sizing: border-box;
  width: 30vw;
  margin-left: 2.5vw;
  text-align: center;
  height: 20vh;
  align-items: center;
  justify-content: center;
  display: inline-flex;
  display: -webkit-inline-flex;
  border-color: #DDD;
  color: #909399;
  background-color: #EFEFEF;
}
.tag-selected {
  background-color: #FFF;
  color: #409EFF;
  border: 1px solid rgba(64,158,255,.2);
}
</style>