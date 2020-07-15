<template>
  <div>
    <div class="hot-top">
      <img src="http://localhost:7000/shopimage/hot.png" alt />
      <div>
        <span>热销水果</span>
      </div>
    </div>
    <div class="fruit">
      <van-tabs v-model="active" animated swipeable>
        <van-tab v-for="(item,index) in title" :title="item" :key="index">
          <div class="content">
            <!-- <vue-waterfall-easy :imgsArr="imgsArr" @scrollReachBottom="friuit"> -->
            <div
              class="items"
              v-for="(item,index) in imgsArr"
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
            <!-- <div class="img-info" slot-scope="props">
                            <img :src="props.value.src" alt="">
                       <p class="some-info">{{props.value.title}}</p>
                </div>
            </vue-waterfall-easy>-->
          </div>
        </van-tab>
      </van-tabs>
    </div>
  </div>
</template>

<script>
import vueWaterfallEasy from "vue-waterfall-easy";
export default {
  components: {
    vueWaterfallEasy
  },
  data() {
    return {
      active: 0,
      title: ["全部", "进口水果", "国产水果", "应季水果", "人气水果"],
      fruitList: [],
      imgsArr: [],
      importedFruit: [],
      domesticFruit: [],
      seasonFruit: [],
      popularFruit: []
    };
  },
  mounted() {
    //  console.log(this.active)
    this.api.getHotData({ id: 0 }).then(data => {
    //   console.log(data.data);
      this.fruitList = data.data;
    });
    this.friuit(0);
  },
  watch: {
    active(val) {
      console.log(val);
      this.friuit(val);
    }
  },
  methods: {
    friuit(val) {
      this.api.getHotData({ id: val }).then(data => {
        //   console.log(data.data);
        this.imgsArr = data.data;
        //   this.fruitList=
        //   this.imgsArr=data.data.map(item=>{
        //       return{
        //           ...item,
        //           src:item.picUrl,
        //           href:''
        //       }
        //   })
        //   console.log(this.imgsArr)
      });
    },
    detali(value) {
      console.log("1111");
      console.log(value);
      this.$cookieStore.setCookie('commodity',value)
      this.$router.push({
        name: "Detali",
        params: {
          id: value
        }
      });
    }
  }
};
</script>

<style scoped>
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
  width: 8vw;
  height: 9vw;
}
.hot-top div span {
  font-size: 19px;
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
.fruit /deep/ .van-tabs__line {
  background: #65bb56;
}
</style>