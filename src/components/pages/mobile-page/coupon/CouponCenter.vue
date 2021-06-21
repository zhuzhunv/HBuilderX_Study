<template>
  <div class="CouponCenter fs0">
    <div class="query_condition_div" ref='topCondition'>
      <div class="CouponCenter_title" :style="{'background':theme.couponColor}">领券中心</div>
      <div class="CouponCenter_table flex_align_center flex_left">
        <p v-for="(item, index) in CouponCenter_table" :key="index">
          <span class="pos_relative" :style="selectTable==item.tabKey?{'border-bottom': '0.0267rem solid '+theme.couponColor,'color':theme.couponColor}:''" @click="ShowTab(item.tabKey)">
            {{item.name}}
            <img v-if="!index" class="grab" src="../../../../assets/img/get.png" alt="">
          </span>
        </p>
      </div>
    </div>
    <div ref="line" class="line"></div>
    <div v-show="show.todaymore && todayList.length != 0" class="today_box query_titile query_main_div" :style="{'-webkit-overflow-scrolling': todaymore.scrollMode,height: wrapperHeight + 'px'}">
      <mt-loadmore :bottom-method="LoadBottom" :auto-fill="false" :bottom-all-loaded="todaymore.allLoaded" ref="loadmore" @top-status-change="HandleTopChange" @bottom-status-change="HandleBottomChange">
        <div v-for="(item, index) in todayList" :key="index" @click.stop="SelectCoupon(item,0)" class="res_content_div pos_relative flex_align_center flex_SB">
          <div class="align_center QTC_left " :style="{'color':theme.couponColor}">
            <div>
              <span class="size36">￥</span><span class="size44">{{item.couponFeeMin}}</span>
            <p class="size28" :style="{'color':theme.couponColor}">满{{item.payFeeMin}}元可用</p>
            </div>
          </div>
          <div class="QTC_center color_333 flex1">
            <p class="size32">{{item.activityName}} </p>
            <p class="color_333 size24">{{item.beginDate|sytfilter({date:'yyyy.MM.dd'})}}-{{item.endDate|sytfilter({date:'yyyy.MM.dd'})}}</p>
          </div>
          <p class="QTC_right receive">
            <span class="bt_button size28 receive_yes" :style="{'background':theme.couponColor}" @click.stop="getCoupon(item)">立即领取</span>
          </p>
        </div>
        <div class=" align_center color_333" style="margin-bottom :0.0667rem" v-if="todaymore.allLoaded&&todayListLast">暂无更多</div>
        <div slot="top" class="mint-loadmore-top" style="text-align:center">
          <span v-show="todaymore.topStatus !== 'loading'" :class="{ 'is-rotate': todaymore.topStatus === 'drop' }"></span>
          <span class="mint-loadmore-text">{{ todaymore.topText }}</span>
        </div>
        <div slot="bottom" class="mint-loadmore-bottom">
          <span v-show="todaymore.bottomStatus !== 'loading'" :class="{ 'is-rotate': todaymore.bottomStatus === 'drop' }">{{todaymore.loadBottomText}}</span>
          <span class="mint-loadmore-text">{{ todaymore.bottomText }}</span>
        </div>
      </mt-loadmore>
    </div>
    <div v-show="show.mymore && myList.length != 0" class="my_box query_titile query_main_div" :style="{'-webkit-overflow-scrolling': mymore.scrollMode,height: wrapperHeight + 'px'}">
      <mt-loadmore :bottom-method="LoadBottom" :auto-fill="false" :bottom-all-loaded="mymore.allLoaded" ref="loadmore" @top-status-change="HandleTopChange" @bottom-status-change="HandleBottomChange">
        <div v-for="(item, index) in myList" :key="index" @click.stop="item.status == 0?SelectCoupon(item,'1'):''" class="res_content_div pos_relative flex_align_center flex_SB">
          <div class="QTC_left">
            <span class="wifiing flex_align_center flex_center">
              <img class="width100" src="../../../../assets/img/wifi.png" alt="">
            </span>
          </div>
          <div class="QTC_center color_333 flex1">
            <p class="size36">{{item.couponFee}}元{{item.couponType == couponType.FeeType?'话费':item.couponType == couponType.FlowType?'流量':''}}券</p>
            <p class="color_333 size24">{{item.effectiveDate|sytfilter({date:'yyyy.MM.dd'})}}-{{item.expireDate|sytfilter({date:'yyyy.MM.dd'})}}</p>
          </div>
          <p class="QTC_right receive">
            <span class="bt_button size28 receive_yes" :style="{'background':theme.couponColor}" v-if="item.status == UserCouponStatus.Unused" @click.stop="ReceiveSubmit(item)">去使用</span>
            <span class="bt_button size28 receive_no" :style="{'background':'#999'}" v-else>{{item.status==UserCouponStatus.Used?'已使用':item.status==UserCouponStatus.Expired?'已过期':''}}</span>
          </p>
        </div>
        <div class=" align_center color_333" style="margin-bottom :0.0667rem" v-if="mymore.allLoaded&&mymoreLast">暂无更多</div>
        <div slot="top" class="mint-loadmore-top" style="text-align:center">
          <span v-show="mymore.topStatus !== 'loading'" :class="{ 'is-rotate': mymore.topStatus === 'drop' }"></span>
          <span class="mint-loadmore-text">{{ mymore.topText }}</span>
        </div>
        <div slot="bottom" class="mint-loadmore-bottom">
          <span v-show="mymore.bottomStatus !== 'loading'" :class="{ 'is-rotate': mymore.bottomStatus === 'drop' }">{{mymore.loadBottomText}}</span>
          <span class="mint-loadmore-text">{{ mymore.bottomText }}</span>
        </div>
      </mt-loadmore>
    </div>
    <div class="nodata" v-show="(show.mymore && myList.length != 0) ?false:(show.todaymore && todayList.length != 0)?false:'NoData'" :style="{height: wrapperHeight + 'px' }">
      <div class="nodata_center">
        <i class="iconfont icon-youhuiquan2 " style="font-size: .7rem;"></i>
        <p class="size32"> 您暂无可使用的优惠券 </p>
      </div>
    </div>
    <div ref='listItemHeight' style="width: 1.3333rem;"></div>
  </div>
