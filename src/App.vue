<template>
  <div id="app">
    <div id="nav">
      <!-- <router-link to="/">Home</router-link>  -->
    </div>
    <router-view/>
  <div class="tarbar" v-show="isshow">
        <van-tabbar v-model="active" >
        <van-tabbar-item name="home"   to='/' icon="home-o">首页</van-tabbar-item>
        <van-tabbar-item name="Notch" to="/Notch" icon="shop-o" >档口</van-tabbar-item>
        <van-tabbar-item name="more" to="/More" icon="apps-o">好多果</van-tabbar-item>
        <van-tabbar-item name="lanzi" to='/basket' icon="shopping-cart-o">果篮子</van-tabbar-item>
        <van-tabbar-item name="mine" to='/mine' icon="contact">我的</van-tabbar-item>
       
      </van-tabbar>
    </div>
  </div>
</template>
   <script>
   import Vue from 'vue';
   
import { Dialog } from 'vant';
Vue.use(Dialog);
import { Toast } from 'vant';
Vue.use(Toast);

import {setCookie, getCookie, delCookie} from '../cookie.js'
    export default {
         data(){
             return{
                 active:'home',
                 id:'123',
                 isshow:true
             }
         },
         beforeMount () {
     Vue.prototype.$cookieStore = {
      setCookie,
       getCookie,
      delCookie
    }
  },

         mounted(){
          this.id=this.$route.query.id,
                // console.log(this.$route.path)
               this.tarbar(this.$route.path)
         },
         updated(){
            this.isshow=this.$store.state.isshow
            // console.log(this.$route.query.tarbar)
            // this.active=this.$store.state.tarbar
            if(this.$route.query.tarbar!=undefined){
                      this.active=this.$route.query.tarbar
            }
           
          //  this.active=this.$store.state.tarbar
          //  console.log(this.$store.state.tarbar)
         },
         watch:{
           tarbar(){
             console.log('11111111111')
           }
         },
         methods:{
                 tarbar(value){
                   if(value=="/More"){
                     this.active='More'
                   }
                    if(value=="/Notch"){
                     this.active='More'
                   }
                   if(value=="/"){
                     this.active='home'
                   }
                 } 
              
         }
    }
</script>
<style>
   
</style>
