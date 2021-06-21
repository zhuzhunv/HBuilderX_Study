
const perApi = process.env.API_ROOT

const ApiUrl = {
    // CheckYxhd: `${perApi}/tmall/yxhd/check`, 
    CheckYxhd: `${perApi}/gdlt/yxhd/check`, 
    GetBannerList: `${perApi}/comm/banner`,//获取banner
    GetProductTypes: `${perApi}/partner/productTypes`,//获取产品类型
    GetProduct: `${perApi}/product`, //获取收银台终端产品
    GetProduct18: `${perApi}/product/18`, //获取18系统下游产品
    GetMobielSection: `${perApi}/comm/number/section`, //获取号段信息
    GetPayType: `${perApi}/order/payType`,//获取支付类型 termId=18&partnerUid=none
    GetPayInfo: `${perApi}/order/payInfo`, //获取支付信息(支付接口) 
    GetOverNew: `${perApi}/order`, //查询订单详情

    GetMyCouponList: `${perApi}/coupon/all`,//查询自己拥有的优惠券
    GetTodayCouponList: `${perApi}/coupon/activities`,//获取可领优惠券活动
    ReceiveCoupon: `${perApi}/coupon`,//用户领取活动优惠券
    UsableCoupon: `${perApi}/coupon/available`,// 获取用户可使用优惠券
    CouponDetails: `${perApi}/coupon/detail`,// 获取优惠券详情

    PostSubmitNew: `${perApi}/order`, //创建订单(产品收银台)
    PostSubmitNew18: `${perApi}/order/18`,//创建订单(产品在18)


    PostSubmitForwardFlow: `${perApi}/forward/vcode`,//首次获取验证码并下单(前向流量)
    GetSecondeCode: `${perApi}/forward/vcode2`,//根据订单号第二次获取验证码
    PostSubmitCode: `${perApi}/forward/order`,//校验验证码

    GetOrderListNew: `${perApi}/order/list`,//获取订单列表
    CheckOpenid: `${perApi}/comm/huawei/openid`,//校验openid
}
const LocalStoreKey = ""
const TermObj = {

}
const TermId18 = [1, 2, 18]

const HwJssdkAppId = "102321379"  //正式:102321379,测试:101446553

export {
    LocalStoreKey,
    TermObj,
    ApiUrl,
    TermId18,
    HwJssdkAppId,
}