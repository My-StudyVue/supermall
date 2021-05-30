<template>
  <div id="detail">
    <!-- 导航栏 -->
    <detail-nav-bar
      class="detail-nav"
      @titleClick="titleClick"
      ref="detailNavBar"
    />

    <!-- 可滚动区域 -->
    <scroll
      class="content"
      ref="scroll"
      :probe-type="3"
      @scroll="contentScroll"
    >
      <!-- 轮播图 -->
      <detail-swiper :top-images="topImages" />
      <!-- 基础信息 -->
      <detail-base-info :goods="goods" />
      <!-- 商家信息 -->
      <detail-shop-info :shop="shop" />
      <!-- 商品详情 -->
      <detail-goods-info
        :detail-info="detailInfo"
        @detailImageLoad="detailImageLoad"
      />
      <!-- 商品参数信息 -->
      <detail-param-info :param-info="paramInfo" ref="params" />
      <!-- 用户评价 -->
      <detail-comment-info :comment-info="commentInfo" ref="comment" />
      <!-- 商品推荐 -->
      <goods-list :goods="recommends" ref="recommend" />
    </scroll>

    <!-- 返回顶部 -->
    <back-top @click.native="backClick" v-show="isShowBackTop" />

    <!-- 底部导航栏 -->
    <detail-bottom-bar @addToCart="addToCart" />

    <!-- 信息弹出框 -->
    <!-- <toast :message="message" :show="show" /> -->
  </div>
</template>

<script>
import DetailNavBar from "./childComps/DetailNavBar";
import DetailSwiper from "./childComps/DetailSwiper";
import DetailBaseInfo from "./childComps/DetailBaseInfo";
import DetailShopInfo from "./childComps/DetailShopInfo";
import DetailGoodsInfo from './childComps/DetailGoodsInfo';
import DetailParamInfo from './childComps/DetailParamInfo';
import DetailCommentInfo from './childComps/DetailCommentInfo';
import DetailBottomBar from './childComps/DetailBottomBar';

import Scroll from "components/common/scroll/Scroll";
import GoodsList from 'components/content/goods/GoodsList';
// import Toast from 'components/common/toast/Toast';


import { getDetail, Goods, Shop, GoodsParam, getRecommend } from "network/detail";

import { itemListenerMixin, backtopMixin } from 'common/mixin';
import { debounce } from 'common/utils';

import { mapActions } from 'vuex'

