<template>
<!-- 展示效果首页 -->
  <div class="home-container">
    <!-- head -->
    <div class="head">
      <span class="head-title">{{title}}</span>
      <div class="head-time">{{sday}}</div>
    </div>
    <!-- content -->
    <div class="home-content">
      <!-- left -->
      <div class="home-lt">
        <SaleHotspot></SaleHotspot>
        <DataLoss></DataLoss>

      </div>
      <!-- center -->
      <div class="home-cen">
        <Statistic></Statistic>
        <Map></Map>
      </div>
      <!-- right -->
      <div class="home-rg">
        <Script></Script>
      </div>
    </div>
  </div>
</template>

<script>
import SaleHotspot from 'components/SaleHotspot/SaleHotspot'
import DataLoss from 'components/DataLoss/DataLoss'
import Map from 'components/Map/Map'
import Script from 'components/Script/Script'

import Statistic from './common/statistic'
export default {
  name:'Home',
  components: {
    SaleHotspot,
    DataLoss,
    Map,
    Script,

    Statistic
  },
  props: {},
  data() {
    return {
      title:'河南续保服务团队话务数据可视化',
      timer:null,
      sday:null
    };
  },
  computed: {},
  created() {
    
  },
  methods: {
    //动态更新时间
    RealTime() {
      this.timer = setInterval(() => {
        this.sday = this.dayjs().format('YYYY-MM-DD HH:mm:ss')
      },1000)
      
    }
  },
  mounted() {
    this.RealTime()
  },
  beforeDestroy() {
    if (this.timer) {
      clearInterval(this.timer);
    }
  }
};
</script>
<style lang="scss" scoped>
.home-container{
  width: 100%;
  height: 75px;
  .head{
    width: 100%;
    height: 75px;
    position: relative;
    background: url('~assets/img/tbbg.png') no-repeat;
    background-size: 100% 100%;
    text-align: center;
    line-height: 75px;
    color: #fff;
    .head-title{
      font-size: 30px;
      letter-spacing: 1px;
    }
    .head-time{
      position: absolute;
      right: 20px;
      top: 0;
    }
  }
  .home-content{
    width: 100%;
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    .home-cen{
      flex: 1;
    }
    .home-lt, .home-rg{
      width: 500px;
    }
  }
}
</style>