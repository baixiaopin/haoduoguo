<template>
  <div>
    <!-- <div> <van-nav-bar title='商品详情'  left-arrow @click-left="$router.go(-1)"/></div>  -->
    <div class="top">
      <div class="left">
        <i class="iconfont icon-arrow-left" @click="$router.go(-1)"></i>
      </div>
      <div class="right">
        <i class="iconfont icon-share"></i>
      </div>
    </div>
    <div class="img">
      <van-swipe @change="onChange" >
        <van-swipe-item v-for="(item,index) in detaliList.picUrl" :key="index">
                <img :src="item" alt="">
        </van-swipe-item>
       
        <template #indicator>
          <div class="custom-indicator">{{ current + 1 }}/{{total}}</div>
        </template>
      </van-swipe>
    </div>
 
    <div class="box1">
        <div class="box1-left">
            <span v-text="detaliList.price"></span><del v-text='detaliList.oldprice'></del>
        </div>
        <div class="box1-right">
            <i class="iconfont icon-xin"></i>
            <h2>关注</h2>
        </div>
    </div>
    <div class="box2">
            <h2 v-text="detaliList.title"></h2>
             <h3 v-text="detaliList.sk"></h3>
             起售:<span v-text='detaliList.sale'></span>件&nbsp;&nbsp;&nbsp;
             已售:<span v-text='detaliList.saled'></span>斤&nbsp;
    </div>
<!--  -->
<div class="hang"></div>
<!--  -->
 <div class='box3'>
     <span>产地</span><em v-text="detaliList.product"></em>
 </div>
 <div class='box3' id="box4">
     <span>规格</span><em v-text="detaliList.specifications"></em>
 </div>
 <div class='box3' id="box4">
     <span>服务</span><em v-text="detaliList.server"></em>
 </div>
 <div class='box3' id="box4">
     <span>自提</span><i class="iconfont icon-location"></i><em v-text="detaliList.address"></em>
 </div>
  <div class='box3' id="box4">
     <span  @click="guigeData">已选</span><em v-text="guige" ></em><em v-text="value" @click="guigeData"></em>
     <em @click="guigeData" class="youjiantuo">件</em>
     <i class="iconfont icon-arrow-backimg"></i>
     <van-popup
   v-model="show"
   closeable
   position="bottom"
   :style="{ height: '70%' }"
  >
      <div class="box4-img"><img :src="img" alt=""></div>
      <div id="box4-price"><span  v-text="detaliList.price"></span></div>
      <div style="clear:both"></div>
        <h3>级别</h3>
      <div><h4>一级</h4></div>
    <div class="number">  <span>数量</span><van-stepper v-model="value" /> 
    </div>
    <div id='btn'><van-button @click="btn"  size="large" round type="primary"><span>确定</span></van-button></div>
</van-popup>
 </div>
 <!--  -->
 <div>
     <div class="shop">
       <div class="shopimg"><img :src="detaliList.shopPic" alt=""></div>
        <div class="shopname"><span v-text='detaliList.shopname'></span></div>
         <div class="dian" @click="shopDetali(detaliList.shopid)"><span>进店逛逛</span></div>
     </div>
     <div class='commodityDetali'>
       <img :src="detaliList.commodityDetali" alt="">
     </div>
 </div>


  <!--  -->
  <div class="kong">

  </div>
    <div class="car">
      <van-goods-action>
        <van-goods-action-icon icon="chat-o" text="客服" />
        <van-goods-action-icon icon="cart-o" @click='gotoCar' text="购物车" :badge='badge' />
        <van-goods-action-icon icon="shop-o" text="店铺" badge />
        <van-goods-action-button type="warning" @click="onClickCar(commodity)" text="加入购物车" />
        <van-goods-action-button type="danger" text="立即购买" />
      </van-goods-action>
    </div>
  </div>
</template>

<script>
import { GoodsAction, GoodsActionIcon, GoodsActionButton, Toast } from "vant";
import Vue from "vue";
Vue.use(GoodsAction);
Vue.use(GoodsActionButton);
Vue.use(GoodsActionIcon);
export default {
  data() {
    return {
      detaliList: [],
       current: 0,
       total:0,
       show:'',
       guige:'',
       show:false,
       guige:'一级',
       img:'',
       value:'1',
       commodity:'',
       badge:0
    };
  },
  mounted() {
    console.log(this.$route.params.id);
  
    this.api.getHotDetaliData({id:  this.$cookieStore.getCookie( 'commodity')}).then(data => {
      this.detaliList = data.data[0];
      console.log(this.detaliList);
      this.commodity=data.data[0].commodity
      this.img=this.detaliList.picUrl[0];
      this.total=data.data[0].picUrl.length
    });
    if(!this.$cookieStore.getCookie('tel')){

    }else{
    this.api.getCarData({tel:this.$cookieStore.getCookie('tel')}).then(data=>{
      // console.log(data.data)
      data.data.forEach(element => {
             this.badge+=element.number 
      });
    })
    }
  },
  methods:{
    shopDetali(value){
      console.log(value)
       this.$router.push({
                path:'/shopDetali?shopid='+value
            })
    },
      onChange(index) {
      this.current = index;
    },
    guigeData(){
     
      this.show=true
    },
    btn(){
       this.show=false
    },
    onClickCar(value){
      if(!this.$cookieStore.getCookie('tel')){
        Toast('请登录')
        this.$router.push({
          path:'/login'
        })
      }else{
      Toast('添加成功')
      console.log(value)
       this.badge=this.badge+1
      console.log(this.$cookieStore.getCookie('tel'))
      this.api.addCarData({commodity:value,tel:this.$cookieStore.getCookie('tel'),
                            shopname:this.detaliList.shopname,
                            picUrl:this.detaliList.picUrl[0],
                            price:this.detaliList.price,
                            title:this.detaliList.title,
                            sk:this.detaliList.sk,
                            serve:this.detaliList.server,
                            address:this.detaliList.address}).then(res=>{
        console.log(res)
      })
       }
    },
    gotoCar(){
      console.log('123456')
      this.$store.commit("tarbarishow", true);
     
       this.$router.push({
           path:'/basket?tarbar=lanzi'
         })
    }
  },
  
};
</script>

