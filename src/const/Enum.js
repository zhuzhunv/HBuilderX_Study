const PayTypeEnum = { H5Zfb: 1, H5Wx: 2, ScanWx: 6, WXJSAPI: 10 }

const BusinessTypeEnum = {
    Vp: 42, //语音包
    ForwardFlow: 47,//前向流量
    Deandde: 98 //存送
}

const ProductTypeEnum = {
    Fee: 1, //话费
    Flow: 2,//流量
    Vidoe: 3,//视频会员
    Oil: 4,//加油卡
    FixedLine: 5,//固话
    CardTicket: 6,//卡券
}

const ProductTypeObjEnum = [
    { name: '话费', id: 1 },
    { name: '流量', id: 2 },
    { name: '视频会员', id: 3 },
    { name: '加油卡', id: 4 },
    { name: '固话', id: 5 },
    { name: '电子卡券', id: 6 },
]

const CouponType = {
    FeeType: 2,//话费优惠券
    FlowType: 1,//流量优惠券
}
//优惠券使用情况
const UserCouponStatus = {
    Unused: 0,//未使用
    Used: 1,//已使用
    Expired: 2,//已过期
}
//订单状态
const OrderStatus = {
    Success: '0',//充值成功
    Fail: '1',//办理失败
    Recharging: '2',//充值中,办理中
    Refunding: '3',//退款中,无需处理
    RefundSuccess: '4',//退款成功
    OrderClose: '5',//订单关闭
    ToBePay: '6',//继续支付
}
const PayStatus = {
    Success: 0,//支付成功
    Fail: 6, //支付失败
}
 
//18有无活动 0=>无， 1=>有
const ShowPromote18 = {
    Yes: 1,
    N0: 0,
}
//18有无推荐 1=>无， 2=>有  有推荐，无活动显示图标
const  Activity18= {
    Yes: 2,
    N0: 1,
}

//  收银台是否展示推荐标签 0代表推荐 1代表不推荐  
const IsRecommend = {
    Yes: 0,
    No: 1
}
//  收银台 0代表有活动 1代表没有活动
const HasActivity = {
    Yes: 0,
    No: 1
}
// 推荐模式: 0-所有 1-不推荐 2-推荐
const RecommendMode = {
    All: '0',
    No: '1',
    Yes: '2',
}
/**
 * 0-是融合产品,1-非融合产品 mergeType
 */ 
//融合类型: 1-非融合 2-仅融合 3-全部
const MergeType = {
    NoMerge: 1,
    OnlyMerge: 2,
    All: 3,
}
//快充慢充: 0-快充 1-次日 8-点到账慢充 3-普通慢充
const RechargeMode = {
    Fast: 0,
    CR: 1,
    DDZMC: 8,
    PTMC: 3
}
let MerchentThemeColor = {
    'aAFZfm': {
        1: {
            mainColor: '#f1682e',
            Qcolor: '#ffefe8',
            childrenBackColor: '#ffefe8',
            tipBackColor: '#f1682e',
            couponColor:'#f5a546',
            selectedImg: require('../assets/img/f1682e.png'),
            isShowBanner: true,
            // mainColor: '#108ee9',
            // Qcolor: '#e4f2fd',
            // childrenBackColor: '#e4f2fd',
            // tipBackColor: '#0cb6fa',
            // selectedImg: require('../assets/img/108ee9.png'),
            // isShowBanner: true,
        },
        142: {
            mainColor: '#f1682e',
            Qcolor: '#ffefe8',
            childrenBackColor: '#ffefe8',
            tipBackColor: '#f1682e',
            couponColor:'#f5a546',
            selectedImg: require('../assets/img/f1682e.png'),
            isShowBanner: true,
            // mainColor: '#108ee9',
            // Qcolor: '#e4f2fd',
            // childrenBackColor: '#e4f2fd',
            // tipBackColor: '#0cb6fa',
            // selectedImg: require('../assets/img/108ee9.png'),
            // isShowBanner: true,
        }
    }
}

if (process.env.NODE_ENV == 'test' || process.env.NODE_ENV == 'development') {
    MerchentThemeColor = {
        'IBVBF3': {
            1: {
                mainColor: '#f1682e',
                Qcolor: '#ffefe8',
                childrenBackColor: '#ffefe8',
                tipBackColor: '#f1682e',
                couponColor:'#f5a546',
                selectedImg: require('../assets/img/f1682e.png'),
                isShowBanner: true,
                // mainColor: '#108ee9',
                // Qcolor: '#e4f2fd',
                // childrenBackColor: '#e4f2fd',
                // tipBackColor: '#0cb6fa',
                // selectedImg: require('../assets/img/108ee9.png'),
                // isShowBanner: true,
            },
            461: {
                mainColor: '#f1682e',
                Qcolor: '#ffefe8',
                childrenBackColor: '#ffefe8',
                tipBackColor: '#f1682e',
                couponColor:'#f5a546',
                selectedImg: require('../assets/img/f1682e.png'),
                isShowBanner: true,
                // mainColor: '#108ee9',
                // Qcolor: '#e4f2fd',
                // childrenBackColor: '#e4f2fd',
                // tipBackColor: '#0cb6fa',
                // selectedImg: require('../assets/img/108ee9.png'),
                // isShowBanner: true,
            }
        }
    }
}


export {
    ProductTypeEnum,
    PayTypeEnum,
    BusinessTypeEnum,
    ProductTypeObjEnum,
    CouponType,
    UserCouponStatus,
    OrderStatus,
    PayStatus,
    ShowPromote18,
    Activity18,
    IsRecommend,
    HasActivity,
    RecommendMode,
    MergeType,
    RechargeMode, 
    MerchentThemeColor
}