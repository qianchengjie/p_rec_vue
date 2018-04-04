<template>
  <div>
    <x-header style="position: fixed; z-index: 1000; width: 100vw; top: 0;" @on-click-back="$router.push('/')" title="用户兴趣模型">
    </x-header>
    <div id="myChart" style="height: 100vh"></div>
  </div>
</template>

<script>
import echarts from 'echarts'
import { XHeader } from 'vux'
export default {
  components: {
    XHeader
  },
  data () {
    return {
    }
  },
  mounted () {
    this.drawLine()
  },
  methods: {
    drawLine () {
      let myChart = echarts.init(document.getElementById('myChart'))
      myChart.setOption({
        tooltip: {
          trigger: 'axis'
        },
        radar: [
          {
            indicator: [
              {text: '心理学', max: 100},
              {text: '电影', max: 100},
              {text: '设计', max: 100},
              {text: '音乐', max: 100},
              {text: '动漫', max: 100},
              {text: '游戏', max: 100},
              {text: '财金', max: 100}
            ],
            radius: 80
          }
        ],
        series: [
          {
            type: 'radar',
            tooltip: {
              trigger: 'item'
            },
            itemStyle: {
              normal: {
                areaStyle: {
                  type: 'default'
                }
              }
            },
            data: [
              {
                value: [60, 10, 85, 40, 20, 40, 70, 20],
                name: '用户模型'
              }
            ]
          }
        ]
      })
    }
  }
}
</script>

<style scoped lang="less"></style>