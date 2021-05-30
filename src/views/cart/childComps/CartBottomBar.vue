<template>
  <div class="bottom-bar">
    <div class="checked-all">
      <check-button
        class="checked"
        :is-checked="isSelectAll"
        @click.native="checkClick"
      />全选
    </div>
    <div class="price">合计：{{ totalPrice }}</div>
    <div class="calculate" @click="calcClick">去计算({{ checkedLength }})</div>
  </div>
</template>

<script>
import CheckButton from 'components/content/checkButton/CheckButton'

import { mapGetters } from 'vuex'

export default {
  name: 'CartBottomBar',
  data () {
    return {

    }
  },
  computed: {
    ...mapGetters(['cartList']),
    totalPrice () {
      // return '￥' + this.$store.state.cartList.filter(item => {
      return '￥' + this.cartList.filter(item => {
        return item.checked
      }).reduce((preValue, curValue) => {
        return curValue.price * curValue.count + preValue
      }, 0).toFixed(2)
    },
    checkedLength () {
      return this.cartList.filter(item => item.checked).length
    },
    isSelectAll () {
      // if (this.cartList.length === 0) return false
      // return !(this.cartList.filter(item => !item.checked).length)
      // return !this.cartList.find(item => !item.checked)
      // return this.cartList.every(item => item.checked)

      return this.cartList.every(item => item.checked) && (this.cartList.length !== 0)
    },
  },
  components: {
    CheckButton,
  },
  methods: {
    checkClick () {
      if (this.isSelectAll) {
        this.cartList.forEach(item => item.checked = false)
      } else {
        this.cartList.forEach(item => item.checked = true)
      }

      // 不能简化 因为两个变量相互影响
      // this.cartList.forEach(item => item.checked = !this.isSelectAll)
    },
    calcClick () {
      if (!this.isSelectAll) {
        this.$toast.show('请选择购买的商品')
      }
    },
  }
}
</script>

<style scoped lang="less">
.bottom-bar {
  height: 44px;
  background-color: #eee;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-top: 1px solid #aaa;

  .checked-all {
    display: flex;
    line-height: 22px;
    margin-left: 10px;
    // width: 60px;

    .checked {
      width: 22px;
      height: 22px;
      margin-right: 5px;
    }
  }

  .price {
    margin-left: 30px;
    // flex: 1;
  }

  .calculate {
    height: 44px;
    line-height: 44px;
    width: 100px;
    background-color: red;
    color: #fff;
    text-align: center;
  }
}
</style>
