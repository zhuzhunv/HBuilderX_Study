<template>
<!-- 新版本样式手机输入框     满足控制光标；粘贴号码需要点击外部一下才能触发关闭输入键盘 -->
  <div class="mobile_input_box flex_align_center flex_SB">
    <input @keyup="KeyupInput($event)" @focus="FoucusInput" placeholder="请输入手机号" @blur="BlurInput(telephone,true)" ref="inputmobile" type="tel" maxlength="13" />
    <i class="iconfont icon-71shibai clear_btn" v-show="telephone" @click="ClearTel"></i>
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
      telephone: '',
      tip: ''
    }
  },
  created() { },
  mounted() { },
  activated() { },
  computed: {},
  watch: {
    telephone(val, oval) {
      let v = val ? val.replace(/\D/g, '') : ''
      if (v.length > 11) {
        return
      }
      if ((v.length == 11 && !Validata.ValidTel(v))) {
        this.$emit('un-mobile', v)
        this.$toast({ message: "号码格式错误", duration: 2000 })
      }
      if (v.length < 11) {
        this.$emit('un-mobile', v)
        this.TipData('')
      }
    }
  },
  methods: {
    ChangShowTel(val, flag) {
      let tel = val.replace(/\D/g, '')
      if (Validata.ValidTel(tel)) {
        this.$refs.inputmobile.value = ObjectUtil.InsertChar(ObjectUtil.InsertChar(tel, 3, " "), 8, " ")
        this.telephone = ObjectUtil.InsertChar(ObjectUtil.InsertChar(tel, 3, " "), 8, " ")
      }
      if (tel.length == 11 && Validata.ValidTel(tel)) {
        if (flag) {
          this.BlurInput()
        } else {
          this.$refs.inputmobile.blur()
        }
      }
    },
    KeyupInput(e) {
      let selStart = this.$refs.inputmobile.selectionStart
      let val = this.$refs.inputmobile.value

      let mobileLen = val.length
      let value = e ? this.GetValue(e, val).substr(0, 11) : val
      let len = value.length

      if (e) {
        if (e.keyCode == 37 || e.keyCode == 38 || e.keyCode == 39 || e.keyCode == 40) {
          return
        }

        if (e.keyCode == 8 && (selStart == 4 || selStart == 9) && mobileLen == selStart) {
          this.$refs.inputmobile.value = val.trim()
          // this.telephone = val.trim()
        }
      }

      if (len > 3 && len < 8) {
        value = value.replace(/^(\d{3})/g, '$1 ')
      } else if (len >= 8) {
        value = value.replace(/^(\d{3})(\d{4})/g, '$1 $2 ')
      }

      this.$refs.inputmobile.value = value
      if (selStart != mobileLen) {
        if (e) {
          if (e.keyCode == 8 && (selStart === 4 || selStart === 9)) {
            selStart--
          }
          if (e.keyCode != 8 && e.keyCode != 46 && (selStart === 3 || selStart === 4 || selStart === 8 || selStart === 9)) {
            selStart++
          }
          if (e.keyCode == 46 && (selStart === 3 || selStart === 8)) {
            selStart++
          }
          this.$refs.inputmobile.selectionStart = this.$refs.inputmobile.selectionEnd = selStart
        }
      }

      this.telephone = this.$refs.inputmobile.value
      let v = value.replace(/\D/g, '')
      if (v && Validata.ValidTel(v)) {
        this.$refs.inputmobile.blur()
      }
    },
    GetValue(e, val) {
      let value = ""
      if (e.type == 'keyup') {
        value = val.replace(/\D/g, '')
      } else if (e.type == 'paste') {
        //window.clipboardData:IE浏览器获取剪贴板数据对象
        //event.clipboardData:Chrome,Firefox,Safari获取剪贴板数据对象
        let clipboardData = event.clipboardData || window.clipboardData
        value = clipboardData.getData("Text")
        value = value.replace(/\D/g, "")
      }
      return value
    },
    FoucusInput() {
      // this.$emit('un-mobile', 'footer_false')
      let val = this.$refs.inputmobile.value
      this.$refs.inputmobile.value = val.replace(/\D/g, '').replace(/^(\d{3})(\d{4})/, '$1 $2 ')
      this.telephone = val.replace(/\D/g, '').replace(/^(\d{3})(\d{4})/, '$1 $2 ')
    },
    BlurInput() {
      ObjectUtil.IphoneScore()
      let val = this.telephone.replace(/\D/g, '')
      this.time = setTimeout(() => {
        if (!val || val.length < 11) {
          return
        }
        if (Validata.ValidTel(val)) {
          this.$emit('blur', val)
        } else {
          this.$emit('un-mobile', val)
          this.$toast({ message: "号码格式错误", duration: 2000 })
        }
      }, 20)
    },
    ClearTel() {
      clearTimeout(this.time)
      this.telephone = ""
      this.$refs.inputmobile.value = ""
      this.TipData('')
    },
    TipData(val) {
      this.tip = val
    },
  }
}
</script>
<style scoped>
.mobile_input_box {
  position: relative;
}
.mobile_input_box input {
  width: 90%;
  box-sizing: border-box;
  border: none;
  font-size: 0.48rem;
  line-height: 0.74rem;
  height: .74rem;
  color: #333;
}
.mobile_input_box input::placeholder {
  font-size: 0.48rem;
  font-weight: 200;
  color: #999; 
  height: .74rem;
  line-height: 0.74rem;
}
.icon-71shibai {
  width: 10%;
  text-align: right;
  font-size: .4rem;
  color: #e0e0e0;
}
.mobile_input_box p {
  position: absolute;
  right: 10%;
  top: 50%;
  transform: translateY(-50%);
}
</style>