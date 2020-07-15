<template>
  <div>
    <div class="box1" v-show="isshow">
      <van-icon name="arrow-left" class="icon" @click="btn" />
      <van-search v-model="value" @search="onSearch" @focus='focus' @cancel="onCancel" placeholder="请输入搜索关键词" />
      <div class="box1-search">
        <span>搜索</span>
      </div>
    </div>
    <div class="local" v-show="isshow">
      <div class="history">
        <div>
          <h1>历史搜索</h1>
        </div>
        <div @click="clear">
          <i class="iconfont icon-shanchu1"></i>
        </div>
      </div>
      <div class="box2">
        <div class="box2-title" v-for="(item,index) in history" :key="index">
          <span v-text="item" @click="cli(item)">123</span>
        </div>
      </div>
    </div>
    <div v-show="!isshow" class="box3">
      <div class="box1 box1-last">
        <van-icon name="arrow-left" class="icon" @click="btn" />
        <van-search v-model="value" @search="onSearch" @focus='focus' @cancel="onCancel" placeholder="请输入搜索关键词" />
        <div class="box1-search">
          <i class="iconfont icon-pailie"></i>
        </div>
      </div>
      <div>
        <van-tabs v-model="active" title-active-color="red" type="none">
          <van-tab title="综合">
            <div class="active">
              <div class="content" v-show="!isshowHistory">
              <div v-for="(item,index) in list" :key="index" class="wid">
                <div class="content-all" @click="detali(item.shopid)">
                  <div class="content-left">
                    <img :src="item.picUrl" alt />
                  </div>
                  <div class="content-right">
                    <div class="h1">
                      <h1 v-text="item.title"></h1>
                      <h2 v-text="item.sk"></h2>
                      <span v-text="item.price"></span>
                      <del v-text="item.oldprice"></del>
                      <van-icon class="shoppingicon icon" name="cart-circle" />
                      <div class="content-bootom">
                        <span v-text="item.shopname"></span>
                        <em @click.stop="shopDetali(item.notchName)">进店</em>
                        <van-icon class="icon-bottom" name="arrow" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            </div>
          </van-tab>
          <van-tab title="销量">
            <div class="content" v-show="!isshowHistory">
              <div v-for="(item,index) in list" :key="index">
                <div class="content-all">
                  <div class="content-left">
                    <img :src="item.picUrl" alt />
                  </div>
                  <div class="content-right">
                    <div class="h1">
                      <h1 v-text="item.title"></h1>
                      <h2 v-text="item.sk"></h2>
                      <span v-text="item.price"></span>
                      <del v-text="item.oldprice"></del>
                      <van-icon class="shoppingicon icon" name="cart-circle" />
                      <div class="content-bootom">
                        <span v-text="item.shopname"></span>
                        <em @click.stop="shopDetali(item.notchName)">进店</em>
                        <van-icon class="icon-bottom" name="arrow" />
                      </div>
                    </div>

                    <div class="content-text"></div>
                  </div>
                </div>
              </div>
            </div>
          </van-tab>
          <van-tab title="价格">
            <div class="content" v-show="!isshowHistory">
              <div v-for="(item,index) in list" :key="index">
                <div class="content-all">
                  <div class="content-left">
                    <img :src="item.picUrl" alt />
                  </div>
                  <div class="content-right">
                    <div class="h1">
                      <h1 v-text="item.title"></h1>
                      <h2 v-text="item.sk"></h2>
                      <span v-text="item.price"></span>
                      <del v-text="item.oldprice"></del>
                      <van-icon class="shoppingicon icon" name="cart-circle" />
                      <div class="content-bootom">
                        <span v-text="item.shopname"></span>
                        <em @click.stop="shopDetali(item.notchName)">进店</em>
                        <van-icon class="icon-bottom" name="arrow" />
                      </div>
                    </div>

                    <div class="content-text"></div>
                  </div>
                </div>
              </div>
            </div>
          </van-tab>
        </van-tabs>
      </div>
      <div class="local" v-show="isshowHistory">
        <div class="history">
          <div>
            <h1>历史搜索</h1>
          </div>
          <div @click="clear">
            <i class="iconfont icon-shanchu1"></i>
          </div>
        </div>
        <div class="box2">
          <div class="box2-title" v-for="(item,index) in history" :key="index">
            <span v-text="item" @click="cli(item)">123</span>
          </div>
        </div>
      </div>
      <div class="box3"></div>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import { Toast } from "vant";
