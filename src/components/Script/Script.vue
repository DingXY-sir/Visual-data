<template>
  <div class="script-container">
    <div class="script-chart" ref="script_ref"></div>
    <div class="data-container-foot"></div>
  </div>
</template>

<script>
import chalk from '../../../public/static/theme/chalk'
export default {
  components: {},
  props: {},
  data() {
    return {
      chartInstance:null,
      scriptData:[
        {name:'郑州',children:[{name:'开场白',value:100},{name:'结束语',value:200}]},
        {name:'开封',children:[{name:'开场白',value:99},{name:'结束语',value:10}]},
        {name:'信阳',children:[{name:'开场白',value:78},{name:'结束语',value:80}]},
      ],
      name:'郑州'
    };
  },
  created() {},
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
      this.chartInstance = this.$echarts.init(this.$refs.script_ref,'chalk')
      const initOption = {
        title: {
          text: '各地市访问量占比',
          subtext: this.name,
          left: 'center',
          top:20
        },
        legend: {
          orient: 'vertical',
          left: 'left',
          icon:'circle'
        },
        tooltip:{
          show:true,
          formatter:(arg) => {
            let total = 0;
            this.scriptData.forEach((item) => {
              if(item.name === this.name) {
                item.children.forEach(item => {
                  total += item.value
                })
              }
            })
            let str = `${arg.name} : ${parseInt((arg.value / total) * 100) + '%'}`
            return str
          }
        },
        series:[
          {
            type:'pie',
            radius:'50%',
            label:{
              show:false
            },
            emphasis: {
              label:{
                show:true
              },
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      }
      this.chartInstance.setOption(initOption)
    },
    getData() {
      this.updateData()

    },
    updateData() {
      //处理图表需要的数据
      const name = "郑州"
      const seriesData = []
      this.scriptData.forEach((item) => {
        if(item.name === name) { 
          item.children.forEach(item => {
            seriesData.push(item)
          })
        }
      })
      console.log(seriesData)
      // const seriesData = this.scriptData[0].children.map((item) => {
      //   return {
      //     name:item.name,
      //     value:item.value
      //   }
      // })
      const dataOption = {
        series:[
          {
            data:seriesData
          }
        ]
      }
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

</style>