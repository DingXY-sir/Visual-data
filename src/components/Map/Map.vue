<template>
  <div class="map-container">
    <div class="map-chart" ref="map_ref"></div>
  </div>
</template>

<script>
import henan from './data.json'
import chalk from '../../../public/static/theme/chalk'
export default {
  components: {},
  props: {},
  data() {
    return {
      chartInstance:null
    };
  },
  created() {},
  watch() {
    //属性名：要监视数据的名称
  },
  mounted() {
    this.initChart()
    this.getData()
    window.addEventListener('resize',this.screenAdapter)
  },
  destroyed() {
    window.removeEventListener('resize',this.screenAdapter)
  },
  computed: {},
  methods: {
    initChart() {
      //引入主题
      this.$echarts.registerTheme('chalk',chalk)
      this.chartInstance = this.$echarts.init(this.$refs.map_ref,"chalk")
      this.$echarts.registerMap('henan',henan)
      const initOption = {
        geo:{
          type:'map',
          map:'henan',
          itemStyle:{
            areaColor:'#2E72BF',
            borderColor:'#333'
          }
        },
        series:[
          {
            label:{
              normal:{
                textStyle:{
                  
                }
              }
            }
          }
        ]
      }
      this.chartInstance.setOption(initOption)
      this.chartInstance.on('click',(params) => {
        console.log(params);
      })

    },
    getData() {
      this.updateData()
    },
    updateData() {
      //处理图表需要的数据
      const dataOption = {}
      this.chartInstance.setOption(dataOption)
    },
    screenAdapter() {
      //处理自适应数据
      const adapterOption = {}
      this.chartInstance.setOption(adapterOption)
      //自动执行自适应
      this.chartInstance.resize()
    }
  },
};
</script>
<style lang="scss" scoped>
.map-container{
  width: 800px;
  height: 800px;
  .map-chart{
    width: 100%;
    height: 100%;
  }
}
</style>