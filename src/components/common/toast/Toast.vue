<template>
  <div class="toast" v-show="isShow">{{ message }}</div>
</template>

<script>
export default {
  name: 'Toast',
  // props: {
  //   message: {
  //     type: String,
  //     default: '',
  //   },
  //   show: {
  //     type: Boolean,
  //     default: false,
  //   }
  // },
  data () {
    return {
      message: '',
      isShow: false,
    }
  },
  methods: {
    show (message = '默认文字', duration = 2000) {
      // duration = duration || 2000 // 默认参数
      this.isShow = true
      this.message = message

      setTimeout(() => {
        this.isShow = false
        this.message = ''
      }, duration)
    }
  }
}
</script>

<style scoped lang="less">
.toast {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, 50%);
  padding: 8px 10px;
  border-radius: 7px;

  z-index: 999;

  background-color: rgba(0, 0, 0, 0.7);
  color: #fff;
}
</style>
