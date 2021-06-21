<template>
<!--新版本样式   最新制作的手机输入框   满足控制光标；号码格式对的请求后台，自动关闭输入键盘 -->
  <div class="mobile_input_box flex_align_center flex_SB">
    <input v-model="mobile" type="tel" ref="mobile" maxlength="13" @focus="onFocus" @keyup.prevent="inputMobile" @paste.prevent="inputMobile" @keydown="onKeydown" placeholder="请输入手机号" />
    <i class="iconfont icon-71shibai clear_btn" v-show="mobile" @click="ClearTel"></i>
    <p class="size28" :style="{'color':theme.mainColor}">{{tip}}</p>
  </div>
</template>
<script> 
import * as ObjectUtil from '@/util/ObjectUtil'
import * as Validata from '@/util/Validata'
export default {
  props: ['theme'],
  data() {
    return {
      mobile: "",
      tip: '',
      old_mobile: '',
    }
  },
  created() { },
  mounted() { },
  activated() { },
  computed: {},
  watch: {
    mobile(val, oval) {
      let v = val ? val.replace(/\D/g, '') : '';
      if (v.length > 11) {
        return
      }
      if ((v.length == 11 && !Validata.ValidTel(v))) {
        this.$emit('un-mobile', v);
        this.$toast({ message: "号码格式错误", duration: 2000 });
      }
      if (v.length < 11) {
        this.$emit('un-mobile', v);
        this.TipData('');
      }
    }
  },
  methods: {
    ChangShowTel(val, flag) {
      let tel = val.replace(/\D/g, '');
      if (Validata.ValidTel(tel)){
        this.mobile = ObjectUtil.InsertChar(ObjectUtil.InsertChar(tel, 3, " "), 8, " ");
      }
      if (tel.length == 11) {
        if (flag) {
          this.BlurInput(tel);
        }
      }
    },
    TipData(val) {
      this.tip = val;
    },
    ClearTel() {
      this.mobile = "";
      this.$refs.mobile.value = '';
      this.TipData('');
    },
    BlurInput(val) {
      // this.$emit('blur_foucus', true)
      setTimeout(() => {
        if (!val || val.length < 11) {
          return
        }
        if (Validata.ValidTel(val)) {
          this.$emit('blur', val);
          //防止删除空格 关闭了输入键盘
          if (this.old_mobile != this.$refs.mobile.value) {
            this.$refs.mobile.blur();
          }
        }
        else {
          this.$emit('un-mobile', val);
          this.$toast({ message: "号码格式错误", duration: 2000 });
        }
      }, 20);
    },
    onFocus() {
      // this.$emit('blur_foucus', false)
    },
    onKeydown(e) {
      var input = e.target;
      var selectionLeft = input.value.substring(input.selectionStart - 1, input.selectionEnd);
      var selectionRight = input.value.substring(input.selectionStart, input.selectionEnd + 1);

      //碰到空格，往前移动一位光标
      var selectionStart = input.selectionStart;
      if (e.keyCode === 8 && selectionLeft === " " && selectionRight) {
        input.selectionStart = selectionStart - 1;
        input.selectionEnd = input.selectionStart;
        e.preventDefault();
      }
      this.old_mobile = this.$refs.mobile.value;
    },
    inputMobile(e) {
      this.formatMobile(e)
      this.mobile = this.$refs.mobile.value
    },
    formatMobile(e) {
      let val = this.$refs.mobile.value; // 不可直接用this.mobile，第一方便提取该方法降低代码耦合度，第二直接用this.mobile,在输入汉字时按下shift按键会导致无法再输入和删除内容
      let selStart = this.$refs.mobile.selectionStart;// 选中区域左边界位置

      let mobileLen = val.length;
      let value = this.getValue(e, val).substr(0, 11);// 获取输入/粘贴内容,并截取前11位
    //   console.log('val',value);
      let len = value.length;
      if (len > 3 && len < 8) {
        value = value.replace(/^(\d{3})/g, '$1 ');
      } else if (len >= 8) {
        value = value.replace(/^(\d{3})(\d{4})/g, '$1 $2 ');
      }
      this.$refs.mobile.value = value;
      if (selStart !== mobileLen) {
        // 设置光标位置
        this.$refs.mobile.selectionStart = this.$refs.mobile.selectionEnd = selStart;
      }
      let aa = this.$refs.mobile.value.replace(/\D/g, '');
      if (aa.length == 11) {
        this.BlurInput(aa)
      }
    },
    getValue(e, val) {
      let value = '';
      if (e.type === 'keyup') {
        value = val.replace(/\D/g, '');
      } else if (e.type === 'paste') {
        // window.clipboardData：IE浏览器获取剪贴板数据对象
        // event.clipboardData：Chrome, Firefox, Safari获取剪贴板数据对象
        let clipboardData = event.clipboardData || window.clipboardData;
        value = clipboardData.getData('Text'); // 获取剪贴板text格式的数据
        value = value.replace(/\D/g, '');
      }
      return value
    },

  }
}
</script>
<style scoped>
.mobile_input_box {
  background: #fff;
  position: relative;
}
.mobile_input_box p {
  position: absolute;
  right: 10%;
  top: 50%;
  transform: translateY(-50%);
}
.mobile_input_box .icon-71shibai {
  width: 10%;
  text-align: right;
  font-size: 0.4rem;
  color: #e0e0e0;
}
.mobile_input_box input {
  width: 90%;
  font-size: 0.48rem;
  height: 0.74rem;
  line-height: 0.74rem;
  color: #333;
  background: transparent;
}
.mobile_input_box input::placeholder {
  font-size: 0.48rem;
  font-weight: 200;
  color: #999;
  line-height: 0.74rem;
  height: 0.74rem;
}
</style>
