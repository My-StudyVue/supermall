<template>
  <div class="Cart-list">
    <!-- 可滚动的区域 -->
    <scroll class="content" ref="scoll">
      <cart-list-item
        v-for="(item, index) in cartList"
        :key="index"
        :item-info="item"
      />
    </scroll>
  </div>
</template>

<script>
import Scroll from 'components/common/scroll/Scroll'

import CartListItem from './CartListItem'

import { mapGetters } from 'vuex'


export default {
  name: 'CartList',
  data () {
    return {

    }
  },
  computed: {
    ...mapGetters(['cartList'])
  },
  activated () {
    this.$refs.scoll.refresh()
  },
  components: {
    Scroll,
    CartListItem,
  }
}
</script>

<style scoped lang="less">
.content {
  height: calc(100vh - 93px - 40px);
  overflow: hidden;
}
</style>
