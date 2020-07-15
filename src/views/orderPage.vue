<template>
  <div>
    <div v-show="bank==1">
      <div class="box">
        <i class="iconfont icon-jiantou-copy" @click="btn"></i>
        <span>确认订单</span>
      </div>
      <div class="box1">
        <div class="box2">
          <div class="box3">
            <span>支付方式</span>
            <em>在线支付</em>
          </div>
        </div>
        <div class="box4">
          <div class="shop">
            <van-icon name="shop-o" />
            <span v-text="orderList.shopname"></span>
          </div>
          <div class="box5">
            <van-swipe-cell>
              <van-card
                :num="orderList.number"
                :price="orderList.price"
                :desc="orderList.sk"
                :title="orderList.title"
                class="goods-card"
                :thumb="orderList.picurl"
              />
              <div class="box6">
                <span>配送</span>
                <em v-text="orderList.serve"></em>
              </div>
              <div class="box7">
                <span>提货地址</span>
                <em v-text="orderList.address"></em>
              </div>
            </van-swipe-cell>
          </div>
        </div>
        <div class="box3">
          <span>发票</span>
          <em>不开发票</em>
        </div>
        <div class="bottom">
          <div class="box9">
            <span>商品金额</span>
            <em v-text="total"></em>
          </div>
          <div class="box8">
            <span>运费</span>
            <em>￥0.0</em>
          </div>
        </div>
        <div class="last-bottom">
          <div class="left">
            <span v-text="total">123</span>
          </div>
          <div class="right">
            <van-button round plain type="primary" @click="goweight">去称重</van-button>
            <van-button round type="primary" @click="order">提交订单</van-button>
          </div>
        </div>
      </div>
    </div>
    <div class="mask">
      <van-overlay :show="show" @click="show = false">
        <div class="wrapper" @click.stop>
          <div class="block">
            <div class="mask-content">
              <span>您的订单选择了自提货方式，确认下单？</span>
            </div>
            <div class="button">
              <button @click="concal">取消</button>
              <button @click="confirm">确认</button>
            </div>
          </div>
        </div>
      </van-overlay>
    </div>

    <div class="ding" v-show="bank==2">
      <div>
        <div class="box">
          <i class="iconfont icon-jiantou-copy" @click="btn2"></i>
          <span>支付订单</span>
        </div>
        <div class="box2">
          <div class="bank-totla">
            <span v-text="total"></span>
          </div>
          <div class="bank-bottom">
            <div>
              <i class="iconfont icon-nongyeyinhang color"></i>
              <span>农行综合收银台</span>
            </div>
            <div>
              <van-radio-group v-model="radio">
                <van-radio name="1" checked-color="#07c160"></van-radio>
              </van-radio-group>
            </div>
          </div>
        </div>
        <div class="lastbottom">
          <van-button round type="primary" size="large" @click="pay">立即支付</van-button>
        </div>
      </div>
    </div>
    <div class="weight">
      <div class="mask">
        <van-overlay :show="showweight" @click="show = false">
          <div class="wrapper" @click.stop>
            <div class="block">
              <div class="mask-content">
                <span>请问您是否先去称重再来支付此订单？</span>
              </div>
              <div class="button">
                <button @click="concalweight">取消</button>
                <button @click="confirmweight">确认</button>
              </div>
            </div>
          </div>
        </van-overlay>
      </div>
    </div>
    <div class="weight_2" v-show="bank==3">
      <div>
        <div class="box box-weight">
          <i class="iconfont icon-jiantou-copy" @click="btn3"></i>
          <span>商品称重</span>
        </div>
        <div class="box2">
          <div class="cilck">
            <i class="iconfont icon-dengdaizhong"></i>
          </div>
          <div class="shop">
            <span>等待商家称重结果中~</span>
          </div>
          <div class="p">
            <p>请稍后在待支付订单中查看称重处理结果并完成支付!</p>
          </div>
          <div class="bun">
            <van-button plain round type="primary" @click="goOrder">查看订单</van-button>
            <van-button round type="primary" @click="home">回到首页</van-button>
          </div>
        </div>
       
      </div>
    </div>
  </div>
</template>

<script>
import { Toast } from "vant";
export default {
  data() {
    return {
      commodity: [],
      orderList: [],
      total: 0,
      radio: "1",
      show: false,
      bank: 1,
      showweight: false,
      showweight2:false,
    };
  },
  mounted() {
    this.commodity = this.$route.params.commodityList.split(",");
    console.log(this.commodity);
    this.api
      .getorderData({
        tel: this.$cookieStore.getCookie("tel"),
        commodity: this.commodity[0]
      })
      .then(data => {
        this.orderList = data.data[0];
        data.data.forEach(element => {
          element.price = element.price.replace(/[^0-9.]/gi, "");
          this.total = "￥" + (element.price * element.number).toFixed(2);
        });
        console.log(this.orderList)
      });
  },
  created(){
     this.$store.commit("tarbarishow",false);
  },
  methods: {
    btn() {
      this.$router.go(-1);
      this.$store.commit("tarbarishow",true);
    },
    btn2() {
      this.bank = 1;
    },
    order() {
      this.show = true;
    },
    concal() {
      this.show = false;
    },
    confirm() {
      this.bank = 2;
      this.show = false;
    },
    pay() {
      Toast("您尚未下载中国农业银行app，无法进行支付。");
    },
    goweight() {
      this.showweight = true;
    },
    concalweight() {
      this.showweight = false;
    },
    confirmweight() {
     this.bank=3
     this.showweight=false
     this.api.saveOrder({tel:this.$cookieStore.getCookie('tel'),
                         commodity:this.orderList.commodity,
                         number:this.orderList.number,
                         shopname:this.orderList.shopname,
                         picurl:this.orderList.picurl,
                         price:this.orderList.price,
                         title:this.orderList.title,
                         sk:this.orderList.sk,    
                         serve:this.orderList.serve}).then(data=>{
       console.log(data)
     })
    },
    btn3(){
      this.$store.commit("tarbarishow",true)
       this.$router.go(-1)
    },
    home(){
      this.$store.commit("tarbarishow",true);
      this.$router.push({
        path:'/?tarbar=home'
      })
    },
    goOrder(){
      this.$router.push({
        path:'/order?value=1'
      })
    }
  }
};
</script>

