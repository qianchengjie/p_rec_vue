<template>
    <drawer
    class="drawer"
    width="250px;"
    :show.sync="drawerShow"
    :show-mode="showModeValue"
    :placement="showPlacementValue"
    :drawer-style="{'background-color':'#fff', width: '250px'}">
    <slot slot="drawer" name="drawer" />
    <slot @click="changeDrawerVisibility" name="routerview" />
  </drawer>
</template>

<script>
import { Drawer } from 'vux'
import { mapGetters, mapActions } from 'vuex'

export default {
  components: {
    Drawer
  },
  data () {
    return {
      showModeValue: 'overlay' || 'push',
      showPlacementValue: 'left'
    }
  },
  computed: {
    ...mapGetters({
      drawerVisibility: 'drawerVisibility'
    }),
    drawerShow: {
      get () {
        return this.drawerVisibility
      },
      set () {
        this.changeDrawerVisibility()
        return this.drawerVisibility
      }
    }
  },
  methods: {
    ...mapActions([
      'changeDrawerVisibility'
    ])
  }
}
</script>

<style scoped lang="less">
</style>