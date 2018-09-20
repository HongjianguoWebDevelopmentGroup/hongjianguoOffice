// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import VueQuillEditor from 'vue-quill-editor'
import MyAxios from '@/const/MyAxios'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App'
import './fonts/iconfont.css'
import axios from 'axios'

import tool from './const/tool'


// import '../static/jquery-3.2.1.js'

// import '../static/UE/ueditor.config.js'
// import '../static/UE/ueditor.all.min.js'
// import '../static/UE/lang/zh-cn/zh-cn.js'
// import '../static/UE/ueditor.parse.min.js'

Vue.prototype.$axios = axios;
Vue.prototype.$tool = tool;


Vue.config.productionTip = false;
Vue.use(ElementUI);
Vue.use(VueQuillEditor);
Vue.use(MyAxios);
axios.defaults.headers.common['Authorization'] = window.localStorage.getItem("token");

console.log(window.localStorage.getItem("token"))
// 添加请求拦截器
axios.interceptors.request.use(config => {
  // 在发送请求之前做些什么
  //判断是否存在token，如果存在将每个页面header都添加token
  
  if(window.localStorage.getItem("token")){
    config.headers.common['Authorization'] = window.localStorage.getItem("token");
  }
   
    return config;
  }, error => {
  // 对请求错误做些什么
    return Promise.reject(error);
  });
   
  // // http response 拦截器
  // Axios.interceptors.response.use(
  // response => {
   
  // return response;
  // },
  // error => {
   
  // if (error.response) {
  // switch (error.response.status) {
  // case 401:
  // this.$store.commit('del_token');
  // router.replace({
  // path: '/login',
  // query: {redirect: router.currentRoute.fullPath}//登录成功后跳入浏览的当前页面
  // })
  // }
  // }
  // return Promise.reject(error.response.data)
  // });
  
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
