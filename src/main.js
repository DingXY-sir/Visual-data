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
import './assets/css/index.scss'

//引入ElementUI
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

//引入字体图标
import './assets/css/fonts.css'

//引入websocket
// import SocketService from './utils/socket_service'
// console.log(SocketService.Instance.connet())


// SocketService.Instance.connet
//引入粒子效果
import VueParticles from 'vue-particles'
Vue.use(VueParticles)

Vue.use(ElementUI)
Vue.prototype.$echarts = echarts//全局使用$echarts
Vue.prototype.dayjs = dayjs //全局使用this.dayjs

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
