<template>
  <div class="QueryByPhoneOrOrderNo">
    <div class="query_condition_div" ref='topCondition'>
      <input placeholder="输入充值账号" maxlength="11" type="tel" @blur.prevent="BlurFun" v-input-filter:special v-model="query.accountNo" />
      <div class="dis_inlblock list_btn" :style="{'background':theme.mainColor}" @click="LoadTop">查询</div>
    </div>
    <div ref="line" class="line"></div>
    <div id="add" class="query_titile query_main_div" v-show='list.length != 0 ' :style="{'overflow-y': auto,height: wrapperHeight + 'px'}">
      <mt-loadmore :bottom-method="LoadBottom" :auto-fill="false" :bottom-all-loaded="allLoaded" ref="loadmore" @top-status-change="HandleTopChange" @bottom-status-change="HandleBottomChange">
        <div v-for="(item, index) in list" :key="index" class="res_content_div" @click.stop="GoDetail(item)">
          <div class="res_content_pading">
            <div class="flex_align_center flex_SB">
              <span class="list_right_name bold">{{item.productName}}</span>
              <span class=" color333">
                <i v-if="item.payType==payType.H5Zfb" class="iconfont icon-umidd17 color_blue"></i>
                <i v-else-if="item.payType==payType.H5Wx||item.payType==payType.WXJSAPI||item.payType==payType.ScanWx" class="iconfont icon-weixinlogo color_deep_green"></i>
                <i v-else class="iconfont icon-shouji fs45"></i>
              </span>
            </div>
            <div class="flex_align_center flex_SB margin_top5"  v-if="item.mergeInfo">
              <span class="list_right_name">礼金兑换码：<span class="list_right_data">{{item.mergeInfo}}</span></span>
            </div>
            <div class="flex_align_center flex_SB">
              <span class="list_right_name">充值账号：<span class="list_right_data">{{item.accountNo}}</span></span>
              <span class="size40 color666"><span class="size24 color666">￥</span>{{item.payAmount|qxSelffilter({fix:2})}}</span>
            </div>
            <div class="flex_align_center flex_SB">
              <div>
                <div class="flex_align_center flex_SB margin_top8">
                  <span class="list_right_name ">订单号：<span class="list_right_data">{{item.orderNo}}</span></span>
                </div>
                <div class="flex_align_center flex_SB margin_top8">
                  <span class="list_right_name">创建时间：<span class="list_right_data">{{item.createTime|qxSelffilter({mobileDate:'yyyy-MM-dd hh:mm:ss'})}}</span></span>
                </div>
              </div>
              <span>
                <template v-if="item.payType">
                  <span class="list_left" v-if="item.orderStatus==orderStatus.Success">充值成功</span>
                  <span class="list_left" v-else-if="item.orderStatus==orderStatus.Fail">充值失败</span>
                  <span class="list_left" v-else-if="item.orderStatus==orderStatus.Recharging">充值中</span>
                  <span class="bord" :style="{'color':theme.mainColor,'border-color':theme.mainColor}" v-else-if="item.orderStatus==orderStatus.ToBePay" @click.stop="PayAgain(item)">继续支付</span>
                  <span class="list_left" v-else-if="item.orderStatus==orderStatus.OrderClose">支付失败</span>
                  <span class="list_left" v-else-if="item.orderStatus==orderStatus.ToBePay">已退款</span>
                </template>
                <template v-else>
                  <span class="list_left" v-if="item.orderStatus==orderStatus.Success">办理成功</span>
                  <span class="list_left" v-else-if="item.orderStatus==orderStatus.Fail">办理失败</span>
                  <span class="list_left" v-else-if="item.orderStatus==orderStatus.Recharging">办理中</span>
                </template>
              </span>
            </div>

          </div>
        </div>
        <div slot="top" class="mint-loadmore-top" style="text-align:center">
          <span v-show="topStatus !== 'loading'" :class="{ 'is-rotate': topStatus === 'drop' }"></span>
          <span class="mint-loadmore-text">{{ topText }}</span>
        </div>
        <div slot="bottom" class="mint-loadmore-bottom">
          <span v-show="bottomStatus !== 'loading'" :class="{ 'is-rotate': bottomStatus === 'drop' }">{{loadBottomText}}</span>
          <span class="mint-loadmore-text">{{ bottomText }}</span>
        </div>
      </mt-loadmore>
    </div>
    <div class="nodata" v-show='list.length == 0 ' :style="{height: wrapperHeight + 'px' }">
      <div class="nodata_center">
        <i class="iconfont icon-meiyoushuju" style="font-size: 1rem;"></i>
        <p>咦，还没有数据呢~</p>
      </div>
    </div>
  </div>
