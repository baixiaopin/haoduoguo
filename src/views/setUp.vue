<template>
  <div class="bg">
    <div class="box">
      <i class="iconfont icon-jiantou-copy" @click="btn"></i>
      <span>账户设置</span>
    </div>
    <div class='box1' @click="personinfo">
       <div class="box1-fen" >
            <div class='box-icon'><img :src="loginInfo.picUrl" alt=""></div>
        <div class="box1-text"><h1 v-text="loginInfo.nickname"></h1><h2 >用户名：{{loginInfo.token}}</h2></div>
       </div>
        <div class="right"><i class="iconfont icon-arrow-backimg"></i></div>
    </div>
    <div class="box2" @click="address">
       <div class="box2-text"><span >收货地址</span></div>
       <div class="right"><i class="iconfont icon-arrow-backimg"></i></div>
    </div>
    <!--  -->
    <div class="hang"></div>
    <!--  -->
    <div class="box2 box3">
       <div class="box2-text"><span>信用额度</span></div>
       <div class="right"><i class="iconfont icon-arrow-backimg"></i></div>
    </div>
    <div class="box2">
       <div class="box2-text"><span>账户安全</span></div>
       <div class="right"><i class="iconfont icon-arrow-backimg"></i></div>
    </div>
     <!--  -->
    <div class="hang"></div>
    <!--  -->
     <div class="box2 box3">
       <div class="box2-text"><span>清除缓存</span></div>
       <div class="right"><i class="iconfont icon-arrow-backimg"></i></div>
    </div>
    <div class="box2">
       <div class="box2-text"><span>关于我们</span></div>
       <div class="right"><i class="iconfont icon-arrow-backimg"></i></div>
    </div>
      <!--  -->
    <div class="hang"></div>
    <!--  -->
    <div class='box4'><span @click="exit">退出登录</span></div>
  </div>
</template>

<script>
export default {
    data(){
        return{
            loginInfo:[]
        }
    },
  methods: {
    btn() {
      this.$store.commit("tarbarishow", true);
      this.$router.go(-1);
    },
    exit(){
        this.$cookieStore.delCookie('tel')
         this.$store.commit("tarbarishow", true);
        this.$router.push({
            path:'/mine'
        })
    },
    personinfo(){
      console.log('++++')
      this.$router.push({
        path:'/personinfo'
      })
    },
    address(){
      this.$router.push({
        path:'/address'
      })
    }
  },
   mounted(){
       console.log(this.$cookieStore.getCookie('tel'))
       if(this.$cookieStore.getCookie('tel')){
       this.api.login({tel:this.$cookieStore.getCookie('tel')}).then(res=>{
         this.isshow=false
         this.loginInfo=res.data[0]
         console.log(this.loginInfo)
       })
         }else{
             this.isshow=true
         }
        
  },
};
</script>

<style scoped>
.bg{
  background: rgb(241, 238, 238);
  height: 100vh;
}
.hang{
    width: 100%;
    height: 1vw;
    background: rgb(241, 238, 238);
    margin-top: 3vw;
}
.box {
  padding: 8vw 5vw;
  width: 100%;
  box-sizing: border-box;
  position: fixed;
  justify-content: center;
  text-align: center;
  top: 0;
  background: white;
  z-index: 2222;
  padding-bottom: 1vw
}
.box i {
  float: left;
  font-size: 18px;
}
.box em {
  float: right;
}
.box1 {
  margin-top: 17vw;
  display: flex;
  padding:3vw 5vw;
  align-items: center;
  justify-content: space-between;
  background: white;
}
.icon{
       font-size: 10vw;
         color: #65bb56;
}
.box1-text h1,h2{
    margin: 3vw 5vw;
    
}
.box1-text h1{
    font-size: 4vw;
    font-weight: normal;
}
.box1-text h2{
    margin-top: 1vw;
    font-size: 3vw;
    color: gray;
    font-weight: normal;
}
.right i{
    color: rgb(197, 188, 188);
}
.box1-fen{
    display: flex;
    align-content: center;
}
.box2{
    display: flex;
    align-items: center;
    justify-content: space-between;
   
    padding: 4vw 5vw;
    border-top: 1px solid rgb(247, 242, 242);
     background: white;
}

.box2-text span{
    font-size: 13px;
}
.box4{
    margin-top:2vw;
    text-align:center;

}
.box4 span{
    display:inline-block;
   display: flex;
    width:100%;
    height: 8vh;
    align-items: center;
    background: white;
    justify-content: center;
}
.box-icon img{
  width:20vw;
  height:20vw;
  border-radius: 50%;
  overflow: hidden;
}
</style>