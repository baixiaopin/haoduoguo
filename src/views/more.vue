<template>
  <div>
    <div class="top">
      <div class="search">
        <van-search v-model="value" shape="round" @click="serah" placeholder="请输入搜索关键词" />
      </div>
      <div>
        <van-tabs type="none" title-active-color="white" v-model="activeName">
          <van-tab title="热带水果" name="1">
            <van-sidebar v-model="activeKey">
              <van-sidebar-item title="芒果" />
              <van-sidebar-item title="火龙果" />
              <van-sidebar-item title="山竹" />
              <van-sidebar-item title="菠萝蜜" />
              <van-sidebar-item title="菠萝" />
              <van-sidebar-item title="百香果" />
              <van-sidebar-item title="蕉" />
              <van-sidebar-item title="红毛丹" />
              <van-sidebar-item title="榴莲" />
              <van-sidebar-item title="木瓜" />
              <van-sidebar-item title="释迦" />
              <van-sidebar-item title="龙眼" />
              <van-sidebar-item title="椰" />
              <van-sidebar-item title="莲雾" />
              <van-sidebar-item title="杨桃" />
              <van-sidebar-item title="柚" />
              <van-sidebar-item title="荔枝" />
              <van-sidebar-item title="牛油果" />
            </van-sidebar>
          </van-tab>
          <van-tab title="橙橘柚柑" name="2">
            <van-sidebar v-model="activeKey">
              <van-sidebar-item title="橙" />
              <van-sidebar-item title="柑" />
              <van-sidebar-item title="橘" />
              <van-sidebar-item title="柠檬" />
            </van-sidebar>
          </van-tab>

          <van-tab title="苹果梨柿" name="3">
            <van-sidebar v-model="activeKey">
              <van-sidebar-item title="苹果" />
              <van-sidebar-item title="梨" />
              <van-sidebar-item title="柿" />
              <van-sidebar-item title="山楂" />
            </van-sidebar>
          </van-tab>
          <van-tab title="多汁水果" name="4">
            <van-sidebar v-model="activeKey">
              <van-sidebar-item title="葡萄" />
              <van-sidebar-item title="草莓" />
              <van-sidebar-item title="圣女果" />
              <van-sidebar-item title="猕猴桃" />
              <van-sidebar-item title="蓝莓" />
              <van-sidebar-item title="番石榴" />
              <van-sidebar-item title="批吧" />
              <van-sidebar-item title="西瓜" />
              <van-sidebar-item title="石榴" />
            </van-sidebar>
          </van-tab>
          <van-tab title="桃李杏梅" name="5">
            <van-sidebar v-model="activeKey">
              <van-sidebar-item title="李" />
              <van-sidebar-item title="桃" />
              <van-sidebar-item title="樱桃" />
              <van-sidebar-item title="枣" />
            </van-sidebar>
          </van-tab>
          <van-tab title="时令瓜果" name="6">
            <van-sidebar v-model="activeKey">
              <van-sidebar-item title="哈密瓜" />
              <van-sidebar-item title="香瓜" />
            </van-sidebar>
          </van-tab>
        </van-tabs>
        <!-- <van-tabs v-model="active">
                <van-tab v-for="index in 2" :key="index">
                    <template #title> <van-icon name="more-o" />选项 </template>
                    内容 {{ index }}
                </van-tab>
        </van-tabs>-->
        <div class="showdata" v-show="isshow">
          <div class="content" v-for="(item,index) in dataList" :key="index" @click="detali(item.id)">
            <div class="img">
              <img :src="item.picUrl" alt />
            </div>
            <div class="text">
              <p class="hang"></p>
              <h2 v-text="item.title"></h2>
              <h3 v-text="item.sk"></h3>
              <span v-text="item.price"></span>
              <del v-text="item.oldprice"></del>
              <van-icon class="shoppingicon" name="cart-circle" />
              <i></i>
            </div>
            <div></div>
          </div>
        </div>
        <div class="showdata" v-show="!isshow">
                   <div class="none">
                       <span>{{dataList}}</span>
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
      value: "",
      activeName: 1,
      activeKey: 0,
      dataList: [],
      isshow:true
    };
  },
  mounted() {
    //   console.log(this.$store.state.cateId,'传值')
    //  this.id=this.$route.query.id,
    // console.log(this.$route.query.row,this.$route.query.col)
    this.activeName = this.$route.query.row;
    this.activeKey = this.$route.query.col;
    //       this.api.getMoreData({row:this.activeName,col:this.activeKey}).then(data=>{
    //         //  console.log(data)
    //          this.dataList=data.data
    //          console.log(this.dataList)
    // })
  },
  watch: {
    activeName() {
      this.api
        .getMoreData({ row: this.activeName, col: this.activeKey })
        .then(data => {
          //  console.log(data)
          if(data.data=='暂无数据'){
              console.log('1111111')
               this.isshow=false
          }else{
 this.isshow=true
          }
          
          this.dataList = data.data;
          console.log(this.dataList);
        });
    },
    activeKey() {
     
      this.api
        .getMoreData({ row: this.activeName, col: this.activeKey })
        .then(data => {
          //  console.log(data)
          if(data.data=='暂无数据'){
              this.isshow=false
              console.log('1111111')
          }else{
                this.isshow=true
          }
        

          this.dataList = data.data;
          console.log(this.dataList);
        });
    }
  },
  methods: {
    detali(value){
      console.log(value)
    },
    serah(){
      this.$router.push({
        path:'/search'
      })
    }
  }
};
</script>

<style scoped>
.van-tabs /deep/.van-tab--active {
  background-color: #65bb56;
  border-radius: 12vw;
  padding: 0.8vh 0;
}
.van-tabs /deep/ .van-tab {
  font-size: 12px;
}
.van-sidebar-item--select::before {
  background: none;
}
.van-sidebar-item--select {
  color: #65bb56;
}
.van-tab__pane,
.van-tab__pane-wrapper {
  margin: 2vw 0;

  border-top: 1px solid rgb(236, 231, 231);
}
.van-tabs__content {
  position: relative;
}
.showdata {
  position: absolute;
  top: 12vh;
  left: 26vw;
}
.content {
  display: flex;
  margin-top: 5vw;
}
.content .img {
  width: 25vw;
  height: 23vw;
}
.content .img img {
  width: 100%;
  height: 100%;
}
.shoppingicon {
  color: #65bb56;
  font-size: 21px;
  float: right;
}
.text {
  width: 43vw;
  position: relative;
}
.text h2 {
  font-size: 13px;
  font-weight: normal;
  margin-top: 0;
}
.text h3 {
  font-size: 12px;
  font-weight: normal;
  color: #65bb56;
}
.text span {
  font-size: 13px;
  color: rgb(252, 9, 9);
}
.text del {
  font-size: 12px;
  color: gray;
}
.hang {
  border-top: 1px solid rgb(236, 231, 231);
  width: 43vw;
  height: 1vw;
  position: absolute;
  top: -6vw;
}
.none{
 margin-top: 15vw;
}
.none span{
   
    margin-left: 24vw;
}
.search /deep/ .van-search{
  padding:2.4vw 5vw;
}
</style>