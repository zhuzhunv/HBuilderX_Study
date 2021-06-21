<template>
  <div class="Coupon" v-show="showCoupon" @click.stop="clear">
    <div class="CouponList">
      <h1 class="align_center size38">选择优惠券</h1>
      <div ref="main" class="query_titile query_main_div" :style="{'-webkit-overflow-scrolling': scrollMode,height: 'calc(100% -  0.5333rem)'}">
        <!-- :top-method="LoadTop" @top-status-change="HandleTopChange"  -->
        <mt-loadmore :bottom-method="LoadBottom" :auto-fill="false" ref="loadmore" @bottom-status-change="HandleBottomChange" :bottom-all-loaded='allLoaded'>
          <div v-for="(item, index) in CouponList" class="boderli pos_relative " :key="index" @click.prevent="SelectCoupon(item)">
            <img ref="ItemHeight" class="width100" src="../../../../../assets/img/card.png" alt="">
            <div class="flex_align_center flex_SB boderli_con">
              <div class="align_center QTC_left" :style="{'color':theme.mainColor}">
                <span class="size50">￥</span><span class="size48">{{item.couponFee}}</span>
              </div>
              <div class="QTC_right receive">
                <p class="size36 color_333">{{item.couponFee}}元{{item.couponType == couponType.FeeType?'话费':item.couponType == couponType.FlowType?'流量':''}}抵用券</p>
                <p class="size38 color_999">{{item.effectiveDate|sytfilter({date:'yyyy.MM.dd'})}}-{{item.expireDate|sytfilter({date:'yyyy.MM.dd'})}}</p>
              </div>
            </div>
          </div>
          <div class="align_center color_333" v-if="allLoaded&&ShowLast">暂无更多</div>
          <div slot="top" class="mint-loadmore-top" style="text-align:center">
            <span v-show="topStatus !== 'loading'" :class="{ 'is-rotate': topStatus === 'drop' }"></span>
            <span class="mint-loadmore-text">{{ topText }}</span>
          </div>
          <div slot="bottom" class="mint-loadmore-bottom">
            <span v-show="bottomStatus !== 'loading'" :class="{ 'is-rotate': bottomStatus === 'drop' }"></span>
            <span class="mint-loadmore-text">{{ bottomText }}</span>
          </div>
        </mt-loadmore>
      </div>
    </div>
  </div>
</template>
<script>
import * as Appsettings from "@/Appsettings";
import * as ComEnum from '../../../../../const/Enum'
export default {
  props: {
    common: Object,
    info: Object,
    theme: Object
  },
  data() {
    return {
      showCoupon: false,
      pageIndex: 1,
      pageSize: 10,
      CouponList: [],
      total: '',
      firstQuery: true,
      allLoaded: true,
      scrollMode: 'auto',
      haveMore: true,
      topStatus: '',
      bottomStatus: '',//底部上拉加载状态
      topText: '',
      topPullText: '↓下拉刷新',
      topDropText: '释放更新',
      topLoadingText: '加载中...',
      bottomText: '',
      bottomPullText: '↑上拉刷新',
      bottomDropText: '释放更新',
      bottomLoadingText: '加载中...',
      wrapperHeight: 0,
      ShowLast: false,
      couponType: ComEnum.CouponType
    }
  },
  created() { },
  mounted() { },
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
  methods: {
    HandleTopChange(status) {
      this.topStatus = status
    },
    HandleBottomChange(status) {
      this.bottomStatus = status
    },
    LoadTop() {
      this.HandleTopChange('loading')
      this.pageIndex = 1
      this.allLoaded = false//下拉刷新时解除上拉加载的禁用
      this.getUsableCoupon()
    },
    LoadBottom() {
      if (!this.allLoaded) {
        this.HandleBottomChange('loading')
        this.pageIndex = this.pageIndex + 1
        this.getUsableCoupon(1)
      } else {
        this.$toast({
          message: "已经到达最后一页了", duration: 2000
        })
      }
    },
    async getUsableCoupon(d) {
      this.$indicator.open({ spinnerType: "fading-circle" })
      let data = {
        termId: this.common.termId,
        platUid: this.info.platUid,
        pageSize: this.pageSize,
        pageIndex: this.pageIndex,
        esProductNo: this.info.productId || this.info.productID
      }
      const res = await this.$get(Appsettings.ApiUrl.UsableCoupon, data)
      this.$indicator.close()
      if (d) {
        this.$refs.loadmore.onTopLoaded();
        this.HandleBottomChange('loadingEnd')
        this.$refs.loadmore.onBottomLoaded()
      }
      this.firstQuery = false
      if (res.code == 100) {
        this.total = res.data.total
        this.$emit('Coupon', this.total)
        let list = []
        if (res.data.list && res.data.list.length > 0) {
          list = res.data.list
        }
        if (this.pageIndex == 1) {
          this.CouponList = list
        } else {
          this.CouponList = this.CouponList.concat(list)
        }
        if (this.CouponList.length >= res.data.total) {
          this.allLoaded = true
          this.loadBottomText = "已到最后一页"
        } else {
          this.allLoaded = false
          this.loadBottomText = "下拉加载更多"
        }
        if (this.showCoupon && this.CouponList.length) {
          let height = this.$refs.ItemHeight[0].offsetHeight * this.CouponList.length
          let max = this.$refs.main.offsetHeight
          if (height > max)
            this.ShowLast = true
          else
            this.ShowLast = false
        }
      }else if(res.code == 900){
        this.$toast({ message: '系统异常', duration: 2000 });
      }  
    },
    SelectCoupon(item) {
      this.$emit('seletedItem', item)
    },
    Show(val) {
      this.showCoupon = val
    },
    clear() {
      this.Show(false)
    }
  }
};
</script>
<style scoped>
.Coupon {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 120;
}
.CouponList {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 50%;
  transition: 0.2s;
  box-sizing: border-box;
  background-color: #eee;
}
.CouponList h1 {
  line-height: 0.5333rem;
  background: #fff;
}
.query_main_div {
  overflow: auto;
  background-color: #eee;
  padding-bottom: 0.1rem;
  padding-top: .3rem;
  box-sizing: border-box;
}
.boderli {
  border-radius: 6px;
  margin-bottom: 0.1rem;
}
.boderli img {
  transform: rotate(180deg);
}
.boderli_con {
  box-sizing: border-box;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
.QTC_left {
  width: 1.1733rem;
  /* color: #108ee9; */
}
.QTC_right {
  flex: 1;
  text-align: center;
}
.butom {
  width: 100%;
  height: 0.6rem;
  line-height: 0.6rem;
  font-size: .36rem;
  color: #fff;
  box-sizing: border-box;
  border-radius: 0.08rem;
  background: #f1682e;
}
</style>
