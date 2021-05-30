<template>
  <div id="cart">
    <nav-bar class="nav-bar">
      <!-- 导航 -->
      <!-- <div slot="center">购物车({{ cartLength }})</div> -->
      <div slot="center">购物车({{ length }})</div>
    </nav-bar>

    <!-- 商品的列表 -->
    <cart-list />

    <!-- 底部的汇总 -->
    <cart-bottom-bar></cart-bottom-bar>
  </div>
</template>

<script>
import NavBar from 'components/common/navBar/NavBar'
import CartList from './childComps/CartList';
import CartBottomBar from './childComps/CartBottomBar';

import { mapGetters } from 'vuex'


export default {
  name: "Cart",
  data () {
    return {
    }
  },
  computed: {
    // cartLength () {
    //   return this.$store.getters.cartLength
    // }
    // 两种语法
    // ...mapGetters(['cartLength', 'cartList'])
    // mapGetters store的getter映射到局部计算属性
    ...mapGetters({
      length: 'cartLength',
    })
  },
  components: {
    NavBar,
    CartList,
    CartBottomBar,
  }
};
</script>

<style scoped lang="less">
.nav-bar {
  background-color: var(--color-tint);
  color: #fff;
}
</style>