export default {
  name: "Detail",
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    Scroll,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    GoodsList,
    DetailBottomBar,
    // Toast,
  },
  mixins: [itemListenerMixin, backtopMixin],
  data () {
    return {
      iid: null,
      topImages: [],
      goods: {},
      shop: {},
      detailInfo: {},
      paramInfo: {},
      commentInfo: {},
      recommends: [],
      themeTopYs: [],
      getThemeTopYs: null,
      currentIndex: 0,
      message: "",
      show: false,
    };
  },
  created () {
    // 1.保存传入的iid
    this.iid = this.$route.params.id;

    // 2.根据iid请求详情数据 ------> 商品详情
    getDetail(this.iid).then(res => {
      // 1.获取顶部的图片轮播图数据
      const data = res.result;
      this.topImages = data.itemInfo.topImages;

      //  2.获取商品信息
      this.goods = new Goods(
        data.itemInfo,
        data.columns,
        data.shopInfo.services
      );

      //  3.获取商铺信息
      this.shop = new Shop(data.shopInfo);

      // 4.保存商品的详情数据
      this.detailInfo = data.detailInfo

      //  5.获取我们的参数信息
      this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule)

      //  6.获取用户评论信息
      if (data.rate.cRate !== 0) {
        this.commentInfo = data.rate.list[0]
      }
    });

    // 3.获取推荐信息
    getRecommend().then(res => {
      this.recommends = res.data.list
    })

    // 值不对的原因 this.$refs.params.$el 压根没有渲染
    // this.handleThemeTopYs()

    // 二.更新dom完有个函数 this.$nextTick()
    // 需要传入回调函数
    // this.$nextTick(() => {
    //   this.handleThemeTopYs()
    // })

    // 4.给getThemeTopYs进行赋值----防抖操作
    this.getThemeTopYs = debounce(() => {
      this.handleThemeTopYs()
    }, 100)
  },

  // 一.在updated里面拿已经获取数据的组件的offset的值 ------ 更新完dom 
  // updated () {
  //   this.handleThemeTopYs()
  // },

  destroyed () {
    this.$bus.$off('itemImageLoad', this.itemImgListener)
  },
  methods: {
    ...mapActions(['addCart']),
    detailImageLoad () {
      this.$refs.scroll.refresh();
      this.getThemeTopYs()
    },
    titleClick (index) {
      this.$refs.scroll.scrollTo(0, -this.themeTopYs[index], 200);
    },
    handleThemeTopYs () {
      // offsetTop值不对的时候，都是因为图片的问题
      // 根据最新的数据，对应的DOM已经被渲染出来了
      // 但是图片依然没有加载完

      // 值不对的原因： 图片没有计算在内
      this.themeTopYs = []
      this.themeTopYs.push(0)
      this.themeTopYs.push(this.$refs.params.$el.offsetTop - 44)
      this.themeTopYs.push(this.$refs.comment.$el.offsetTop - 44)
      this.themeTopYs.push(this.$refs.recommend.$el.offsetTop - 44)
      this.themeTopYs.push(Number.MAX_VALUE)
    },
    contentScroll (position) {
      // 1. 获取y值
      const postionY = -position.y
      // 2. postionY和主题中的y值进行对比

      // [0, 11502, 12482, 12678]
      // 在 0 到 11502 之间，index = 0
      // 在 11502 到 12482 之间，index = 1
      // 在 12482 到 12678 之间，index = 2

      // 在 12678 之后，index = 3

      // for (let i in this.themeTopYs) {
      //   // i -----> string
      //   if (postionY > this.themeTopYs[i] && postionY < this.themeTopYs[i+1]) {
      //   }
      // }
      const length = this.themeTopYs.length
      for (let i = 0; i < length - 1; i++) {
        // for (let i = 0; i < length; i++) {
        // 优化
        if (this.currentIndex !== i && (i < length - 1 && postionY >= this.themeTopYs[i] && postionY < this.themeTopYs[i + 1])) {
          this.currentIndex = i
          this.$refs.detailNavBar.currentIndex = this.currentIndex
        }

        // if (this.currentIndex !== i && (i < length - 1 && postionY >= this.themeTopYs[i] && postionY < this.themeTopYs[i + 1]) || (i === length - 1 && postionY >= this.themeTopYs[i])) {
        //   this.currentIndex = i
        //   this.$refs.detailNavBar.currentIndex = this.currentIndex
        // }
      }

      this.listenShowBackTop(position)
    },
    addToCart () {
      // 1.获取购物车需要展示的信息
      const product = {}
      product.image = this.topImages[0]
      product.title = this.goods.title
      product.desc = this.goods.desc
      product.price = this.goods.lowPrice
      product.iid = this.iid

      // 2.添加商品的购物车
      // this.$store.cartList.push(product) // 不能这样使用
      // this.$store.commit('addCart', product) // mutations同步 --- commit
      // this.$store.dispatch('addCart', product) // actions异步 --- despatch ----会返回promise

      // this.$store.dispatch('addCart', product).then(res => {
      //   console.log(res);
      // })

      // mapActions新写法
      this.addCart(product).then(res => {
        // this.show = true
        // this.message = res

        // setTimeout(() => {
        //   this.show = false
        //   this.message = ''
        // }, 1500);

        this.$toast.show(res, 1500)
      })
    },
  },
};
</script>

<style scoped lang="less">
#detail {
  position: relative;
  z-index: 9;
  background-color: #fff;

  .detail-nav {
    position: relative;
    z-index: 9;
    background-color: #fff;
  }

  .content {
    height: calc(100vh - 44px);
    // height: calc(100vh - 44px - 49px);
  }
}
</style>