import axios from 'axios'
import qs from 'qs'
function sendGetRequrie(url,parmas){
    return new Promise(function(resolve,reject){
        axios.get(url,parmas).then(function(data){
            resolve(data)
        },function(err){
            reject(err)
        })
    })
}

function sendPostRequrie(url,info){
    return new Promise(function(resolve,reject){
        axios.post(url,info).then(function(data){
            resolve(data)
        },function(err){
            reject(err)
        })
    })
}

var baseUrl='/haoduoguo'
export default{
    getBannerData(){
        return sendGetRequrie(baseUrl+'/bannerinfo')
    },
    getCateData(){
        return sendGetRequrie(baseUrl+'/cateinfo')
    },
    getShopData(){
        return sendGetRequrie(baseUrl+'/shopinfo')
    },
    getHotData(parmas){
        return sendGetRequrie(baseUrl+'/hotinfo?id='+parmas.id)
    },
    getNotchData(){
        return sendGetRequrie(baseUrl+'/notch')
    },
    getMoreData(parmas){
        return sendGetRequrie(baseUrl+'/more?row='+parmas.row+"&col="+parmas.col)
    },
    // 获取hot商品详情
    getHotDetaliData(parmas){
        return sendGetRequrie(baseUrl+'/hotdetali?id='+parmas.id,)
    },
    // 获取档口信息
    getShopDetaliData(parmas){
        return sendGetRequrie(baseUrl+'/shopDetali?shopid='+parmas.shopid)
    },
    // 注册验证码
    getTelData(info){
        return sendPostRequrie(baseUrl+'/tel',qs.stringify(info))
    },
    // 注册
    finish(info){
        return sendPostRequrie(baseUrl+'/finish',qs.stringify(info))
    },
    // 登录
    login(info){
        return sendPostRequrie(baseUrl+'/login',qs.stringify(info))
    },
    // 修改信息
    personinfo(info){
        return sendPostRequrie(baseUrl+'/personInfo',qs.stringify(info))
    },
    // 添加地址
    address(info){
        return sendPostRequrie(baseUrl+'/address',qs.stringify(info))
    },
    // 修改地址
    resive(info){
        return sendPostRequrie(baseUrl+'/reviseaddress',qs.stringify(info))
    },
    // 删除地址
    remove(info){
        return sendPostRequrie(baseUrl+'/removeaddress',qs.stringify(info))
    },
    // 加入购物车
    addCarData(info){
        return sendPostRequrie(baseUrl+'/addCar',qs.stringify(info))
    },
    // 获取购物车数据
    getCarData(info){
        return sendPostRequrie(baseUrl+'/getcar',qs.stringify(info))
    },
    // 获取购物车订单
    getorderData(info){
            return sendPostRequrie(baseUrl+'/order',qs.stringify(info))
    },
    // 保存称重订单
    saveOrder(info){
            return sendPostRequrie(baseUrl+'/saveorder',qs.stringify(info))
    },
    // 获取称重订单
    getOrder(info){
            return sendPostRequrie(baseUrl+'/getorder',qs.stringify(info))
    },
    // 获取订单详情
    getOrderDetali(info){
         return sendPostRequrie(baseUrl+'/getorderDetali',qs.stringify(info))
    },
    // 搜索
    searchData(info){
        return sendPostRequrie(baseUrl+'/search',info)
    },
    //上传头像
    upDataheader(info){
        return sendPostRequrie(baseUrl+'/upDataheader',info)
    }
   
}