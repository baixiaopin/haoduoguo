<template>
  <div>
    <div class="box">
      <i class="iconfont icon-jiantou-copy" @click="btn"></i>
    </div>
    <div class="box1">
      <h1>账号密码登录</h1>
      <div class="box2">
        <van-field v-model="text" placeholder="用户名/邮箱/手机号" />
        <i v-show="isshowMima" class="iconfont icon-quxiao see" @click="clearZhanhao"></i>
      </div>
      <div class="box3">
        <van-field v-show="!isshowpas" v-model="password" type="text" placeholder="请输入密码" />
        <van-field v-show="isshowpas" v-model="password" type="password" placeholder="请输入密码" />
        <i v-show="isshowSee" class="iconfont icon-weibiaoti-- see" @click="see"></i>
        <i v-show="!isshowSee" class="iconfont icon-mimakejian see lagar" @click="see"></i>
        <i v-show="isshowPassword" class="iconfont icon-quxiao password" @click="clearPassword"></i>
      </div>
      <span class="forget">忘记密码</span>
      <van-button round type="primary" :disabled="disabled" size="large" @click="login">登录</van-button>
    </div>
    <div class="box4">
      <div>
        <span>短信验证码登录</span>
      </div>
      <div>
        <span @click="register">新用户注册</span>
      </div>
    </div>
    <!--  -->
    <div class="box5">
      <span></span>
      <i>其他登录方式</i>
      <span></span>
    </div>
    <div class="box6">
      <div class="img">
        <i class="iconfont icon-login_"></i>
        <div class="weixin">
          <span>微信登录</span>
        </div>
      </div>
      <div class="img">
        <i class="iconfont icon-qq"></i>
        <div class="weixin">
          <span>QQ登录</span>
        </div>
      </div>
    </div>
    <div class="box7">
        <span>登录即代表您已同意<em>《相关隐私政策》</em></span>
    </div>
  </div>
</template>

<script>
import { Toast } from 'vant';
import mineVue from './mine.vue';
export default {
  data() {
    return {
      text: "",
      password: "",
      isshowSee: true,
      isshowMima: false,
      isshowPassword: false,
      isshowpas: true,
      disabled: true,
      disable: false,
      loginInfo:[]
    };
  },
  mounted(){
          
  },
  created() {
    this.$store.commit("tarbarishow", false);
  },
  methods: {
    login(){
        console.log(this.text,this.password)
        this.api.login({tel:this.text,pwd:this.password}).then(res=>{
          // console.log(res.data[0].password)
          console.log(this.password)
          if(res.data.length==0){
            console.log('11111111')
           
            Toast('账号错误')
            return
          }
            if(res.data[0].password!=this.password){
               console.log(res)
              Toast('密码错误')
              return
        }
        if(res.data[0].password==this.password){
           this.$cookieStore.setCookie( 'tel' , this.text)
        
               console.log(res)
              Toast('登录成功')
              this.$store.commit('tarbarishow',true)
              this.$router.push({
                path:'/mine?tarbar=mine'
              })
        }
         
        })
    },
    btn() {
     
      this.$router.go(-1);
        this.$store.commit("tarbarishow", true);
    
    },
    see() {
      this.isshowSee = !this.isshowSee;
      this.isshowpas = !this.isshowpas;
    },
    clearZhanhao() {
      this.text = "";
    },
    clearPassword() {
      this.password = "";
    },
    register(){
        this.$router.push({
            path:'/register0'
        })
    }
  },
  watch: {
    text(value) {
      if (value.length > 0) {
        this.isshowMima = true;
        if(value.length > 0&&this.password.length>8){
            this.disable = true;
        this.disabled = false;
        }
        
      } else {
        this.isshowMima = false;
        this.disable = false;
        this.disabled = true;
      }
    },
    password(value) {
      if (value.length > 0) {
        this.isshowPassword = true;
        if (value.length > 8 && this.text.length>0) {
          this.disabled = false;
        } else {
          this.disabled = true;
        }
      } else {
        this.isshowPassword = false;
      }
    }
  }
};
</script>

<style scoped>
.lagar{
    font-size: 20px;
}
.box {
  padding: 8vw 5vw;
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
  font-size: 18px;
}

.box em {
  float: right;
}
.box1 {
  margin-top: 22vw;
  padding: 0 4vw;
}
.box1 h1 {
  padding-left: 3vw;
  font-size: 23px;
  margin-top: 0;
  margin-bottom: 7vw;
  box-sizing: border-box;
}
.box1 /deep/ .van-field__body {
  padding-bottom: 2vw;
  border-bottom: 1px solid rgb(212, 206, 206);
}
.box1 /deep/ .van-field__control {
  padding-left: 2vw;
  box-sizing: border-box;
}
.box1 /deep/ .van-button--round {
  margin-top: 12vw;
}
.box1 /deep/ .van-cell {
  padding-left: 0;
  padding-right: 0;
}
.forget {
  font-size: 12px;
  float: right;
  margin-right: 2vw;
  color: rgb(212, 206, 206);
}
.box1 /deep/ .van-cell::after {
  border: none;
}
.box3 {
  position: relative;
}
.see {
  position: absolute;
  right: 2vw;
  top: 3vw;
  color: rgb(212, 206, 206);
}
.box2 {
  position: relative;
}
.password {
  position: absolute;
  right: 8vw;
  top: 3vw;
  color: rgb(212, 206, 206);
}
.box4 {
  display: flex;
  padding: 5vw;
  justify-content: space-between;
  color: rgb(212, 206, 206);
}
.box4 span {
  font-size: 12px;
}
.box5 span {
  display: inline-block;
  width: 20vw;
  height: 0.2vw;
  background: rgb(247, 244, 244);
}
.box5 {
  padding: 3vw;
  display: flex;
  align-items: center;
  justify-content: center;
}
.box5 i {
  font-size: 12px;
  font-style: normal;
  color: rgb(197, 188, 188);
  padding: 0 2vw;
}
.box6 {
  display: flex;
  justify-content: center;
}
.box6 i:nth-child(1) {
  font-size: 28px;

  color: #04be02;
}
.box6 i:nth-child(2) {
  font-size: 33px;
  color: #25b6ed;
}
.weixin {
  font-size: 11px;
  text-align: center;
  color: rgb(197, 188, 188);
}
.img {
  text-align: center;
  margin: 0 8vw;
}
.box7{
    margin-top: 15vw;
    display: flex;
    justify-content: center;
    font-size: 12px;
    color: rgb(197, 188, 188);
   
}
.box7 em{
 font-style: normal;
  color: rgb(133, 130, 130);
}
</style>