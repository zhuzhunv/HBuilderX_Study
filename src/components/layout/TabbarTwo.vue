<template> 
  <div class="tabber-box flex_align_center">
    <p v-for="(item, index) in tabList" :key="index" @click="SeletedTabr(item,index)" class="tabber_box_item" :class="[seletedIndex==index?'active':'']">
      <slot :row="item"></slot>
    </p>
  </div> 
</template>
<script>
export default {
  props: {
    tabList: Array
  },
  data() {
    return {
      seletedIndex: -1
    }
  },
  created() { },
  mounted() { },
  activated() { },
  computed: {},
  watch: {},
  methods: {
    SeletedTabr(item, index) {
      this.seletedIndex = index
      this.$emit('seletedTabr', item, index)
    }
  }
}
</script>
<style scoped>
.tabber_box_item {
  width: 50%;
  height: 1.06rem ;
  color: #999; 
  display: flex; 
  align-items: center;
  justify-content: center;
}
</style>