import Vue from 'vue'
import App from './App.vue'
import element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';
import router from './router/router'
import echarts from 'echarts';
// import echarts from 'echarts/lib/echarts';

Vue.prototype.$echarts = echarts 

Vue.config.productionTip = false
Vue.use(element)
Vue.use(router)

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
