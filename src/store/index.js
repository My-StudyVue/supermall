import Vue from 'vue'
import Vuex from 'vuex'

import mutations from './mutations'
import actions from './actions'
import getters from './getters'

// 1.安装插件
Vue.use(Vuex)

// 2.创建store对象
const state = {
  cartList: []
}
const store = new Vuex.Store({
  state,
  // mutations 的唯一目的 —— 就是修改state中的状态
  // mutations 的设计目的 —— 尽可能完成的事件比较单一
  // mutations 进行跟踪
  mutations,

  //除了异步 复杂函数也可
  actions,
  getters,
})

// 3.挂载vue实例上
export default store