<template>
  <div class="recommend">
    <div v-for="item in recommends" :key="item.title" class="recommend-item">
      <a :href="item.link">
        <!-- <img :src="item.image" alt=""> -->
        <!-- 使用图片懒加载 -->
        <img v-lazy="item.image" alt="" />

        <div>{{ item.title }}</div>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: "RecommendView",
  components: {},
  props: {
    recommends: {
      type: Array,
      default () {
        return []
      }
    }
  },
}
</script>

<style lang="less" scoped>
.recommend {
  display: flex;
  width: 100%;
  text-align: center;
  font-size: 12px;
  padding: 10px 0 20px;
  border-bottom: 10px solid #eee;

  .recommend-item {
    flex: 1;

    img {
      width: 70px;
      height: 70px;
      margin-bottom: 10px;
    }
  }
}
</style>