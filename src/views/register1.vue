<template>
  <div>
    <div class="box" >
      <i class="iconfont icon-jiantou-copy" @click="btn"></i>
      <span>新用户注册</span>
    </div>
    <div class="box1">
      <div class="box1-img">
        <img src="http://127.0.0.1:7000/image/rejister.jpg" alt />
      </div>
    </div>
    <div class="box2">
      <span>
        我们将以短信的形式将验证码发送给您，
        <br />请注意查收!
      </span>
    </div>
    <div class="box3">
      <van-field v-show="!isshowpas" v-model="password" type="text" placeholder="请输入密码(8-20位字符)" />
      <van-field v-show="isshowpas" v-model="password" type="password" placeholder="请输入密码(8-20位字符)" />
      <i v-show="isshowSee" class="iconfont icon-weibiaoti-- see" @click="see"></i>
      <i v-show="!isshowSee" class="iconfont icon-mimakejian see lagar" @click="see"></i>
      <i v-show="isshowPassword" class="iconfont icon-quxiao password" @click="clearPassword"></i>

      
    </div>
     <div class='box3 box4'>
        <van-field  type="text" v-model="code"  placeholder="请输入验证码" />
        <button v-text="btnText" :disabled='codeDisabled' @click="codeText"></button>
       
     </div>
       <div class="box5"><van-button round :disabled='btnDisabled' @click="finish"   type="primary" size="large">完成</van-button></div>
       
        <div class="confirm">
         <div class="mask2" >
          <van-overlay :show="exit" @click="show = false">
          <div class="wrapper2" @click.stop>
            <div class="block2">
                  <div class="mask-content">
                 <span>确定要退出注册？</span>   
                </div>
               <div class="button">
                 <button @click='cancel'>取消</button>
                 <button  @click='confirm'>确认</button>
            </div>
            </div>
          </div>
        </van-overlay>
    </div>
</div>
  </div>
</template>

<script>
import Vue from 'vue';
import { Dialog } from 'vant';
Vue.use(Dialog);
import { Toast } from 'vant';
Vue.use(Toast);
export default {
  data() {
    return {
      password: "",
      isshowpas: true,
      isshowSee: true,
      isshowMima: false,
       isshowPassword: false,
       code:'',
       btnText:'获取验证',
       time:60,
       codeDisabled:false,
       btnDisabled:true,
       exit:false,
       resCode:''
    };
  },
  mounted() {
    // console.log(this.$route.params.tel);  
      // 创建cookie    
              // this.$cookieStore.setCookie( 'name' , 'name')
      // 获取
              // this.$cookieStore.getCookie( 'name')
      // 删除
             // this.$cookieStore.delCookie('name')
  },
  methods: {
    cancel(){
   this.exit=false
    },
    confirm(){
    this.$router.go(-2);
    },
    btn() {
      this.exit=true
    },
  see() {
    this.isshowSee = !this.isshowSee;
    this.isshowpas = !this.isshowpas;
  },
    clearPassword() {
      this.password = "";
    },
    finish(){
      console.log(this.resCode,)
      console.log(this.code)
      if(this.resCode==this.code){
           this.api.finish({tel:this.$route.params.tel,password:this.password,code:this.code}).then(res=>{
           console.log(res)
           this.$cookieStore.setCookie( 'tel' , this.$route.params.tel)
         })
         Toast('注册成功，请登录！')
         
         this.$router.push({
           path:'/login'
         })
      }else{
        Toast('验证码错误！')
      }
         
    },
    codeText(){
       console.log(this.$route.params.tel)
         this.api.getTelData({tel:this.$route.params.tel}).then(res=>{
           this.resCode=res.data.code
           console.log(res)
         })

      var that=this
     that.codeDisabled=true
       document.querySelector('button').className='active'
    let timer= setInterval(function(){
            that.btnText=that.time+'秒后重试'
            that.time=that.time-1
            if(that.time==-1){
              clearInterval(timer)
              that.btnText='重新获取'
              that.codeDisabled=false
              document.querySelector('button').className='actived'
              that.time=60
            }
      },1000)
    }
  },
  watch:{
 password(value) {
      if (value.length > 0) {
        this.isshowPassword = true;
        if (value.length > 8 && this.code.length>5) {
          this.disabled = false;
           this.btnDisabled=false
        } else {
          this.disabled = true;
          this.btnDisabled=true
        }
      } else {
        this.isshowPassword = false;
         this.btnDisabled=true
      }
    },
    code(value){
      if(value.length>5&&this.password.length>8){
               this.btnDisabled=false
      }else{
        this.btnDisabled=true
      }
    }
  }
};
</script>

<style scoped>
.box {
  padding: 8vw 5vw;
  width: 100%;
  box-sizing: border-box;
  position: fixed;
  justify-content: center;
  text-align: center;
  top: 0;
  background: white;
  z-index: 22;
}
.box i {
  float: left;
  font-size: 18px;
}
.box em {
  float: right;
}
.box1-img {
  margin-top: 10vh;
  width: 100%;
  height: 30vh;
}
.box1-img img {
  width: 100%;
}
.box2 {
  padding: 0 5vw;
}
.box2 span {
  font-size: 15px;
}
.see {
  position: absolute;
  right: 7vw;
  top: 3vw;
  color: rgb(212, 206, 206);
}
.password {
  position: absolute;
  right: 12vw;
  top: 3vw;
  color: rgb(212, 206, 206);
}
.box3 {
  position: relative;
  margin:3vw 5vw;
  border-bottom: 1px solid rgb(211, 207, 207);
}
.box3 /deep/ .van-cell{
  padding: 1vw 0;
}
.box4{
  padding-top:2vh;
  position: relative;
}
.box4 button{
  position: absolute;
  right: 0;
  bottom: 1.5vw;
  background: none;
  border: 1px solid  #65bb56;
   width: 22vw;
   height: 8vw;
  font-size:12px;
  border-radius: 7vw;
  color: #65bb56;
}
.active{
  border:1px solid rgb(221, 213, 213) !important;
   color: rgb(221, 213, 213) !important;
}
.actived{
   border:1px solid #65bb56 !important;
   color:  #65bb56 !important;
}
.box5{
  padding:5vh 5vw;
}
.mask2 /deep/ .van-overlay{
  z-index: 9999;
}
.wrapper2 {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
  }

  .block2 {
       width: 50vw;
    height: 20vw;
    border-radius: 5vw;
    background-color: #fff;
    padding: 5vw 9vw;
  }
  .mask-content span{
    font-size:3.5vw;
  }
  .mask-content p{
    margin:0 ;
  }
  .button{
    margin-top: 5vw;
    display: flex;
    justify-content: space-between;
  }
  .button button:nth-child(1){
    border: 1px solid #65bb56;
    background: white;
    padding: 1vw 5vw ;
    font-size: 13px;
    border-radius: 3vw;
    color: #65bb56;
  }
    .button button:nth-child(2){
    border: 1px solid #65bb56;
    background: #65bb56;
    padding: 1vw 5vw ;
    font-size: 13px;
    border-radius: 3vw;
    color: white;
  }
  .mask-content{
    padding-top: 2vw;
    text-align:center;
  }
</style>