import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import ViewUI from 'view-design';
import 'view-design/dist/styles/iview.css';
Vue.config.productionTip = false
Vue.use(ViewUI);

import VueI18n from 'vue-i18n'

Vue.use(VueI18n)

const i18n = new VueI18n({
  locale: window.localStorage.getItem('user_lang') == null ? "cn" : window.localStorage.getItem('user_lang'),    // 语言标识
  messages: {
    'cn': require('./utils/cn'),   // 中文语言包
    'en': require('./utils/en')    // 英文语言包
  },
})
Vue.prototype._i18n = i18n    
Vue.prototype.$i18nMsg = function(){    
  return i18n.messages[i18n.locale]  
}  
Vue.prototype._i18n = i18n    
Vue.mixin({
  computed:{
    I18n (){
      return this.$i18nMsg()
    }
  }
});
new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app')
