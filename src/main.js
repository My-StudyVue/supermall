import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import Fastclick from 'fastclick'
import VueLazyload from 'vue-lazyload'

import toast from 'components/common/toast'

Vue.config.productionTip = false

// 添加事件总线对象
Vue.prototype.$bus = new Vue()
// 安装toast插件
Vue.use(toast)
// 解决移动端的300ms的延迟
Fastclick.attach(document.body)
// 使用图片懒加载
// Vue.use(VueLazyload)
Vue.use(VueLazyload, {
  // preLoad: 1.3,
  // error: 'dist/error.png',
  loading: require('./assets/img/common/placeholder.png'),
  // attempt: 1
})

new Vue({
  render: h => h(App),
  router,
  store,
}).$mount('#app')


// 类的继承
// class Animal {
//   run () {

//   }
// }

// class Person extends Animal{
//   run () {

//   }
// }

// class Dog extends Animal{
//   run () {

//   }
// }

// class Person {
//   run () {

//   }
// }

// class Dog {
//   run () {

//   }
// }