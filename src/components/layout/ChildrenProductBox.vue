<template>
  <div class="qx_com_chilren_item_box">
    <div v-for="(item, index) in childrenList" :key="index" class="qx_com_chilren_item ">
      <div class="flex_SB flex_align_center">
        <slot :row="item"></slot>
        <p class="goBuy"  @click.stop='GoBuy(item)' :style="{'border-color':theme.mainColor,'color':theme.mainColor}">{{submitName=='特惠流量'?'办理':'购买'}}</p>
      </div>
    </div>
  </div>
</template>
<script>

export default {
  props: {
    childrenList: Array,
    theme: Object
  },
  data() {
    return {
      selectProductId: '',
      inputData: '',
      name: '',
      submitName: '',
    }
  },
  created() { },
  mounted() { },
  activated() { },
  computed: {},
  watch: {},
  methods: {
    GoBuy(item) {
      this.$emit('goBuy', item)
    },
    ChangInputData(name) {
      this.submitName = name
    },
  }
}
</script>
<style scoped>
.qx_com_chilren_item_box {
  padding: 0 .3rem;
}
.qx_com_chilren_item {
  border-bottom: 1px solid #e0e0e0;
  padding-top: 0.1rem;
  padding-bottom: .36rem;
}
.qx_com_chilren_item:first-of-type {
  border-top: 1px solid #e0e0e0;
}
.goBuy {
  /*14px */
  padding-left: 0.1867rem;
  padding-right: 0.1867rem;
  box-sizing: border-box;
  font-size: 0.1733rem;
  text-align: center;
  line-height: 2.55555556;
  border-radius: 0.0667rem;
  color: #f1682e;
  border: 1px solid #f1682e;
}
</style>