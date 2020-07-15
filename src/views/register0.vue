<template>
  <div>
    <div class="box">
      <i class="iconfont icon-jiantou-copy" @click="btn"></i>
      <span>手机快速注册</span>
    </div>
    <div class="box1">
      <div class="box2">
        <van-field v-model="text" placeholder="请输入手机号" />
        <div class="quhao">
          <span>(+86)</span>
          <i class="iconfont icon-daosanjiao"></i>
        </div>
      </div>
      <div class="box3">
        <van-checkbox v-model="checked"></van-checkbox>
        <i>我已阅读并同意</i>
        <em>《平台服务协议》和《隐私政策》</em>
      </div>
      <div class="box4">
        <van-button round type="primary" :disabled="disabled" size="large" @click="next">下一步</van-button>
      </div>
    </div>

    <div class="mask">
      <van-overlay :show="show" @click="show = false">
        <div class="wrapper" @click.stop>
          <div class="block box5" v-if="isshowChecked">
            <div>
              <checked @cancel="parentevent" @confirm="confir"></checked>
            </div>
          </div>
        </div>
      </van-overlay>
    </div>
    <div class="confirm">
      <!-- <van-dialog v-model="Yushow" show-cancel-button @confirm="confirm">
        <span>我们将发送短信/语音验证码至：</span>
        <p>(+86){{text}}</p>  
      </van-dialog> -->
      <div class="mask2" >
          <van-overlay :show="isshow" @click="show = false">
          <div class="wrapper2" @click.stop>
            <div class="block2">
                  <div class="mask-content">
                 <span>我们将发送短信/语音验证码至：</span>
                 <p>(+86){{text}}</p>
                </div>
               <div class="button">
                 <button @click='concal'>取消</button>
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
import Vue from "vue";
import { Dialog } from "vant";
Vue.use(Dialog);
import { Toast } from "vant";
Vue.use(Toast);
import checked from "@/components/checked.vue";
export default {
  components: {
    checked
  },
  data() {
    return {
      text: "",
      checked: false,
      disabled: true,
      isshowChecked: false,
      show: false,
      Yushow: false,
      isshow:false
    };
  },
  mounted() {},
  methods: {
    btn() {
      this.$router.go(-1);
    },
    next() {
      if (this.checked == false) {
        Toast("请阅读并同意《平台服务协议》和《隐私政策》");
        return;
      }
      this.isshowChecked = true;
      this.show = true;
      console.log(this.text);
    },
    parentevent(data) {
      console.log(data);
       this.show=data
    },
    confir(data) {
      this.isshow = true;
      this.Yushow = data;
    },
    confirm() {
      console.log("125611");
      this.$router.push({
        name: "register1",
        params: {
          tel: this.text
        }
      });
    },
    concal(){
      this.isshow=false
    }
  },
  watch: {
    text(value) {
      if (value.length > 10) {
        this.disabled = false;
      } else {
        this.disabled = true;
      }
    },
    checked(value) {
      if (value == true) {
        // this.disabled=false
      } else {
        //  this.disabled=true
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
  margin-top: 25vw;
}
.box2 /deep/ .van-field__body {
  padding-bottom: 3vw;
  padding-left: 18vw;
  border-bottom: 1px solid rgb(212, 206, 206);
}
.box2 /deep/ .van-cell::after {
  border: none;
}
.box2 {
  position: relative;
}
.quhao {
  position: absolute;
  top: 3vw;
  left: 5vw;
  z-index: 999;
}
.box3 {
  display: flex;
  margin: 1vw 4vw;

  font-size: 12px;
}
.box3 span {
  display: inline-block;
  width: 2vw;
  height: 2vw;
  border: 1px solid gray;
  border-radius: 50%;
}
.box3 i {
  margin-left: 2vw;
  color: rgb(212, 206, 206);
  font-style: normal;
}
.box3 em {
  font-style: normal;
  color: rgb(165, 165, 164);
}
.box3 /deep/ .van-checkbox__icon .van-icon {
  width: 1em;
  height: 1em;
}
.box4 {
  margin: 15vw 3vw;
}
.box3 /deep/ .van-checkbox__icon--checked .van-icon {
  background: #04be02;
  line-height: 1;
}
.box5 {
  position: fixed;
  top: 40%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}

.block {
  padding: 13vw 5vw;
  background-color: #fff;
}
.mask /deep/ .van-overlay {
  z-index: 9999;
}
.wrapper /deep/ .box1 {
  margin-top: 0 !important;
}
.confirm /deep/ .van-dialog {
  padding: 7vw 0 3vw 0;
}
.confirm /deep/ .van-dialog span {
  margin-left: 5vw;
}
.confirm /deep/ .van-dialog p {
  margin-top: 1vw;
  margin-left: 5vw;
}
.confirm /deep/ .van-dialog .van-dialog__content {
  margin-left: 5vw;
  font-size: 14px;
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
    padding: 8vw 9vw;
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
</style>