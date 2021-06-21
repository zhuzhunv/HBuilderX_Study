<template>
  <div class="forward">
    <div :style="{'height':bannerDivHeight+'px'}" v-if="theme.isShowBanner">
      <mt-swipe>
        <mt-swipe-item v-for="(item, index) in bannerList" :key="index" @click="GoBannerPath(item)">
          <img ref="banner" :src='item.imageUrl' style="width:100%" />
        </mt-swipe-item>
      </mt-swipe>
    </div>
    <div>
      <div class="mobile_input">
        <mobile-input ref="mobileinput" :theme='theme' @blur="getMobielSection" @un-mobile="InitData"></mobile-input>
      </div>
      <div class="forward_box">
        <parent-product-box ref='forward' :theme='theme' :listObj="forwardProductObj" @seletedItem="SelectProduct">
          <template slot-scope="item">
            <div class="width100">
              <template v-if="item.row.productType==getProductData.productType">
                <p class="fs0">
                  <span class="fs24">{{item.row.faceFee|sytfilter({tranflow:1024})}}</span>
                  <span class="size24">
                    {{item.row.unit}}
                  </span>
                </p>
                <p class="size28">{{item.row.actualPrice}}元{{item.row.productSummary.split('br')[1]?'/'+item.row.productSummary.split('br')[1]:''}}</p>
                <p>{{item.row.productSummary.split('br')[0]}}</p>
              </template>
              <template v-else>
                <p class="fs0 color_999">
                  <span class="size36">{{item.row.face}}</span>
                  <span class="size24">
                    {{item.row.unit}}
                  </span>
                </p>
              </template>
            </div>
          </template>
        </parent-product-box>
        <div v-if="!!seletedProductItem.productDetail" class="productDetail">
          <p class="rank" v-for="(items, index) in seletedProductItem.productDetail.split('br')" :key="index">
            <span v-for="(item,ind) in items.split('：')" :key="ind">{{item}}{{ind?'':'：'}}</span>
          </p>
        </div>
        <div v-if="defaultFlowObj.productTip.length>0">
          <ul class="forward_prompt_box">
            <li class="FPT_title align_center"><span class="size40">温馨提示</span></li>
            <li class="FPT_cont" v-for="(item, index) in defaultFlowObj.productTip" :key="index">{{index+1}}. {{item}}</li>
          </ul>
        </div>
      </div>
      <div style="height:0.8rem"></div>
      <div class="flex_align_center flex_center submit_box" v-if="footerShow">
        <p class="submit_btn" :style="{'background':theme.mainColor}" @click="GoBuy">确认办理</p>
      </div>
    </div>
    <div class="hw_mask" style="background: rgba(0,0,0,.5)" v-show="computedMask"></div>
    <transition name="forwardcode">
      <div aria-hidden="true" aria-labelledby="edit" class="hw_modal" data-backdrop="static" role="dialog" tabindex="-1" v-show="show.codeShow">
        <forward-code ref="forcode" :theme='theme' @close="CloseAll" @sendCode="getSecondCode" @submitCode="checkCode" :sendMessage="sendMessage"></forward-code>
      </div>
    </transition>
    <transition name="forwardsubmit">
      <div aria-hidden="true" aria-labelledby="edit" class="hw_modal" data-backdrop="static" role="dialog" tabindex="-1" v-show="show.submitTipShow">
        <forward-submit @submit="CloseAll" :success="successful"></forward-submit>
      </div>
    </transition>
  </div>
</template>
<script>
import MobileInput from '@/components/layout/MobileInputTwo'
import ParentProductBox from '@/components/layout/ParentProductBox'
import ChildrenProductBox from '@/components/layout/ChildrenProductBox'
import ForwardCode from './modal/ForwardFlowCodeTip'
import ForwardSubmit from './modal/ForwardFlowSubmitTip'
import * as Validata from '@/util/Validata'
import * as Appsettings from '@/Appsettings'
import * as ConstEnum from '@/const/Enum'
import * as ObjectUtil from '@/util/ObjectUtil'
import * as LockUtil from '@/util/LockUtil'
import * as MonitoringSoftKeyboard from '../../../../util/MonitoringSoftKeyboard'
import * as AppVerUtil from '../../../../util/AppVerUtil'

