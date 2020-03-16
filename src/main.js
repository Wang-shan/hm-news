import Vue from 'vue'
import App from './App.vue'

import './styles/base.less'
import './styles/iconfont.less'
import 'lib-flexible'
import router from './router'

import axios from 'axios'

import HmHeader from './components/HmHeader.vue'
import HmLogo from './components/HmLogo'
import HmButton from './components/HmButton.vue'
import HmInput from './components/HmInput.vue'
// vant ui 的处理-----------------------------------
// import vant from 'vant'
// import 'vant/lib/index.css'
// Vue.use(vant)

// 按需加载
import {Button,Toast,Field} from 'vant'
Vue.use(Button)
Vue.use(Toast)
Vue.use(Field)


Vue.component('hm-logo', HmLogo)
Vue.component('hm-header', HmHeader)
Vue.component('hm-button', HmButton)
Vue.component('hm-input', HmInput)

axios.defaults.baseURL = 'http://localhost:3000'
Vue.prototype.$axios = axios

Vue.config.productionTip = false
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
