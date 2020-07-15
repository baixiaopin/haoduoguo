<template>
  <div class="bg">
       <div class="info" v-show="!isshow">
                   <div class="box">
      <i class="iconfont icon-jiantou-copy" @click="btn"></i>
      <span>个人信息</span>
    </div>
    <div class='box1' >
       <div class="box1-fen" >
            <div class='box-icon'><span>头像</span></div>
             <div class="box1-text"></div>
       </div>
        <div class="right" @click='click'><img :src="loginInfo.picUrl" alt=""> <i class="iconfont icon-arrow-backimg"></i></div>
           
    </div>
    <!--  -->
    <div class="box2" @click="rename">
       <div class="box2-text" ><span>用户名</span></div>
       <div class="right"><h2 >{{loginInfo.token}}</h2><i class="iconfont icon-arrow-backimg"></i></div>
    </div>
    <div class="box2" @click="nickName">
       <div class="box2-text"><span>昵称</span></div>
       <div class="right"><h2 >{{loginInfo.nickname}}</h2><i class="iconfont icon-arrow-backimg"></i></div>
    </div>
   
    <div class="bg2">
      <van-popup v-model="show" round position="bottom" :style="{ height: '32%' }" >
        <div class="b-text1"><p>选择头像</p></div>
        <div class="b-text1">  <h1>拍照</h1></div>
        <div @click='search' class="she">
          <van-uploader  :after-read="afterRead" >
            <div class="she1"> <h1 >从相册选择</h1></div>
  </van-uploader>
          </div>
          <div class="sike"></div>
            <div class='b-text2' @click="concel"><p>取消</p></div>
    </van-popup>
     
      </div>
       </div>


     <div class="info" v-show="isshow">
        <div class="box">
      <i class="iconfont icon-jiantou-copy" @click="nick"></i>
      <span>修改昵称</span>
    </div>
    <div class="box3"></div>
    <div class="box2" @click="nickName">
       <van-cell-group>
  <van-field v-model="value" label="昵称" placeholder="请输入用户名" />
</van-cell-group>
    </div>
    <div class='box4'><van-button size="large" @click="confirm" round type="primary">确认</van-button></div>
       </div>
  </div>
</template>

<script>
import { Toast } from 'vant';
export default {
    data(){
        return{
            loginInfo:[],
            isshow:true,
            value:'',
            show:false,
            fileList:''
        }
    },
  methods: {
    btn() {
      this.$router.go(-1);
    },
    rename(){
          Toast('已复制')
    },
    nickName(){
             this.isshow=true
    },
    nick(){
      this.isshow=!this.isshow
    },
    confirm(){
      console.log(this.value)
      this.api.personinfo({tel:this.$cookieStore.getCookie('tel'),nickName:this.value}).then(data=>{
        console.log(data)
        this.getpersoninfo()
        this.isshow=!this.isshow
      })
    },
    getpersoninfo(){
    console.log(this.$cookieStore.getCookie('tel'))
       if(this.$cookieStore.getCookie('tel')){
       this.api.login({tel:this.$cookieStore.getCookie('tel')}).then(res=>{
         this.isshow=false
         this.loginInfo=res.data[0]
         this.value=res.data[0].nickname
         console.log(this.loginInfo)
       })
         }else{
             this.isshow=true
         }
    },
     afterRead(file) {
    
        // this.fileList.filename=this.$cookieStore.getCookie('tel')
        console.log(file.file)
        var formData = new FormData(); //构造一个 FormData，把后台需要发送的参数添加
 　      formData.append('file', file.file); //接口需要传的参数
        formData.append('tel',this.$cookieStore.getCookie('tel'))
         this.api.upDataheader(formData).then(data=>{
       console.log('1111',data)
       this.getpersoninfo()
     })
      
     
    },
    concel(){
      this.show=false
    },
    click(){
      this.show=true
    },
    search(){
      console.log(1111)
     
      this.show=false
    }
  },
   mounted(){
        this.getpersoninfo()
  },
};
</script>

<style scoped>
.bg{
  background: rgb(252, 250, 250);
  height: 80vh;
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
  z-index: 222;
}
.box i {
  float: left;
  font-size: 18px;
}
.box em {
  float: right;
}
.box1 {
  margin-top: 20vw;
  display: flex;
  padding: 5vw;
  align-items: center;
  justify-content: space-between;
  background: white;
}
.icon{
       font-size: 10vw;
         color: #65bb56;
}
.box1-text h1,h2{
    margin: 0 5vw;
    
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
    padding: 0 5vw;
    padding: 3vw;
    border-top: 1px solid rgb(247, 242, 242);
     background: white;
}

.box2-text span{
    font-size: 15px;
}

.right{
    font-size: 8px;
   padding-left: 51vw;
    color: rgb(187, 180, 180);
    display: flex;
    align-items: center;
}
.right h2{
    margin: 0;
    font-weight: normal;
}
 .right .icon{
    color: #65bb56;
}
.box-icon span{
    font-size:15px;
}
.box2 span{
    font-size:15px;
}
.box3{
  margin-top: 19vw;
}
.box4{
  margin:0 8vw;
}
.box4 /deep/ .van-button--large{
  height: 11vw;
}
.right img{
  width:10vw;
  height:10vw;
  border-radius: 50%;
  overflow: hidden;
  margin-right: 2vw;
}
.she /deep/ .van-uploader__upload{
  background: white;
}
.she /deep/ .van-uploader__upload-icon{
  color: #65bb56;
}
 .preview-cover {
    position: absolute;
    box-sizing: border-box;
    bottom: 0;
    width: 100%;
    padding: 4px;
    color: #fff;
    font-size: 12px;
    text-align: center;
    background: rgba(0, 0, 0, 0.3);
  }
  .sike{
    width:100%;
    height: 2.5vw;
    background: transparent;
  }
  .b-text1 p{
      text-align: center;
      color: gray;
  }
  .b-text1{
    border-bottom: 1px solid rgb(228, 224, 224);
    background: rgb(255,255,255,0.95);
  }
  .b-text1 h1{
     text-align: center;
    margin:3vw;
    font-size:16px;
    font-weight:normal;
    color:rgb( 49,160,254);
   
     margin: 0;
     padding:3vw;
  }
    .b-text1 p{
     text-align: center;
    font-size:16px;
     margin: 0;
     padding:3vw;
  }
  
  .she{
    padding:1vw;
     background: rgb(255,255,255,0.95);
    display: flex;
    justify-content: center;
    border-bottom:1px solid rgb(228, 224, 224);
    border-bottom-left-radius: 4vw;
    border-bottom-right-radius: 4vw;
  }
  .she1 h1{
     margin: 0;
     font-weight:normal;
    font-size:16px;
    text-align: center;
     padding:3vw;
        color:rgb( 49,160,254);
  }
 .b-text2 p{
    background: rgb(255,255,255,0.95);
   margin: 0;
       color:rgb( 49,160,254);
   padding: 4vw;
   border-radius: 3vw;
     text-align:center;
     font-weight: 600;
 }
 .bg2 /deep/ .van-popup{
   width: 96vw;
   margin: 2vw;
   background: transparent;
 }
</style>