<template>
  <div>
    <div class="box">
      <div class="box1">
        <van-icon name="chat-o" />
      </div>
      <div style="clear:both"></div>
      <div class="login">
        <div class="box2" @click='login' v-show="isshow">
          <img  src="http://localhost:7000/header/2.jpg" alt />
        </div>
        <div class="box3" v-show="isshow">
          <span @click='login'>登录/注册</span>
        </div>

          <div class="box2" @click='setUp' v-show="!isshow">
          <img  :src="loginInfo.picUrl" alt />
        </div>
        <div class="box4" v-show="!isshow" @click='setUp'>
          <h1 >{{loginInfo.nickname}}</h1>
           <h2 >用户名：{{loginInfo.token}}</h2>
        </div>
      </div>

      <!--  -->
      <div class="order">
        <div class="order-top">
          <span>我的订单</span>
        </div>
        <div class="order-content">
          <div @click="pay">
            <img src="http://localhost:7000/shopimage/pay.jpg" alt />
            <div>
              <span>待付款</span>
            </div>
          </div>
          <div @click="fahuo">
            <img src="http://localhost:7000/shopimage/fahuo.jpg" alt />
            <div>
              <span>待发货</span>
            </div>
          </div>
          <div @click="shouhuo">
            <img src="http://localhost:7000/shopimage/shouhuo.jpg" alt />
            <div>
              <span>待收货</span>
            </div>
          </div>
          <div>
            <img src="http://localhost:7000/shopimage/shouhou.jpg" alt />
            <div>
              <span>售后</span>
            </div>
          </div>
          <div id="baokou">
            <span class="iconfont icon-dakuohao"></span>
          </div>

          <div @click="allorder">
            <img src="http://localhost:7000/shopimage/AfterSale.jpg" alt />
            <div>
              <span>全部订单</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="keng">
      <div class="zhangdan">
        <div class="order-top">
          <span>我的账单</span>
        </div>
        <div class="order-content">
          <div class="img">
            <div class="zhangdan-4">
              <span>0</span>
            </div>
            <div>
              <span>订单数</span>
            </div>
          </div>
          <div class="img">
            <div class="zhangdan-4">
              <span>0</span>
            </div>
            <div>
              <span>总金额</span>
            </div>
          </div>
          <div class="img">
            <div class="zhangdan-4">
              <span>0.0</span>
            </div>
            <div>
              <span>已付款</span>
            </div>
          </div>
          <div class="img">
            <div class="zhangdan-4">
              <span>0.0</span>
            </div>
            <div>
              <span>未还金额</span>
            </div>
          </div>
          <div id="baokou">
            <span class="iconfont icon-dakuohao"></span>
          </div>

          <div class="img">
            <img src="http://localhost:7000/shopimage/bill.jpg" alt />
            <div class="span">
              <span>全部账单</span>
            </div>
          </div>
        </div>
      </div>
       <div class="zhangdan serve">
        <div class="order-top">
          <span>个人服务</span>
        </div>
        <div class="serve-content">
          <div class="img">
             <img src="http://localhost:7000/shopimage/credit.jpg" alt />
            <div>
              <span>信用额度</span>
            </div>
          </div>
          <div class="img">
             <img src="http://localhost:7000/shopimage/heart.jpg" alt />
            <div>
              <span>我的关注</span>
            </div>
          </div>
          <div class="img" @click="addrss">
            <img src="http://localhost:7000/shopimage/address.jpg" alt />
            <div >
              <span>收货地址</span>
            </div>
          </div>
          <div class="img">
             <img src="http://localhost:7000/shopimage/customer.jpg" alt />
            <div>
              <span>我的客服</span>
            </div>
          </div>
          <div class="img">
            <img src="http://localhost:7000/shopimage/aboout.jpg" alt />
            <div class="span">
              <span>关于我们</span>
            </div>
          </div>
            <div class="img" @click='setUp'>
            <img src="http://localhost:7000/shopimage/setUp.jpg" alt />
            <div class="span">
              <span>设置</span>
            </div>
          </div>

        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Toast } from 'vant';
