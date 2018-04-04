<template>
  <div>
    <ul>
        <divider>选择您感兴趣的内容</divider>
       <checker v-model="chooseLabels" type="checkbox" default-item-class="el-tag" selected-item-class="tag-selected">
        <checker-item v-for="item of labels" :value="item.id" :key="item.id">{{item.labelName}}</checker-item>
      </checker>
      <x-button @click.native="nextStep" style="position: absolute; bottom: 0" type="primary">下一步</x-button>
    </ul>
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
      'labels'
    ])
  },
  mounted () {
    this.getLabels().catch(res => {
      this.$vuex.toast.text(res.data.msg, 'top')
    })
  },
  methods: {
    ...mapActions([
      'getLabels'
    ]),
    nextStep () {
      this.$router.replace('/')
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