export default {
  components: {
    MobileInput,
    ParentProductBox,
    ForwardCode,
    ForwardSubmit,
    ChildrenProductBox
  },
  data() {
    return {
      bannerList: [{ imageUrl: require('../../../../assets/img/send_flow.png') }],
      forwardProductObj: {
        list: [],
        hasChildBoolean: false,
        isSeletedBoolean: false
      },
      defaultFlowObj: {
        list: [
          { face: 4, unit: "G" },
          { face: 6, unit: "G" }
        ],
        productDetail: [],
        productTip: [],
        hasChildBoolean: false,
        isSeletedBoolean: false
      },
      getProductData: {
        termId: "",
        partnerUid: "",
        accountNo: "",
        productType: ConstEnum.ProductTypeEnum.Flow
      },
      tel: "",
      platUid: "",
      orderNo: "",
      seletedProductItem: {},

      show: {
        codeShow: false,
        submitTipShow: false
      },
      // flag: false,
      defaultProductId: "",
      successful: false,
      sendMessage: "",
      footerShow: true,
      theme: {
        mainColor: '#f1682e',
        selectedImg: require('@/assets/img/f1682e.png'),
      },
      showChildrenProductBox: false,
      chilrenListObj: [],
      bannerDivHeight: "",
      productDetail: {}
    }
  },
  created() {
    let termId = this.$route.query.termId
    let partnerUid = this.$route.query.partnerUid
    this.defaultProductId = this.$route.query.productId
    this.platUid = this.$route.query.platUid || ''

    this.getProductData.termId = termId
    this.getProductData.partnerUid = partnerUid
    if (!ObjectUtil.IsEmpty(ConstEnum.MerchentThemeColor[partnerUid]) && !ObjectUtil.IsEmpty(ConstEnum.MerchentThemeColor[partnerUid][termId])) {
      let item = ConstEnum.MerchentThemeColor[partnerUid][termId]
      this.theme.isShowBanner = item.isShowBanner
      if (!ObjectUtil.IsEmpty(item.mainColor))
        this.theme.mainColor = item.mainColor
      if (!ObjectUtil.IsEmpty(item.selectedImg))
        this.theme.selectedImg = item.selectedImg
      // if (this.theme.isShowBanner)
      // this.getBannerList()
    }

  },
  mounted() {

    let tel = this.$route.query.tel
    this.$nextTick(() => {
      if (this.$refs.banner) {
        let n = 0
        let interTime = setInterval(() => {
          if (this.bannerDivHeight > 0 || n >= 20)
            !!interTime && clearInterval(interTime)
          this.bannerDivHeight = this.$refs.banner[0].offsetHeight
          n++
        }, 20);
      }
      if (tel) {
        this.$refs.mobileinput.ChangShowTel(tel, true)
      }
    })
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
    })
  },
  activated() { },
  beforeRouteLeave(to, from, next) {
    if (this.computedMask) {
      this.CloseAll()
    } else {
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
    }
  },
  computed: {
    computedMask() {
      let flag = false
      let keys = Object.keys(this.show)
      for (let i = 0; i < keys.length; i++) {
        let item = keys[i]
        if (this.show[item]) {
          flag = true
          break
        }
      }
      return flag
    }
  },
  watch: {},
  methods: {
    InitData(tel) {
      // if (tel.indexOf('footer') >= 0) {
      //   if (tel.split('_')[1] == 'true') {
      //     this.footer = true
      //   } else {
      //     this.footer = false
      //   }
      // } else {
      this.tel = tel
      this.hasDataFlag = false
      this.seletedProductItem = {}
      this.forwardProductObj.list = this.defaultFlowObj.list
      this.forwardProductObj.productDetail = this.defaultFlowObj.productDetail
      this.forwardProductObj.hasChildBoolean = this.defaultFlowObj.hasChildBoolean
      this.forwardProductObj.isSeletedBoolean = this.defaultFlowObj.isSeletedBoolean
      this.defaultProductId = ""
      // }
    },
    GoBannerPath(item) {
      if (item.redirectUrl && Validata.ValidExternal(item.redirectUrl))
        window.location.href = item.redirectUrl
    },
    SelectProduct(item, index) {
      this.seletedProductItem = item
      if (this.seletedProductItem.productTip)
        this.defaultFlowObj.productTip = this.seletedProductItem.productTip.split('br')
      this.chilrenListObj = item.children
    },
    CloseAll() {
      Object.keys(this.show).forEach(item => {
        this.show[item] = false
      })
      this.$refs["forcode"].InitData()
    },
    // GoHandle() {
    //   if (this.seletedProductItem.productId) {
    //     this.getFirstCode()
    //   } else {
    //     this.$toast({ message: "未选择产品", duration: 2000 })
    //   }
    // },
    GoBuy(data) {
      // if (data == 12) {
      //   this.showChildrenProductBox = false
      // }
      // else {
      if (!this.seletedProductItem.productId) {
        this.$toast({ message: "未选择产品", duration: 2000 })
        return
      }
      this.getFirstCode(this.seletedProductItem.productId)
      // }
    },
    async getMobielSection(tel) {
      this.tel = tel.replace(/\D/g, '')
      // LocalStoreUtil.SetItem(WholeStoreKey.RECHAGE_ACCOUNT + this.getProductData.termId, this.tel)
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
        // this.$refs.mobileinput.SetTel(this.tel + tip)
        this.queryProduct(this.tel)
      } else {
        this.$indicator.close()
        this.$toast({
          message: "不支持的号码",
          duration: 2000
        })
      }
    },
    async queryProduct(tel) {
      this.getProductData.accountNo = tel
      const res = await this.$get(Appsettings.ApiUrl.GetProduct, this.getProductData)
      this.$indicator.close()
      if (res.code == 100) {
        if (res.data && res.data.length > 0) {
          this.hasDataFlag = false
          this.forwardProductObj.list = res.data  //ProductSer.forwardFlowList(res.data, 1024)
          this.forwardProductObj.isSeletedBoolean = true
          this.forwardProductObj.hasChildBoolean = true
          if (this.defaultProductId) {
            this.forwardProductObj.list.forEach((item, index) => {
              if (item.productId == this.defaultProductId) {
                this.$refs.forward.SeletedItem(item, index)
              }
            })
          } else {
            this.$refs.forward.SeletedItem(this.forwardProductObj.list[0], 0)
          }
        } else {
          this.hasDataFlag = true
        }
      } else {
        this.$toast({ message: res.message, duration: 2000 })
      }
    },
    async getFirstCode(productId) {
      this.$indicator.open({
        spinnerType: 'fading-circle'
      })
      let data = {
        termId: this.getProductData.termId,
        productId: productId,
        mobile: this.tel,
        shareUid: '',
        sign: ''
      }
      let obj = data
      for (let key in obj) {
        if (obj.hasOwnProperty(key) && (obj[key] == null || obj[key] == undefined || obj[key] == "")) {
          delete obj[key];
        }
      }
      data = LockUtil.LockMd5Java(obj, "termId", "", false)
      const res = await this.$post(Appsettings.ApiUrl.PostSubmitForwardFlow, data)
      this.$indicator.close()
      this.sendMessage = "验证码已下发至" + this.tel.substr(0, 3) + " **** " + this.tel.substr(-4, 4);
      if (res.code == 100) {
        this.$refs["forcode"].CountDown()
        this.show.codeShow = true
        this.orderNo = res.data.orderNo
      } else {
        this.$toast({ message: res.message, duration: 2000 })
      }
    },
    async getSecondCode(tel) {
      this.$indicator.open({
        spinnerType: 'fading-circle'
      })
      let data = {
        termId: this.getProductData.termId,
        orderNo: this.orderNo,
        sign: ''
      }
      let obj = data
      for (let key in obj) {
        if (obj.hasOwnProperty(key) && (obj[key] == null || obj[key] == undefined || obj[key] == "")) {
          delete obj[key];
        }
      }
      data = LockUtil.LockMd5Java(obj, "termId", "", false)
      const res = await this.$post(Appsettings.ApiUrl.GetSecondeCode, data)
      this.$indicator.close()
      if (res.code == 100) {
        this.$toast({ message: res.message, duration: 2000 })
        this.$refs["forcode"].CountDown()
      } else {
        this.$toast({ message: res.message, duration: 2000 })
      }
    },
    async checkCode(code) {
      this.$indicator.open({
        spinnerType: 'fading-circle'
      })
      let data = { termId: this.getProductData.termId, orderNo: this.orderNo, vcode: code, platUid: this.platUid || this.tel.replace(/\D/g, ''), sign: '' }
      let obj = data
      for (let key in obj) {
        if (obj.hasOwnProperty(key) && (obj[key] == null || obj[key] == undefined || obj[key] == "")) {
          delete obj[key];
        }
      }
      data = LockUtil.LockMd5Java(obj, "termId", "", false)
      const res = await this.$post(Appsettings.ApiUrl.PostSubmitCode, data)
      this.$indicator.close()
      if (res.code == 100) {
        this.CloseAll()
        setTimeout(() => {
          this.successful = res.message
          this.show.submitTipShow = true
        }, 200)
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
<style scoped>
.mobile_input {
  border-bottom: 0.12rem solid #f5f5f5;
  padding: 0.158rem 0.28rem;
}
.forward_box {
  padding-top: .3rem;
}
.productDetail {
  padding-top: 0.0777rem;
}
.rank {
  padding: 0 .3rem;
  margin-bottom: .3rem;
}
.rank span {
  font-size: 0.1867rem;
  color: #888;
}
.rank span:last-of-type {
  color: #333;
}
.forward_prompt_box {
  padding: 0 .3rem;
  color: #888;
}
.FPT_title {
  /* line-height: 0.6rem; */
  display: flex;
  justify-content: left;
  align-items: flex-end;
  margin-bottom: .3rem;
}
.FPT_title span {
  margin: 0 0.06rem;
}
.FPT_title::after,
.FPT_title::before {
  content: "";
  display: block;
  border: 1px solid #ccc;
  flex: 1;
}
.FPT_cont {
  line-height: 0.35rem;
  font-size: 0.16rem;
}
.submit_box {
  position: fixed;
  bottom: 0;
  width: 100%;
  z-index: 10;
  padding: 0px .3rem .3rem;
  box-sizing: border-box;
}
.submit_btn {
  width: 100%;
  height: 0.6rem;
  line-height: 0.6rem;
  text-align: center;
  color: #fff;
  border-radius: 0.6667rem;
  background: #e3b03b;
  /**20px */
  font-size: 0.2667rem;
}
.forward >>> .qx_com_parent_item {
  width: calc((100% - 0.4rem) / 2);
  margin-right: 0.4rem;
}
.forward >>> .qx_parent_box .qx_com_parent_item:nth-of-type(2n) {
  margin-right: 0;
}
</style>
