<template>
  <div class="check-button" :class="{ check: isChecked }">
    <img src="~assets/img/cart/tick.svg" alt="" />
  </div>
</template>

<script>
export default {
  name: "CheckButton",
  data () {
    return {

    }
  },
  props: {
    isChecked: {
      type: Boolean,
      default: false,
    }
  },
  components: {

  }
}
</script>

<style scoped lang="less">
.check-button {
  border-radius: 50%;
  border: 2px solid #aaa;
}

.check {
  background-color: red;
  border-color: red;
}
</style>
