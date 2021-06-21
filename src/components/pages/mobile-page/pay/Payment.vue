<template>
    <div class="order">
        <div class="title size32 title_div">商品信息</div>
        <ul class="rechargeInfo border_bottom size30">
            <li class="flex_align_center flex_SB rechargeInfo_list">
                <span>商品名称</span><span class="color_a1a1a1">{{rechargeInfo.productName}}</span>
            </li>
            <li class="flex_align_center flex_SB rechargeInfo_list">
                <span>充值手机<span class="focus size24" :style="{'color':theme.mainColor}">(请仔细核对)</span>
                </span><span class="color_a1a1a1">{{rechargeInfo.accountNo}}</span>
            </li>
            <li class="flex_align_center flex_SB rechargeInfo_list border_bottom">
                <span v-if="!rechargeInfo.couponPrice">支付金额</span><span v-if="!rechargeInfo.couponPrice" class="color_e0ac30" :style="{'color':theme.mainColor}">￥{{rechargeInfo.actualPrice}}</span>
                <div v-if="rechargeInfo.couponPrice" class="rechargeInfo_list_couponPrice width100">
                    <p class="flex_align_center flex_SB"><span>支付金额</span><span class="color_e0ac30" :style="{'color':theme.mainColor}">{{rechargeInfo.actualPrice}}元</span></p>
                    <p class="flex_align_center flex_SB"><span>优惠券</span><span class="color_e0ac30" :style="{'color':theme.mainColor}">{{rechargeInfo.couponPrice}}元</span></p>
                    <p class="flex_align_center flex_SB"><span>实付</span><span class="color_e0ac30" :style="{'color':theme.mainColor}">{{rechargeInfo.realPrice}}元</span></p>
                </div>
            </li>
        </ul>
        <div class="title size32 title_div" v-if="payMethod.length > 0">选择支付方式</div>
        <ul class="rechargeInfo" v-if="payMethod.length > 0">
            <li class="flex_align_center flex_SB  rechargeInfo_list" @click.stop="ClickCoupon">
                <span class=" flex_align_center flex_SB">
                    <i class="iconfont icon-youhuiquan"></i>
                    <span class="size30 bold">优惠券</span>
                </span>
                <span class="size32 color_888" :style="Coupon||CouponCont?{'color':theme.mainColor}:''">{{Coupon?Coupon:CouponCont?CouponCont:'暂无可用'}}</span>
            </li>
            <li class="flex_align_center flex_SB  rechargeInfo_list" v-for="(item,index) in payMethod" :key="index" @click="SelectPay(item,index)">
                <span class=" flex_align_center flex_SB">
                    <i :class="'icon iconfont '+item.icon"></i>
                    <span class="size32">{{item.name}}</span>
                </span>
                <input class="radioBox" name="pay" type="radio" :style="item.type?{'background-image':'url('+theme.selectedImg+')','border':'none'}:''" :checked="item.type" />
            </li>
        </ul>
        <div class="prompt_box">
            <p class="prompt size24">温馨提示</p>
            <p class="prompt_cont color_red">1、本产品为自动充值，一经充值成功，无法退款。</p>
            <p class="prompt_cont color_red">2、请仔细核对【充值账号】与【商品名称】,以免产生损失。</p>
            <p class="prompt_cont color333"> 3、如遇充值高峰时段，到账时间会有延迟，请耐心等候。</p>
            <p class="prompt_cont color333">4、若订单充值失败，支付金额将在7个工作日内原路退回。</p>
        </div>
        <div class="flex_align_center flex_center submit_box">
            <p class="submit_btn" :style="{'background':theme.mainColor}" @click="SubmitPay">确认支付</p>
        </div>
        <div class="ordertop" v-if="showSuccess">
            <div class="align_center" style="padding-top:0.6667rem">
                <p>
                    <i v-if="payAfterInfo.payStatus==PayStatus.Success" class="iconfont icon-chenggong1 color_deep_green "></i>
                    <i v-else-if="payAfterInfo.payStatus==PayStatus.Fail" class="iconfont icon-shibai2 color_red "></i>
                    <i v-else class="iconfont icon-chuli  " :style="{'color':theme.mainColor}"></i>
                </p>
                <p class="ordertop_price color_333 size44"><span>￥</span>{{payAfterInfo.price}}</p>
                <p class="ordertop_stare">
                    <span class="size28 color_666" v-if="payAfterInfo.payStatus==PayStatus.Success">支付成功，充值中</span>
                    <span class="size28 color_666" v-else-if="payAfterInfo.payStatus==PayStatus.Fail">支付失败，交易关闭</span>
                    <span class="size28 color_666" v-else>支付确认中</span>
                </p>
            </div>
            <ul class="ordertop_info">
                <li class="ordertop_info_li">
                    <span>商品名称</span><span>{{payAfterInfo.name}}</span>
                </li>
                <li class="ordertop_info_li">
                    <span>订单编号</span><span>{{payAfterInfo.number}}</span>
                </li>
                <li class="ordertop_info_li">
                    <span>商品类型</span><span>{{payAfterInfo.productType}}</span>
                </li>
                <li class="ordertop_info_li">
                    <span>手机号码</span><span>{{payAfterInfo.tel}}</span>
                </li>
                <li class="ordertop_info_li">
                    <span>交易时间</span><span>{{payAfterInfo.createTime|sytfilter({date:'yyyy-MM-dd HH:mm:ss'})}}</span>
                </li>
                <li class="ordertop_info_li">
                    <span>客服电话</span><span class="color">4008111801</span>
                </li>
                <li class="size28 color_999">若充值失败，支付金额将在7个工作日内原路退回至相应账户，请注意查收</li>
            </ul>
            <div class="flex_align_center flex_center submit_box">
                <p class="submit_btn" :style="{'background':theme.mainColor}" @click.stop="GoBack">继续充值</p>
                <!-- <p class="submit_btn1" :style="{'background':theme.mainColor}" @click.stop="GoBack">返回</p> -->
            </div>
        </div>
        <div ref="zfb"> </div>
        <orderchildren :showPop="showPop" @Popups="PopUps"></orderchildren>
        <coupon :common='common' :theme='theme' :info='info' ref="coupon" @seletedItem="SelectCoupon" @Coupon='GetUsableCoupon'></coupon>
    </div>
