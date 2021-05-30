export default {
  // addCart (state, payload) {
  // 1.for循环
  // let oldProduct = null
  // for (let item of state.cartList) {
  //   if(item.iid === payload.iid){
  //     oldProduct = item 
  //   }
  // }
  // 判断payload是否在位新添加的商品
  // if (oldProduct) {
  //   oldProduct.count +=1
  // }else{
  //   oldProduct.count = 1
  //   state.cartList.push(payload)
  // }

  // 2.indexOf方法
  // let index = state.cartList.indexOf(payload)
  // 判断payload是否在位新添加的商品
  // if (index === -1) {
  //   let oldProduct = state.cartList[index]
  //   oldProduct.count += 1
  // } else {
  //   payload.count = 1
  //   state.cartList.push(payload)
  // }

  // 3.数组find方法
  // }

  addCountor (state, payload) {
    payload.count++
  },
  addToCart (state, payload) {
    payload.checked = true
    state.cartList.push(payload)
  }
}