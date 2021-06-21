<template>
  <div class="Vcode_box align_center pos_relative">
    <i class="iconfont icon-shibai1 clear_btn" @click="CloseModal"></i>
    <i class="iconfont color_1296db icon-queren size48"></i>
    <div class="size40" @click="Submit">{{success}}</div>
  </div>
</template>
<script>
export default {
  props: {
    success: String
  },
  data() {
    return {}
  },
  created() { },
  mounted() { },
  activated() { },
  computed: {},
  watch: {},
  methods: {
    Submit() {
      // this.$emit('submit')
    },
    CloseModal() {
      this.$emit('submit')
    }
  }
}
</script>
<style scoped>
.Vcode_box {
  background: #fff;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 80%;
  z-index: 101;
  padding: 0.2667rem 0.5333rem;
  box-sizing: border-box;
  border-radius: 0.08rem;
}
.clear_btn {
  color: #999;
  /*24/75*/
  font-size: 0.32rem;
  position: absolute;
  right: 0;
  top: 0;
}
</style>