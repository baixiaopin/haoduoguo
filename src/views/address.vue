<template>
  <div>
    <div>
      <div class="box">
        <i class="iconfont icon-jiantou-copy" @click="btn"></i>
        <span v-text="title"></span>
      </div>
      <div class="box1">
        <div class="box1-first" v-show="isshow==1">
          <p>您还没有收获地址哦~</p>
          <van-button round type="primary" @click="address">新建地址</van-button>
        </div>
        <div class="box2" v-show="isshow==2">
          <div>
            <van-cell-group>
              <van-field v-model="name" label="收货人" placeholder="请填写收货人姓名" />
            </van-cell-group>
          </div>
          <div>
            <van-cell-group>
              <van-field v-model="phone" label="手机号" placeholder="请填写收获人手机号" />
            </van-cell-group>
          </div>
          <div @click="area">
            <van-cell-group>
              <van-field v-model="address1" label="所在地区" placeholder="请选择收获地址" />
            </van-cell-group>
          </div>
          <div>
            <van-cell-group>
              <van-field v-model="addressDetali" label="详细地址" placeholder="街道、楼牌号等" />
            </van-cell-group>
          </div>
          <div class="box2-bottom">
            <span>设置默认地址</span>
            <van-switch v-model="checked" active-color="#07c160" />
          </div>
          <div>
            <van-action-sheet v-model="areashow">
              <van-area @confirm="confirm" @cancel="cancel" :area-list="areaList" />
            </van-action-sheet>
          </div>
          <div class="buttom">
            <van-button round type="primary" :disabled="disabled" @click="save">保存</van-button>
          </div>
        </div>
        <div class="box3" v-show="isshow==3">
             <div v-for="(item,index) in addresss" :key="index" class="box4">
                <div class="right">     
                        <span v-text='item.name'></span>
                        <em v-text='item.phone'></em>
                        <van-tag type="success" v-show="item.defaultaddress==1?true:false">默认</van-tag>
                        <div class="right-address"><span v-text="item.address"></span><em v-text="item.addressDetali"></em></div> 
                </div>
                  <div class="left" >
                                 <i @click="revise(item.id)" class="iconfont icon-web-icon- left-icon" ></i>
                                 <i @click="remove(item.id)" class="iconfont icon-shanchu left-icon-left"></i>
                         </div>
                <div class="button"><van-button @click="addTure" round type="primary">新增地址</van-button></div>
             </div>
         </div>
        <div class="box2" v-show="isshow==4">
          <div>
            <van-cell-group>
              <van-field v-model="name" label="收货人" placeholder="请填写收货人姓名" />
            </van-cell-group>
          </div>
          <div>
            <van-cell-group>
              <van-field v-model="phone" label="手机号" placeholder="请填写收获人手机号" />
            </van-cell-group>
          </div>
          <div @click="area">
            <van-cell-group>
              <van-field v-model="address1" label="所在地区" placeholder="请选择收获地址" />
            </van-cell-group>
          </div>
          <div>
            <van-cell-group>
              <van-field v-model="addressDetali" label="详细地址" placeholder="街道、楼牌号等" />
            </van-cell-group>
          </div>
          <div class="box2-bottom">
            <span>设置默认地址</span>
            <van-switch v-model="checked" active-color="#07c160" />
          </div>
          <div>
            <van-action-sheet v-model="areashow">
              <van-area @confirm="confirm" @cancel="cancel" :area-list="areaList" />
            </van-action-sheet>
          </div>
          <div class="buttom">
            <van-button round type="primary" :disabled="disabled" @click="resiveAddress">保存</van-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import arealist from "../components/areaList.js";
