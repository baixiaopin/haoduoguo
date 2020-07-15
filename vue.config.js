module.exports=({
    // publicPath:'./',
   devServer:{
       proxy:{
           'haoduoguo':{
               target:'http://localhost:7000',
               changeOrigin:true,
               pathRewrite:{
                '^/haoduoguo':''
               }
           }
       }
   }
})