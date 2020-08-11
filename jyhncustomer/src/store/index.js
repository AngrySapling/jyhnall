import Vuex from 'vuex'
import Vue from 'vue'
Vue.use(Vuex)
import user from '@/api/user.js'
import {setUser} from '@/utils/storage.js'

const store = new Vuex.Store({
    state: {
      userMsg: {}
    },
    mutations: {
        getUser (state,msg) {
          console.log(123)
            state.userMsg = msg
            setUser(msg)
        }
    },
    actions:{
      async getUserMsg(commit){
        let result = await user.personMessage({})
            if(result && result.errCode === 1){
                this.userMsg = result.data
                commit('getUser',result.data)
            }
      }
    }
  })
  export default store