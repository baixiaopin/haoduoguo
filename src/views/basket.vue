<template>
  <div>
    <div class="box">
      <span>果篮子</span>
    </div>
    <div class="box1" v-show="isshow">
      <div class="hang"></div>
      <van-empty
        class="custom-image"
        image="http://localhost:7000/shopimage/car.png"
        description="果篮子空空的，快去逛逛吧！"
      >
        <span @click="btn">去逛逛</span>
      </van-empty>
    </div>
    <div v-show="isshow">
      <div class="box2">
        <i class="iconfont icon-_hengxian"></i>
        <span>猜你喜欢</span>
        <i class="iconfont icon-_hengxian"></i>
      </div>
      <div class="fruit">
        <div class="content">
          <!-- <vue-waterfall-easy :imgsArr="imgsArr" @scrollReachBottom="friuit"> -->
          <div
            class="items"
            v-for="(item,index) in productList"
            :key="index"
            @click="detali(item.shopid)"
          >
            <div class="item-img">
              <img :src="item.picUrl" alt />
            </div>
            <div class="item-title">
              <span v-text="item.title"></span>
            </div>
            <div class="item-sk">
              <span v-text="item.sk"></span>
            </div>
            <div class="item-price">
              <div>
                <span v-text="item.price"></span>
                <del v-text="item.oldprice"></del>
              </div>
              <van-icon class="shoppingicon" name="cart-circle" />
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-show="!isshow" class="bg">
      <div class="box3">
        <div class="box4" v-for="(item,index) in order" :key="index">
          <div class="box5">
            <div class="right">
              <van-checkbox-group v-model="result" checked-color="#07c160" ref="checkboxGroup">
                <van-checkbox :name="index" @click="calcNumber(item.price,item.number,index)"></van-checkbox>
              </van-checkbox-group>
            </div>
            <van-icon class="right-icon" name="shop-o" />
            <div class="right">
              <span v-text="item.shopname"></span>
            </div>
            <van-icon class="right-icon" name="arrow" />
          </div>

          <van-checkbox-group v-model="result" checked-color="#07c160" ref="checkboxGroup">
            <div class="box6">
              <div>
                <van-checkbox @click="calcNumber(item.price,item.number,index)" :name="index"></van-checkbox>
              </div>
              <!-- <div class="box7">
                <img :src="item.picurl" alt />
              </div>
              <div class="box8">
                <div class="box8-title">
                  <span v-text="item.title"></span>
                </div>
                <div class="box8-sk">
                  <span v-text="item.sk"></span>
                </div>
                <div class="box8-price">
                  <div style="color:#65bb56">
                    ￥
                    <span v-text="item.price"></span>
                  </div>
                  <div>
                    <van-stepper
                      @plus="add(item.price,1,index)"
                      @minus="reduce(item.price,1,index)"
                      v-model="item.number"
                    />
                  </div>
                </div>
              </div> -->
             <div class="box10">
                     <van-swipe-cell>
              <van-card
                :price="item.price"
                :desc="item.sk"
                :title="item.title"
                class="goods-card"
                :thumb="item.picurl"
              >  
              </van-card>
              <div class="mask" @click="detali(item.commodity)"></div>
              <div class='bjq'>
                <van-stepper
                      @plus="add(item.price,1,index)"
                      @minus="reduce(item.price,1,index)"
                      v-model="item.number"
                    />
              </div>
                <template #right>
                <van-button square text="删除" @click="remove(item.commodity)" type="danger" class="delete-button" />
              </template>
              </van-swipe-cell>
             </div>
            </div>
          </van-checkbox-group>
        </div>
    </div>
    </div>
    <div class="box9" v-show="!isshow">
      <van-submit-bar :price="price" :button-text="text" @submit="onSubmit">
        <van-checkbox v-model="allCheck" @click="allprice" checked-color="#07c160">全选</van-checkbox>
        <!-- v-model="checked" -->
      </van-submit-bar>
    </div>
  </div>
</template>

