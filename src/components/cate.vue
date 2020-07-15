<template>
  <div>
    <!-- cate1  -->
    <div class="cate">
      <van-swipe :loop="true" :width="400">
        <van-swipe-item>
          <div class="cate-flex">
            <div class="catecontent" v-for="(item, index) in cate1" :key="index" @click="more(index)">
              <img :src="item.picUrl" alt />
              <div>
                <span v-text="item.title"></span>
              </div>
            </div>
          </div>
        </van-swipe-item>
        <!-- cate2  -->
        <van-swipe-item>
          <div class="cate-flex">
            <div class="catecontent" v-for="(item, index) in cate2" :key="index" @click="moreTwo(index)">
              <img :src="item.picUrl" alt />
              <div>
                <span v-text="item.title"></span>
              </div>
            </div>
          </div>
        </van-swipe-item>
        <!-- cate3  -->
        <van-swipe-item>
          <div class="cate-flex">
            <div class="catecontent" v-for="(item, index) in cate3" :key="index" @click="moreThree(index)">
              <img :src="item.picUrl" alt />
              <div>
                <span v-text="item.title"></span>
              </div>
            </div>
          </div>
        </van-swipe-item>
          <!-- cate4  -->
        <van-swipe-item>
          <div class="cate-flex">
            <div class="catecontent" v-for="(item, index) in cate4" :key="index" @click="moreFour(index)">
              <img :src="item.picUrl" alt />
              <div>
                <span v-text="item.title"></span>
              </div>
            </div>
          </div>
        </van-swipe-item>
          <!-- cate5  -->
        <van-swipe-item>
          <div class="cate-flex">
            <div class="catecontent" v-for="(item, index) in cate5" :key="index" @click="moreFive(index)">
              <img :src="item.picUrl" alt />
              <div>
                <span v-text="item.title"></span>
              </div>
            </div>
          </div>
        </van-swipe-item>

      </van-swipe>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      cate1: [],
      cate2: [],
      cate3: [],
      cate4:[],
      cate5:[]
    };
  },
  mounted() {
    this.api.getCateData().then(data => {
      // console.log(data.data);
      for (var i = 0; i < 10; i++) {
        this.cate1 = this.cate1.concat(data.data[i]);
      }
      for (var i = 10; i < 20; i++) {
        this.cate2 = this.cate2.concat(data.data[i]);
      }
      for (var i = 20; i < 30; i++) {
        this.cate3 = this.cate3.concat(data.data[i]);
      }
       for (var i = 30; i < 40; i++) {
        this.cate4 = this.cate4.concat(data.data[i]);
      }
       for (var i = 40; i < 42; i++) {
        this.cate5 = this.cate5.concat(data.data[i]);
      }
    });
  },
  methods:{
     more(value){
    console.log(value)
    // this.$store.commit('cateId',{row:1,col:value})
    this.$store.commit('tarbar','More')
     this.$router.push({
                  path:'/More?tarbar=more&row=1&col='+value
                })
  },
  moreTwo(value){
    // this.$store.commit('cateId',{row:1,col:10+value})
     this.$router.push({
                  path:'/More?tarbar=more&row=1&col='+1+value
                })
  },
  moreThree(value){
    // this.$store.commit('cateId',{row:'3',col:value})
     this.$router.push({
                  path:'/More?tarbar=more&row=2&col='+value
                })
  },
  moreFour(value){
    // this.$store.commit('cateId',{row:'3',col:value})
     this.$router.push({
                  path:'/More?tarbar=more&row=3&col='+value
                })
  },
  moreFive(value){
    // this.$store.commit('cateId',{row:'3',col:value})
     this.$router.push({
                  path:'/More?tarbar=more&row=4&col='+value
                })
  }
  
  }
};
</script>

<style scoped>
.cate {
  margin-top: 7vw;
  margin-bottom: 3.5vw;
  padding: 0 5vw;
  position: relative;
}
.catecontent {
  padding-left: 3vw;
}
.catecontent img {
  width: 15vw;
  height: 15vw;
}
.cate-flex {
  display: flex;
  flex-wrap: wrap;
  justify-content: left;
  text-align: center;
}
.van-swipe {
  height: 50vw;
}
.cate /deep/ .van-swipe__indicators {
  width: 15vw;
  background: #d3d8de;
  position: absolute;
  bottom: -0.5vw;
}
.cate /deep/ .van-swipe__indicator--active {
  width: 3vw;
}
.cate /deep/ .van-swipe__indicator--active{
    background: #65bb56;
}
.catecontent span{
  font-size:12px;
  color:gray
}
</style>