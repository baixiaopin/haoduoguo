<template>
  <div>
    <div class="banner">
      <div class="search">
        <van-search v-model="value" placeholder="请输入搜索关键词" @click="serah"/>
        <van-icon class="search-icon" name="chat-o" />
      </div>
      <!-- banner -->
      <div class="banner-content">
        <van-swipe :autoplay="3000">
          <van-swipe-item v-for="(image, index) in banner" :key="index" @click="bannerDetali(image.id)">
            <img :src="image.picUrl" />
          </van-swipe-item>
        </van-swipe>
      </div>
    </div>
    <!-- cate -->
    <cate></cate>
    <div class="bg"></div>
    <!-- shop -->
    <shop></shop>
     <div class="bg"></div>
      <!-- hot -->
    <hot></hot>
    <div class="cl">

    </div>
    <!-- bottom  -->

  </div>
</template>

<script>
// @ is an alias to /src

import cate from "@/components/cate.vue";
import shop from "@/components/shop.vue"
import hot from "@/components/hot.vue"
import Vue from "vue";
import vueWaterfallEasy from 'vue-waterfall-easy'
import { Lazyload } from "vant";
Vue.use(Lazyload);
export default {
  components: {
    cate,shop,hot
  },
  data() {
    return {
      value: "",
      banner: [],
     active:'home'
     
    };
  },
  mounted() {
    this.api.getBannerData().then(data => {
      console.log(data.data);
      this.banner = data.data;
    });
  },
  methods:{
    bannerDetali(value){
      console.log(value);
       // this.$cookieStore.setCookie( 'name' , 'name')
      this.$cookieStore.setCookie('commodity',value)
      this.$router.push({
        name: "Detali",
       
      });
    },
     serah(){
      console.log('?????????')
      this.$router.push({
        path:'/search'
      })
    }
  }
};
</script>
<style scoped>
.banner {
  width: 100%;
  background: #65bb56;
  border-bottom-left-radius: 8vw;
  border-bottom-right-radius: 8vw;
}
.search {
  display: flex;
  text-align: center;
  justify-content: space-around;
  padding: 3vw 0;
  align-items: center;
  background: #65bb56;
  width: 100%;
  z-index: 12;
  position: fixed;

  top: 0;
}
.van-search {
  width: 80%;
  padding: 0;
  margin-left: 3vw;
  border-radius: 5vw;
}
.van-search__content {
  border-radius: 5vw;
}
.search-icon {
  color: white;
  font-size: 22px;
}
.van-cell {
  line-height: 18px;
}
.banner-content {
  width: 90%;
  margin: 0vw auto;
  position: relative;
  margin-top: 7vw;
  bottom: -3vw;
}
.banner-content img {
  width: 100%;
  height: 100%;
  border-radius: 3vw;
}
.bg{
  width: 100%;
  height: 1vw;
  background: #d3d8de;
}
.cl{
  height: 50vw;
}
</style>