<script>
import { Toast } from 'vant';
export default {
  data() {
    return {
      productList: [],
      order: [],
      isshow: true,
      order: [],
      result: [],
      price: 0,
      allCheck: false,
      text: "去结算(0)",
      arr:[]
    };
  },
  mounted() {
    this.refesh()
  },
  methods: {
    refesh(){
    //      var str = "￥5.4/公斤";
    // str = str.replace(/[^0-9.]/gi, "");
    // console.log(str);
    this.api.getHotData({ id: 0 }).then(data => {
      this.productList = data.data;
      // console.log(this.productList);
    });
    if (this.$cookieStore.getCookie("tel")) {
      this.api
        .getCarData({ tel: this.$cookieStore.getCookie("tel") })
        .then(data => {
          this.order = data.data;
         this.order.forEach(element => {
            element.price = element.price.replace(/[^0-9.]/gi, "");
          });
          console.log(this.order);
          if (data.data.length == 0) {
            this.isshow = true;
          } else {
            this.isshow = false;
          }
        });
    }
    },
    allprice() {
      if (this.allCheck == true) {
        this.order.forEach((item, index) => {
          this.result.push(index);
          console.log(item.price, item.number);
          this.price = this.price + Number(item.price) * item.number * 100;
          this.text = "去结算(" + this.result.length + ")";
        });
      } else {
        console.log("-----------");
        this.result = [];
        this.price = 0;
        this.text = "去结算(" + this.result.length + ")";
      }
    },
    add(price, number, index) {
      if (this.result.indexOf(index) != -1) {
        this.price = this.price + Number(price) * number * 100;
      }
    },
    reduce(price, number, index) {
      if (this.result.indexOf(index) != -1) {
        this.price =Math.abs(this.price - Number(price) * number * 100);
      }
    },
    calcNumber(price, number, index) {
      if (this.result.indexOf(index) != -1) {
        console.log("++++++++++++++++");
        this.text = "去结算(" + this.result.length + ")";
        this.price = this.price + Number(price) * number * 100;
      } else {
        this.text = "去结算(" + this.result.length + ")";
        this.price = Math.abs(this.price - Number(price) * number * 100);
      }
    },
    onSubmit() {
      console.log(this.result)
       if(this.result.length==0){
         Toast('您还没有选择商品！')
         return
       }
      for(var i=0;i<this.result.length;i++){
        this.arr.push(this.order[this.result[i]].commodity)
      }
      this.arr=this.arr.join(',')
      this.$router.push({
        name:'orderPage',
        params:{
          commodityList:this.arr
        }
      })
       
    },
    btn() {
      this.$router.push({
        path: "/?tarbar=home"
      });
    },
    detali(value) {
        this.$cookieStore.setCookie('commodity',value)
      console.log(value);
      //   hot Detali
      this.$router.push({
        name: "Detali",
        params: {
          id: value
        }
      });
    },
    all(value) {
      console.log(value);
      if (this.checked == false) {
        console.log("111");
        this.checked = false;
        this.result = [];
      } else {
        this.checked = true;
        this.result = [value];
      }
    },
    remove(value){
      console.log(value)
      this.api.getCarData({tel:this.$cookieStore.getCookie("tel"),commodity:value }).then(data=>{
        console.log(data)
        this.refesh()
      })
    }
  },
  watch: {
    result(value) {
      console.log(value);
      console.log(this.order.length);
      if (value.length == this.order.length) {
        this.allCheck = true;
      } else {
        this.allCheck = false;
      }
    },
    allCheck(value) {},
  }
};
</script>

