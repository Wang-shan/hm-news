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
import HmNavbar from './components/HmNavbar.vue'
import HmPost from './components/HmPost.vue'
import HmComment from './components/HmComment.vue'

// vant ui 的处理-----------------------------------
// import vant from 'vant'
// import 'vant/lib/index.css'
// Vue.use(vant)

// 按需加载
import {
  Button,
  Toast,
  Field,
  Dialog,
  Radio,
  RadioGroup,
  Cell,
  CellGroup,
  Uploader,
  List,
  Tab,
  Tabs
} from 'vant'
Vue.use(Button)
Vue.use(Toast)
Vue.use(Field)
Vue.use(Dialog)
Vue.use(Radio)
Vue.use(RadioGroup)
Vue.use(Cell)
Vue.use(CellGroup)
Vue.use(Uploader)
Vue.use(List)
Vue.use(Tab)
Vue.use(Tabs)

//---------------------响应拦截-------------------------
// 添加响应拦截器
axios.interceptors.response.use(function(res) {
  // 对响应数据做点什么
  const { statusCode, message } = res.data
  if (statusCode === 401 && message === '用户信息验证失败') {
    //token验证失败
    router.push('/login')
    //删除过期的token
    localStorage.removeItem('token')
    localStorage.removeItem('user_id')
    //提示消息
    Toast.fail(message)
  }
  return res
})

//---------------------请求拦截--------------------------
axios.interceptors.request.use(function(config) {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = token
  }
  return config
})

Vue.component('hm-logo', HmLogo)
Vue.component('hm-header', HmHeader)
Vue.component('hm-button', HmButton)
Vue.component('hm-input', HmInput)
Vue.component('hm-navbar', HmNavbar)
Vue.component('hm-post', HmPost)
Vue.component('hm-comment', HmComment)

axios.defaults.baseURL = 'http://localhost:3000'
Vue.prototype.$axios = axios

//--------------------全局过滤器---------------
import moment from 'moment'
Vue.filter('date', function(input) {
  return moment(input).format('YYYY-MM-DD')
})

Vue.filter('date2', function(input) {
  const d = new Date(input)
  const now = new Date()
  const hour = ((now - d) / 1000 / 60 / 60) | 0
  if (hour < 1) {
    return '1小时内'
  }
  if (hour < 24) {
    return hour + '小时前'
  } else {
    return moment(input).format('YYYY-MM-DD HH:mm:ss')
  }
})

Vue.config.productionTip = false
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
