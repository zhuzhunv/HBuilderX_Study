<template>
  <div class="query_titile query_main_div" :style="{'-webkit-overflow-scrolling': scrollMode,height: wrapperHeight + 'px','background': !total?'#eee':'#fff'}">
    <mt-loadmore :top-method="LoadTop" :bottom-method="LoadBottom" :auto-fill="false" ref="loadmore" @top-status-change="HandleTopChange" @bottom-status-change="HandleBottomChange">
      <div v-for="(item, index) in list" :key="index" class="query_titile">
        <div class="query_div">
          <!-- @click="GoDetail(item.orderNo)" -->
          <span class="size28">商品订单号：{{item.orderNo}}</span>
        </div>
        <div class="query_div">
          <span class="size28">{{item.productName}}</span>
          <span class="size28"><i class="iconfont icon-shijian size18"></i>&nbsp;{{item.createTime|sytfilter({date:'yyyy.MM.dd hh:mm:ss'})}}</span>
        </div>
        <div class="query_div tab">
          <div class="tab_row">
            <div class="tab_title">支付方式</div>
            <div class="tab_content">
              <i v-if="item.payType==payType.H5Zfb" class="iconfont icon-umidd17 color_blue"></i>
              <i v-else-if="item.payType==payType.H5Wx||item.payType==payType.WXJSAPI||item.payType==payType.ScanWx" class="iconfont icon-weixinlogo color_deep_green"></i>
              <i v-else class="iconfont icon-shouji"></i>
            </div>
          </div>
          <div class="tab_row">
            <div class="tab_title">充值账号</div>
            <div class="tab_content">{{item.accountNo}}</div>
          </div>
          <div class="tab_row">
            <div class="tab_title">金额</div>
            <div class="tab_content">{{item.userPayed}}</div>
          </div>
          <div class="tab_row">
            <div class="tab_title">状态</div>
            <div class="tab_content">
              <div v-if="!!item.payType">
                <div class="detailstyle" v-if="item.orderStatus==orderStatus.Success">充值成功</div>
                <div class="detailstyle" v-else-if="item.orderStatus==orderStatus.Recharging">充值中</div>
                <div class="detailstyle" v-else-if="item.orderStatus==orderStatus.Refunding">退款中</div>
                <div class="detailstyle" v-else-if="item.orderStatus==orderStatus.RefundSuccess">退款成功</div>
                <div class="detailstyle" v-else-if="item.orderStatus==orderStatus.OrderClose">订单关闭</div>
                <!-- <div class="detailstyle" v-else-if="item.orderStatus=='6'">待支付</div> -->
                <span class="size24 bord PayAgain" :style="{'color':theme.mainColor,'border-color':theme.mainColor}" v-else-if="item.orderStatus==orderStatus.ToBePay" @click.stop="PayAgain(item)">继续支付</span>
              </div>
              <div v-if="!item.payType">
                <div class="detailstyle" v-if="item.orderStatus==orderStatus.Fail">办理失败</div>
                <div class="detailstyle" v-else-if="item.orderStatus==orderStatus.Success">办理成功</div>
                <div class="detailstyle" v-else-if="item.orderStatus==orderStatus.Recharging">办理中</div>
                <div class="detailstyle" v-else-if="item.orderStatus==orderStatus.Refunding">无需处理</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div slot="top" class="mint-loadmore-top" style="text-align:center">
        <span v-show="topStatus !== 'loading'" :class="{ 'is-rotate': topStatus === 'drop' }">↓</span>
        <span class="mint-loadmore-text">{{ topText }}</span>
      </div>
      <div slot="bottom" class="mint-loadmore-bottom">
        <span v-show="bottomStatus !== 'loading'" :class="{ 'is-rotate': bottomStatus === 'drop' }">↑</span>
        <span class="mint-loadmore-text">{{ bottomText }}</span>
      </div>
    </mt-loadmore>
    <div class="nodata" v-show="!total">
      <div class="nodata_center">
        <i class="iconfont icon-meiyoushuju color_999" style="font-size: 1.5rem;"></i>
        <p class="size38 color_999"> 亲,您还没有下单,快去下单充值吧 </p>
      </div>
    </div>
  </div>
</template>
<script>
import * as Appsettings from '@/Appsettings'
import * as ObjectUtil from '../../../../util/ObjectUtil'
import * as ConstEnum from '../../../../const/Enum'
import * as PostProductSer from '../../../../service/PostProductService'

