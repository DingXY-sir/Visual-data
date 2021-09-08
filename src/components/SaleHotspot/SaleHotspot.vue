<template>
<!-- 销售热点 -->
  <div class="sale-container">
    <div class="sale-chart" ref="saleChart"></div>
    <div class="sale-container-foot"></div>
  </div>
</template>

<script>
export default {
  name:'SaleHotspot',
  components: {},
  props: {},
  data() {
    return {
      chartData:[    //自定义数据
        {name:'郑州',value:'999'},
        {name:'洛阳',value:'109'},
        {name:'信阳',value:'59'},
        {name:'三门峡',value:'169'},
        {name:'许昌',value:'432'},
        {name:'新乡',value:'666'},
        {name:'安阳',value:'78'},
        {name:'鹤壁',value:'576'},
        {name:'焦作',value:'302'},
        {name:'开封',value:'222'},
        {name:'商丘',value:'400'},
        {name:'周口',value:'201'},
        {name:'漯河',value:'199'},
        {name:'驻马店',value:'56'},
        {name:'南阳',value:'12'}
      ],
      chartInstance:null,//定义实例
      currentPage:1, //当前页
      totalPage:0,   //总页数
      timerId:null  //定时器标识
    };
  },
  watch: {},
  computed: {},
  destroyed(){
    clearInterval(this.timerId)
     window.removeEventListener('resize',this.screenAdapter)
  },
  methods: {
    //初始化
    initChart() {
      this.chartInstance = this.$echarts.init(this.$refs.saleChart)
      //对图表的初始配置
      const initOption = {
         title:{
          text:'▎销售热点分析',
          left:20,
          top:20
        },
        grid:{
          top:'20%',
          left:'3%',
          right:'8%',
          bottom:'3%',
          containLabel:true
        },
        xAxis: {
          type: 'value'
        },
        yAxis: {
          type: 'category'
        },
        tooltip:{
          trigger:'axis',
          axisPointer: {            // 坐标轴指示器，坐标轴触发有效
            type: 'shadow'      // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        series: [{
          type: 'bar',
          label: { 
            show: true,
            position: 'right',
            textStyle: {
              color: '#F68300'
            }
          },
          itemStyle: {
            //设置圆角
            emphasis: {
              barBorderRadius: 7
            },
            normal: {
              barBorderRadius: [0,15,15,0],
              //设置渐变颜色
              color: this.$echarts.graphic.LinearGradient(
                0, 0, 1, 0,
                [
                  {offset: 0, color: '#5052EE'},
                  {offset: 1, color: '#AB6EE5'}
                ]
              )
            }
          }
        }]
      }
      //
      this.chartInstance.setOption(initOption)

      //对图表对象进行鼠标移入移出
      this.chartInstance.on("mouseover",() => {
        clearInterval(this.timerId)
      })
      this.chartInstance.on("mouseout",() => {
        this.setInterval()
      })
    },
    //获取数据
    getData() {
      //数据从小到大排序
      this.chartData.sort((a,b) => {
        return a.value - b.value
      })
      //每五个分页
      this.totalPage = this.chartData.length % 5 ===0 ? this.chartData.length/5 : this.chartData.length/5 + 1
      this.updateChart()
      this.setInterval()
    },
    //更新图表
    updateChart() {
      //截取数据的开始
      const start = (this.currentPage-1) * 5
      //截取数据的结束
      const end = this.currentPage * 5
       
      
      const dataSlice = this.chartData.slice(start,end)
      //X轴数据
      const saleNmaes = dataSlice.map((item) => {
        return item.name
      })
      //Y轴数据
      const saleValues = dataSlice.map((item) => {
        return item.value
      })
      //option获取数据
      const dataOption = {
        yAxis: {
          data: saleNmaes
        },
        series: [{
          data: saleValues
        }]
      }
      this.chartInstance.setOption(dataOption)
    },
    //启动定时器
    setInterval() {
      if(this.timerId) {
        clearInterval(this.timerId)
      }
      this.timerId = setInterval(() => {
        this.currentPage++
        if(this.currentPage > this.totalPage) {
          this.currentPage = 1
        }
        this.updateChart()
      }, 3000);
    },
    //option某些随着浏览器大小变化
    screenAdapter() {
      // 容器宽度变化 === this.$refs.saleChart.offsetWidth

      //文字宽度
      const titleFontSize = this.$refs.saleChart.offsetWidth / 100 * 3.6
      console.log(titleFontSize)
      //和分辨率大小相关的配置
      const adapterOption = {
        title:{
          textStyle:{
            fontSize:titleFontSize
          }
        },
        series: [{
          barWidth: titleFontSize,//柱状图宽度
          label: { 
            textStyle: {
              fontSize: titleFontSize
            }
          },
          itemStyle: {
            //设置圆角
            normal: {
              barBorderRadius: [0,titleFontSize/2,titleFontSize/2,0]
            }
          }
        }]
      }
      this.chartInstance.setOption(adapterOption)
      //手动调用resize对象才能产生效果
      this.chartInstance.resize()
    }
  },
  mounted() {
    this.initChart()
    this.getData()
    //兼容浏览器窗口大小变化
    window.addEventListener('resize',this.screenAdapter)
  }
};
</script>
<style lang="scss" scoped>
.sale-container{
  width: 500px;
  height: 400px;
  background: rgba(255,255,255,.04) url('~assets/img/line.png');
  border: 1px solid rgba(25,186,139,.17);
  background-size: 100% auto;
  position: relative;
  margin-bottom: 15px;
  margin-top: 15px;
  z-index: 10;
  &:before, &:before {
    border-left: 2px solid #02a6b5;
    left: 0;
  }

  &:before, &:after {
    position: absolute;
    width: 5px;
    height: 5px;
    content: "";
    border-top: 2px solid #02a6b5;
    top: 0;
  }
  &:after, &:after {
      border-right: 2px solid #02a6b5;
      right: 0;
  }
  .sale-container-foot{
    position: absolute;
    bottom: 0;
    width: 100%;
    left: 0;
    &:before, &:after {
      position: absolute;
      width: 5px;
      height: 5px;
      content: "";
      border-bottom: 2px solid #02a6b5;
      bottom: 0;
    }
    &:before, &:before {
      border-left: 2px solid #02a6b5;
      left: 0;
    }
    &:after, &:after {
      border-right: 2px solid #02a6b5;
      right: 0;
    }
  }
  .sale-chart{
    width: 100%;
    height: 100%;
  }
}

</style>