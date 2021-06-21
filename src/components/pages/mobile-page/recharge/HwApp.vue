<template>
    <!-- 移动话费跳转官网的改版 -->
    <div class="HwApp">
        <div>
            <div :style="{'height':bannerHeight+'px'}" v-if="theme.isShowBanner">
                <mt-swipe :auto="4000">
                    <mt-swipe-item v-for="(item, index) in bannerList" :key="index" @click="GoBannerPath(item)">
                        <img ref='banner' :src='item.imageUrl' style="width:100%" />
                    </mt-swipe-item>
                </mt-swipe>
            </div>
            <div class="mobile_input">
                <mobile-input ref="mobileinput" :theme="theme" @blur="getMobielSection" @un-mobile="InitData"></mobile-input>
                <!-- <p v-if="tip == '移动'&&productType.fee == getProductData.productType" class="size24 color_red">温馨提示：移动话费快充需跳转官方充值，售后服务请致电10086</p> -->
            </div>
            <self-tabbar ref="tabbar" :tabList="tabList" @seletedTabr="SeletedTabr">
                <template slot-scope="item">
                    <i :class="item.row.icon" :style="[productType.fee == getProductData.productType&&productType.fee==item.row.id?{'color':theme.mainColor}:productType.flow == getProductData.productType&&productType.flow==item.row.id?{'background':theme.mainColor}:'']"></i>
                    &nbsp;<span class="size37" :style="[getProductData.productType ==item.row.id?{'color':theme.mainColor}:'']">{{item.row.name}}</span>
                </template>
            </self-tabbar>
            <parent-product-box ref="parternProduct" :showCheckYxhd='showCheckYxhd' :feeActivity="productType.fee==getProductData.productType?feeActivity:''" :theme='theme' :listObj="parentListObj" @seletedItem="SeletedParentProduct">
                <template slot-scope="item">
                    <div class="width100 fs0" v-if="item.row.productType==productType.fee">
                        <p v-if="item.row.unit">
                            <span class="value_span">{{item.row.key}}</span>
                            <span class="size28">{{item.row.unit}}</span>
                        </p>
                        <p v-if="!item.row.unit">
                            <span class="size28 bold" v-if="item.row.mergeType =='0'">{{item.row.key}}</span>
                            <span v-else class="size28 bold">{{item.row.key}}</span>
                        </p>
                        <p v-if="item.row.unit">
                            <span class="size28">售价 {{item.row.actualPrice}} 元</span>
                        </p>
                        <p v-if="!item.row.unit">
                            <span class="size24 bold" v-if="item.row.mergeType =='0'">{{item.row.remark}}</span>
                            <span class=" size28 bold" v-else>{{item.row.remark}}</span>
                        </p>
                    </div>
                    <div class="width100" v-else-if="item.row.productType==productType.flow&&item.row.name!='更多流量'">
                        <p class="fs0">
                            <span class="value_span" v-if="item.row.unit">{{item.row.key}}</span>
                            <span class="bold size34" v-else>{{item.row.key}}</span>
                            <span class="size28">{{item.row.unit}}</span>
                        </p>
                        <p class="size28" v-if="item.row.unit">售价 {{item.row.actualPrice}} 元</p>
                    </div>
                    <div class="width100" v-else-if="item.row.name=='更多流量'">
                        <div>
                            <p class="size34">{{item.row.key}}</p>
                            <p class="size28">{{item.row.unit}}</p>
                        </div>
                    </div>
                    <div class="width100" v-else-if="item.row.name=='5G流量'">
                        <div>
                            <p class="size34">{{item.row.key}}</p>
                            <p class="size34">{{item.row.unit}}</p>
                        </div>
                    </div>
                    <div v-else class="color_999">
                        <span class="size36">{{item.row.face}}</span><span class="un_unit size24">{{item.row.unit}}</span>
                    </div>
                </template>
            </parent-product-box>
        </div>
        <div v-show="hasDataFlag">
            <p class="nodata_tip">该省运营商升级维护中，暂无法提供充值服务。请稍后重试，谢谢</p>
        </div>
        <div>
            <children-product-box ref="childrenlist" v-show="showChildrenProductBox" :childrenList="chilrenListObj.list" :theme='theme' @goBuy='GoBuy' @close="CloseChildrenProduct">
                <template slot-scope="item">
                    <div v-if="chilrenListObj.productType==productType.fee" class="flex1">
                        <div v-if="item.row.businessType==businessTypeEnum.vp">
                            <div class="flex_align_center flex_SB">
                                <div>
                                    <p>
                                        <span class="productName size28 bold color_333">{{item.row.productName}}</span>
                                        <span class="icon_cash_two size24" v-show="item.row.promoteMsg">{{item.promoteMsg}}</span>
                                    </p>
                                    <p>
                                        <span>{{item.row.face}}分钟</span>
                                        <span v-if="item.row.remark">&nbsp;{{item.row.remark}}</span>
                                    </p>
                                </div>
                                <span class="size36"><span class="size24">￥</span>{{item.row.payFee}}</span>
                            </div>
                        </div>
                        <div v-else class="flex_align_center flex_SB">
                            <div>
                                <p class="weui_cell_bd">
                                    <span class="productName size28 bold color_333">{{item.row.productName}}</span>
                                    <span class="icon_cash_two size24" v-show="item.row.promoteMsg">{{item.row.promoteMsg}}</span>
                                </p>
                                <p>
                                    <span class="flow_remark" v-if="item.row.rechargeMode!='undefined'" :style="{'background':theme.tipBackColor}">{{item.row.rechargeMode==0?"快充":"慢充"}}</span>
                                    <span class="size26 color_999" v-if="item.row.remark">&nbsp;{{item.row.remark}}</span>
                                </p>
                            </div>
                            <span class="size36"><span class="size24">￥</span>{{item.row.payFee}}</span>
                        </div>
                    </div>
                    <div v-if="chilrenListObj.productType==productType.flow" class="flex1">
                        <template v-if="item.row.businessType==businessTypeEnum.ForwardFlow">
                            <div class="flex_align_center flex_SB nowrap">
                                <div>
                                    <p class="weui_cell_bd">
                                        <span class="size28 color_333">{{item.row.actualPrice}}元</span>
                                        <span class="flow_remark" v-if="item.row.productName" :style="{'background':theme.tipBackColor}">{{item.row.productName}} </span>
                                        <span class="icon_cash_two size24" v-show="item.row.promoteMsg">{{item.row.promoteMsg}}</span>
                                    </p>
                                    <p>
                                        <span class="size24 color_red">{{item.row.productSummary.split('br')[0]}}</span>
                                    </p>
                                </div>
                                <span class="size36"><span class="size24">￥</span>{{item.row.payFee}}</span>
                            </div>
                        </template>
                        <template v-else>
                            <div class="flex_align_center flex_SB">
                                <div>
                                    <p class="weui_cell_bd">
                                        <span class="productName bold size28 color_333">{{item.row.productName}}</span>
                                        <span class="icon_cash_two size24" v-show="item.row.promoteMsg">{{item.row.promoteMsg}}</span>
                                    </p>
                                    <p>
                                        <span class="flow_remark" v-if="item.row.useArea" :style="{'background':theme.tipBackColor}">{{parseInt(item.row.maxFlow/1024)==0?item.row.maxFlow+'M':''}}{{item.row.useArea}}</span>
                                        <span class="size24 color_999">{{item.row.remark}}</span>
                                    </p>
                                </div>
                                <span class="size36"><span class="size24">￥</span>{{item.row.payFee}}</span>
                            </div>
                        </template>
                    </div>
                </template>
            </children-product-box>
            <GdltActivity :showCheckYxhd='showCheckYxhd'></GdltActivity>
            <!-- <div class="pos_relative oilposition fs0" @click="GoOil">
                <img class="width100" src="https://cdn.images.qianxingniwo.com/hwapp/iolPosition.png" alt="">
                <p class="absolute_center align_right color_FB475C ">
                    <span class="size34 color_FB4742">加油礼金券使用入口</span>
                    <i class="size34 icon-fenye-xiayiye1 iconfont color_FB4742"></i>
                </p>
            </div> -->
            <FooterBox :basisInfo='getProductData' :platUid='platUid' v-if="footerShow"></FooterBox>
        </div>
        <div style="height:1.2rem;"></div>
    </div>
