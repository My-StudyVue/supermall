export default {
  addCart (context, payload) {
    // context ---> (对象的结构)state,commit
    // addCart ({state,commit}, payload) {
    // let product = context.state.cartList.find(item => item.iid === payload.iid)
    // // 判断payload是否在位新添加的商品
    // if (product) {
    //   // product.count += 1
    //   context.commit('addCountor', product)
    // } else {
    //   payload.count = 1
    //   // state.cartList.push(payload)
    //   context.commit('addToCart', payload)
    // }

    return new Promise(resolve => {
      let product = context.state.cartList.find(item => item.iid === payload.iid)
      // 判断payload是否在位新添加的商品
      if (product) { //数量+1
        // product.count += 1
        context.commit('addCountor', product)
        resolve('数量+1')
      } else { //添加到购物车
        payload.count = 1
        // state.cartList.push(payload)
        context.commit('addToCart', payload)
        resolve('添加到购物车')
      }
    })
  }
}