<template>
    <div class="bg">
           <div class='box1-detali'>
                    <div ><van-icon name="arrow-left" class='icon' @click="isshow" /> </div>
                    <div class="box2-detali">
                        <div class="box3-detali"><van-icon name="clock-o" /><span>待称重</span></div>
                      <p>等待商家称重</p></div>
        </div> 
     
      <div class="rand">
                <div class="box2-top">
                  <van-icon name="shop-o" />
                  <span v-text="orderdetali.shopname"></span>
                  <van-icon class="right-icon iconr" name="arrow" />
                </div>
                <div class="box2-content">
                  <div class="left">
                    <img :src="orderdetali.picurl" alt />
                  </div>
                  <div class="right">
                    <div class="right-flex">
                      <div class="right-center">
                        <span v-text="orderdetali.title"></span>
                        <p>单价：￥{{orderdetali.price}}/公斤&nbsp;&nbsp;数量：{{orderdetali.number}}</p>
                         <p>规格：{{txt}}</p>
                        <h1>￥{{orderdetali.price*orderdetali.number}}</h1>
                      </div>
                      
                    </div>
                  </div>
                 
                </div>
                 <div class="hang"></div>
               
            <div class="serve"><van-icon name="chat-o" /><span>联系客服</span></div>
             <div class="hang"></div>
             <div class="ordernumber">
                    <div>
                        <div class="text1"><span>订单编号：</span><em v-text="orderdetali.ordernumber"></em><i @click="copy">复制</i></div>
                        <div class="text2"><span>下单时间：</span><em v-text="orderdetali.time"></em></div>
                        <div class="text2"><span>支付方式：</span><em>在线支付</em></div>
                        <div class="text1 text3 text4"><span>配送方式:</span><em v-text="orderdetali.serve"></em></div>
                        <div class="text1 text4"><span>发票信息:</span><em>不开发票</em></div>
                    </div>
             </div>
               <div class="hang"></div>
             <div class='bottom'>
                <div class='bottom-1'>
                    <div><span>商品总额</span></div>
                    <div><h1>￥{{orderdetali.price*orderdetali.number}}0</h1></div>
                </div>
                 <div class='bottom-2'>
                    <div><span>运费</span></div>
                    <div><h1>￥0.00</h1></div>
                </div>
                 <div class='bottom-3'>
                    <div><span>优惠</span></div>
                    <div><span>需付款：</span><em>￥{{orderdetali.price*orderdetali.number}}0</em></div>
                </div>
      </div>
       <div class="hang1"></div>
               <div class="btn">
                     <div></div>
                     <div class="btn1"> <van-button plain type="warning" color='red'>代称重</van-button>
                      <van-button plain type="default" disabled color='gray'>去支付</van-button></div>
            </div>
    </div>
      
        </div>
</template>

<script>
import { Toast } from "vant";
    export default {
        props:['orderdetali'],
        data(){
                 return{
                           txt:'净重:13公斤 毛重:13公斤'
                 }
        },
       methods:{
           copy(){
               Toast('已复制')
           },
           isshow(){
               this.$emit('event',true)
           }
       }
    }
</script>

<style scoped>
.bg{
    background:rgb(241, 238, 238);
    height: 100vh;
}
.box1-detali{
    display: flex;
    background: #65bb56;
    padding: 6vw 2vw 3vw 2vw;
    color: white

}
.box2-detali{
    margin: 0 auto;
}
.box2-detali p{
    font-size: 13px;
}
.box3-detali{
    display: flex;
    align-items: center;
    font-size: 14px;
}
.box3-detali span{
    margin-left: 2vw;
    
}
.box2-top {
  display: flex;
  align-items: center;
  padding: 2vw 5vw;
  background: white;
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
  padding: 0 5vw;
  background: white;
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
}
.right-center p {
  font-size: 12px;
  margin:1vw 0;
  color: gray;
}
.right-center h1{
    font-size:13px;
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
.serve span{
    font-size: 12px;
    margin-left: 2vw;
    color: rgb(56, 54, 54);
}
.hang{
  width:100%;
  height:2vw;
  background:rgb(241, 238, 238);
}
.hang1{
  width:100%;
  height:1vw;
  background:rgb(241, 238, 238);
}
.icon{
    font-size: 18px;
}
.rand{
    position: fixed;
    top: 22vw;
    width: 100%;
    border-top-right-radius: 5vw;
    border-top-left-radius: 5vw;
    overflow: hidden;
}
.serve{
    display: flex;
    padding: 3vw;
    justify-content: center;
    border-bottom-left-radius: 3vw;
    border-bottom-right-radius: 3vw;
    background: white;
}
.ordernumber{
     border-radius: 3vw;
   
    background: white;
    padding: 3vw 5vw;
}
.text1{
     padding-bottom:2vw;
}
.text3{
    padding-bottom:0;
}
.text1 span{
    font-size: 12px;
    color: gray;
}
.text1 em{
    font-size: 12px;
    padding-left:2vw;
    font-style: normal;
}
.text1 i{
    font-style: normal;
    font-size: 11px;
    padding: 1vw 2vw;
    background: rgb(236, 234, 234,0.5);
    margin-left: 2vw;
    border-radius: 3vw;
}
.text2{
     padding-bottom:2vw;
}
.text2 span{
    font-size: 12px;
    color: gray;
}
.text2 em{
    padding-left:2vw;
    font-size: 12px;
    padding-bottom: 2vw;
    display:inline-block;
    font-style: normal;
   width:60vw;
   border-bottom:1px solid rgb(223, 219, 219);
}
.bottom{
    padding:5vw;
    background:white;
     border-top-left-radius: 3vw;
    border-top-right-radius: 3vw;
}
.bottom-1{
    display:flex;
     justify-content: space-between;
       margin-bottom: 2vw;
}
.bottom-1 h1{
   margin: 0;
   font-size: 13px;
}
.bottom-1 span{
   font-size: 13px;
}
.bottom-2{
      margin-bottom: 2vw;
    display:flex;
     justify-content: space-between;
}
.bottom-2 h1{
   margin: 0;
 font-size: 13px;
}
.bottom-2 span{
   font-size: 13px;
}
.bottom-3{
    margin-bottom: 2vw;
    display:flex;
    justify-content: space-between;
}
.bottom-3 em{
   color: #65bb56;
    font-size: 15px;
    font-style: normal;
    font-weight: 600;
}
.bottom-3 span{
   font-size: 13px;
}
.btn{
    display: flex;
    justify-content: space-between;
    background: white;
    padding-bottom: 3vw;
}
.btn1{
    margin: 2vw;
    width: 50vw;
    display: flex;
    justify-content: space-around;
}
.btn1 /deep/ .van-button{
  height: 8vw;
  width: 19vw;
  font-size: 13px;
  margin-right: 2vw;
  border-radius: 5vw;
}
.text4 em{
    font-size:11px;
    margin-left:1vw;
    color:gray;
}
</style>