export default {
  data(){
    return{
                loginInfo:[],
                isshow:true
    }
  },
  mounted(){
      //  console.log(this.$cookieStore.getCookie('tel'))
       if(this.$cookieStore.getCookie('tel')){
       this.api.login({tel:this.$cookieStore.getCookie('tel')}).then(res=>{
         this.isshow=false
         this.loginInfo=res.data[0]
         console.log(this.loginInfo)
       })
         }else{
             this.isshow=true
         }
        
  },
  methods:{
    login(){
      console.log('11')
      this.$router.push({
        path:'/login'
      })
    },
    setUp(){
      console.log('设置')
      this.$store.commit("tarbarishow", false);
      this.$router.push({
        path:'/setUp'
      })
    },
    addrss(){
      this.$store.commit("tarbarishow", false);
      this.$router.push({
        path:'/address?mine=1'
      })
    },
    pay(){
      this.$store.commit('tarbarishow',false)
        if (!this.$cookieStore.getCookie("tel")) {
      this.$router.push({
        path: "/login"
      });
      Toast("请先登录");
      return
    }
      this.$router.push({
        path:'/order?value=1'
      })
    },
    fahuo(){
      this.$store.commit('tarbarishow',false)
        if (!this.$cookieStore.getCookie("tel")) {
      this.$router.push({
        path: "/login"
      });
      Toast("请先登录");
      return
    }
      this.$router.push({
        path:'/order?value=2'
      })
    },
    shouhuo(){
       this.$store.commit('tarbarishow',false)
         if (!this.$cookieStore.getCookie("tel")) {
      this.$router.push({
        path: "/login"
      });
      Toast("请先登录");
      return
    }
      this.$router.push({
        path:'/order?value=3'
      })
    },
    allorder(){
       this.$store.commit('tarbarishow',false)
         if (!this.$cookieStore.getCookie("tel")) {
      this.$router.push({
        path: "/login"
      });
      Toast("请先登录");
      return
    }
      this.$router.push({
        path:'/order?value=0'
      })
    }
  }
};
</script>

<style scoped>
.keng {
  background: rgb(248, 244, 244);
  padding: 13vw 5vw 2vw 5vw;
  padding-bottom:10vw;
}
.box {
  background: #65bb56;
  padding: 0 5vw;
  position: relative;
  padding-bottom: 5vw;
}
.box1 {
  margin: 5vw 2vw 1vw 2vw;
  float: right;
  font-size: 18px;
  color: white;
}
.box2 {
  width: 18vw;
  height: 18vw;
  border-radius: 50%;
  overflow: hidden;
  margin-right: 2vw;
}
.box2 img {
  width: 100%;
  height: 100%;
}
.login {
  display: flex;
  padding: 0vw 0vw 23vw 0vw;
  box-sizing: border-box;
}
.box3 {
  color: white;
  font-size: 15px;
  margin-top: 3vw;
}
.order {
  width: 90vw;
  height: 32vw;
  background: white;
  position: absolute;
  bottom: -10vw;
}
.order-content {
  display: flex;
  justify-content: space-evenly;
  text-align: center;
  padding-bottom: 5vw;
}
.order-content .img {
  width: 15vw;
  height: 15vw;
  border-radius: 2vw;
}
.order-content div img {
  width: 68%;
  height: 74%;
}
.order-content div span {
  font-size: 11px;
  text-align: center;
}
.order-top span {
  display: inline-block;
  font-size: 13px;
  margin: 3vw;
}
#baokou {
  width: 3vw;
  font-size: 25px;
  margin-top: 4vw;
  margin-right: 4vw;
}
#baokou span {
  font-size: 40px;
  color: gray;
}
.zhangdan {
  background: white;
}
.img .span {
  padding-bottom: 2vw;
}
.zhangdan-4 {
  width: 15vw;
  height: 12vw;
  font-size: 15px;
  display: inline-block;
}
.zhangdan-4 span {
  margin-top: 5vw;
  align-items: center;
  display: inline-block;
  font-size: 15px !important;
}
.serve{
    margin-top: 3vw;
}
.serve-content{
    display: flex;
    flex-wrap:wrap;
    padding-bottom: 8vw;
  text-align: center;
}
.serve-content .img {
  width: 25%;
  height: 25%;
  border-radius: 2vw;
}
.serve-content div img {
  width: 45%;
}
.serve-content div span {
  font-size: 11px;

}

.box4 h1,h2{
  color:white;
  margin:0
}
.box4 h1{
  margin-top:3vw;
  font-size:18px;
}
.box4 h2{
     font-size: 12px;
}
</style>