export default {
  data() {
    return {
      title: "地址管理",
      isshow: 1,
      name: "",
      phone: "",
      address1: "",
      addressDetali: "",
      checked: false,
      areaList: arealist,
      searchResult: [],
      areashow: false,
      disabled: true,
      addresss: [],
      id:0,
      mine:''
    };
  },
  mounted() {
    console.log(this.$route.query.mine)
    this.mine=this.$route.query.mine
    this.getAddress();
  },
  methods: {
    getAddress() {
      this.api.address({ tel: this.$cookieStore.getCookie("tel"),get:'true' }).then(data => {
          this.addresss=data.data
           if (data.data.length == 0) {
            this.isshow=1
            }else{
                this.isshow = 3;
            }
        console.log(this.addresss);
        
      });
    },
    btn() {
      if(this.mine=1){
          this.$router.go(-1);
           this.$store.commit("tarbarishow", true);
      }else{
          this.$router.go(-1);
       this.title='地址管理'
      }
     
    },
    address() {
      this.title = "新建地址";
      this.isshow = 2;
    },
    confirm(e) {
      console.log(e);
      e.forEach(element => {
        this.address1 = this.address1.concat(element.name);
        this.areashow = false;
      });
    },
    cancel() {
      this.areashow = false;
    },
    area() {
      this.areashow = true;
    },
    save() {
        this.api
        .address({
          tel: this.$cookieStore.getCookie("tel"),
          name: this.name,
          phone: this.phone,
          address: this.address1,
          addressDetali: this.addressDetali,
          defaultaddress: this.checked == true ? 1 : 0
        })
        .then(data => {
          console.log(data);
          this.isshow = 3;
          this.title='管理地址'
          this.getAddress();
                          this.name=''
                          this.phone=''
                          this.address1=''
                          this.addressDetali=''           
                          this.checked=false
        });
    },
    addTure(){
        this.isshow=2
        this.add=true
    },
    revise(value){
      console.log(value)
      this.id=value
      this.api.resive({tel:this.$cookieStore.getCookie('tel'),id:value}).then(data=>{
        console.log(data.data[0])
        this.isshow=4
        this.name=data.data[0].name
        this.phone=data.data[0].phone
        this.address1=data.data[0].address
        this.addressDetali=data.data[0].addressDetali             
        this.checked=data.data[0].defaultaddress
         this.title='修改地址'
      })
    },
    remove(value){
           this.api.remove({tel:this.$cookieStore.getCookie('tel'),id:value,remove:true}).then(data=>{
             console.log(data)
             this.getAddress()
           }) 
    },
    resiveAddress(){
      this.api.resive({tel:this.$cookieStore.getCookie('tel'),id:this.id,name:this.name,
                      phone:this.phone,address:this.address1,addressDetali:this.addressDetali,defaultaddress:this.checked== true ? 1 : 0}).then(data=>{
                        console.log(data)
                        this.isshow=3
                        console.log('3333333')
                        this.getAddress();
                           this.name=''
                          this.phone=''
                          this.address1=''
                          this.addressDetali=''           
                          this.checked=false
                           this.title='管理地址'
                      })
    }
  },
  watch: {
    name() {
      console.log(this.name);
      if (
        this.name != "" &&
        this.phone != "" &&
        this.address1 != "" &&
        this.addressDetali != ""
      ) {
        this.disabled = false;
      }
    },
    phone() {
      if (
        this.name != "" &&
        this.phone != "" &&
        this.address1 != "" &&
        this.addressDetali != ""
      ) {
        this.disabled = false;
      }
    },
    address1() {
      if (
        this.name != "" &&
        this.phone != "" &&
        this.address1 != "" &&
        this.addressDetali != ""
      ) {
        this.disabled = false;
      }
    },
    addressDetali() {
      if (
        this.name != "" &&
        this.phone != "" &&
        this.address1 != "" &&
        this.addressDetali != ""
      ) {
        this.disabled = false;
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
  z-index: 222;
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
  margin-top: 22vw;
}
.box1-first {
  text-align: center;
  margin-top: 35vh;
}
.box1-first p {
  color: rgb(192, 188, 188);
}
.box1-first /deep/ .van-button--normal {
  padding: 0 7vw;
}
.box2 /deep/ .van-cell {
  padding: 3vw;
}
.box2-bottom {
  padding: 0 3vw;
  display: flex;
  justify-content: space-between;
}
.buttom {
  position: fixed;
  bottom: 10vw;
  padding: 10vw;
}
.buttom /deep/ .van-button--normal {
  padding: 0 35vw;
}
.button{
position:fixed;
 bottom: 5vw;
  padding: 5vw;
}
.button /deep/ .van-button--normal {
  padding: 0 32vw;
}
.box4{
  margin: 2vw 5vw;
  display: flex;
  padding-bottom: 3vw;
  box-sizing: border-box;
  justify-content: space-between;
  border-bottom: 1px solid rgb(214, 212, 212);
}
.right em{
   font-style: normal;
   margin: 0 3vw 0 5vw;
}
.right-address span{
  color: gray;
  font-size: 3.3vw;
}
.right-address em{
  color: gray;
  font-size: 3.3vw;
}
.left-icon{
  padding-right:1vw;
}
.left-icon-left{
  margin-left:5vw;
}
</style>