<style scoped>
.commodityDetali img{
   width:96%;
}
.commodityDetali{
  width:100%;

}
.dian span{
  color:white;
  font-size:12px
}
.dian{
  padding: 2vw 2vw;
  border-radius: 5vw;
  background: #65bb56;
  margin-left: 35vw;
}
.shopname {
  margin-left: 2vw;
   font-size:15px
}
.shopimg img{
  width: 100%;
  height: 100%;
}
 .shopimg{
  width: 15vw;
  height: 15vw;
}
.shop{
  display: flex;
  margin: 5vw;
  align-items: center;
}
#btn span {
color: white;
}
#btn{
  margin-top:15vw;
  padding: 5vw;
}
.youjiantuo{
  padding-right: 60vw;
}
.number{
  margin: 0 5vw;
  display: flex;
  justify-content: space-between;
}
#box4 div h4{
  margin-left:15vw;
  font-size: 15px;
  display: inline-block;
  padding: 1vw 2vw;
  font-weight: 500;
  border-radius: 5vw;
  background: hsl(113, 32%, 85%,0.4);
  border: 1px solid #65bb56;
  margin-top: 0;
}
#box4 h3{
   font-weight: 400;
  margin-left:5vw;
  font-size: 15px;
}
#box4-price span{
   font-weight: 500;
  color: red;
  font-size:13px;
}
#box4-price{
  margin-top: 23vw;
}
.box4-img{
  width: 22vw;
  height: 22vw;
  margin: 5vw;
  float: left;
}
.box4-img img{
  width: 100%;
  height: 100%;
 
}
#box4 i{
    margin-left: 2vw;
    font-size: 12px;
    color: rgb(201, 194, 194);
}
#box4{
  border-bottom: 1vw solid rgb(240, 239, 239,0.5);
}
.box3 em{
  font-style: normal;
  font-size: 12px;
  margin-left: 2vw;
}
.box3 span{
  font-size: 12px;
  color: rgb(182, 174, 174);
}
.box3{
  padding: 3vw 2vw 3vw 5vw;
  border-bottom: 1px solid rgb(235, 232, 232);
  box-sizing: border-box;
}
.hang{
    margin-top: 3vw;
    width: 100%;
    height: 1vw;
    background: rgb(235, 232, 232);
}
.box2 h3{
    font-size: 13px;
     font-weight: normal;
     color: #65bb56;
    margin: 1vw 0;
}
.box2 h2{
    font-size: 14px;
    margin: 0;
    color: black;
}
.box2{
    margin: 0 5vw;
    color: gray;
    font-size: 12px;
}
.box1-left del{
    font-size:12px;
     color:gray
}
.box1-left span{
     color:red
}
.box1-left{
    margin-top:3vw
}
.box1-right{
   text-align: center;
}
.box1-right i{
  font-size: 12px;
}
.box1-right h2{
    margin: 0;
    padding: 0;
  font-size: 12px;
  text-align: center;
  font-weight: normal;
}
.box1{
    display: flex;
    margin: 5vw 5vw 2vw 5vw;
    justify-content: space-between;
}
.van-goods-action {
  z-index: 111;
}
.van-goods-action-button--first {
  margin-right: 5vw;
  border-radius: 10vw;
}
.van-goods-action-button--warning {
  background: #65bb56;
}
.van-goods-action-button--danger {
  margin-right: 3vw;
  border-radius: 10vw;
}
.van-goods-action-button {
  font-size: 12px;
}
.car /deep/.van-info {
  background-color: #65bb56 !important;
}
.top {
  padding: 5vw;
  position: fixed;
  top: 0;
  z-index: 999;
}
.top .left{
  float:left;   
}
.top .right{
    margin-left: 75vw;
    float:right;
}
.top div i {
  color: white;
  border-radius: 50%;
  padding: 1.2vw;
  background: rgb(17, 16, 16, 0.2);
}
 .custom-indicator {
    position: absolute;
    right: 5px;
    bottom: 5px;
    padding: 2px 5px;
    font-size: 12px;
    border-radius: 5vw;
    color: white;
    background: rgba(0, 0, 0, 0.3);
  }
  .img{
      width: 100%;
     
  }
  .img img{
      width: 100%;
      height: 100%;
  }
  .kong{
    height: 22vw;
    width: 100%;
  }
</style>