import Vuex from 'vuex'
import Vue from 'vue'
Vue.use(Vuex)


const store = new Vuex.Store({
    state: {
      userMsg: {}
    },
    mutations: {
        getUser (state,msg) {
            state.userMsg = msg
        }
    }
  })
  export default store