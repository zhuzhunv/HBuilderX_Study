<template>
    <!-- 移动话费跳转官网的改版 -->
    <div class="HwApp">
        1111fdgd
        <button class="button25" @click="scss=!scss">sass基础使用</button>
        <div v-if="scss">
            <p class="scss">331321</p>
            <p class="class1 ">class1</p>
            <p class="class2 ">class2继承class1</p>
            <p class="mixin">mixin使用</p>
        </div>
        <div :style="{'height':bannerHeight+'px'}" v-if="theme.isShowBanner">
            <mt-swipe :auto="4000">
                <mt-swipe-item v-for="(item, index) in bannerList" :key="index" @click="GoBannerPath(item)">
                    <img ref='banner' :src='item.imageUrl' style="width:100%" />
                </mt-swipe-item>
            </mt-swipe>
        </div>
        <button class="button25" @click="mobileInput=!mobileInput">手机号码输入框</button>
        <div class="mobile_input" v-show="mobileInput">
            <mobile-input ref="mobileinput" :theme="theme" @blur="getMobielSection" @un-mobile="InitData"></mobile-input>
        </div>

        <button class="button25" @click="selfTabbar=!selfTabbar">table选择</button>
        <self-tabbar v-show="selfTabbar" ref="tabbar" :tabList="tabList" @seletedTabr="SeletedTabr">
            <template slot-scope="item">
                <i :class="item.row.icon"></i>
                &nbsp;<span class="size37">{{item.row.name}}</span>
            </template>
        </self-tabbar> 
        <button class="button25" @click="FooterBox=!FooterBox">底部</button>
        <div>4546</div>
        <div>4546</div><div>4546</div>
        <div>4546</div><div>4546</div>
        <div>4546</div><div>4546</div>
        <div>4546</div><div>4546</div>
        <div>4546</div><div>4546</div>
        <div>4546</div><div>4546</div>
        <div>4546</div><div>4546</div>
        <div>4546</div><div>4546</div>
        <div>4546</div><div>4546</div>
        <div>4546</div><div>4546</div>
        <div>4546</div><div>4546</div>
        <div>4546</div><div>4546</div>
        <div>4546</div><div>4546</div>
        <div>4546</div><div>4546</div>
        <div>4546</div><div>4546</div>
        <div>4546</div><div>4546</div>
        <div>4546</div><div>4546</div>
        <div>4546</div><div>4546</div>
        <div>4546</div><div>4546</div>
        <div>4546</div>
        <!-- v-show="FooterBox" -->
        <FooterBox  :basisInfo='getProductData' :platUid='platUid' v-if="footerShow"></FooterBox>
    </div>
</template>
<script>
import SelfTabbar from '@/components/layout/TabbarTwo'
import MobileInput from '@/components/layout/MobileInput'
import FooterBox from '@/components/layout/FooterBox'
import * as ConstEnum from '@/const/Enum'
import * as Appsettings from '@/Appsettings'
import * as AppVerUtil from '@/util/AppVerUtil'
import * as MonitoringSoftKeyboard from '@/util/MonitoringSoftKeyboard'
export default {
    components: {
        SelfTabbar,
        MobileInput,
        FooterBox,
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
            mobileInput: false,
            selfTabbar: false,
            tabList: [
                { name: '充话费', id: ConstEnum.ProductTypeEnum.Fee, icon: 'iconfont icon-huafei' },
                { name: '充流量', id: ConstEnum.ProductTypeEnum.Flow, icon: 'iconfont icon-liuliang' },
            ],
            tel: "",             //充值账号  
            footerShow: true,
            theme: {
                mainColor: '#f1682e',
                selectedImg: require('@/assets/img/f1682e.png'),
            },
            bannerList: [],
            bannerHeight: "",
        }
    },
    created() { },
    mounted() {
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
            this.SetBannerHeight()
        })
    },
    activated() { },
    computed: {},
    watch: {},
    methods: {
        InitData(tel) {
            if (tel && tel == this.tel) { return }
            this.tel = tel
            console.log('输入的号码', tel);
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
            console.log(item);
        },
        async getMobielSection(val) {
            let tel = val.replace(/\D/g, '')
            if (tel == this.tel) return
            this.$toast({ message: '符合规则的号码,' + val, duration: 2000 })
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
<style scoped  lang="scss">
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