Vue.use(Toast);
export default {
  data() {
    return {
      value: "",
      history: [],
      list: [],
      isshow: true,
      active: 0,
      isshowHistory: false
    };
  },
  created() {
    this.$store.commit("tarbarishow", false);
  },
  mounted() {
    
    this.refesh();
    
  },
  methods: {
    shopDetali(value){
     
      this.$router.push({
                path:'/shopDetali?shopid='+value
            })
      console.log(value)
    },
    detali(value){
            console.log(value)
             this.$cookieStore.setCookie('commodity',value)
      this.$router.push({
        name: "Detali",
        params: {
          id: value
        }
      });
    },
    focus(){
          console.log('1235---')
          this.value=''
          this.isshowHistory=true
    },
    cli(value) {
      this.onSearch(value);
    },
    onSearch(val) {
      this.value = val;
        var id=this.history.indexOf(val)
       if(id==-1){
        console.log(id)
         this.history.unshift(val)
       }else{
           console.log(id)
           
       }
        
      // this.$cookieStore.setCookie( 'history' ,escape(this.history))
      localStorage.setItem("history", this.history);
      this.api.searchData({ type: val }).then(data => {
        this.list = data.data;
        this.isshow = false;
        if (data.data.length == 0) {
          Toast('暂无数据')
          this.isshowHistory = false;
          this.isshow=false
          console.log("++++++++++++++++");
        } else {
          this.isshowHistory = false;
        }
        // console.log(data);
      });
    },
    onCancel() {
      Toast("取消");
      this.$router.go(-1);
    },
    btn() {
      this.$router.go(-1);
      this.$store.commit("tarbarishow", true);
    },
    clear() {
      localStorage.removeItem("history");
      console.log("11111");
      this.refesh();
    },
    refesh() {
    
      if (localStorage.getItem("history")) {
        this.history = localStorage.getItem("history").split(",");
        console.log(this.history);
      } else {
        this.history = [];
      }
    }
  },
  watch: {
    active(value) {
      console.log(value);
      if (value == 0) {
        this.api.searchData({ type: this.value }).then(data => {
          this.list = data.data;
          this.isshow = false;
          if (data.data.length == 0) {
            this.isshowHistory = false;
            console.log("++++++++++++++++");
          } else {
            this.isshowHistory = false;
          }
          console.log(data);
        });
      }
      if (value == 1) {
        this.api.searchData({ type: this.value }).then(data => {
          
          this.list = data.data.reverse();
          this.isshow = false;
          if (data.data.length == 0) {
            this.isshowHistory = false;
            console.log("++++++++++++++++");
          } else {
            this.isshowHistory = false;
          }
          console.log(data);
        });
      }
      if (value == 2) {
        this.api.searchData({ type: this.value }).then(data => {
          this.list = data.data.reverse();
          this.isshow = false;
          if (data.data.length == 0) {
            this.isshowHistory = false;
            console.log("++++++++++++++++");
          } else {
            this.isshowHistory = false;
          }
          console.log(data);
        });
      }
    }
  }
};
</script>

<style scoped>
.box1 {
  display: flex;
  align-items: center;
  padding: 3vw 5vw;
  background: rgb(236, 234, 234);
}
.box1 /deep/ .van-search {
  padding: 0;
  margin-left: 2vw;
  width: 72vw;
  border-radius: 22vw;
}
.box1 /deep/ .van-search__content {
  border-radius: 15vw;
}
.icon {
  font-size: 5vw;
  color: rgb(129, 122, 122);
}
.box1-search {
  margin-left: 4vw;
  font-size: 3vw;
  color: rgb(63, 62, 62);
}
.box1-search span {
  font-size: 3vw;
}
.box1-search i {
  font-size: 5vw;
}
.box2 {
  margin: 0vw 3vw;
  display: flex;
  flex-wrap: wrap;
}
.box2-title {
  margin-top: 2vw;
  padding: 1vw 3vw;
  margin-right: 2vw;
  background: rgb(241, 239, 239);
  border-radius: 5vw;
}
.local h1 {
  font-size: 3vw;
}
.history {
  margin: 5vw 3vw 0vw 5vw;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.box1-last {
  background: white;
  padding: 3vw 5vw 1vw 5vw;
}
.box3 /deep/ .van-tabs--line .van-tabs__wrap {
  height: 5vw;
}
.box3 /deep/ .van-tabs__nav {
  padding-bottom: 2vw;
}
.content {
  background: rgb(248, 246, 246);
  height: 89vh;
}
.content-all {
  display: flex;
  background: white;
}
.content-left {
  width: 30vw;
}
.content-left img {
  width: 100%;
}
.content-right {
  display: flex;
}
.content-right .h1 {
  padding-left: 2vw;
}
.content-right .h1 h1 {
  font-size: 3vw;
  font-weight: 500;
}
.h1 h2 {
  font-size: 2vw;
  font-weight: normal;
  color: #65bb65;
  margin: 3vw 0;
}
.h1 span {
  font-size: 1.5vw;
  color: red;
}
.h1 del {
  font-size: 1vw;
  color: gray;
}
.h1 .icon {
  float: right;
  color: #65bb65;
}
.content-bootom {
  margin-top: 2vw;
  display: flex;
  align-items: center;
}
.content-bootom span {
  color: gray;
  font-size: 1vw;
  margin-right: 2vw;
}
.content-bootom em {
  font-style: normal;
  font-size: 1vw;
}
.content-bootom .icon-bottom {
  font-size: 1vw;
  margin-left: 1vw;
}

</style>