<template>
<!-- 数据流失 -->
  <div class="data-loss-container">
    <!-- 选择来源 -->
    <div class="title" :style="SelectFontSize">
      <span>{{SelectText}}</span>
      <span @click="showSelect = !showSelect">下拉箭头</span>
      <div class="select-con" v-show="showSelect">
        <div class="select-item" v-for=" item  in SelectOption" :key="item.key" @click="handSelect(item.key)">{{item.text}}</div>
      </div>
    </div>
    <div class="data-chart" ref="dataLoss_ref"></div>
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
      chartInstance:null, //定义初始化实例
      allData:{     //折线图数据
        map:{
          title:'成单量',
          base:310,
          unit:'万',
          data:[
            {name:"郑州",data:["11","102","13","124","44","122.4","90"]},
            {name:"三门峡",data:["90","52","130","104","424","12.4","10"]},
            {name:"洛阳",data:["43","62","13","94","14","14.5","87"]},
            {name:"新乡",data:["15","67","78","35","407","122.4","36"]},
            {name:"周口",data:["52","98","23","112","44","122.4","17"]},
          ]
        },
        sale:{
          title:'销售量',
          base:310,
          unit:'万',
          data:[
            {name:"鹤壁",data:["87","142","13","124","293","122.4","120"]},
            {name:"许昌",data:["67","51","110","104","84","12.4","98"]},
            {name:"商丘",data:["231","42","33","94","104","19.5","87"]},
            {name:"南阳",data:["78","76","74","35","427","122.4","76"]},
            {name:"驻马店",data:["63","48","23","112","44","232.4","17"]},
          ]
        },
        vio:{
          title:'违规量',
          base:310,
          unit:'万',
          data:[
            {name:"信阳",data:["101","102","13","124","44","122.4","90"]},
            {name:"开封",data:["66","52","60","104","124","12.4","220"]},
            {name:"焦作",data:["33","72","13","84","14","20.5","87"]},
            {name:"漯河",data:["25","67","68","35","27","182.4","96"]},
            {name:"安阳",data:["82","98","103","102","44","190.4","7"]},
          ]
        },
        common:{
          week:["周一","周二","周三","周四","周五","周六","周日"]
        },
        type:[
          {key:'map',text:'成单量'},
          {key:'sale',text:'销售量'},
          {key:'vio',text:'违规量'}
        ]
      } ,
      showSelect:false, //是否显示可选项
      showText:'map', //设置初始标题
      titleFontSize:0 //初始化适配文字大小
    };
  },
  computed: {
    SelectOption() {   //标题下拉框文本展示
      return this.allData.type.filter((item) => {
        return item.key !== this.showText
      })
    },
    SelectText() {     //标题展示
      return this.allData[this.showText].title
    },
    SelectFontSize() {    //标题选项文字大小
      return {
        FontSize : this.titleFontSize + 'px'
      }
    }
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
  methods: {
    //初始化
    initChart() {
      //引入主题
      this.$echarts.registerTheme('chalk',chalk)
      this.chartInstance = this.$echarts.init(this.$refs.dataLoss_ref,"chalk")
      //定义初始化option
      const initOption = {
        grid: {      //图表位置设置
          left: '3%',
          bottom: '3%',
          top:'30%',
          containLabel: true
        },
        tooltip: {  //鼠标移入坐标提示
          trigger: 'axis'
        },
        legend: {   //图例位置和形状
          top:'15%',
          left:10,
          icon:'circle'
        },
        xAxis:{
          type:'category',
          boundaryGap: false,
        },
        yAxis: {
          type: 'value'
        }
      }
      //初始化图表
      this.chartInstance.setOption(initOption)
    },
    //获取数据
    getData(){
      //获取后台数据
      
      //更新图表
      this.updateChart()
    },
    //更新图表
    updateChart() {
      // 半透明颜色
      const colorArr1 = [
        'rgba(238,156,175,0.5)',
        'rgba(162,244,209,0.5)',
        'rgba(247,243,160,0.5)',
        'rgba(134,203,250,0.5)',
        'rgba(240,198,165,0.5)',
      ]
      // 全透明颜色
      const colorArr2 = [
        'rgba(238,156,175,0)',
        'rgba(162,244,209,0)',
        'rgba(247,243,160,0)',
        'rgba(134,203,250,0)',
        'rgba(240,198,165,0)',
      ]
      //处理数据,设置dataOption
      //X轴数据
      const timeArr = this.allData.common.week
      //Y轴数据
      const valueArr = this.allData[this.showText].data
      const seriesArr = valueArr.map((item, index) => {
        return {
          name:item.name,
          type:'line',
          data:item.data,
          stack:this.showText,
          areaStyle:{
            color:new this.$echarts.graphic.LinearGradient(0,0,0,1,[
              { //0%的颜色值
                offset:0,
                color:colorArr1[index]
              },
              { //100%的颜色值
                offset:1,
                color:colorArr2[index]
              }
            ])
          }
        }
      })
      //图例数据（地区名）
      const areaName = valueArr.map(item => {
        return item.name
      })
      
      const dataOption = {
        legend:{
          data:areaName
        },
        xAxis:{
          data:timeArr
        },
        series:seriesArr
      }
      this.chartInstance.setOption(dataOption)
    },
    //适配图表随浏览器变化而变化
    screenAdapter() {
      //适配文字等大小
      this.titleFontSize = this.$refs.dataLoss_ref.offsetWidth / 100 * 3.6
      
      const adapterOption = {
        legend:{ // 设置图例的大小
          itemWidth:this.titleFontSize,
          itemHeight:this.titleFontSize,
          itemGap:this.titleFontSize
        }
      }
      this.chartInstance.setOption(adapterOption)
      //
      this.chartInstance.resize()
    },
    //切换图表
    handSelect(item) {
      this.showText =item
      this.updateChart()
    }
  }
};
</script>
<style lang="scss" scoped>
.data-loss-container{
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
  .data-container-foot{
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
  .data-chart{
    width: 100%;
    height: 100%;
  }
  .title{
    position:absolute;
    top: 2%;
    left: 4%;
    color: #fff;
    z-index: 100;
    font-size: 20px;
  }
}
</style>