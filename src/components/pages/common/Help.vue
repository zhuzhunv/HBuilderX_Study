<template>
  <div class="Help">
    <ul>
      <li v-for="(item,index) in list" :key="index">
        <div class="flex_align_center Help_title" @click="showContent(index)" v-waves>
          <p class="size30">{{item.title}}</p>
          <i class="iconfont icon-down size38 color_333" :class="[index==selectIndex? 'icon-downactive':'']"></i>
        </div>
        <div class="Help_content" v-if="item.showValue" :style="{'color':theme.mainColor}">
          <p v-if="index==6" class="size28">售后电话：<a href="tel:4008111801" class="size28">4008111801</a></p>
          <p v-if="index==6 " class="size28 flex_align_center">客服微信：<img style="width:100px;height: 100px;" src="@/assets/img/ewm.jpg" /> </p>
          <p v-if="index==6" class="size28">人工客服在线时间为每天上午8:00至晚上23:00。 其他时间可留言，我们的客服会在看到消息后第一时间回复您。 </p>
          <p v-if=" index!=6" v-html="ite" class="size28" v-for="(ite,ind) in item.content" :key="ind"></p>
          <!-- index!=list.length-1 && -->
          <!-- <p v-if="index==list.length-1" class="size28">
            请点击<a class="color_blue" @click="GoAgreement">用户协议</a>查看具体协议内容
          </p> -->
        </div>
      </li>
    </ul>
  </div>
</template>
<script>
import * as ConstEnum from '../../../const/Enum'
import * as ObjectUtil from '../../../util/ObjectUtil'
export default {
  data() {
    return {
      list: [
        {
          title: '1、充值未到账怎么办?',
          showValue: false,
          content: [
            ` 话费/流量充值成功后一般在30分钟内可入账，若长时间后确认查询到未到账 `,
            ` ①请在支付账单中核实您的充值号码是否正确 `,
            ` ②拨打我司客服热线，客服会耐心为您处理`,
            ` 温馨提示：根据移动、联通及电信的官方回复，话费在月初/月末可能出现延迟，最迟预计24-48小时。因此，建议您避开月初/月末高峰时段充值 `
          ]
        }, {
          title: '2、如何查询是否到账?',
          showValue: false,
          content: [
            ` ① 您可致电运营商官方客服或登录网上营业厅进行查询。（移动1008611，联通1001011，电信10000） `,
            ` ② 拨打我司客服热线为您核实 `
          ]        }, {
          title: '3、为什么会充值失败?',
          showValue: false,
          content: [
            ` 以下情况会导致无法充值： `,
            ` ① 运营商繁忙。可稍后再次尝试充值 `,
            ` ② 手机号状态异常。如手机号为空号、手机号已注销。若手机欠费，也会导致流量充值失败。 `,
            ` ③ 针对部分流量商品，运营商有充值次数的限制，若您对同一个手机号的充值次数过多，请更换充值面值或其他类型商品后重试。如未覆盖，请携带身份证及SIM卡到线下营业厅补登记。`,
            ` ④ 未在运营商处实名登记的用户无法充值。若您手机号码尚未实名登记，可在运营商掌上营业厅进行登记。如未覆盖，请携带身份证及SIM卡到线下营业厅补登记。 `
          ]
        }, {
          title: '4、流量/话费充错号码怎么办?',
          showValue: false,
          content: [
            ` ① 若您充值的号码为空号或号码不正常，运营商充值失败后会自动返还您的充值金额。 `,
            ` ② 若您充值的号码真实存在，运营商会实时扣款并充值，不能退款，所以也无法返还充值金额。给您带来的不便，尽请谅解。请您在下次操作的时候注意核对号码是否正确。`
          ]
        }, {
          title: '5、如何获取充值发票?',
          showValue: false,
          content: [
            ` ① 话费充值发票可登录运营商官网直接申请、下载月结电子发票，或通过官方线下营业厅开具发票。若官方无法开具发票，6个月内的充值订单可联系我们为您协助处理； `,
            ` ② 流量充值无法提供发票。 `
          ]
        }, {
          title: '6、充值失败，如何查看退款?',
          showValue: false,
          content: [
            ` 若订单充值失败，您的支付金额将在1-7个工作台内原路退回至原支付账户，具体到账时间以发卡行为准 `
          ]
        }, {
          title: '7、人工客服联系方式及服务时间',
          showValue: false,
          content: [
            `售后电话：<a href="tel:4008111801">4008111801</a>；`,
            `客服微信<img style="width:30%" :src="../../../assets/img/ewm.jpg" />`,
            ` 人工客服在线时间为每天上午8:00至晚上23:00。 其他时间可留言，我们的客服会在看到消息后第一时间回复您。 `
          ]
        }, 
        // {
        //   title: '8、用户充值协议',
        //   showValue: false,
        // }
      ],
      upRotate: false,
      selectIndex: -1,
      theme: {
        mainColor: '#f1682e',
        Qcolor: '#f1682e', 
      },
    }
  },
  created() {
    if (this.$route.query.termId) {
      this.termId = this.$route.query.termId
    }
    if (this.$route.query.partnerUid) {
      this.partnerUid = this.$route.query.partnerUid
    }
    let termId = this.termId
    let partnerUid = this.partnerUid  
    if (!ObjectUtil.IsEmpty(ConstEnum.MerchentThemeColor[partnerUid]) && !ObjectUtil.IsEmpty(ConstEnum.MerchentThemeColor[partnerUid][termId])) {
      let item = ConstEnum.MerchentThemeColor[partnerUid][termId]
      if (!ObjectUtil.IsEmpty(item.mainColor))
        this.theme.mainColor = item.mainColor
      // if (!ObjectUtil.IsEmpty(item.Qcolor))
      //   this.theme.Qcolor = item.Qcolor
    }
  },
  activated() { },
  mounted() { },
  watch: {},
  computed: { },
  methods: {
    showContent(data) {
      this.selectIndex = this.selectIndex == data ? -1 : data
      this.list.forEach((item, index) => {
        if (index == data)
          this.list[data].showValue = !this.list[data].showValue
        else
          this.list[index].showValue = false
      })

    },
    GoAgreement() {
      this.$router.push({ name: "UserAgreement" })
    }
  }
}
</script>
<style scoped>
.Help ul li {
  border-bottom: 1px solid #f5f5f5;
  padding: 0 .3rem;
}
.Help_title {
  justify-content: space-between;
  height: 1rem;
  line-height: 1rem;
  color: #333;
}
.Help_content {
  padding: .2rem .16rem; 
  line-height: .6rem; 
}
a {
  color: #999;
}
.icon-down {
  color: #333;
}
.icon-downactive {
  transform: rotateZ(180deg);
}

</style>