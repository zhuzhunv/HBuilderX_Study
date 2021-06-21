<template>
  <div class="Vcode_box pos_relative">
    <div class="align_center ">
      <div class="size28 color_888">{{sendMessage}}</div>
      <div>
        <div class="flex_align_center codebox">
          <input v-model="verCode.code" placeholder="请输入验证码" class="size28 codeinput" />
          <div v-if="verCode.flag" class="codeBotton" :style="{'border-color':'#999','color':'#999'}">{{verCode.countDown}}s</div>
          <div @click="GetSecondCode" class="codeBotton" :style="{'border-color':theme.mainColor,'color':theme.mainColor}" v-if="!verCode.flag">重新获取</div>
        </div>
        <div>
          <div @click="CheckCode" :style="{'background':theme.mainColor}" class="sub size38">提交</div>
        </div>
      </div>
    </div>
    <i class="iconfont icon-shibai1 clear_btn" @click="CloseModal"></i>
  </div>
</template>
<script>
export default {
  props: {
    sendMessage: String,
    tel: String,
    theme: Object
  },
  data() {
    return {
      verCode: {
        sendText: "获取验证码",
        countDown: 59,
        flag: false,
        code: ""
      },
      countInterval: Number,
    }
  },
  created() { },
  mounted() { },
  activated() { },
  computed: {},
  watch: {},
  methods: {
    InitData() {
      this.tel = ""
      this.sendMessage = ""
      this.verCode = {
        sendText: "获取验证码",
        countDown: 60,
        flag: false,
        code: ""
      }
      this.CloseInter()
    },
    CloseModal() {
      this.$emit('close')
    },
    CloseInter() {
      !!this.countInterval && clearInterval(this.countInterval);
    },
    CountDown() {
      let that = this;
      !!this.countInterval && clearInterval(this.countInterval);
      this.verCode.countDown = 60;
      this.countInterval = setInterval(() => {
        if (that.verCode.countDown > 0) {
          that.verCode.countDown--;
          that.verCode.flag = true;
        } else {
          !!that.countInterval && clearInterval(that.countInterval);
          that.verCode.flag = false;
          that.verCode.countDown = 60;
        }
      }, 1000);
    },
    GetSecondCode() {
      if (!this.verCode.flag) {
        this.$emit('sendCode', this.tel)
      }
    },
    CheckCode() {
      if (!this.verCode.code) {
        this.$toast({ message: "未输入验证码", duration: 2000 })
      } else {
        this.$emit('submitCode', this.verCode.code)
      }
    },

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
.codebox {
  padding: .3rem 0;
}
.codeinput {
  border-bottom: 1px solid #e0e0e0;
  height: 0.4267rem;
  width: calc(100% - 1.2rem);
  padding-left: .3rem;
  box-sizing: border-box;
}
.codeBotton {
  width: 1.2rem;
  line-height: 0.4267rem;
  border: 1px solid #f1682e;
  font-size: 0.1867rem;
  color: #f1682e;
  box-sizing: border-box;
  border-radius: 0.066667rem /*5/75*/;
}
.sub {
  background-color: #f1682e;
  color: #fff;
  padding: .36rem 0;
  border-radius: 0.3333rem;
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