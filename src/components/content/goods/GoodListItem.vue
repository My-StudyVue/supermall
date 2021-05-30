<template>
  <div class="goods-item" @click="itemClick">
    <!-- <img :src="showImage" alt="" @load="imageLoad"> -->

    <!-- 使用懒加载 -->
    <img v-lazy="showImage" alt="" @load="imageLoad" />
    <div class="goods-info">
      <p>{{ goodsItem.title }}</p>
      <span class="price">{{ goodsItem.price }}</span>
      <span class="collect">{{ goodsItem.cfav }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "GoodListItem",
  components: {},
  props: {
    goodsItem: {
      type: Object,
      default () {
        return []
      }
    }
  },
  methods: {
    imageLoad () {
      //  1.路由进行判断
      // if (this.$route.path.indexOf('/home')) {
      //   this.$bus.$emit('homeItemImageLoad')
      // } else if (this.$route.path.indexOf('/detail')) {
      //   this.$bus.$emit('detailItemImageLoad')
      // }

      // 2.事件总线的三个事件进行调用
      this.$bus.$emit('itemImageLoad')
    },
    itemClick () {
      // push 需要返回，replace 不需要返回
      // 1.动态路由
      this.$router.push('/detail/' + this.goodsItem.iid)
      // 2.query 传参
      // this.$router.push({
      //   path: '/detail',
      //   query:{

      //   }
      // })
    }
  },
  computed: {
    showImage () {
      return this.goodsItem.img || this.goodsItem.image || this.goodsItem.show.img;
    }
  }
}
</script>

<style lang="less" scoped>
.goods-item {
  padding-bottom: 40px;
  position: relative; //子绝父相
  width: 48%;

  img {
    width: 100%;
    border-radius: 5px;
  }

  .goods-info {
    font-size: 12px;
    position: absolute;
    bottom: 5px;
    left: 0;
    right: 0;
    overflow: hidden;
    text-align: center;

    p {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      margin-bottom: 3px;
    }

    .price {
      color: var(--color-high-text);
      margin-right: 20px;
    }

    .collect {
      position: relative;
    }
    .collect::before {
      content: '';
      position: absolute;
      left: -15px;
      top: -1px;
      width: 14px;
      height: 14px;
      background: url('~assets/img/common/collect.svg') 0 0/14px 14px;
    }
  }
}
</style>