</template>

<script> 
import Orderchildren from "./modal/Orderchildren";
import coupon from "./modal/coupon";
import * as Appsettings from "@/Appsettings";
import * as AppverUtil from '@/util/AppVerUtil'
import * as LocalStoreUtil from "@/util/LocalStoreUtil";
import * as WholeLocalKey from "../../../../const/WholeStoreKey";
import * as LockMd5Java from "../../../../util/LockUtil";
import * as ConstEnum from "../../../../const/Enum";
import * as PostOrderSer from '../../../../service/PostProductService';
import * as ObjectUtil from '@/util/ObjectUtil'
import * as HwUtil from '../../../../util/hw-util/HwUtil'

export default {
    components: {
        Orderchildren,
        coupon
    },
    data() {
        return {
            showPop: false,
            rechargeInfo: {
                productName: '',
                accountNo: '',
                actualPrice: '',
                couponPrice: '',
                realPrice: '',
            },
            payMethod: [],
            defaultPayTypes: [
                {
                    name: "微信",
                    icon: "icon-weixinlogo color_01b702",
                    type: "checked",
                    id: ConstEnum.PayTypeEnum.H5Wx
                },
                {
                    name: "支付宝",
                    icon: "icon-umidd17 color_1296db",
                    type: "",
                    id: ConstEnum.PayTypeEnum.H5Zfb
                },
            ],
            wxNotAllowPay: [ConstEnum.PayTypeEnum.H5Zfb, ConstEnum.PayTypeEnum.H5Wx, ConstEnum.PayTypeEnum.ScanWx],
            wxOnlyAllowPay: [ConstEnum.PayTypeEnum.WXJSAPI],
            showSuccess: false,
            info: "",
            orderSubmitDTO: {
                termId: "", // Integer 终端编号
                partnerUid: "", // Integer 商户UID
                productId: "", // Integer 产品编号
                accountNo: "", //String 充值账号
                platUid: "", // String 平台UID(可空)
                couponId: "", // String 优惠券编号(可空)
                timestamp: "", // String 时间戳
                sign: "" // String (将传入字段按ACS码升序排列, 然后去除空的字段, 拼接用&, 再直接拼上key = md5(accountNo + timestamp))
            },
            paymentOrderDTO: {
                orderNo: "", // String 订单编号
                payType: ConstEnum.PayTypeEnum.H5Wx, // Integer 支付类型: 1 - 支付宝 2-微信 3-龙支付
                openid: "" // String   openid, 为JSAPI支付时必传
            },
            termId: "",
            partnerUid: 'IBVBF3',
            isReturnBack: false,
            payStatus: "",
            CouponList: [],
            Coupon: '',
            couponId: '',
            theme: {
                mainColor: '#f1682e',
                selectedImg: require('../../../../assets/img/f1682e.png'),
            },
            isAgainPay: false,
            common: {},
            PayStatus: ConstEnum.PayStatus
        };
    },
    created() {
        this.isAgainPay = this.$route.query.isAgainPay || false
        this.common.termId = LocalStoreUtil.GetObject(WholeLocalKey.TERM_ID).termId
        this.common.partnerUid = LocalStoreUtil.GetObject(WholeLocalKey.TERM_ID).partnerUid
        this.info = LocalStoreUtil.GetObject(WholeLocalKey.LOCAL_ORDER_INFO + this.common.termId);

        let termId = this.common.termId
        let partnerUid = this.common.partnerUid
        if (!ObjectUtil.IsEmpty(ConstEnum.MerchentThemeColor[partnerUid]) && !ObjectUtil.IsEmpty(ConstEnum.MerchentThemeColor[partnerUid][termId])) {
            let item = ConstEnum.MerchentThemeColor[partnerUid][termId]
            if (!ObjectUtil.IsEmpty(item.mainColor))
                this.theme.mainColor = item.mainColor
            if (!ObjectUtil.IsEmpty(item.selectedImg))
                this.theme.selectedImg = item.selectedImg
        }
    },
    mounted() {
        if (this.$route.query.trade_no || this.$route.query.tradeNum) {
            this.isReturnBack = true;
        } else {
            this.isReturnBack = false;
        }

        if (this.isAgainPay) {
            this.couponId = this.info.couponId
            this.paymentOrderDTO.payType = this.info.payType
            if (this.couponId) {
                this.CouponDetails()
            }
        } else {
            this.$refs.coupon.getUsableCoupon()
        }
        let payTip = LocalStoreUtil.GetObject(WholeLocalKey.PAY_TIP + this.common.termId)
        if (!ObjectUtil.IsEmpty(payTip)) {
            this.paymentOrderDTO.payType = payTip.payType
        }
        this.getPayType();
        this.rechargeInfo.productName = this.info.mergeType == '0' ? this.info.productTitle : this.info.productName
        this.rechargeInfo.accountNo = this.info.accountNo
        this.rechargeInfo.actualPrice = this.info.actualPrice
        this.$nextTick(() => {
            this.$refs.zfb.innerHTML = ""
        });

        this.showPop = false
        if (payTip) {
            this.OpenMessageBox()
        }
        window.addEventListener("popstate", this.GoBack, false);
    },
    beforeRouteLeave(to, from, next) {
        if (this.isReturnBack) {
            this.GoBack()
        } else {
            next()
        }
    },
    destroyed() {
        window.removeEventListener("popstate", this.GoBack, false);
    },
    methods: {
        SelectCoupon(val) {
            this.couponId = val.couponId
            let type = val.couponType == ConstEnum.CouponType.FeeType ? '话费' : val.couponType == ConstEnum.CouponType.FlowType ? '流量' : ''
            this.Coupon = val.couponFee + '元' + type + '抵用券'
            this.rechargeInfo.couponPrice = val.couponFee
            this.rechargeInfo.realPrice = PostOrderSer.Subtr(this.rechargeInfo.actualPrice, this.rechargeInfo.couponPrice)
        },
        ClickCoupon() {
            if (this.Coupon) {
                this.$refs.coupon.Show(true)
                this.$refs.coupon.getUsableCoupon()
            }
        },
        SelectPay(data, index) {
            this.paymentOrderDTO.payType = data.id;
            this.payMethod.forEach((item, ind) => {
                if (ind == index) this.payMethod[index].type = "checked";
                else this.payMethod[ind].type = "";
            });
        },
        SubmitPay() {
            if (this.wxNotAllowPay.indexOf(this.paymentOrderDTO.payType) >= 0 && AppverUtil.IsWx()) {
                this.$toast({ message: '仅支持在网页中支付', duration: 2000 })
                return
            } else if (this.wxOnlyAllowPay.indexOf(this.paymentOrderDTO.payType) >= 0 && !AppverUtil.IsWx()) {
                this.$toast({ message: '仅支持在微信公众号中支付', duration: 2000 })
                return
            }
            if ((this.paymentOrderDTO.payType == ConstEnum.PayTypeEnum.WXJSAPI || this.paymentOrderDTO.payType  == ConstEnum.PayTypeEnum.H5Wx) && !HwUtil.IsExitWxHwApp()) {
                this.$toast({ message: '未安装微信,请安装后重试', duration: 2000 })
                return
            }
            this.$indicator.open({ text: "支付请求中", spinnerType: "fading-circle" });
            if (this.isAgainPay) {
                this.paymentOrderDTO.orderNo = this.info.orderNo
                this.getPayInfo()
            } else {
                if (LocalStoreUtil.GetItem(WholeLocalKey.HW_JSSDK_ACCESS_TOKEN)) {
                    this.CheckOpenid()
                } else {
                    this.postSubmitNew()
                }
            }
        },
        GoBack() {
            LocalStoreUtil.RemoveItem(WholeLocalKey.PAY_TIP + this.common.termId)
            if (this.isReturnBack) {
                const startLength = Number.parseInt(LocalStoreUtil.GetItem(WholeLocalKey.START_ROUT_LENGTH));
                const nowLength = history.length;
                this.$router.go(startLength - nowLength);
            } else {
                this.$router.back()
            }
        },
        OpenMessageBox() {
            this.showPop = true;
        },
        PopUps(data) {
            this.showPop = false
            if (data) {
                this.GoBack();
            } else {
                this.getOverNew();
            }
        },
        // CheckWxjsBridge(jsStr) {
        //   if (typeof WeixinJSBridge == "undefined") {
        //     if (document.addEventListener) {
        //       document.addEventListener('WeixinJSBridgeReady', this.OnBridgeReady, false);
        //     } else if (document.attachEvent) {
        //       document.attachEvent('WeixinJSBridgeReady', this.OnBridgeReady);
        //       document.attachEvent('onWeixinJSBridgeReady', this.OnBridgeReady);
        //     }
        //   } else {
        //     this.OnBridgeReady(jsStr);
        //   }
        // },
        // OnBridgeReady(data) {
        //   let that = this;
        //   // eslint-disable-next-line no-undef
        //   WeixinJSBridge.invoke(
        //     'getBrandWCPayRequest', {
        //     "appId": data.appId,     //公众号名称，由商户传入     
        //     "timeStamp": data.timeStamp,         //时间戳，自1970年以来的秒数     
        //     "nonceStr": data.nonceStr, //随机串     
        //     "package": data.package,//"prepay_id=u802345jgfjsdfgsdg888",
        //     "signType": data.signType,// "MD5",         //微信签名方式：     
        //     "paySign": data.paySign,//"70EA570631E4BB79628FBCA90534C63FF7FADD89" //微信签名 
        //   },
        //     function (res) {
        //       that.$indicator.open({ spinnerType: 'fading-circle' })
        //       let _that = that
        //       if (res.err_msg == "get_brand_wcpay_request:ok") {
        //         setTimeout(() => {
        //           _that.getOverNew()
        //           _that.$indicator.close()
        //         }, 2000)
        //       } else {
        //         setTimeout(() => {
        //           _that.getOverNew()
        //           _that.$indicator.close()
        //         }, 2000)
        //       }
        //     }
        //   )
        // },
        async CheckOpenid() {
            let data = {
                accessToken: LocalStoreUtil.GetItem(WholeLocalKey.HW_JSSDK_ACCESS_TOKEN),
                openId: HwUtil.GetHwAppAccount(),
                termId: this.common.termId
            }
            this.$indicator.open({ spinnerType: 'fading-circle' })
            const res = await this.$get(Appsettings.ApiUrl.CheckOpenid, data)
            if (res.code == 100) {
                this.postSubmitNew()
            } else {
                this.$indicator.close()
                this.$toast({ message: res.message, duration: 2000 })
            }
        },
        async postSubmitNew() {
            let url = Appsettings.ApiUrl.PostSubmitNew18
            this.orderSubmitDTO = {
                termId: this.common.termId,// Integer 终端编号
                partnerUid: this.common.partnerUid,
                esProductNo: this.info.productId || this.info.productID,// Integer 产品编号
                accountNo: this.info.accountNo,//String 充值账号
                platUid: HwUtil.GetHwAppAccount(),// String 平台UID(可空)
                couponId: this.couponId,// String 优惠券编号(可空)
                shareUid: "",//推广人UID(可空)
                timestamp: Date.parse(new Date()),// String 时间戳
                sign: ""// String (将传入字段按ACS码升序排列, 然后去除空的字段, 拼接用&, 再直接拼上key = md5(accountNo + timestamp))
            }
            if (LocalStoreUtil.GetItem(WholeLocalKey.HW_JSSDK_ACCESS_TOKEN)) {
                this.orderSubmitDTO['extend1'] = '1'//有accessToken则是新版App  
            }
            // if (AppverUtil.IsWx()) {
            //   this.orderSubmitDTO.platUid = LocalStoreUtil.GetItem(Appsettings.TermObj[this.common.termId].key)
            // }
            let obj = this.orderSubmitDTO;
            if (!(typeof obj == "object")) {
                return
            }

            for (let key in obj) {
                if (obj.hasOwnProperty(key) && (obj[key] == null || obj[key] == undefined || obj[key] == "")) {
                    delete obj[key];
                }
            }
            let datas = LockMd5Java.LockMd5Java(obj, "accountNo,timestamp", "", false)
            if (!LocalStoreUtil.GetItem(WholeLocalKey.HW_JSSDK_ACCESS_TOKEN)) {
                datas['noextend1'] = '1'
            }
            const res = await this.$post(url, datas)
            if (res.code == 100) {
                this.paymentOrderDTO.orderNo = res.data.orderNo;
                this.getPayInfo();
            } else {
                this.$indicator.close();
                this.$toast({ message: res.message, duration: 2000 })
            }
        },
        async getPayInfo() {
            this.paymentOrderDTO['syncUrl'] = window.location.href + '?trade_no=syncUrl'
            const res = await this.$get(Appsettings.ApiUrl.GetPayInfo, this.paymentOrderDTO)
            this.$indicator.close();
            if (res.code == 100) {
                LocalStoreUtil.SetObject(WholeLocalKey.PAY_TIP + this.common.termId, { orderNo: this.paymentOrderDTO.orderNo, payType: this.paymentOrderDTO.payType })
                let d = JSON.parse(res.data);
                if (this.paymentOrderDTO.payType == ConstEnum.PayTypeEnum.H5Zfb) {
                    setTimeout(() => {
                        this.OpenMessageBox();
                    }, 1500);
                    this.$refs["zfb"].innerHTML = d.payInfo;
                    this.$refs["zfb"].querySelector("input[type=submit]").click();
                } else if (this.paymentOrderDTO.payType == ConstEnum.PayTypeEnum.H5Wx) {
                    setTimeout(() => {
                        this.OpenMessageBox();
                    }, 1500);
                    window.location.href = d.payInfo
                }
                //  else if (this.paymentOrderDTO.payType == ConstEnum.PayTypeEnum.WXJSAPI) {
                //   let data = JSON.parse(res.data);
                //   this.CheckWxjsBridge(data.payInfo);
                // }
            } else {
                this.$toast({ message: res.message, duration: 2000 });
            }
        },
        async getPayType() {
            this.$indicator.open({ spinnerType: 'fading-circle' })
            let data = { termId: this.common.termId, partnerUid: this.common.partnerUid }
            const res = await this.$get(Appsettings.ApiUrl.GetPayType, data);
            this.$indicator.close()
            if (res.code == 100) {
                let flag = res.data.indexOf(this.paymentOrderDTO.payType) >= 0
                this.defaultPayTypes.forEach(ite => {
                    if (res.data.indexOf(ite.id) >= 0) {
                        this.payMethod.push(ite)
                    }
                    if (flag && ite.id == this.paymentOrderDTO.payType) {
                        this.SelectPay(ite, this.payMethod.length - 1)
                    }
                })
                if (!flag) {
                    this.payMethod[0].type = "checked"
                    this.SelectPay(this.payMethod[0], 0)
                }
            } else {
                this.$toast({
                    message: res.message,
                    duration: 2000
                });
            }
        },
        async getOverNew() {
            let payTip = LocalStoreUtil.GetObject(WholeLocalKey.PAY_TIP + this.common.termId);
            const res = await this.$get(Appsettings.ApiUrl.GetOverNew, { orderNo: payTip.orderNo });
            if (res.code == 100) {
                LocalStoreUtil.RemoveItem(WholeLocalKey.PAY_TIP + this.common.termId);
                this.payAfterInfo = {
                    payStatus: '',
                    price: res.data.payAmount,
                    name: res.data.productName,
                    number: res.data.orderNo,
                    productType: '',
                    createTime: res.data.createTime,
                    tel: res.data.accountNo
                }
                //1-话费 2-流量 3-视频会员 4-加油卡 5-固话 6-电子卡券 
                ConstEnum.ProductTypeObjEnum.forEach(item => {
                    if (item.id == res.data.productType) {
                        this.payAfterInfo.productType = item.name
                    }
                })

                if (!res.data.payStatus) {
                    this.payAfterInfo.payStatus = "支付成功";
                } else if (res.data.payStatus == this.PayStatus.Fail) {
                    this.payAfterInfo.payStatus = "支付失败";
                } else {
                    this.payAfterInfo.payStatus = "处理中";
                }
                this.showSuccess = true;
            } else {
                this.OpenMessageBox();
                this.$toast({
                    message: res.message,
                    duration: 2000
                });
            }
        },
        GetUsableCoupon(total) {
            if (total) {
                this.Coupon = total + '张可用'
            }
        },
        async CouponDetails() {
            const res = await this.$get(Appsettings.ApiUrl.CouponDetails, { id: this.couponId })
            if (res.code == 100) {
                let type = res.data.couponType == ConstEnum.CouponType.FeeType ? '话费' : res.data.couponType == ConstEnum.CouponType.FlowType ? '流量' : ''
                this.CouponCont = res.data.couponFee + '元' + type + '抵用券'
                this.rechargeInfo.couponPrice = res.data.couponFee
                this.rechargeInfo.realPrice = PostOrderSer.Subtr(this.rechargeInfo.actualPrice, this.rechargeInfo.couponPrice)
            }
            else if (res.code == 900) {
                this.$toast({ message: '系统异常', duration: 2000 });
            } else {
                this.$toast({ message: res.message, duration: 2000 });
            }
        },
    }
};
</script>