</template>
<script>
import * as Appsettings from '@/Appsettings'
import * as ObjectUtil from '../../../../util/ObjectUtil'
import * as LocalStorgeUtil from '../../../../util/LocalStoreUtil'
import * as WholeLocalKey from '../../../../const/WholeStoreKey'
import * as ConstEnum from '../../../../const/Enum'
import * as HwJSSDKUtil from '../../../../util/hw-util/HwJSSDK'
import * as HwUtil from '../../../../util/hw-util/HwUtil'
export default {
  data() {
    return {
      CouponCenter_table: [{ name: '今日推荐', tabKey: 'todaymore' }, { name: '我的卡券', tabKey: 'mymore' }],
      selectTable: 'todaymore',
      todayListQuery: {
        pageIndex: 1,
        pageSize: 10,
        accountNo: '',
        termId: 1,
        partnerUid: 'IBVBF3'
      },
      myListQuery: {
        pageIndex: 1,
        pageSize: 10,
        accountNo: '',
        termId: 1,
        partnerUid: 'IBVBF3'
      },
      todayList: [],
      myList: [],
      todaymore: {
        allLoaded: true,
        scrollMode: 'auto',
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
        loadBottomText: "下拉加载更多",
        total: '',
      },
      mymore: {
        allLoaded: true,
        scrollMode: 'auto',
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
        loadBottomText: "下拉加载更多",
        total: '',
      },
      wrapperHeight: 0,
      show: {
        todaymore: true,
        mymore: false
      },
      tabKey: {
        today: 'todaymore',
        my: 'mymore'
      },
      NoData: false,
      theme: {
        couponColor: '#f1682e',
        Qcolor: '#f1682e',
        selectedImg: require('../../../../assets/img/f1682e.png'),
      },
      listItemHeight: '',
      mymoreLast: false,
      todayListLast: false,
      couponType: ConstEnum.CouponType,
      UserCouponStatus:ConstEnum.UserCouponStatus
    }
  },
  beforeRouteEnter(to, from, next) {
    if (from.fullpath == "/") {
      HwJSSDKUtil.HwJSSDKRegister(Appsettings.HwJssdkAppId)
      if (!ObjectUtil.IsEmpty(LocalStorgeUtil.GetItem(WholeLocalKey.IS_EXIST_HBS)) && Number(LocalStorgeUtil.GetItem(WholeLocalKey.IS_EXIST_HBS)) == 1) {
        // HwJSSDKUtil.GetJSSDKReady(HwJSSDKUtil.GetJSSDKSignIn)
        HwJSSDKUtil.GetJSSDKSignIn()
      }
    }
    next()
  },
  created() {
    let termId = this.$route.query.termId
    let partnerUid = this.$route.query.partnerUid
    if (this.$route.query.termId) {
      this.todayListQuery["termId"] = this.$route.query.termId
    }
    if (this.$route.query.partnerUid) {
      this.todayListQuery["partnerUid"] = this.$route.query.partnerUid
    }

    if (!ObjectUtil.IsEmpty(ConstEnum.MerchentThemeColor[partnerUid]) && !ObjectUtil.IsEmpty(ConstEnum.MerchentThemeColor[partnerUid][termId])) {
      let item = ConstEnum.MerchentThemeColor[partnerUid][termId]
      if (!ObjectUtil.IsEmpty(item.couponColor))
        this.theme.couponColor = item.couponColor
      if (!ObjectUtil.IsEmpty(item.Qcolor))
        this.theme.Qcolor = item.Qcolor
    }
    this.todayListQuery.platUid = HwUtil.GetHwAppAccount()//  LocalStorgeUtil.GetItem(WholeLocalKey.PLATUID + this.todayListQuery.termId)
    this.myListQuery.platUid = HwUtil.GetHwAppAccount() // LocalStorgeUtil.GetItem(WholeLocalKey.PLATUID + this.myListQuery.termId)
    // this.todayListQuery.accountNo = LocalStorgeUtil.GetItem(WholeLocalKey.RECHARGE_ACCOUNT + this.todayListQuery.termId)
    this.LoadTop()

  },
  activated() { },
  mounted() {
    this.$nextTick(() => {
      let conditionHeight = this.$refs.topCondition.offsetHeight
      let lineHeight = this.$refs.line.offsetHeight
      this.wrapperHeight = document.documentElement.clientHeight - conditionHeight - lineHeight;
    })
    this.listItemHeight = this.$refs.listItemHeight.offsetWidth
  },
  computed: {},
  watch: {
    "mymore.topStatus"(val) {
      switch (val) {
        case 'pull':
          this.mymore.topText = this.mymore.topPullText;
          break;
        case 'drop':
          this.mymore.topText = this.mymore.topDropText;
          break;
        case 'loading':
          this.mymore.topText = this.mymore.topLoadingText;
          break;
      }
    },
    "mymore.bottomStatus"(val) {
      switch (val) {
        case 'pull':
          this.mymore.bottomText = this.mymore.bottomPullText;
          break;
        case 'drop':
          this.mymore.bottomText = this.mymore.bottomDropText;
          break;
        case 'loading':
          this.mymore.bottomText = this.mymore.bottomLoadingText;
          break;
      }
    },
    "todaymore.topStatus"(val) {
      switch (val) {
        case 'pull':
          this.todaymore.topText = this.todaymore.topPullText;
          break;
        case 'drop':
          this.todaymore.topText = this.todaymore.topDropText;
          break;
        case 'loading':
          this.todaymore.topText = this.todaymore.topLoadingText;
          break;
      }
    },
    "todaymore.bottomStatus"(val) {
      switch (val) {
        case 'pull':
          this.todaymore.bottomText = this.todaymore.bottomPullText;
          break;
        case 'drop':
          this.todaymore.bottomText = this.todaymore.bottomDropText;
          break;
        case 'loading':
          this.todaymore.bottomText = this.todaymore.bottomLoadingText;
          break;
      }
    }
  },
  methods: {
    ShowTab(tab) {
      this.selectTable = tab
      this.CloseOtherTab(tab)
      this.LoadTop()
    },
    CloseOtherTab(data) {
      for (let key in this.show) {
        this.show[key] = false
      }
      this.show[data] = true
    },
    SelectCoupon(item, val) {
      item['Coupon'] = 0
      item['Type'] = val
      localStorage.removeItem(WholeLocalKey.COUPON)
      localStorage.setItem(WholeLocalKey.COUPON, JSON.stringify(item));
      this.$router.push({ name: "GetCouponResult", query: { termId: this.todayListQuery.termId, partnerUid: this.todayListQuery.partnerUid } })
    },
    ReceiveSubmit(item) {
      this.$router.push({ name: "HwApp" })
    },
    HandleTopChange(status) {
      // this.todaymore.scrollMode = status
      this[this.selectTable].topStatus = status
    },
    HandleBottomChange(status) {
      this[this.selectTable].bottomStatus = status
      // this.todaymore.bottomStatus = status
    },
    LoadTop() {
      this.HandleTopChange('loading')
      if (this.selectTable == this.tabKey.today) {
        this.todayListQuery.pageIndex = 1
        this.todaymore.allLoaded = false//下拉刷新时解除上拉加载的禁用
        this.getTodayCouponList()
      } else {
        this.myListQuery.pageIndex = 1
        this.mymore.allLoaded = false//下拉刷新时解除上拉加载的禁用
        this.getMyCouponList()
      }
    },
    LoadBottom() {
      this.HandleBottomChange('loading')
      if (this.selectTable == this.tabKey.today && !this.todaymore.allLoaded) {
        this.todayListQuery.pageIndex = this.todayListQuery.pageIndex + 1
        this.getTodayCouponList(1)
      } else if (this.selectTable == this.tabKey.my && !this.mymore.allLoaded) {
        this.myListQuery.pageIndex = this.myListQuery.pageIndex + 1
        this.getMyCouponList(1)
      } else {
        // this.$toast({message: "已经到达最后一页了", duration: 2000})
      }
    },
    async getCoupon(item) {
      this.$indicator.open({
        spinnerType: "fading-circle"
      })
      let data = {
        termId: this.todayListQuery.termId,
        platUid: this.todayListQuery.platUid,
        activityId: item.activityId,
      }
      const res = await this.$post(Appsettings.ApiUrl.ReceiveCoupon, data)
      this.$indicator.close()
      if (res.code == 100) {
        // this.$toast({ message: '领取成功', duration: 2000 });
        item['Coupon'] = 1
        item['Type'] = 1
        localStorage.removeItem(WholeLocalKey.COUPON)
        localStorage.setItem(WholeLocalKey.COUPON, JSON.stringify(item));
        this.$router.push({ name: "GetCouponResult", query: { termId: this.todayListQuery.termId, partnerUid: this.todayListQuery.partnerUid } })
      } else {
        this.$toast({ message: res.message, duration: 2000 });
      }
    },
    async getTodayCouponList(flag) {
      this.$indicator.open({
        spinnerType: "fading-circle"
      })
      const res = await this.$get(Appsettings.ApiUrl.GetTodayCouponList, this.todayListQuery)
      this.$indicator.close()
      this.$refs.loadmore.onTopLoaded();
      if (flag) {
        this.HandleBottomChange('loadingEnd')
        this.$refs.loadmore.onBottomLoaded()
      }
      if (res.code == 100) {
        this.todaymore.total = res.data.total
        if (res.data.list && res.data.list.length > 0) {
          if (this.todayListQuery.pageIndex == 1) {
            this.todayList = res.data.list
          } else {
            this.todayList = this.todayList.concat(res.data.list)
          }
          if (this.todayList.length >= this.todaymore.total) {
            this.todaymore.allLoaded = true
            this.todaymore.loadBottomText = "已到最后一页"
            this.todaymore.bottomStatus = 'loading'
          } else {
            this.todaymore.allLoaded = false
            this.todaymore.loadBottomText = "下拉加载更多"
            this.todaymore.bottomStatus = 'loading'
          }
          let height = this.todayList.length * this.listItemHeight
          if (height > this.wrapperHeight)
            this.todayListLast = true
          else
            this.todayListLast = false
        } else {
          this.NoData = true
        }
      }
    },
    async getMyCouponList(flag) {
      this.$indicator.open({
        spinnerType: 'fading-circle'
      })
      const res = await this.$get(Appsettings.ApiUrl.GetMyCouponList, this.myListQuery)
      this.$indicator.close()
      this.$refs.loadmore.onTopLoaded();
      if (flag) {
        this.HandleBottomChange('loadingEnd')
        this.$refs.loadmore.onBottomLoaded()
      }
      if (res.code == 100) {
        this.mymore.total = res.data.total
        if (res.data.list && res.data.list.length > 0) {
          if (this.myListQuery.pageIndex == 1) {
            this.myList = [];
            this.myList = res.data.list
          } else {
            this.myList = this.myList.concat(res.data.list)
          }
          if (this.myList.length >= res.data.total) {
            this.mymore.allLoaded = true
            this.mymore.loadBottomText = "已到最后一页"
          } else {
            this.mymore.allLoaded = false
            this.mymore.loadBottomText = "下拉加载更多"
          }
          let height = this.myList.length * this.listItemHeight
          if (height > this.wrapperHeight)
            this.mymoreLast = true
          else
            this.mymoreLast = false
        } else {
          this.NoData = true
        }
      }
    }
  }
}
</script>
<style scoped> 
.query_condition_div {
  position: relative;
  background: #fff;
}
.CouponCenter_title {
  color: #fff;
  /*50 */
  line-height: 1rem;
  text-align: center;
  font-size: .36rem;
}
.CouponCenter_table p {
  width: 50%;
  text-align: center;
  background: #fff;
  font-size: 0;
}
.CouponCenter_table span {
  display: inline-block;
  height: 1rem;
  padding: 0 .24rem;
  font-size: .34rem;
  line-height: 1rem;
}
.grab {
  position: absolute;
  width: 0.5rem;
  top: 0.03rem;
  right: -0.05rem;
} 
.QTC_left {
  width: 25%;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
}
.my_box .QTC_left img {
  width: .9rem;
}
.QTC_center {
  width:48%;
}
.QTC_right {
  width: 27%;
  padding: .24rem;
  text-align: center; 
}
.bt_button {
  width: 100%;
  font-size: .26rem;
  padding: .12rem 0;
  color: #fff;  
  border-radius: 0.3333rem;
  display: inline-block; 
}
.res_content_div {
  height: 1.8rem;
  margin-bottom: 0.15rem; 
  background-size: 100% 100%;
  box-sizing: border-box;
  background: url(../../../../assets/img/card.png) 0 0/100% 100% no-repeat;
} 

.query_main_div {
  -webkit-overflow-scrolling: touch;
  overflow: auto;
  padding: 0.24rem 0.15rem 0;
  background: #eee;
}

.nodata {
  width: 100%;
  height: 100vh;
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
.nodata_center p {
  padding-top: .3rem;
}
.par_coupon {
  width: 0.6rem;
  height: 0.45rem;
  line-height: 0.8rem;
  overflow: hidden;
  position: relative;
  display: inline-block;
}
.children_coupon {
  background: url("../../../../assets/img/wifi.png") no-repeat;
  width: 100%;
  height: 100%;
  display: inline-block;
  background-size: 100%;
  filter: drop-shadow(0.6rem 0 #108ee9);
  position: relative;
  left: -0.6rem;
}
.my_box .QTC_left span.wifiing{
  width: 1.4rem;
  height: 1.4rem;
  border: 1px solid #f8c17b;
  border-radius: 50%;
}
</style>