</template>
<script>
import * as Appsettings from '@/Appsettings'
import * as ObjectUtil from '../../../../util/ObjectUtil'
import * as AppVerUtil from '../../../../util/AppVerUtil'
import * as LocalStorgeUtil from '../../../../util/LocalStoreUtil'
import * as WholeLocalKey from '../../../../const/WholeStoreKey'
import * as ComEnum from '../../../../const/Enum'

export default {
  data() {
    return {
      query: {
        pageIndex: 1,
        pageSize: 10,
        accountNo: '',
        termId: 1,
        partnerUid: 'IBVBF3'
      },
      seletedValue: 0,
      rechargeTell: '',
      list: [],
      firstQuery: true,
      allLoaded: true, 
      haveMore: true,
      topStatus: '',
      bottomStatus: '',//底部上拉加载状态
      topText: '',
      topPullText: '下拉刷新',
      topDropText: '释放更新',
      topLoadingText: '加载中...',
      bottomText: '',
      bottomPullText: '上拉刷新',
      bottomDropText: '释放更新',
      bottomLoadingText: '加载中...',
      wrapperHeight: 0,
      total: '',
      loadBottomText: "下拉加载更多",
      theme: { color: '#108ee9' },
      orderStatus: ComEnum.OrderStatus,
      payType: ComEnum.PayTypeEnum,
    }
  },
  created() {
    if (this.$route.query.termId) {
      this.query["termId"] = this.$route.query.termId
    }
    if (this.$route.query.partnerUid) {
      this.query["partnerUid"] = this.$route.query.partnerUid
    }
    if (ComEnum.MerchentThemeColor[this.query.partnerUid] && ComEnum.MerchentThemeColor[this.query.partnerUid][this.query.termId]) {
      if (ComEnum.MerchentThemeColor[this.query.partnerUid][this.query.termId].mainColor)
        this.theme.mainColor = ComEnum.MerchentThemeColor[this.query.partnerUid][this.query.termId].mainColor
    }
    if (AppVerUtil.IsWx()) {
      this.query.platUid = LocalStorgeUtil.GetItem(this.query.termId)
    } else {
      this.query.platUid = this.$route.query.platUid
    }
    // this.query.accountNo = LocalStorgeUtil.GetItem(WholeLocalKey.RECHARGE_ACCOUNT + this.query.termId)
    this.LoadTop()
  },
  activated() { },
  mounted() {
    this.$nextTick(() => {
      let conditionHeight = this.$refs.topCondition.offsetHeight
      let lineHeight = this.$refs.line.offsetHeight
      this.wrapperHeight = document.documentElement.clientHeight - conditionHeight - lineHeight;
    })
  },
  computed: {},
  methods: {
    BlurFun() {
      ObjectUtil.IphoneScore()
    },
    HandleTopChange(status) {
      this.topStatus = status
    },
    HandleBottomChange(status) {
      this.bottomStatus = status
    },
    GoDetail(item) {
      this.$router.push({ name: "OrderDetail", query: { orderNo: item.orderNo, termId: this.query["termId"], partnerUid: this.query["partnerUid"], platUid: this.query.platUid } }) 
    },
    PayAgain(data) {
      data['termId'] = this.query["termId"]
      data['partnerUid'] = this.query["partnerUid"]
      data['actualPrice'] = data.payAmount
      LocalStorgeUtil.SetObject(WholeLocalKey.TERM_ID, { termId: this.query["termId"] })
      LocalStorgeUtil.SetObject(WholeLocalKey.LOCAL_ORDER_INFO + this.query["termId"], data);
      this.$router.push({ name: "Order", query: { isAgainPay: true } })
    },
    LoadTop() {
      this.HandleTopChange('loading')
      this.query.pageIndex = 1
      this.allLoaded = false//下拉刷新时解除上拉加载的禁用
      this.GetOrderListNew()
    },
    LoadBottom() {
      if (!this.allLoaded) {
        this.HandleBottomChange('loading')
        this.query.pageIndex = this.query.pageIndex + 1
        this.GetOrderListNew(1)
      } else {
        this.$toast({
          message: "已经到达最后一页了", duration: 2000
        })
      }
    },
    async GetOrderListNew(d) {
      this.$indicator.open({ spinnerType: "fading-circle" })
      const res = await this.$get(Appsettings.ApiUrl.GetOrderListNew, this.query)
      this.$indicator.close()
      if (d) {
        this.$refs.loadmore.onTopLoaded();
        this.HandleBottomChange('loadingEnd')
        this.$refs.loadmore.onBottomLoaded()
      }
      this.firstQuery = false
      if (res.code == 100) {
        this.total = res.data.total
        let list = []
        if (res.data.list && res.data.list.length > 0) {
          list = res.data.list
        }
        if (this.query.pageIndex == 1) {
          this.list = list
        } else {
          this.list = this.list.concat(list)
        } 
        if (this.list.length >= res.data.total) {
          this.allLoaded = true
          this.loadBottomText = "已到最后一页"
        } else {
          this.allLoaded = false
          this.loadBottomText = "下拉加载更多"
        }
      }
    }
  }
}
</script>
<style scoped> 
.query_condition_div {
  height: 1rem;
  line-height: 1rem;
  position: relative;
  background: #fff;
}

