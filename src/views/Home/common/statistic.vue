<template>
  <div class="statistic-container">
    <!--录音转写量  -->
    <div class="real-container" v-for="(item, index) in staticData" :key="index">
      <img :src=item.img alt="" class="item-img">
      <div class="item-data">
        <p>10000</p>
        <p>{{item.text}}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  props: {},
  data() {
    return {
      staticData:[
        {
          text:"录音转写量(万)",
          img:require("@/assets/img/tran.png")
        },
        {
          text:"成单录音量(万)",
          img:require("@/assets/img/order.png")
        },
        {
          text:"疑似违规(万)",
          img:require("@/assets/img/real.png")
        },
        {
          text:"实时预警(万)",
          img:require("@/assets/img/excellent.png")
        }
      ]
    };
  },
  watch: {},
  computed: {},
  methods: {},
  created() {},
  mounted() {}
};
</script>
<style lang="scss" scoped>
.statistic-container{
  width: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  .real-container{
    display: flex;
    flex:1;
    color: #fff;
    line-height: 2px;
    margin-top: 20px;
    .item-img{
      width: 75px;
      height: 75px;
      margin: auto 0;
    }
    .item-data>p:nth-child(1){
      font-size: 26px;
    }
    .item-data>p:nth-child(2){
      font-family: cursive;
      font-size: 12px;
    }
  }
}
</style>