</template>
<script>
import SelfTabbar from '@/components/layout/TabbarTwo'
import MobileInput from '@/components/layout/MobileInput'//MobileInputTwo
import ParentProductBox from '@/components/layout/ParentProductBox'
import ChildrenProductBox from '@/components/layout/ChildrenProductBoxTwo'
import FooterBox from '@/components/layout/FooterBox'
import GdltActivity from '@/components/layout/GdltActivity'
import * as ConstEnum from '../../../../const/Enum'
import * as WholeStoreKey from '../../../../const/WholeStoreKey'
import * as Appsettings from '../../../../Appsettings'
import * as Validata from '../../../../util/Validata'
import * as LocalStoreUtil from '../../../../util/LocalStoreUtil'
import * as ProductSer from '../../../../service/ProductService'
import * as HwUtil from '../../../../util/hw-util/HwUtil'
import * as PostProductSer from '../../../../service/PostProductService'
import * as ObjectUtil from '../../../../util/ObjectUtil'
import * as AppVerUtil from '../../../../util/AppVerUtil'
import * as MonitoringSoftKeyboard from '../../../../util/MonitoringSoftKeyboard'
import * as HwJSSDKUtil from '../../../../util/hw-util/HwJSSDK'
import * as BaiDuTongJi from '../../../../util/baidu-tongji/BaiDuUtil'
import * as LockUtil from "../../../../util/LockUtil";
import * as font from '@/util/font'
export default {
    components: {
        SelfTabbar,
        MobileInput,
        ParentProductBox,
        ChildrenProductBox,
        FooterBox, GdltActivity
    },
    beforeRouteEnter(to, from, next) {
        LocalStoreUtil.SetItem(WholeStoreKey.START_ROUT_LENGTH, 1 + "")
        LocalStoreUtil.RemoveItem(WholeStoreKey.PAY_TIP + to.params.termId)
        HwJSSDKUtil.HwJSSDKRegister(Appsettings.HwJssdkAppId)
        if (!ObjectUtil.IsEmpty(LocalStoreUtil.GetItem(WholeStoreKey.IS_EXIST_HBS)) && Number(LocalStoreUtil.GetItem(WholeStoreKey.IS_EXIST_HBS)) == 1) {
            // HwJSSDKUtil.GetJSSDKReady(HwJSSDKUtil.GetJSSDKSignIn)
            HwJSSDKUtil.GetJSSDKSignIn()
        }
        next()
    },
    beforeRouteLeave(to, from, next) {
        let _this = this
        if (AppVerUtil.IsIos()) {
            window.removeEventListener('focusin', () => {
                MonitoringSoftKeyboard.FocusinHandler(() => {
                    _this.footerShow = false
                })
            }, false)
            window.removeEventListener('focusout', () => {
                MonitoringSoftKeyboard.FocusinHandler(
                    () => {
                        _this.footerShow = true
                    })
            }, false)
        } else if (AppVerUtil.IsAndr()) {
            let orgHeight = document.documentElement.clientHeight || document.body.clientHeight
            window.removeEventListener('resize', () => {
                MonitoringSoftKeyboard.ResizeHandler(
                    () => {
                        _this.footerShow = false
                    },
                    () => {
                        _this.footerShow = true
                    },
                    orgHeight)
            }, false)
        }
        next()
    },
    data() {
        return {
            tabList: [
                { name: '充话费', id: ConstEnum.ProductTypeEnum.Fee, icon: 'iconfont icon-huafei' },
                { name: '充流量', id: ConstEnum.ProductTypeEnum.Flow, icon: 'iconfont icon-liuliang' },
            ],
            parentListObj: {  //父产品对象信息
                list: [],
                hasChildBoolean: true,
                isSeletedBoolean: true
            },
            defaultFeeObj: {  //默认话费数据
                list: [
                    { face: 30, unit: "元" },
                    { face: 50, unit: "元" },
                    { face: 100, unit: "元" },
                    { face: 200, unit: "元" },
                    { face: 300, unit: "元" },
                    { face: 500, unit: "元" },
                ],
                hasChildBoolean: false,
                isSeletedBoolean: false
            },
            defaultFlowObj: {  //默认流量数据
                list: [
                    { face: 100, unit: "M" },
                    { face: 200, unit: "M" },
                    { face: 300, unit: "M" },
                    { face: 500, unit: "M" },
                    { face: 1, unit: "G" },
                    { face: 2, unit: "G" },
                ],
                hasChildBoolean: false,
                isSeletedBoolean: false
            },
            hasDataFlag: false,  //是否有数据,来判断是否展示提示
            tel: "",             //充值账号
            tip: '',
            mobileTip: "",       //号段相关信息
            chilrenListObj: {    //选中后子数据内容信息
                list: [],
                productType: -1
            },
            getProductData: {    //查询产品相关参数
                termId: "",
                productType: -1,//产品类型: 1-话费 2-流量
                partnerUid: "",
                accountNo: '',
                recommendMode: ConstEnum.RecommendMode.All,
                mergeType: ConstEnum.MergeType.All,
                rechargeMode: '' //快充慢充: 0-快充 1-次日 8-点到账慢充 3-普通慢充
            },
            productType: {      //产品类型
                fee: ConstEnum.ProductTypeEnum.Fee,
                flow: ConstEnum.ProductTypeEnum.Flow
            },
            businessTypeEnum: { //产品业务类型
                vp: ConstEnum.BusinessTypeEnum.Vp,
                ForwardFlow: ConstEnum.BusinessTypeEnum.ForwardFlow
            },
            showPromoteMsg: false,//是否展示推荐消息
            platUid: "",
            footerShow: true,
            theme: {
                mainColor: '#f1682e',
                selectedImg: require('../../../../assets/img/f1682e.png'),
            },
            showChildrenProductBox: false,
            bannerList: [],
            bannerHeight: "",
            showCheckYxhd: { //温馨提示
                CheckYxhdFee: false,
                CheckYxhdFlow: false,
                CheckYxhd: false
            },
            feeActivity: []
        }
    },
    // beforeRouteEnter(to, from, next) {  },
    created() {
        let termId = this.$route.params.termId
        let partnerUid = this.$route.params.partnerUid

        this.getProductData.termId = termId
        this.getProductData.partnerUid = partnerUid

        if (!ObjectUtil.IsEmpty(ConstEnum.MerchentThemeColor[partnerUid]) && !ObjectUtil.IsEmpty(ConstEnum.MerchentThemeColor[partnerUid][termId])) {
            let item = ConstEnum.MerchentThemeColor[partnerUid][termId]
            this.theme.isShowBanner = item.isShowBanner

            if (this.theme.isShowBanner) {
                this.getBannerList()
            }
            if (!ObjectUtil.IsEmpty(item.mainColor))
                this.theme.mainColor = item.mainColor
            if (!ObjectUtil.IsEmpty(item.childrenBackColor))
                this.theme.childrenBackColor = item.childrenBackColor
            if (!ObjectUtil.IsEmpty(item.Qcolor))
                this.theme.Qcolor = item.Qcolor
            if (!ObjectUtil.IsEmpty(item.tipBackColor))
                this.theme.tipBackColor = item.tipBackColor
            if (!ObjectUtil.IsEmpty(item.selectedImg))
                this.theme.selectedImg = item.selectedImg
        }
        BaiDuTongJi.BaiDuTongJi('6e34fa20a3622b03ced82aef59f254db')
    },
    mounted() {
        LocalStoreUtil.RemoveItem(WholeStoreKey.PAY_TIP + this.getProductData.termId);
        let tel = LocalStoreUtil.GetItem(WholeStoreKey.RECHAGE_ACCOUNT + this.getProductData.termId)
        this.$nextTick(() => {
            let _this = this
            if (AppVerUtil.IsIos()) {
                window.addEventListener('focusin', () => {
                    MonitoringSoftKeyboard.FocusinHandler(() => {
                        _this.footerShow = false
                    })
                }, false)
                window.addEventListener('focusout', () => {
                    MonitoringSoftKeyboard.FocusinHandler(
                        () => {
                            _this.footerShow = true
                        })
                }, false)
            } else if (AppVerUtil.IsAndr()) {
                let orgHeight = document.documentElement.clientHeight || document.body.clientHeight
                window.addEventListener('resize', () => {
                    MonitoringSoftKeyboard.ResizeHandler(
                        () => {
                            _this.footerShow = false
                        },
                        () => {
                            _this.footerShow = true
                        },
                        orgHeight)
                }, false)
            }
            this.$refs.tabbar.SeletedTabr(this.tabList[0], 0)
            if (tel) {
                this.$refs.mobileinput.ChangShowTel(tel, true)
            }
            this.SetBannerHeight()
        })
    },
    activated() { },
    computed: {},
    watch: {

    },
    methods: {
        // GoOil() {
        //     location.href = 'https://ljkh5.100100bm.com'
        //     // location.href = 'http://petrolrights.100bm.cn' //线下
        // },
        InitData(tel) {
            if (tel && tel == this.tel) { return }
            this.tel = tel
            this.hasDataFlag = false
            this.showCheckYxhd = {
                CheckYxhdFee: false,
                CheckYxhdFlow: false,
                CheckYxhd: false
            }
            this.feeActivity = []
            this.chilrenListObj.list = []
            if (this.getProductData.productType == ConstEnum.ProductTypeEnum.Fee) {
                this.parentListObj.list = this.defaultFeeObj.list
                this.parentListObj.hasChildBoolean = this.defaultFeeObj.hasChildBoolean
                this.parentListObj.isSeletedBoolean = this.defaultFeeObj.isSeletedBoolean
            } else {
                this.parentListObj.list = this.defaultFlowObj.list
                this.parentListObj.hasChildBoolean = this.defaultFlowObj.hasChildBoolean
                this.parentListObj.isSeletedBoolean = this.defaultFlowObj.isSeletedBoolean
            }
        },
        SetBannerHeight() {
            let _this = this
            let i = 0
            let bannerInter = setInterval(() => {
                if (_this.bannerHeight > 0 || i >= 20) {
                    bannerInter && clearInterval(bannerInter)
                }
                if (_this.$refs.banner)
                    _this.bannerHeight = _this.$refs.banner[0].offsetHeight
                i++
            }, 40);
        },
        SeletedTabr(item, index) {
            if (item.id == this.getProductData.productType) {
                return
            }
            this.getProductData.productType = item.id
            this.InitData(this.tel)
            if (this.tel && Validata.ValidTel(this.tel)) {
                this.queryProduct(this.tel)
            }
        },
        SeletedParentProduct(item, index) {
            if (item.name == "5G流量") {
                window.location.href = 'https://zshf.18pingtai.cn/Mobile5gNew/index?coopId=huaweicz'
                return
            }
            if (this.getProductData.productType == ConstEnum.ProductTypeEnum.Fee) {
                if (item.mergeType == '0') {
                    this.$router.push({ name: 'FeeOil', query: { termId: this.getProductData.termId, partnerUid: this.getProductData.partnerUid, platUid: HwUtil.GetHwAppAccount() } })
                    return
                }
                // if (this.tip == '移动' && item.unit) {
                //     window.location.href = 'https://touch.10086.cn/i/mobile/rechargecredit.html?'
                //     return
                // }
                // if (this.tip == '联通' && item.unit) {
                //     window.location.href = 'http://upay.10010.com/npfwap/npfMobWap/bankcharge/index.html?'
                //     return
                // }
            }
            this.chilrenListObj.productType = item.productType
            this.chilrenListObj.list = item.children
            this.$refs.childrenlist.ChangInputData(item.children[0], item.name == '特惠话费' ? item.name + '慢充' : item.name)
            this.showChildrenProductBox = true
            font.setHeight()
        },
        CloseChildrenProduct() {
            this.showChildrenProductBox = false
        },
        GoBuy(item) {
            let platUid = HwUtil.GetHwAppAccount() || ""
            if (!platUid) {
                this.$toast({ message: "用户未登录", duration: 2000 })
                return
            }
            if (item.businessType && item.businessType == this.businessTypeEnum.ForwardFlow) {
                this.$router.push({ name: 'ForwardFlow', query: { tel: this.tel, productId: item.productId, termId: this.getProductData.termId, partnerUid: this.getProductData.partnerUid, platUid: platUid } })
            } else {
                let data = item
                data['accountNo'] = this.tel.replace(/\D/g, '')
                data['termId'] = this.getProductData.termId
                data['partnerUid'] = this.getProductData.partnerUid
                data['platUid'] = platUid
                data['actualPrice'] = data.payFee
                PostProductSer.Manager18Product(data)
                this.$router.push({ name: 'Order' })
            }
        },
        async getMobielSection(val) {
            let tel = val.replace(/\D/g, '')
            if (tel == this.tel) {
                return
            }
            this.tel = tel
            LocalStoreUtil.SetItem(WholeStoreKey.RECHAGE_ACCOUNT + this.getProductData.termId, tel)
            let data = { mobile: this.tel }
            this.$indicator.open({
                spinnerType: 'fading-circle'
            })
            this.mobileTip = ""
            const res = await this.$get(Appsettings.ApiUrl.GetMobielSection, data)
            if (res.code == 100) {
                this.mobileTip = res.data
                let tip = res.data.province_name + " " + res.data.carrier_name
                this.$refs.mobileinput.TipData(tip)
                this.tip = res.data.carrier_name
                // this.$refs.mobileinput.SetTel(this.tel + tip)
                if (tip == '广东 联通') {
                    this.CheckYxhd(val)
                }
                this.queryProduct(this.tel)
            } else {
                this.$indicator.close()
                this.$toast({ message: "不支持的号码", duration: 2000 })
            }
        },
        async CheckYxhd(val) {
            this.$indicator.open({ spinnerType: 'fading-circle', })
            let sha256 = require("js-sha256").sha256
            let data = {
                coopId: 'zshf',
                phone: val,
                nickPhone: sha256(val),
                sign: ''
            }
            data = LockUtil.LockMd5Java(data, "", "", false)
            const res = await this.$get(Appsettings.ApiUrl.CheckYxhd, data)
            this.$indicator.close()
            if (res.data.code == 100) {
                this.feeActivity = []
                let CheckYxhdFee, CheckYxhdFlow

                res.data.data.forEach(element => {
                    if (element.hd_type == '1') {
                        CheckYxhdFee = 1 //满足小额话费赠送资格
                        this.feeActivity.push(element.package)
                    }
                    if (element.hd_type == '6') CheckYxhdFlow = 6 //满足流量赠送资格
                });
                if (CheckYxhdFee && CheckYxhdFlow) this.showCheckYxhd.CheckYxhd = true
                else {
                    if (CheckYxhdFee) this.showCheckYxhd.CheckYxhdFee = true
                    if (CheckYxhdFlow) this.showCheckYxhd.CheckYxhdFlow = true
                }
            }
        },
        async queryProduct(tel) {
            this.$indicator.open({ spinnerType: 'fading-circle' })
            this.getProductData["accountNo"] = tel
            let data = JSON.parse(JSON.stringify(this.getProductData))
            data['mergeType'] = 4
            let ronghe = new Array()
            const resPromis = this.$get(Appsettings.ApiUrl.GetProduct18, this.getProductData)
            let forwardFlowList = new Array()
            if (this.getProductData.productType == ConstEnum.ProductTypeEnum.Flow) {
                //特惠流量
                let sytData = { termId: this.getProductData.termId, partnerUid: this.getProductData.partnerUid, accountNo: tel, productType: this.getProductData.productType }
                const sytResPromis = this.$get(Appsettings.ApiUrl.GetProduct, sytData)
                const sytRes = await sytResPromis;
                if (sytRes.code == 100) {
                    if (sytRes.data && sytRes.data.length > 0) {
                        forwardFlowList = sytRes.data
                    } 
                }
            }
            //融合产品
            const res2 = await this.$get(Appsettings.ApiUrl.GetProduct18, data)
            //18产品
            const res = await resPromis; 
            this.$indicator.close()
            if (res2.code == 100) {
                ronghe = res2.data
            }
            if (res.code == 100) {
                if (res.data && res.data.length > 0) {
                    this.hasDataFlag = false
                    if (this.getProductData.productType == ConstEnum.ProductTypeEnum.Fee) {
                        this.parentListObj.list = ProductSer.FeeManager(res.data, 100)
                    } else {
                        this.parentListObj.list = ProductSer.FastFlowManager(res.data, 1024)
                        if (forwardFlowList.length > 0) {
                            let it = {
                                name: '特惠流量',
                                key: '特惠流量',
                                unit: "",
                                productType: ConstEnum.ProductTypeEnum.Flow,
                                businessType: ConstEnum.BusinessTypeEnum.ForwardFlow,
                                actualPrice: '',
                                isRecommend: '',
                                hasActivity: '',
                                defaultSeleted: false,
                                children: forwardFlowList
                            }
                            this.parentListObj.list.push(it)
                        }
                        if (this.tip.indexOf('移动') >= 0) {
                            this.parentListObj.list.push({ name: '5G流量', key: '5G流量', unit: "一键迈入" })
                        }
                    }
                    if (ronghe.length > 0 && ConstEnum.ProductTypeEnum.Fee == this.getProductData.productType) {
                        let it = {
                            name: '话费"油"礼充',
                            key: '话费"油"礼充',
                            unit: "",
                            productType: ConstEnum.ProductTypeEnum.Fee,
                            businessType: ronghe[0].businessType,
                            fee: '52元享100元',
                            remark: '52元享100元',
                            showPromote: "",//是否显示图标
                            mergeType: ronghe[0].mergeType,
                            face: '',
                            activity: "",
                            defaultSeleted: false,
                            children: ronghe
                        }
                        // this.parentListObj.list.push(it)
                        this.parentListObj.list.splice(5, 0, it);
                    }
                    this.parentListObj.hasChildBoolean = true
                    this.parentListObj.isSeletedBoolean = true
                    // console.log(this.parentListObj.list);
                } else {
                    this.InitData(tel)
                    this.hasDataFlag = true
                }
            } else {
                this.$toast({ message: res.message, duration: 2000 })
            }
        },
        async getBannerList() {
            const res = await this.$get(Appsettings.ApiUrl.GetBannerList, { termId: this.getProductData.termId })
            if (res.code == 100) {
                this.bannerList = res.data
            }
        },
    }
}
</script>
<style scoped lang="scss">
.mobile_input {
    border-bottom: 0.2rem solid #f5f5f5;
    padding: 0.3rem 0.28rem;
}
.weui_cell_bd {
    margin-bottom: 0.11rem;
    display: flex;
    justify-content: left;
    align-items: flex-start;
}
.productName {
    display: inline-block;
    max-width: 2.4rem;
}
.flow_remark {
    font-size: 0.24rem;
    background-color: #f1682e;
    color: #fff;
    padding: 0.02rem 0.06rem;
    margin-right: 0.1rem;
    border-radius: 0.08rem;
}
.oilposition {
    margin: 0.3rem 0.3rem 0;
}
.oilposition p {
    padding-right: 0.2rem;
}
.nodata_tip {
    font-size: 0.3rem;
    padding: 0 0.3rem;
    color: red;
}
</style>