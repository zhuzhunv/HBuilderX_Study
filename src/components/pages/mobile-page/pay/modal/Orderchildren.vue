<template>
  <div class="Pop_ups" v-show="showPop">
    <div class="Pop_ups_content">
      <p class="title size32">提示</p>
      <div class="login-text">请确认支付完成</div>
      <div class="Pop_ups_buttom">
        <p @click="PopUps(0)" class="colorB size32 color_01b702">已完成支付</p>
        <p @click="PopUps(1)" class="colorQ size32 color_666">未支付重新下单</p>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    showPop: Boolean
  },
  methods: {
    PopUps(index) {
      this.$emit("Popups", index);
    }
  }
};
</script>
<style scoped>
.Pop_ups {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 120;
}
.Pop_ups_content {
  position: fixed;
  top: 50%;
  left: 50%;
  -webkit-transform: translate3d(-50%, -50%, 0);
  transform: translate3d(-50%, -50%, 0);
  background-color: #fff;
  width: 80%;
  border-radius: .12rem; 
  -webkit-user-select: none;
  overflow: hidden;
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
  -webkit-transition: 0.2s;
  transition: 0.2s;
  text-align: center;
}
.title {
  margin-top: .3rem;
}
.login-text {
  font-size: .3rem;
  color: #999;
  padding: .36rem 0 .8rem;
}
.Pop_ups_buttom {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.Pop_ups_buttom p {
  width: 50%;
  height: 1rem;
  line-height: 1rem;
  border-top: 1px solid #ddd;
}
.Pop_ups_buttom p:first-of-type {
  border-right: 1px solid #ddd;
}
</style>
