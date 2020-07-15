<template>
  <div>
    <!-- <div @click="isshow"> <van-nav-bar  title='华祥果业' left-arrow @click-left="$router.go(-1)"></van-nav-bar></div> -->
    <div class="box">
      <i class="iconfont icon-jiantou-copy" @click="isshow"></i>
      <span v-text="shopDetali.tit"></span>
      <em class="iconfont icon-share"></em>
    </div>
    <div v-show="xinxi">
            <div class="box1">
      <div class="box1-img" @click="shopXinxi">
        <img :src="shopDetali.detaliUrl" alt />
      </div>
      <div class="box1-text">
        <span>全部</span>
        <span>商品</span>
      </div>
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
  </div>
</template>

<script>
export default {
  data() {
    return {
      shopDetali: [],
      productList: [],
      xinxi:true
    };
  },
  created() {
    // console.log("125");
    this.$store.commit("tarbarishow", false);
  },
  mounted() {
    //  console.log(this.$store.state.isshow)
     console.log(this.$route.query.shopid);
    //  获取档口信息
    this.api.getShopDetaliData({shopid:this.$route.query.shopid}).then(data => {
      this.shopDetali = data.data[0];
      console.log(this.shopDetali);
    });
    // 获取hot 产品
    this.api.getHotData({ id: 0 }).then(data => {
      this.productList = data.data;
      console.log(this.productList);
    });
  },
  methods: {
    isshow() {
      this.$router.go(-1);
      console.log("111");
      this.$store.commit("tarbarishow", true);
    },
    detali(value) {
      console.log("1111");
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
    shopXinxi(){
        this.$router.push({
            path:'/shopXinxi?shopid='+this.$route.query.shopid
        })
    }
  }
};
</script>


<style scoped>
.box1-text span:nth-child(2) {
  color: #65bb56;
}
.box1-text {
  font-weight: 540;
  margin: 5vw;
  text-align: center;
}
.box1-img img {
  width: 100%;
  height: 100%;
}
.box1-img {
  width: 100%;
  height: 60vw;
}
.box {
  padding: 5vw 5vw;
  width: 100%;
  box-sizing: border-box;
  position: fixed;
  text-align: center;
  top: 0;
  background: white;
  z-index: 2222;
}
.box i {
  float: left;
}

.box em {
  float: right;
}
.box1 {
  margin-top: 15vw;
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
</style>