<style scoped>
.box {
  padding: 6vw 5vw;
  width: 100%;
  box-sizing: border-box;
  position: fixed;
  justify-content: center;
  text-align: center;
  top: 0;
  background: #65bb56;
  z-index: 22;
  color: white;
}
.box i {
  float: left;
  font-size: 18px;
  color: white;
}
.box em {
  float: right;
}
.box1 {
  background: rgb(250, 249, 249);
  height: 100vh;
}
.box2 {
  padding-top: 18vw;
}
.box3 {
  display: flex;
  justify-content: space-between;
  background: white;
  margin: 3vw 3vw;
  padding: 4vw 5vw;
  border-radius: 5vw;
  font-size: 3.5vw;
}
.box3 em {
  font-style: normal;
}
.box4 {
  background: white;
  padding: 3vw;
  margin: 2vw 4vw;
  border-radius: 5vw;
}
.box4 /deep/ .van-card {
  background: white;
}
.box4 /deep/ .van-card__desc {
  margin-top: 3vw;
  font-size: 1vw;
}
.box6 {
  display: flex;
  justify-content: space-between;
  font-size: 2.5vw;
}
.box6 em {
  font-style: normal;
}
.box7 {
  display: flex;
  justify-content: space-between;
  font-size: 2.5vw;
  padding: 2vw 0;
}
.box7 em {
  font-style: normal;

  color: rgb(161, 158, 158);
}
.bottom {
  background: white;
  margin: 3vw 3vw;
  padding: 4vw 5vw;
  border-radius: 5vw;
  font-size: 3vw;
}
.box8 {
  margin-top: 5vw;
  display: flex;
  justify-content: space-between;
}
.box9 {
  display: flex;
  justify-content: space-between;
}
.box5 /deep/ .van-card__thumb {
  width: 20vw;
  height: 20vw;
}
.box9 em {
  font-style: normal;
}
.box8 em {
  font-style: normal;
}
.right /deep/ .van-button {
  height: 9vw;
  margin-left: 1vw;
}
.right /deep/ .van-button--normal {
  font-size: 13px;
}
.last-bottom {
  padding: 3vw 0;
  position: fixed;
  bottom: 0;
  z-index: 999;
  background: white;
  width: 100%;
}
.left {
  margin-top: 2vw;
  float: left;
  padding-left: 5vw;
}
.left span {
  color: #65bb56;
}
.right {
  float: right;
  padding-right: 5vw;
}
.mask /deep/ .van-overlay {
  z-index: 9999;
}
.wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}

.block {
  width: 52vw;
  height: 20vw;
  border-radius: 5vw;
  background-color: #fff;
  padding: 9vw;
}
.mask-content span {
  font-size: 3.5vw;
}
.button {
  margin-top: 5vw;
  display: flex;
  justify-content: space-between;
}
.button button:nth-child(1) {
  border: 1px solid #65bb56;
  background: white;
  padding: 1vw 5vw;
  font-size: 13px;
  border-radius: 3vw;
  color: #65bb56;
}
.button button:nth-child(2) {
  border: 1px solid #65bb56;
  background: #65bb56;
  padding: 1vw 5vw;
  font-size: 13px;
  border-radius: 3vw;
  color: white;
}
.bank-totla {
  margin-top: 3vw;
  text-align: center;
}
.bank-totla {
  font-size: 25px;
  color: #65bb56;
}
.bank-bottom {
  display: flex;
  margin: 6vw;
  padding-bottom: 5vw;
  justify-content: space-between;
  border-bottom: 1px solid rgb(236, 232, 232);
}
.bank-bottom .color {
  color: rgba(1, 142, 123);
  margin-right: 2vw;
  font-size: 18px;
}
.bank-bottom span {
  font-size: 14px;
}
.lastbottom {
  position: fixed;
  bottom: 0;
  width: 100%;
  background: white;
  z-index: 99999;
  padding-bottom: 3vw;
  text-align: center;
}
.lastbottom /deep/ .van-button--large {
  width: 85%;
  height: 10vw;
}
.box-weight{
  background:white;
  color:black;
}
.box-weight i{
   color:black;
}
.cilck{
  margin: 0 auto;
  text-align: center;
 
}
.cilck i{
  font-size: 42px;
  color: #f4ea2a;
}
.shop{
  display: flex;
  align-items: center;
  margin-top: 5vw;
  font-size: 14px;
  color: gray;
}
.p{
  text-align:center;
  margin-top:5vw;
  
}
.p p{
  width: 50vw;
  padding: 0 10vw;
  margin: 0 auto;
  font-size: 12px;
  color: gray;
}
.bun{
  width: 54vw;
  margin:5vw auto;
}
.bun /deep/ .van-button{
  height: 8vw;
  margin: 2vw;
      padding: 2vw 3vw;
      font-size: 13px;
}
</style>