<template>
    <div>
        <div class="box">
            <i class="iconfont icon-jiantou-copy" @click="$router.go(-1)"></i>
            <span v-text="shopDetaliXinxi.tit"></span>
            <em class="iconfont icon-share"></em>
    </div>

   
<!--  -->
  <div class='box2'>
       <div class="hang"></div>
       <div class='box3'>
     <span>档口名称</span><em v-text="shopDetaliXinxi.tit"></em>
 </div>
 <div class='box3' id="box4">
     <span>档口地址</span><em v-text="shopDetaliXinxi.address"></em>
 </div>
 <div class='box3' id="box4">
     <span>客服电话</span><em v-text="shopDetaliXinxi.phone"></em>
 </div>
  <div class='box3' id="box4">
     <span>入驻平台时间</span><em v-text="shopDetaliXinxi.startTime"></em>
 </div>
  <div class='box3' id="box4">
     <span>档口简介</span><p v-text="shopDetaliXinxi.skip"></p>
 </div>
  </div>
    </div>
</template>

<script>
    export default {
         data(){
             return{
            shopDetaliXinxi:[]
             }
         },
         mounted(){
             console.log(this.$route.query.shopid)
              this.api.getShopDetaliData({shopid:this.$route.query.shopid}).then(data => {
              this.shopDetaliXinxi = data.data[0];
              console.log(this.shopDetaliXinxi);
    });
         }
    }
</script>

<style scoped>
.box {
  padding: 8vw 5vw;
  width: 100%;
  box-sizing: border-box;
  position: fixed;
  top: 0;
  background: white;
  z-index: 2222;
}
.box i {
  float: left;
}
.box span {
  margin-left: 30vw;
}
.box em {
  float: right;
}
.hang{
    width: 100%;
    height: 2vw;
    background: rgb(235, 232, 232);
}
#box4 p{
    font-size: 13px;
}
#box4 div h4{
  margin-left:15vw;
  font-size: 15px;
  display: inline-block;
  padding: 1vw 2vw;
  font-weight: 500;
  border-radius: 45%;
  background: hsl(112, 55%, 83%);
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

}
.box3{
  padding: 3vw 2vw 3vw 5vw;
  border-bottom: 1px solid rgb(235, 232, 232);
  box-sizing: border-box;
}
.box2{
   margin-top: 22vw; 
}
</style>