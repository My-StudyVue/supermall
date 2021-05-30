<template>
  <div id="home">
    <!-- 导航栏 -->
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>
    <!-- 标题栏 -->
    <tab-control
      ref="tabControl1"
      :titles="['流行', '新款', '精选']"
      @tabClick="tabClick"
      class="tab-control"
      v-show="isTabFixed"
    />
    <!-- 可滚动区域 -->
    <scroll
      class="content"
      ref="scroll"
      :probe-type="3"
      @scroll="contentScroll"
      :pull-up-load="true"
      @pullingUp="loadingMore"
    >
      <!-- 轮播图 -->
      <home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad" />
      <!-- 推荐 -->
      <recommend-view :recommends="recommends" />
      <!-- 本周流行 -->
      <feature-view />
      <!-- 标题栏 -->
      <tab-control
        ref="tabControl2"
        :titles="['流行', '新款', '精选']"
        @tabClick="tabClick"
      />
      <!-- 商品列表 -->
      <goods-list :goods="showGoods" />
    </scroll>
    <!-- 回到顶部 -->
    <back-top @click.native="backClick" v-show="isShowBackTop" />
    <!-- 组件监听原生事件需要加.native -->
  </div>
</template>

<script>
import HomeSwiper from "./childComps/HomeSwiper";
import RecommendView from "./childComps/RecommendView";
import FeatureView from "./childComps/FeatureView";

import NavBar from "components/common/navBar/NavBar";
import TabControl from "components/common/tabControl/TabControl";
import GoodsList from "components/content/goods/GoodsList";
import Scroll from "components/common/scroll/Scroll";

import { getHomeMultidata, getHomeGoods } from "network/home";
import { itemListenerMixin, backtopMixin } from 'common/mixin';

export default {
  name: "Home",
  components: {
    HomeSwiper,
    RecommendView,
    FeatureView,
    NavBar,
    TabControl,
    GoodsList,
    Scroll,
  },
  mixins: [itemListenerMixin, backtopMixin],
  data () {
    return {
      // result:null,
      banners: [],
      recommends: [],
      goods: {
        pop: { page: 0, list: [] },
        new: { page: 0, list: [] },
        sell: { page: 0, list: [] },
      },
      currentType: "pop",
      tabOffsetTop: 0,
      isTabFixed: false,
      saveY: 0,
    };
  },
  computed: {
    showGoods () {
      return this.goods[this.currentType].list;
    },
  },
  created () {
    //1.请求多个数据
    this.getHomeMultidata();

    //2.请求商品数据
    this.getHomeGoods("pop");
    this.getHomeGoods("new");
    this.getHomeGoods("sell");
  },
  // home页面离开时不被销毁----> 保持原来的状态-----> keep-alive
  destroyed () {
    console.log('home destroyed');
  },
  activated () {
    this.$refs.scroll.scrollTo(0, this.saveY, 0)
    this.$refs.scroll.refresh()
  },
  deactivated () {
    // 1.保存y值
    this.saveY = this.$refs.scroll.getScrollY

    // 2.取消全局事件监听,
    //  如果只传事件名这个事件就会被取消掉，所以要在后面传入一个函数,只是取消监听的函数而已
    this.$bus.$off('itemImageLoad', this.itemImgListener)
  },
  methods: {
    /**
     * 事件监听相关的方法
     */
    tabClick (index) {
      switch (index) {
        case 0:
          this.currentType = "pop";
          break;
        case 1:
          this.currentType = "new";
          break;
        case 2:
          this.currentType = "sell";
          break;
        default:
          break;
      }
      this.$refs.tabControl1.currentIndex = index;
      this.$refs.tabControl2.currentIndex = index;
    },
    contentScroll (position) {
      // 1.判断backTop是否显示
      // this.isShowBackTop = (-position.y) > 1000;
      this.listenShowBackTop(position)

      // 2.决定tabControl是否吸顶（postion:fixed）
      this.isTabFixed = (-position.y) > this.tabOffsetTop
    },
    loadingMore () {
      this.getHomeGoods(this.currentType);
    },
    swiperImageLoad () {// 图片加载完成
      // 1.获取tabControl的offsetTop
      // 组件没有offsetTop，但是所有的组件都有一个属性$el: 用于获取组件中的元素
      this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop
    },

    /**
     * 网络请求相关方法
     */
    getHomeMultidata () {
      getHomeMultidata().then((res) => {
        // this.result = res
        this.banners = res.data.banner.list;
        this.recommends = res.data.recommend.list;
      });
    },
    getHomeGoods (type) {
      const page = this.goods[type].page + 1;
      getHomeGoods(type, page).then((res) => {
        //...res.data.list 数组 res.data.list 解析
        this.goods[type].list.push(...res.data.list);
        this.goods[type].page += 1;

        // 完成下拉更多
        // this.$refs.scroll.scroll.finishPullUp()
        this.$refs.scroll.finishPullUp();
      });
    },
  },
};
</script>

<style lang="less" scoped>
/* scoped css作用域 */
#home {
  /* padding-top: 44px; */
  height: 100vh;
  position: relative;

  .home-nav {
    background-color: var(--color-tint);
    color: #fff;
    /* 在使用浏览器原生滚动时，为了让导航不跟随一起滚动 */
    /* position: fixed;
    left: 0;
    right: 0;
    top: 0;
    z-index: 9; */
  }

  .tab-control {
    position: relative;
    z-index: 9;
  }

  .content {
    // height: calc(100vh - 93px);
    overflow: hidden;

    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;

    // .tab-control {
    //   //系统的吸顶作用
    //   position: sticky; // 吸顶功能实现 relative ---->  fixed
    //   top: 44px;
    //   z-index: 9;
    // }
    // .fixed{
    //   //实现有bug ----> tabControl不显示以及商品内容上移
    //   position: fixed;
    //   left: 0;
    //   right: 0;
    //   top: 44px;
    // }
  }
}
</style>