<template>
    <div>
        <div class="qx_parent_box">
            <div v-if="index<showIndex" v-for="(item, index) in listObj.list" :key="index" class="qx_com_parent_item" :class="[parentItemClass,seletedIndex==index&&listObj.hasChildBoolean?activeClass:'',item.name=='特惠话费'?'ronghe':'']" :style="[listObj.isSeletedBoolean&& seletedIndex!=index?seleteI:seletedIndex==index && listObj.hasChildBoolean?active:'']" @click="SeletedItem(item,index)">
                <div class="midle_div">
                    <slot :row="item"></slot>
                </div>
                <div class="able_img_box" v-if="item.isRecommend==Activity18.Yes && item.hasActivity!= ShowPromote18.Yes">推荐</div>
                <div class="able_img_box" v-else-if="showCheckYxhd.CheckYxhdFee&&feeActivity.indexOf(String(item.key))>-1">+10%</div>
                <div class="able_img_box" v-else-if="showCheckYxhd.CheckYxhdFlow&& item.key==100">+2GB</div>
                <div class="able_img_box" v-else-if="showCheckYxhd.CheckYxhd&&feeActivity.indexOf(String(item.key))>-1">加赠</div>
                <!-- <img class="able_img" src="../../assets/img/activity_21.png" v-if="item.key==feeActivity">
                <img class="able_img" src="../../assets/img/activity_2.png" v-if="item.isRecommend==Activity18.Yes && item.hasActivity!= ShowPromote18.Yes">  -->
            </div>
            <slot name="customSlot"></slot>
        </div>
        <div v-if="this.listObj.list.length > 6 && showList" @click="more(false)" class="more size28">更多面额<i class="iconfont icon-jiantouarrow486"></i></div>
        <div v-if="this.listObj.list.length > 6 && !showList" @click="more(true)" class="more size28">收起<i class="iconfont icon-jiantou"></i></div>
    </div>
</template>
<script>
import * as ConstEnum from '@/const/Enum'

export default {
    props: {
        feeActivity: Array,
        showCheckYxhd:Object,
        listObj: {
            list: Array,
            hasChildBoolean: Boolean,
            isSeletedBoolean: Boolean,
        },
        activeClass: {
            type: String,
            default: 'active'
        },
        parentItemClass: {
            type: String,
            default: 'qx_parent_item'
        },
        isSeleteClass: {
            type: String,
            default: 'qx_is_selete'
        },
        theme: {}
    },
    data() {
        return {
            seletedIndex: -1,
            showIndex: 6,
            showList: true,
            active: {
                'color': '#fff',
                'border-color': this.theme.mainColor,
                'background': this.theme.mainColor
            },
            seleteI: {
                'color': this.theme.mainColor,
                'border-color': this.theme.mainColor
            },
            Activity18: ConstEnum.Activity18,
            ShowPromote18: ConstEnum.ShowPromote18, 
        }
    },
    created() { },
    mounted() { },
    activated() { },
    computed: {},
    watch: {},
    methods: {
        more(val) {
            this.showList = val
            if (val)
                this.showIndex = 6
            else
                this.showIndex = this.listObj.list.length
        },
        SeletedItem(item, index) {
            this.seletedIndex = index
            this.$emit('seletedItem', item, index)
        },
        // SelctSeleted(index) {
        //   this.seletedIndex = index
        // }
    }
}
</script>
<style scoped>
.ronghe {
    background: url(../../assets/img/compose/bg.png) !important;
    background-size: 100% 100% !important;
    border: 1px solid #f1682e !important;
    color: #f1682e !important;
}
.qx_parent_box {
    margin: 0 0.3rem;
    display: flex;
    justify-content: left;
    flex-wrap: wrap;
}

.qx_com_parent_item {
    display: inline-block;
    width: calc((100% - 0.6rem) / 3);
    margin-right: 0.3rem;
    margin-bottom: 0.36rem;
    position: relative;
}

.qx_com_parent_item:nth-of-type(3n) {
    margin-right: 0px;
}

.midle_div {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 100%;
}

.qx_parent_item {
    border-radius: 0.12rem;
    border: 1px solid #cacaca;
    color: #cacaca;
    text-align: center;
    height: 1.52rem;
    box-sizing: border-box;
}

.qx_is_selete_ff5f4a {
    border: 1px solid #ff5f4a;
    color: #333333;
}

.qx_is_selete {
    border-width: 1px;
}

.value_span {
    font-size: 0.45rem;
    font-weight: 600;
}

.able_img {
    position: absolute;
    top: 0;
    right: -0.1rem;
    width: 1rem;
    transform: translateY(-30%);
}
.more {
    color: #999;
    text-align: right;
    padding-right: 0.3rem;
}
.more i {
    vertical-align: middle;
}
/* 活动图标样式 */
.able_img_box{
    position: absolute;
    right: -0.1rem;
    top: -.15rem;
    width: .98rem;
    line-height: .36rem;
    background: #0cb6fa ;
    border-top-left-radius: .3333rem;
    border-bottom-left-radius: .3333rem;
    font-size: .2rem;
    color: #fff;
}
.able_img_box::after{
    content: '';
    position: absolute;
    bottom: -.09rem; 
    right: 0;
    border-left: .05rem solid #0cb6fa;
    border-right: .05rem solid transparent;
    border-top: .05rem solid #0cb6fa;
    border-bottom: .05rem solid transparent;  
}
</style>