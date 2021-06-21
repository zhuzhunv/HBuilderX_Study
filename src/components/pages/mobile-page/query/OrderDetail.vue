<template>
  <div class="order_detail">
    <div class="flex_align_center flex_SB order_div">
      <span>订单编号</span>
      <span>{{orderInfo.orderNo}}</span>
    </div>
    <div class="flex_align_center flex_SB order_div">
      <span>创建时间</span>
      <span>{{orderInfo.createTime|qxSelffilter({mobileDate:'yyyy-MM-dd hh:mm'})}}</span>
    </div>
    <div class="flex_align_center flex_SB order_div">
      <span>购买商品</span>
      <span>{{orderInfo.productName}}</span>
    </div>
    <div class="flex_align_center flex_SB order_div" v-if="orderInfo.mergeInfo">
      <span>礼金兑换码</span>
      <span>{{orderInfo.mergeInfo}}</span>
    </div>
    <div class="flex_align_center flex_SB order_div">
      <span>充值账号</span>
      <span>{{orderInfo.accountNo}}</span>
    </div>
    <div class="flex_align_center flex_SB order_div">
      <span>支付金额</span>
      <span class="size48 color333"><span>￥</span>{{orderInfo.payAmount|qxSelffilter({fix:2})}}</span>
    </div>
    <!-- <div class="flex_align_center flex_SB order_div">
      <span>支付方式</span>
      <span>
        <i v-if="orderInfo.payType==payType.H5Zfb" class="iconfont icon-umidd17 color_blue"></i>
        <i v-else-if="orderInfo.payType==payType.H5Wx||orderInfo.payType==payType.WXJSAPI||orderInfo.payType==payType.ScanWx" class="iconfont icon-weixinlogo color_deep_green"></i>
        <i v-else class="iconfont icon-shouji "></i>
      </span>
    </div> -->
    <div class="flex_align_center flex_SB order_div">
      <span>订单状态</span>
      <span>
        <template v-if="orderInfo.payType">
          <span v-if="orderInfo.orderStatus==orderStatus.Fail">充值失败</span>
          <span v-else-if="orderInfo.orderStatus==orderStatus.Success">充值成功</span>
          <span v-else-if="orderInfo.orderStatus==orderStatus.Recharging">充值中</span>
          <span v-else-if="orderInfo.orderStatus==orderStatus.ToBePay">未支付</span>
          <span v-else-if="orderInfo.orderStatus==orderStatus.OrderClose">支付失败</span>
          <span v-else-if="orderInfo.orderStatus==orderStatus.RefundSuccess">已退款</span>
        </template>
        <template v-else>
          <span v-if="orderInfo.orderStatus==orderStatus.Fail">办理失败</span>
          <span v-else-if="orderInfo.orderStatus==orderStatus.Success">办理成功</span>
          <span v-else-if="orderInfo.orderStatus==orderStatus.Recharging">办理中</span>
          <span v-else-if="orderInfo.orderStatus==orderStatus.Refunding">无需处理</span>
        </template>
      </span>
    </div>
    <div class="flex_align_center flex_SB order_div">
      <span>服务提供商</span>
      <span>四川千行你我科技</span>
    </div>
    <!-- <div class="flex_align_center flex_SB order_div">
      <span>完成时间</span>
      <span>{{orderInfo.finishTime|qxSelffilter({mobileDate:'yyyy-MM-dd hh:mm'})}}</span>
    </div> -->

  </div>
</template>
<script>
import * as ConstEnum from '../../../../const/Enum'
import * as Appsettings from '../../../../Appsettings'
export default {
  data() {
    return {
      orderInfo: {},
      query: {
        orderNo: "",
        pageIndex: 1,
        pageSize: 10,
        accountNo: '',
        termId: 1,
        partnerUid: 'IBVBF3',
        platUid: 'test',
      },
      orderStatus: ConstEnum.OrderStatus,
      payType: ConstEnum.PayTypeEnum
    }
  },
  created() {
    this.query.orderNo = this.$route.query.orderNo ? this.$route.query.orderNo : this.$route.query.orderno
    this.query.termId = this.$route.query.termId
    this.query.partnerUid = this.$route.query.partnerUid
    this.query.platUid = this.$route.query.platUid
    if (this.query.partnerUid) {
      this.getOrderDetail()
    } else {
      this.GetOverNew()
    }
  },
  mounted() { },
  activated() { },
  computed: {},
  watch: {},
  methods: {
    async getOrderDetail() {
      this.$indicator.open({ spinnerType: "fading-circle" })
      const res = await this.$get(Appsettings.ApiUrl.GetOrderListNew, this.query)
      this.$indicator.close()
      if (res.code == 100) {
        if (res.data.list.length > 0)
          this.orderInfo = res.data.list[0]
      } else if (res.code == 900) {
        this.$toast({
          message: "系统错误",
          duration: 2000
        })
      } else {
        this.$toast({ message: res.message, duration: 2000 })
      }
    },
    async GetOverNew() {
      this.$indicator.open({ spinnerType: "fading-circle" })
      const res = await this.$get(Appsettings.ApiUrl.GetOverNew, this.query)
      this.$indicator.close()
      if (res.code == 100) { 
        this.orderInfo = res.data
      } else if (res.code == 900) {
        this.$toast({ message: "系统错误", duration: 2000 })
      } else {
        this.$toast({ message: res.message, duration: 2000 })
      }
    }
  }
}
</script>
<style scoped>
.order_div {
  height: 1rem;
  line-height: 1rem;
  background: #ffffff;
  padding: 0 0.3rem;
  border-bottom: 1px solid #f5f5f5;
}
.order_div span {
  font-size: 0.34rem;
}
.order_div span:first-of-type {
  color: #999;
}
.order_div span:last-of-type {
  color: #333;
}
.icon-weixinlogo,
.icon-umidd17 {
  font-size: 0.4rem;
}
</style>