.line {
  height: 0.146667rem  ;
  background: #f5f5f5;
}

.query_condition_div input {
  outline: none;
  height: 100%;
  line-height: 100%;
  width: calc(100% - 1.2rem);
  border: none;
  margin-left: 0.3rem;
  font-size: 0.36rem;
}
.list_btn {
  font-size: 0.32rem;
  color: #fff;
  position: absolute;
  right: 0.3rem;
  top: 50%;
  transform: translateY(-50%);
  width: 0.8rem;
  height: 0.44rem;
  line-height: 0.44rem;
  text-align: center;
  border-radius: 0.0533rem;
}
.list_right_name {
  font-size: 0.32rem;
}
.res_content_div {
  border-bottom: 1px solid #f5f5f5;
}
.res_content_pading {
  padding: 0.15rem 0.3rem 0.3rem;
  background: #ffffff;
}
.list_right_data,
.list_left {
  color: #666;
  font-size: 0.3rem;
}
.margin_top8 {
  margin-top: 0.1067rem;
}
.icon-weixinlogo,
.icon-umidd17 {
  font-size: 0.4rem;
}
.query_main_div {
  -webkit-overflow-scrolling: touch;
  overflow: auto; 
}

.nodata {
  width: 100%;
  height: 100vh;
  text-align: center;
  position: relative;
}
.nodata_center {
  position: absolute;
  top: 50%;
  left: 0;
  transform: translateY(-50%);
  width: 100%;
  text-align: center;
  color: #999;
}
.bord {
  padding: .06rem .1rem; 
  border-radius: 0.1rem;
  border: 1px solid #f1682e; 
  font-size: 0.24rem;
  cursor: pointer;
}
</style>