<template>
    <div>
              <div class="shop-top" v-for="(item,index) in shop" :key="index" @click="shopdetali(item.shopid)">
                  <h2>优秀</h2><h3>商家</h3><h5>|</h5>
                           <h4 v-text="item.title"></h4>
                           <div class="img" >  <img :src="item.picUrl" alt=""> </div>
                
               </div>    
             
    </div>
</template>

<script>
    export default {
        data(){
            return{
                shop:[]
            }
        },
        mounted() {
    this.api.getShopData().then(data => {
    //   console.log(data.data[0]);
      this.shop=[data.data[0]]
      
    })
    },
    methods:{
        shopdetali(value){
            console.log(value)
            this.$router.push({
                path:'/shopDetali?shopid='+value
            })
        }
    }
}
</script>

<style scoped>
h2,h3,h4,h5{
    padding: 0;
    margin: 0;
    font-size:25px;
}
.shop-top{
    
    padding: 3vw;
    display: flex;
    align-items: center;
    box-sizing: border-box;
    flex-wrap: wrap;
}
h3{
   color:#65bb56; 
}
h5{
    margin: 0 5vw;
    font-weight: 10;
    color: gray;
}
h4{
    color:gray;
      font-weight: normal;
    
}
.img img{
    width: 100%;
    height: 100%;
}
.img{
    margin-top:5vw;
    width: 100%;
}
</style>