<style scoped>
.box {
  padding: 4vw 5vw;
  width: 100%;
  box-sizing: border-box;
  position: fixed;
  top: 0;
  background: white;
  z-index: 2222;
  text-align: center;
}
.box span {
  text-align: center;
}
.hang {
  width: 100%;
  height: 2vw;
  background: rgb(235, 232, 232);
}
.box1 {
  margin-top: 13vw;
}
.custom-image .van-empty__image {
  width: 5vw;
  height: 5vw;
}
.box1 /deep/ .van-empty__bottom {
  margin-top: 0;
}
.box1 span {
  display: inline-block;
  color: #65bb56;
  border: 1px solid #65bb56;
  padding: 1.5vw 4vw;
  border-radius: 8vw;
  font-size: 13px;
}
.box2 {
  display: flex;
  align-items: center;
  color: rgb(105, 100, 100);
  justify-content: center;
  padding: 19vw 0 3vw 0;
  box-sizing: border-box;
}
.box2 i {
  margin: 0 2vw;
  font-size: 10vw;
  color: rgb(129, 125, 125);
}
.shoppingicon {
  color: #65bb56;
  font-size: 21px;
  float: right;
}
.item-price span {
  font-size: 12px;
  color: red;
}
.item-price del {
  font-size: 11px;
  color: gray;
}
.item-price {
  display: flex;
  justify-content: space-between;
}
.item-sk {
  font-size: 12px;
  color: #65bb56;
}
.item-title span {
  font-size: 14px;
}
.hot-top {
  margin-top: 5vw;
  display: flex;
  justify-content: center;
  align-items: center;
}
.hot-top img {
  width: 8.5vw;
  height: 10vw;
}
.hot-top div span {
  font-size: 22px;
  color: rgb(104, 101, 101);
  margin-left: 3vw;
}
.content {
  padding: 1vw 2vw;
  background: rgb(245, 240, 240);
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  /* height: 99vw; 
    width: 100%; */
}
.items {
  background: white;
  padding: 2vw;
  margin-top: 3vw;
  width: 43vw;
}
.item-img {
  width: 43vw;
}
.item-img img {
  width: 100%;
  height: 100%;
}
.box1 /deep/.van-empty__image {
  width: 15vw;
  height: 15vw;
}
.box3 {
  padding-top: 15vw;
  padding-bottom: 22vw;
}
.box4 {
  padding: 2vw;
  background: white;
  margin: 2vw 2vw;
  border-radius: 1vw;
}
.box5 {
  display: flex;
  align-items: center;
  justify-items: center;
}
.box6 {
  margin-top: 2vw;
  display: flex;
}
.box7 {
  margin-left: 2vw;
  width: 20vw;
  height: 20vw;
  border-radius: 20%;
  overflow: hidden;
}
.box7 img {
  width: 100%;
  height: 100%;
}
.right {
  margin-right: 2vw;
  font-size: 13px;
  color: gray checked-color= "#07c160";
}
.right-icon {
  margin-right: 2vw;
  color: gray;
}
.box5 /deep/ .van-checkbox__icon {
  font-size: 15px;
}
.box6 /deep/ .van-checkbox__icon {
  font-size: 15px;
}
.box8 {
  width: 65vw;
}
.box8-title span {
  font-size: 13px;
  display: inline-block;
  margin: 2vw;
}
.box8-sk {
  margin: 2vw;

  font-size: 12px;
  color: #65bb56;
}
.box8-price {
  padding: 2vw;
  display: flex;
  font-size: 12px;
  justify-content: space-between;
}
.box8-price span {
  font-size: 12px;
  color: #65bb56;
}
.box9 /deep/ .van-submit-bar {
  bottom: 12vw;
}
.box9 /deep/ .van-submit-bar__text {
  margin-left: 2vw;

  text-align: left;
  color: #65bb56;
}
.box9 /deep/ .van-submit-bar__price {
  color: #65bb56;
}
.box9 /deep/ .van-submit-bar__button--danger {
  background: #65bb56;
}
.box10{
position: relative;
}
.box10 /deep/ .van-card{
 background: white;
}
.box10 /deep/ .van-card__desc{
  margin-top:3vw;
  color: #65bb56;
  font-size: 2vw;
}
.box10 /deep/ .van-button{
  height: 100%;
}
.bjq{
  position: absolute;
  bottom: 0;
  right: 3vw;
}
.bg{
  background: rgb(250, 247, 247);
  height: 100vh;
}
.mask{
  width:22vw;
  height:22vw;
  position: absolute;
  top: 2vw;
  left: 5vw;
}
.box10 /deep/ .van-card__thumb{
  width:18vw;
  height: 18vw;
}

</style>