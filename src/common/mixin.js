import { debounce } from 'common/utils';
export const itemListenerMixin = {
  data () {
    return {
      itemImgListener: null,
    }
  },
  mounted () {
    // 1. 图片加载完成的事件监听
    // 数据请求性能优化 ----> 防抖动
    const refresh = debounce(this.$refs.scroll.refresh, 500)
    // 监听item中图片加载完成 以及 对我们监听的事件进行保存
    this.itemImgListener = () => {
      refresh();
    }
    this.$bus.$on("itemImageLoad", this.itemImgListener)
  },
}


import BackTop from "components/content/backTop/BackTop";
export const backtopMixin = {
  components: {
    BackTop
  },
  data () {
    return {
      isShowBackTop: false,
    }
  },
  methods: {
    listenShowBackTop (position) {
      // 1.判断backTop是否显示
      this.isShowBackTop = (-position.y) > 1000;
    },
    backClick () {
      // this.$refs.scroll.scroll.scrollTo(0, 0, 500)
      this.$refs.scroll.scrollTo(0, 0, 500);
    },
  },
}