<template>
    <div class="box1">
                  <slide-verify :l="42"
            :r="10"
            :w="310"
            :h="155"
            @success="onSuccess"
            @fail="onFail"
            @refresh="onRefresh"
            :slider-text="text"
            ></slide-verify>
            <div class="checkText"> <span>安全验证</span></div>
            <div class="checkText2"> <span>拖动下方滑块完成拼图</span></div>
             <div class="checkText3"> <span class="iconfont icon-wenhao"></span></div>
             <div class="checkText4"> <span class="iconfont icon-quxiao1" @click="cancel"></span></div>
              <div class="checkText5"> <span>{{msg}}</span></div>
             <div></div>
    </div>

</template>

<script>
import Vue from 'vue';
import { Toast } from 'vant';
import { Dialog } from 'vant';
Vue.use(Dialog);
Vue.use(Toast)
    export default {
              name: 'App',
    data(){
        return {
            msg: '',
            text: '',
        }
    },
    methods: {
        onSuccess(){
            this.msg = 'login success'
            console.log('123')
              this.$emit('cancel',false)
          this.$emit('confirm',true)
        },
        onFail(){
            this.msg = '请控制拼图对齐缺口'
        },
        onRefresh(){
            this.msg = ''
        },
        cancel(){
            this.$emit('cancel',false)
            console.log('111')
            Toast('验证失败，请重试');
            this.msg=''
        }
    }
    }
</script>

<style scoped>
.box1{
  position: relative;
}
.box1 .slide-verify-slider-mask{
    height: 0;
}
.box1 /deep/ .slide-verify-slider {
 
    height: 2vw;
}
.box1 /deep/ .slide-verify-slider-mask-item{
     height: 2vw;
     
}
.box1 /deep/ .slide-verify-slider-mask-item{
    height: 0;
    width: 0;
}
.box1 /deep/ .slide-verify-slider-mask-item-icon{
    background: url(http://localhost:7000/image/huakuai.png) no-repeat;
    width: 10vw;
    height: 5vw;
    position: absolute;
    top: -4px;
    left: 2vw;
    background-size: 10vw 5vw; 
}
.box1 /deep/ .container-success .slide-verify-slider-mask-item{
    height: 0; 
    border:none;
}
.box1 /deep/ .container-success .slide-verify-slider-mask{
   background-color: transparent;
   border: none;
}
.box1 /deep/ .slide-verify-slider-mask{
    background-color: transparent;
}
.box1 /deep/ .container-active .slide-verify-slider-mask-item{
   border: none;
}
.box1 /deep/ .container-active .slide-verify-slider-mask{
      border-width:0;
}
.box1 /deep/ .container-fail .slide-verify-slider-mask-item{
   border: none;
}
.box1 /deep/ .container-fail .slide-verify-slider-mask{
      border-width:0;
      border: none;
      background: transparent;
}
.box1 /deep/ .slide-verify-block{
    left:2vw;
}
.checkText{
    position: absolute;
    top:-10vw;
    left:1vw;
    font-size:12px;
    color:gray;
}
.checkText2{
    position: absolute;
    top:-6vw;
    left:1vw;
}
.checkText3{
    position: absolute;
    bottom:-9vw;
    left:1vw;
    color: gray;
}
.checkText4{
    position: absolute;
    bottom:-9vw;
    right:1vw;
    color: gray;
}
.checkText5{
    position: absolute;
    bottom:-8vw;
    left:7vw;
    font-size: 12px;
    color: gray;
}

.box1 /deep/ .slide-verify-refresh-icon{
     position: absolute;
    top: -7vw;
    right:-4vw;
    background:url(http://localhost:7000/image/refesh.png) no-repeat;
    background-size: 5vw;
}
.iconfont {
    color: rgb(204, 199, 199);
    font-size: 5vw;
}
</style>