export default {
  data() {
    return {
      list: [],
      query: {
        pageIndex: 1,
        pageSize: 10,
        termId: 1,
        platUid: "",
        accountNo: '',
        partnerUid: 'IBVBF3'
      },
      firstQuery: true,
      allLoaded: true,
      scrollMode: 'auto',
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
      theme: {
        mainColor: '',
        Qcolor: ''
      },
      total: "",
      orderStatus:ConstEnum.OrderStatus,
      payType:ConstEnum.PayTypeEnum,
    }
  },
  created() {
    if (this.$route.query.termId) {
      this.query.termId = this.$route.query.termId
    }
    if (this.$route.query.partnerUid) {
      this.query.partnerUid = this.$route.query.partnerUid
    }
    if (this.$route.query.platUid) {
      this.query.platUid = this.$route.query.platUid
    }
    let termId = this.query.termId
    let partnerUid = this.query.partnerUid
    if (!ObjectUtil.IsEmpty(ConstEnum.MerchentThemeColor[partnerUid]) && !ObjectUtil.IsEmpty(ConstEnum.MerchentThemeColor[partnerUid][termId])) {
      let item = ConstEnum.MerchentThemeColor[partnerUid][termId]
      if (!ObjectUtil.IsEmpty(item.mainColor))
        this.theme.mainColor = item.mainColor
      if (!ObjectUtil.IsEmpty(item.Qcolor))
        this.theme.Qcolor = item.Qcolor
    }
  },
  activated() { },
  mounted() {
    this.wrapperHeight = document.documentElement.clientHeight;
    this.queryData()
  },
  watch: {
    topStatus(val) {
      switch (val) {
        case 'pull':
          this.topText = this.topPullText;
          break;
        case 'drop':
          this.topText = this.topDropText;
          break;
        case 'loading':
          this.topText = this.topLoadingText;
          break;
      }
    },
    bottomStatus(val) {
      switch (val) {
        case 'pull':
          this.bottomText = this.bottomPullText;
          break;
        case 'drop':
          this.bottomText = this.bottomDropText;
          break;
        case 'loading':
          this.bottomText = this.bottomLoadingText;
          break;
      }
    }
  },
  computed: {},
  methods: {
    GoDetail(orderNo) {
      this.$router.push({ name: "OrderDetail", query: { orderNo: orderNo } })
    },
    HandleTopChange(status) {
      this.topStatus = status
    },
    HandleBottomChange(status) {
      this.bottomStatus = status
    },
    LoadTop() {
      this.HandleTopChange('loading')
      this.query.pageIndex = 1
      this.allLoaded = false//下拉刷新时解除上拉加载的禁用
      this.queryData()
    },
    LoadBottom() {
      this.bottomLoadingText = '加载中...'
      if (!this.allLoaded) {
        this.HandleBottomChange('loading')
        this.query.pageIndex = this.query.pageIndex + 1
        this.queryData(1)
      } else {
        this.bottomLoadingText = '暂无更多'
        this.$toast({
          message: "已经到达最后一页了", duration: 2000
        })
      }
    },
    PayAgain(data) {
      data['partnerUid'] = this.query["partnerUid"]
      data['termId'] = this.query["termId"]
      data['actualPrice'] = data.payAmount
      PostProductSer.Manager18Product(data)
      this.$router.push({ name: "Order", query: { isAgainPay: true } })
    },
    async queryData(d) {
      this.$indicator.open({ spinnerType: "fading-circle" })
      const res = await this.$get(Appsettings.ApiUrl.GetOrderListNew, this.query)
      this.$indicator.close()
      this.$refs.loadmore.onTopLoaded();
      if (d) {
        this.HandleBottomChange('loadingEnd')
        this.$refs.loadmore.onBottomLoaded()
      }

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
        } else {
          this.allLoaded = false
        }
        // if (!d && res.data.total <= 0 && !this.firstQuery) {
        //   this.$toast({ message: '未查询到该订单', duration: 2000 })
        // }
        this.firstQuery = false
      } else {
        this.$toast({ message: res.message, duration: 2000 })
      }
    }
  }
}
</script>
<style scoped>
.iconfont {
  /* font-size: 0.4rem; */
} 
.query_main_div {
  -webkit-overflow-scrolling: touch;
  overflow: auto;
}
.query_titile {
  font-size: .28rem;
  color: #333;
  padding: .1rem;
  border-bottom: 1px solid #ddd;
}
.query_div {
  display: flex;
  justify-content: space-between;
  padding: .1rem 0;
}
.tab {
  background: #f5f5f5;
  padding: .2rem;
}

.tab_row {
  text-align: center;
}
.tab_title {
  margin-bottom: .16rem;
  font-size: .28rem;
}
.tab_content {
  height: .8rem;
  line-height: 0.8rem;
  font-size: .28rem
}
.detailstyle {
  font-size: 0.28rem;
}
.PayAgain {
  display: inline-block;
  border: 1px solid #333;
  padding: 0 .2rem;
  border-radius: 0.06rem;
  line-height: .6rem;
}
.nodata {
  width: 100%;
  height: 100%;
  text-align: center;
  position: relative;
  background: #eee;
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
</style>