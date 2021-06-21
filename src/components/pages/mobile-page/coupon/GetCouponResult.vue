<template>
  <div class="GetCouponResult">
    <div @click="GoRecharge" class="bg_fff color_333 GoRecharge">
      <i class="iconfont icon-xiangzuojiantou"></i>
      <span class="size40">千行充值页面</span>
    </div>
    <div class="pos_relative CouponResult fs0">
      <img class="width100" src="../../../../assets/img/result.png" alt="">
      <h3 class="center pos_absolute size50 color_fff" style="top:40%">{{couponDetails.Coupon?'领取成功':'券详情'}}</h3>
      <i class="iconfont icon-fanhui color_fff pos_absolute" @click="goBack"></i>
    </div>
    <div class="de_box">
      <div class="flex_align_center flex_left pos_relative de_coupon color_fff" :style="{'background':theme.couponColor}">
        <div class="de_left align_center">
          <p class="size50 de_left_top"><span class="size36">￥</span>{{couponDetails.couponFeeMin}}{{couponDetails.couponFee}}</p>
          <p class="size24">满{{couponDetails.payFeeMin}}元可用</p>
        </div>
        <div class="de_right align_center">
          <p class="size28 de_left_top">{{couponDetails.Coupon?'恭喜您获得':''}}{{couponDetails.couponFeeMin}}{{couponDetails.couponFee}}元{{couponDetails.couponType == couponType.FeeType?'话费':couponDetails.couponType == couponType.FlowType?'流量':''}}券</p>
          <p class="size28">{{couponDetails.beginDate?couponDetails.beginDate:couponDetails.effectiveDate|sytfilter({date:'yyyy.MM.dd'})}}-{{couponDetails.endDate?couponDetails.endDate:couponDetails.expireDate|sytfilter({date:'yyyy.MM.dd'})}}</p>
        </div>
      </div>
      <p class="des size28">{{couponDetails.couponType == couponType.FeeType?'话费':couponDetails.couponType == couponType.FlowType?'流量':''}}券充值直接抵扣支付金额</p>
      <div class="de_bottom">
        <span :style="{'background':theme.couponColor}" @click="CouponDetailsClick">{{couponDetails.Type?'立即使用':'立即领取'}}</span>
      </div>
      <div class="de_details" v-if="couponDetails.useDesc">
        <p class="flex_align_center flex_SB"><span class="size28">优惠券详情</span><i class="iconfont icon-down" :class="showdetails?'Spli':''" @click="showdetails = !showdetails"></i></p>
        <ul v-if="showdetails" :style="{'color':theme.couponColor}">
          <li v-for="(item,index) in couponDetails.useDesc.split('$')" :key="index">{{item}}</li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
import * as Appsettings from '@/Appsettings'
import * as ConstEnum from '../../../../const/Enum'
import * as LocalStorgeUtil from '@/util/LocalStoreUtil'
import * as ObjectUtil from '../../../../util/ObjectUtil'
import * as WholeLocalKey from '../../../../const/WholeStoreKey'
export default {
  data() {
    return {
      showdetails: false,
      couponDetails: {},
      termId: '',
      partnerUid: '',
      platUid: '',
      couponType: ConstEnum.CouponType,
      theme: {
        couponColor: '#f1682e',
        Qcolor: '#f1682e',
        selectedImg: require('../../../../assets/img/f1682e.png'),
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
    if (localStorage.getItem(WholeLocalKey.COUPON)) {
      this.couponDetails = JSON.parse(localStorage.getItem(WholeLocalKey.COUPON))
    }
    this.platUid = LocalStorgeUtil.GetItem(WholeLocalKey.PLATUID + this.termId)
    if (!ObjectUtil.IsEmpty(ConstEnum.MerchentThemeColor[partnerUid]) && !ObjectUtil.IsEmpty(ConstEnum.MerchentThemeColor[partnerUid][termId])) {
      let item = ConstEnum.MerchentThemeColor[partnerUid][termId]
      if (!ObjectUtil.IsEmpty(item.couponColor))
        this.theme.couponColor = item.couponColor
      if (!ObjectUtil.IsEmpty(item.Qcolor))
        this.theme.Qcolor = item.Qcolor
    }
  },
  mounted() { },
  activated() { },
  computed: {},
  watch: {},
  methods: {
    GoRecharge() {
      this.$router.push({ name: "HwApp" })
    },
    goBack() {
      this.$router.back()
    },
    CouponDetailsClick() {
      if (this.couponDetails.Type) {
        this.$router.push({ name: "HwApp" })
      } else {
        this.getCoupon()
      }
    },
    async getCoupon() {
      this.$indicator.open({
        spinnerType: "fading-circle"
      })
      let data = {
        termId: this.termId,
        platUid: this.platUid,
        activityId: this.couponDetails.activityId,
      }
      const res = await this.$post(Appsettings.ApiUrl.ReceiveCoupon, data)
      this.$indicator.close()
      if (res.code == 100) {
        // this.$toast({ message: '领取成功', duration: 2000 });
        this.couponDetails['Coupon'] = 1
        this.couponDetails['Type'] = 1
        localStorage.removeItem(WholeLocalKey.COUPON)
        localStorage.setItem(WholeLocalKey.COUPON, JSON.stringify(this.couponDetails));
        this.$router.push({ name: "GetCouponResult", query: { termId: this.termId, partnerUid: this.partnerUid } })
      } else {
        this.$toast({ message: res.message, duration: 2000 });
      }
    },
  }
}
</script>
<style scoped>
.GetCouponResult {
  background: #eee;
  min-height: 100vh;
}
.GoRecharge {
  line-height: 1rem;
  display: flex;
  align-items: center;
  padding-left: 0.4rem;
}
.icon-xiangzuojiantou {
  font-size: 0.45rem;
}
.GoRecharge span {
  margin-left: 0.3rem;
}
.icon-fanhui {
  top: 15%;
  left: 10%;
}
.de_box {
  margin: 0.3rem 0.24rem 0;
  background: #fff;
}
.de_coupon {
  padding: 0.36rem 0;
}
.de_coupon::after,
.de_coupon::before {
  content: "";
  display: block;
  width: 0.3rem;
  height: 0.3rem;
  border-radius: 50%;
  background: #eee;
  position: absolute;
  top: 50%;
}
.de_coupon::after {
  left: -0.1rem;
}
.de_coupon::before {
  right: -0.1rem;
}
.de_left {
  width: 40%;
}
.de_right {
  width: 60%;
}
.de_left_top {
  padding-bottom: 0.2rem;
}
.des {
  padding-left: 0.3rem;
  line-height: 0.56rem;
}
.de_bottom {
  padding: 0.3rem;
  border-top: 1px dashed #e0e0e0;
  border-bottom: 1px dashed #e0e0e0;
  text-align: center;
}
.de_bottom span {
  font-size: 0.26rem;
  color: #fff;
  padding: 0.1rem 0.16rem;
  border-radius: 0.3333rem;
  display: inline-block;
  width: 2rem;
  text-align: center;
}
.de_details {
  padding: 0.24rem;
}
.de_details ul {
  padding: 0.3rem;
}
.de_details ul li {
  font-size: 0.28rem;
}

.Spli {
  transform: rotate(180deg);
}
</style>