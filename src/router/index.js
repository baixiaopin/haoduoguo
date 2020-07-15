import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Notch from '../views/Notch.vue'
import More from '../views/more.vue'
import Detali from '../views/detali.vue'
import shopDetali from '../views/shopDetali.vue'
import shopXinxi from '../views/shopXinxi.vue'
import basket from '../views/basket.vue'
import mine from '../views/mine.vue'
import login from '../views/login.vue'
import register0 from '../views/register0.vue'
import register1 from '../views/register1.vue'
import setUp from '../views/setUp.vue'
import personinfo from '../views/personinfo.vue'
import search from '../views/search.vue'
import address from '../views/address.vue'
import order from '../views/order.vue'
import orderPage from '../views/orderPage.vue'
Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },{
    path: '/Notch',
    name: 'Notch',
    component: Notch
  },{
    path: '/More',
    name: 'More',
    component: More
  },{
    path: '/Detali',
    name: 'Detali',
    component: Detali
  },{
    path: '/shopDetali',
    name: 'shopDetali',
    component: shopDetali
  },{
    path: '/shopXinxi',
    name: 'shopXinxi',
    component: shopXinxi
  },{
    path: '/basket',
    name: 'basket',
    component: basket
  },{
    path: '/mine',
    name: 'mine',
    component: mine
  },{
    path: '/login',
    name: 'login',
    component: login
  },{
    path: '/register0',
    name: 'register0',
    component: register0
  },{
    path: '/register1',
    name: 'register1',
    component: register1
  },{
    path: '/setUp',
    name: 'setUp',
    component: setUp
  },{
    path:'/personinfo',
    name:'/personinfo',
    component:personinfo
  },{
    path:'/search',
    name:'search',
    component:search
  },{
    path:'/address',
    name:'address',
    component:address
  },{
    path:'/order',
    name:'order',
    component:order
  },{
    path:'/orderPage',
    name:'orderPage',
    component:orderPage
  }
]

const router = new VueRouter({
  routes
})

export default router
