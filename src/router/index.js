/* eslint-disable no-undef */

const routes = [
    { path: '/home', name: 'home', component: resolve => require(['@/components/pages/home'], resolve), meta: { title: '首页' } },
  { path: '/hwpay.html', name: 'HwApp', component: resolve => require(['@/components/pages/mobile-page/recharge/HwApp'], resolve), meta: { title: '充值页面' } },
  { path: '/forward/flow', name: 'ForwardFlow', component: resolve => require(['@/components/pages/mobile-page/recharge/ForwardFlow'], resolve), meta: { title: '前向流量' } },
  { path: '/feeoil', name: 'FeeOil', component: resolve => require(['@/components/pages/mobile-page/recharge/FeeOil'], resolve), meta: { title: '话费油礼超值购' } },
  { path: '/pay/hwpayment', name: 'Order', component: resolve => require(['@/components/pages/mobile-page/pay/Payment'], resolve), meta: { title: '订单信息' } },
 //生活服务APP活动专用链接
  { path: '/hwpayactive', name: 'HwAppActive', component: resolve => require(['@/components/pages/mobile-page/recharge/HwAppActive'], resolve), meta: { title: '充值页面' } },

  { path: '/coupon/CouponCenter', name: 'CouponCenter', component: resolve => require(['@/components/pages/mobile-page/coupon/CouponCenter'], resolve), meta: { title: '领券中心' } },
  { path: '/coupon/GetCouponResult', name: 'GetCouponResult', component: resolve => require(['@/components/pages/mobile-page/coupon/GetCouponResult'], resolve), meta: { title: '优惠券领取结果' } },
  
  { path: '/query/OrderList', name: 'OrderList', component: resolve => require(['@/components/pages/mobile-page/query/OrderList'], resolve), meta: { title: '订单列表' } },
  { path: '/query/OrderListTwo', name: 'OrderListTwo', component: resolve => require(['@/components/pages/mobile-page/query/OrderListTwo'], resolve), meta: { title: '订单列表' } },
  // /query/OrderDetail 
  { path: '/hworderdetail.html', name: 'OrderDetail', component: resolve => require(['@/components/pages/mobile-page/query/OrderDetail'], resolve), meta: { title: '订单详情' } },
  
  { path: '/Help', name: 'Help', component: resolve => require(['@/components/pages/common/Help'], resolve), meta: { title: '帮助' } },
  { path: '/PrivacyStatement', name: 'PrivacyStatement', component: resolve => require(['@/components/pages/common/PrivacyStatement'], resolve), meta: { title: '隐私声明' } },
  { path: '/UserAgreement', name: 'UserAgreement', component: resolve => require(['@/components/pages/common/UserAgreement'], resolve), meta: { title: '用户协议' } }
]

export default new VueRouter({
  mode: 'history',
  base: process.env.BASE_ROUTE,
  routes: routes
})
