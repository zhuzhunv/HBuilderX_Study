<template>
    <div class=''>
        <div class="prompt_box" v-if="showCheckYxhd.CheckYxhdFee">
            <p class="prompt size24">温馨提示</p>
            <p class="prompt_cont color333">尊敬的广东联通用户:</p>
            <p class="prompt_cont color333">恭喜您已获得话费充值加赠福利，现在充值30-100元任一面值即可额外获赠10%话费。</p>
            <p class="prompt_cont color333">说明：本活动同一号码仅限参与1次，若您已在联通掌上营业厅或其他平台享受此福利，则无法再次享受加赠。</p>
        </div>
        <div class="prompt_box" v-if="showCheckYxhd.CheckYxhdFlow">
            <p class="prompt size24">温馨提示</p>
            <p class="prompt_cont color333">尊敬的广东联通用户:</p>
            <p class="prompt_cont color333">恭喜您已获得话费充值加赠福利，现在充值30-500元任一面值即可额外获赠2GB通用流量，合约期12个月内保持号码正常开通状态即可每月免费赠送。（号码异常无法赠送流量）</p>
            <p class="prompt_cont color333">说明：本活动同一号码仅限参与1次，若您已在联通掌上营业厅或其他平台享受此福利，则无法再次享受加赠。</p>
        </div>
        <div class="prompt_box" v-if="showCheckYxhd.CheckYxhd">
            <p class="prompt size24">温馨提示</p>
            <p class="prompt_cont color333">尊敬的广东联通用户，恭喜您已获得以下话费充值加赠福利！</p>
            <p class="prompt_cont color333">福利一：充值成功即可额外获赠2GB通用流量，合约期12个月内保持号码正常开通状态即可每月免费赠送。（号码异常无法赠送流量）；</p>
            <p class="prompt_cont color333">福利二：额外获赠对应充值金额的10%话费。</p>
            <p class="prompt_cont color333">说明：活动参与资格以运营商要求为准；福利一与福利二互不冲突；同一活动，同一号码仅限参与1次，若您已在联通掌上营业厅或其他平台享受此福利，则无法再次享受加赠</p>
        </div>
    </div>
</template>

<script>

export default {
    props: {
        showCheckYxhd: Object,
    },
    data() {
        return {};
    },
    created() { },
    mounted() { },
    computed: {},
    watch: {},
    methods: {},
}
</script>
<style scoped>
/*******************************温馨提示**************************** */
.prompt_box {
    padding: 0.3rem 0.3rem 0.35rem;
    margin: 0.3rem;
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
.prompt_cont:last-of-type{
    margin-top: .13rem;
}
</style>