import Vue from 'vue'
import VueRouter from 'vue-router'


Vue.use(VueRouter)

const Home = () => import ('views/Home/home')
const Login = () => import ('views/Login/login')

const routes = [
  {path:'/', redirect:'/login'},
  {path:'/home', name:'Home', component:Home},
  {path:'/login', name:'Login', component:Login},
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  //1、判断访问路径是否等于login
  if(to.path === '/login') return next()
  //2、如果访问系统内路径，判断是否携带token
  const token = window.sessionStorage.getItem('token')
  if(!token) return next('/login')
  next()
})

export default router
