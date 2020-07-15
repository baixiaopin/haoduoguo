<template>
<div>


    <div>
              <div class="top"><van-nav-bar
                title="档口"
                fixed
                /></div>
              <div class="content" >
                  <div class="img" v-for="(item,index) in notchList" :key="index" @click="notch(item.id)">
                      
                      <img :src="item.picUrl" alt="">
                
                  </div> 
                  
              </div>
    </div>
    
    </div>
</template>

<script>

    export default {
           components:{
              
           } ,
           data(){
               return{
                   notchList:[]
               }
           },
           mounted(){
              this.getNotchData()
           },
           methods:{
               getNotchData(){
                   this.api.getNotchData().then(data=>{
                       console.log(data)
                       this.notchList=data.data
                   })
               },
               notch(value){
                   console.log(value)
                     this.$router.push({
                path:'/shopDetali?shopid='+value
            })
               }
           }
    }
</script>

<style scoped>
 .content{
     margin-top: 3vw;
     background: rgb(250, 249, 249);
 }
 .content .img{
  width: 94vw;
  height: 41vh;
 margin-left: 3vw;
 padding-bottom: 5vh;
 }
 .content .img img:first-child{
     margin-top: 8vh;
 }
  .content .img img:last-child{
     padding-bottom: 8vh;
 }
 .content .img img{
     width:100%;
     height:100%;
     margin-top: 5vh;
    
 }
</style>