<style scoped>
.title_div {
    padding: 0 0.24rem;
    color: gray;
}
.title {
    border-bottom: 1px solid #f5f5f5;
    border-top: 1px solid #f5f5f5;
    height: 1rem;
    line-height: 1rem;
}

.rechargeInfo {
    padding: 0 0.24rem;
    border-bottom: 1px solid #f5f5f5;
}

.rechargeInfo_list {
    width: 100%;
    color: #333;
    padding: 0 0.24rem;
    min-height: 1rem;
    border-bottom: 1px solid #f5f5f5;
}
.border_bottom {
    border-bottom: 0;
}
.rechargeInfo_list > span {
    font-size: 0.3rem;
}
.focus {
    margin-left: 0.267rem;
    color: #e3b03b;
}
.color_e0ac30 {
    color: #e0ac30;
}
.color_a1a1a1 {
    color: #a1a1a1;
}
.rechargeInfo_list_couponPrice p {
    line-height: 0.5333rem;
}
.rechargeInfo_list_couponPrice p span {
    font-size: 0.3rem;
}

input.radioBox {
    border: 1px solid #a1a1a1;
}
.submit_box {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    padding: 0 0.3rem 0.4rem;
}
.submit_btn {
    width: 100%;
    height: 0.84rem;
    line-height: 0.84rem;
    text-align: center;
    margin: 0 auto;
    color: #fff;
    border-radius: 0.1rem;
    background: #e3b03b;
    font-size: 0.36rem;
}
.submit_btn1 {
    margin: 0 auto;
    text-align: center;
    font-size: 0.2133rem;
    line-height: 0.5333rem;
    border-radius: 0.08rem;
    width: 85%;
    color: #fff;
}
.icon-youhuiquan {
    font-size: 0.45rem;
    color: #e3b03b;
    margin-right: 0.133rem;
}
.ordertop {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    background: #fff;
    font-size: 0;
    color: #333;
    z-index: 120;
    overflow: auto;
}
.ordertop_price {
    margin-top: 0.24rem;
}
.ordertop_stare {
    margin-top: 0.24rem;
    margin-bottom: 0.3rem;
}
.ordertop_info {
    margin-bottom: 1.24rem;
}
.ordertop_info li {
    height: 1rem;
    padding: 0 0.24rem;
}
.ordertop_info_li {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #f5f5f5;
}
.ordertop_info_li:first-of-type {
    border-top: 1px solid #f5f5f5;
}
.ordertop_info_li span {
    font-size: 0.3rem;
}
.ordertop_info_li span:first-of-type {
    color: #666;
}
.ordertop_info_li span:last-of-type {
    color: #333;
}
/*******************************温馨提示**************************** */
.prompt_box {
    padding: 0.3rem 0.3rem 0.35rem;
    margin: 0.3rem 0.3rem 1.54rem;
    border-radius: 0.4rem;
    background: #f7f7f7;
}
.prompt {
    width: 1.4rem;
    background: #ffaa22;
    position: relative;
    color: #fff;
    margin-bottom: 0.1rem;
    height: 0.4rem;
    line-height: 0.4rem;
    padding-left: 0.2rem;
}
.prompt::before {
    content: "";
    position: absolute;
    right: 0;
    top: 0;
    border-right: 0.2rem solid #f5f5f5;
    border-top: 0.2rem solid transparent;
    border-bottom: 0.2rem solid transparent;
}
.prompt_cont {
    line-height: 0.4rem;
    font-size: 0.24rem;
}
</style>