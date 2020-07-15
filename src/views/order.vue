<template>
  <div>
    <div v-if='isshow'>
      <div class="box">
        <i class="iconfont icon-jiantou-copy" @click="btn"></i>
        <span v-text="title"></span>
        <em>订单统计</em>
      </div>
      <div class="box1">
        <van-tabs v-model="active" animated line-height="0.5vw" title-active-color="#65bb65">
          <van-tab v-for="(item,index) in titleArry" :title="item" :key="index">
            <div v-show="!nothing" class="nothing">
                  <img src="http://localhost:7000/header/nothing.png" alt="">
            </div>
            <div class="box2" v-show="nothing">
              <div v-for="(item,index) in orderList" :key="index" class="style">
                <div class="hang"></div>
                <div class="box2-top">
                  <van-icon name="shop-o" />
                  <span v-text="item.shopname"></span>
                  <van-icon class="right-icon iconr" name="arrow" />
                </div>
                <div class="box2-content" @click="detali(item.commodity)">
                  <div class="left">
                    <img :src="item.picurl" alt />
                  </div>
                  <div class="right">
                    <div class="right-flex">
                      <div class="right-center">
                        <span v-text="item.title"></span>
                        <p v-text="item.sk"></p>
                      </div>
                      <div class="right-right">
                        <h1>￥{{item.price*item.number}}</h1>
                        <h2>共{{item.number}}件</h2>
                      </div>
                    </div>
                  </div>
                </div>
                 <div class="button">
                      <van-button plain type="warning" color='red'>代称重</van-button>
                      <van-button plain type="default" disabled color='gray'>去支付</van-button>
            </div>
              </div>
              
            </div>
           
          </van-tab>
        </van-tabs>
      </div>
    </div>
    <div class="detali" v-else>
      <orderdetali :orderdetali='orderdetali' @event='partent'></orderdetali>
    </div>
  </div>
</template>

<script>
import orderdetali from '@/components/orderdetali.vue'
import { Toast } from "vant";
export default {
  components:{
        orderdetali 
  },
  data() {
    return {
      title: "我的订单",
      active: 2,
      titleArry: ["全部", "待支付", "待发货", "代收货", "已完成"],
      orderList: [],
      orderdetali:'',
      isshow:true,
      nothing:false
    };
  },
  mounted() {
    console.log(this.$route.query.value);
    this.active = Number(this.$route.query.value);
  
  },
  methods: {
    btn() {
      this.$store.commit("tarbarishow", true);
      this.$router.push({
        path:'/mine?tarbar=mine'
      })
    },
    refesh() {
      this.api
        .getOrder({
          tel: this.$cookieStore.getCookie("tel"),
          active: this.active
        })
        .then(data => {
        
          if(data.data=='nothing'){
            this.nothing=false
          console.log(data);
            console.log(1111)
            return
          }else{
            this.nothing=true
             this.orderList = data.data;
          }
           
        });
    },
    detali(value){
      this.commodity=value
      console.log(value)
      this.api.getOrderDetali({tel:this.$cookieStore.getCookie('tel'),commodity:value}).then(data=>{
                this.isshow=false
                this.orderdetali=data.data[0]
                 console.log(this.orderdetali)
            }) 
    },
    partent(value){
      this.isshow=value
    }
  },
  watch: {
    active(value) {
      this.refesh();
    }
  }
};
</script>

<style scoped>

.box {
  padding: 8vw 5vw;
  width: 100%;
  box-sizing: border-box;
  position: fixed;
  justify-content: space-around;
  text-align: center;
  align-content: center;
  top: 0;
  background: white;
  z-index: 222;
  padding-bottom: 1vw;
}
.box i {
  float: left;
  font-size: 18px;
}
.box em {
  float: right;
  margin-top: 3px;
  font-style: normal;
  font-size: 2.5vw;
}
.box1 {
  margin-top: 17vw;
}
.box1 /deep/ .van-tabs__wrap--scrollable .van-tab {
  flex: 0 0 19% !important;
}
.box1 /deep/ .van-tabs__line {
  background: #65bb65;
}

.box2-top {
  display: flex;
  align-items: center;
  padding: 2vw 5vw;
}
.left {
  padding: 2vw;
  width: 23vw;
  height: 23vw;
  border-radius: 10vw;
  overflow: hidden;
}
.left img {
  width: 100%;
  height: 90%;
}
.box2-content {
  display: flex;
  justify-content: space-between;
  padding: 0 5vw;
}
.right-flex {
  display: flex;
  justify-content: space-between;
}
.box2-top span {
  display: inline-block;
  margin: 0 2vw;
  font-size: 13px;
}
.right-center span {
  display: inline-block;
  margin-top: 2vw;
  font-size: 13px;
  width: 47vw;
}
.right-center p {
  font-size: 12px;
  color: #65bb56;
}
.iconr {
  font-size: 13px;
  color: gray;
}
.right-right h1 {
  display: inline-block;
  margin-top: 2vw;
  font-size: 18px;
  margin-bottom: 0;
  font-weight: 500;
}
.right-right h2 {
  font-size: 12px;
  margin: 0;
  color: gray;
  text-align: right;
  font-weight: normal;
}
.button{
  float: right;
  padding: 0 5vw;
}
.button /deep/ .van-button{
  height: 8vw;
  width: 19vw;
  font-size: 13px;
  margin-right: 2vw;
  border-radius: 5vw;
}
.style{
  padding-bottom: 10vw;
}
.hang{
  width:100%;
  height:1.5vw;
  background:rgb(241, 238, 238);
}
.nothing{
  width: 100%;
}
.nothing img{
  width: 100%;
  height: 100%;
}
</style>