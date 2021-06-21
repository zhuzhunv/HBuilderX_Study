<template>
  <div class="qx_chilren">
    <div class="qx_chilren qx_chilren1" @click.stop="clear"></div>
    <div class="qx_chilren_box">
      <h3 class="size50 bold align_center pos_relative" id="h33">
        {{name}}
        <i class="close_btn iconfont icon-guanbi" @click="clear"></i>
      </h3>
      <div class="qx_com_chilren_item_box" id="qx_com_chilren_item_box">
        <div v-for="(item, index) in childrenList" :key="index" class="qx_com_chilren_item" :style="{'background':theme.childrenBackColor}" @click.stop='inputSelect(item)'>
          <div class="flex_SB flex_align_center nowrap">
            <slot :row="item"></slot>
            <input :style="[(selectProductId == item.productID||selectProductId == item.productId)?{'background-image':'url('+ theme.selectedImg +')'}:'']" class="radioBox" name="Fruit" type="radio" value="" />
          </div>
        </div>
      </div>
      <div class="butom align_center" id="butom" @click="GoBuy" :style="{'background':theme.mainColor}">{{submitName}}</div>
    </div>
  </div>
</template>
<script>
// import * as ConstEnum from '@/const/Enum'

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
    inputSelect(item) {
      this.selectProductId = item.productID ? item.productID : item.productId
      this.inputData = item
    },
    GoBuy() {
      if (this.inputData) {
        this.$emit('goBuy', this.inputData)
      } else {
        this.$toast({ message: "请选择产品", duration: 2000 })
      }
    },
    clear() {
      this.$emit("close")
    },
    ChangInputData(val, id, name) {
      this.inputData = val
      this.selectProductId = val.productID ? val.productID : val.productId
      this.name = id
      this.submitName = name ? name : '确认订单'
    },
  }
}
</script>
<style scoped>
.qx_chilren {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background: hsla(0, 0%, 39.6%, 0.5);
  z-index: 105;
}
.qx_chilren1 {
  background: transparent;
}
.qx_chilren_box {
  padding: 0.3rem;
  box-sizing: border-box;
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  background: #fff;
  z-index: 110;
}
.qx_chilren_box h3 {
  margin-bottom: 0.3rem;
}

.close_btn{
  position: absolute;
  right: 0;
  top: 0;
}
.qx_com_chilren_item_box {
  height: 5.58rem;
  overflow-y: auto;
}
.qx_com_chilren_item {
  padding: .16rem .14rem;
  border-radius: 0.08rem;
  background: #ffefe8;
  margin-bottom: .14rem;
}
.qx_com_chilren_item :last-of-type {
  margin-bottom: 0;
} 
.butom {
  width: 100%;
  height: .84rem;
  line-height: .84rem;
  font-size: 0.32rem;
  color: #fff; 
  border-radius: .1rem;
}
</style>