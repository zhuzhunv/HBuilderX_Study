<template>
    <div>
        <div :class="['footer_box size24',fixed] ">
            <div class="color_1296db ">
                <a @click="Query">充值记录</a> <span>|</span>
                <a @click="GoHelp">客服帮助</a> <span>|</span>
                <a class="color_1296db" href="tel:4008111801">客服电话</a> <span>|</span>
                <a @click="GoPrivacyState">隐私声明</a> <span>|</span>
                <a @click="GoUserAgreement">用户协议</a>
            </div>
            <div class="color_1296db"><span @click="CouponCenter">&gt;&gt;优惠券中心&lt;&lt;</span></div>
            <p class="color_999">手机充值服务由四川千行你我科技股份有限公司提供</p>
        </div>
        <div style="height:1.2rem;"></div>
    </div>
</template>
<script>
import * as HwUtil from '@/util/hw-util/HwUtil'

export default {
    props: {
        basisInfo: Object,
        platUid: String
    },
    data() { return {fixed:''} },
    created() { },
    mounted() {
        window.addEventListener('scroll', () => {
            let winHeight = window.innerHeight,
                contentHeight = document.documentElement.scrollTop+winHeight;//可视窗口高度，不包括浏览器顶部工具栏 
            if (!(contentHeight > winHeight)) {
                //当网页正文高度小于可视窗口高度时，为footer添加类pos_fixed
                this.fixed='' 
            } else {
                this.fixed='pos_fixed'
            }
        }, false)

    },
    activated() { },
    computed: {},
    watch: {},
    methods: {
        Query() {
            this.$router.push({ name: "OrderList", query: { termId: this.basisInfo.termId, partnerUid: this.basisInfo.partnerUid, platUid: HwUtil.GetHwAppAccount() } })
        },
        GoHelp() {
            this.$router.push({ name: "Help", query: { termId: this.basisInfo.termId, partnerUid: this.basisInfo.partnerUid } })
        },
        GoPrivacyState() {
            this.$router.push({ name: "PrivacyStatement" })
        },
        GoUserAgreement() {
            this.$router.push({ name: "UserAgreement" })
        },
        CouponCenter() {
            this.$router.push({ name: "CouponCenter", query: { termId: this.basisInfo.termId, partnerUid: this.basisInfo.partnerUid } })
        }
    }
}
</script>
<style scoped>
.footer_box {
    /* position: fixed; */
    bottom: 0;
    text-align: center;
    width: 100%;
    padding-bottom: 0.24rem;
    background: #fff;
    z-index: 10;
}
</style>