import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    cateId:'222',
    tarbar:'more',
    isshow:true,
    // 滑块
  },
  mutations: {
    cateId(state,value){
      state.cateId=value
    },
    tarbar(state,value){
        state.tarbar=value
    },
    tarbarishow(state,value){
      state.isshow=value
    }
  },
  actions: {
  },
  modules: {
  }
})
