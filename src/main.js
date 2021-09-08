import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
//引入eachrts
import * as echarts from 'echarts'

//引入day.js
import dayjs from 'dayjs'

//引入lib-flexible
import 'lib-flexible'

//引入全局css
import './assets/css/index.css'

Vue.prototype.$echarts = echarts//全局使用$echarts
Vue.prototype.dayjs = dayjs //全局使用this.dayjs

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
