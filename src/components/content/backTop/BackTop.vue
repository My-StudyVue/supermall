<template>
  <div class="back-top">
    <img src="~assets/img/common/top.png" alt="">
  </div>
</template>

<script>
export default {
  name:"BackTop",
  data() {
    return {
      
    };
  },
}
</script>

<style lang="less" scoped>
  .back-top{
    position: fixed;
    right: 8px;
    bottom: 53px;

    img{
      height: 43px;
      width: 43px;
    }
  }
</style>