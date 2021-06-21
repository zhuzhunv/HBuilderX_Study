<template>
  <div class="feeoil fs0">
    <img class="width100" src="https://cdn.images.qianxingniwo.com/hwapp/banner.png" alt="">
    <div class="feeoil_box">
      <div class="feeoil_main">
        <h3>— 请选择产品 —</h3>
        <ul>
          <li class="pos_relative" v-for="(item,index) in list" :key="item" @click="SelectProduce(item,index)">
            <img v-if="index%2==0" class="width100" src="https://cdn.images.qianxingniwo.com/hwapp/produce1.png" alt="">
            <img v-else class="width100" src="https://cdn.images.qianxingniwo.com/hwapp/produce2.png" alt="">
            <div class="feeoil_main_content">
              <div class="FMC_top flex_align_center flex_left">
                <div>
                  <p>{{item.productTitle}}</p>
                  <p>{{item.remark}}</p>
                </div>
              </div>
              <p class="FMC_bottom flex_align_center flex_SB color_FB4742">
                <span class="size32">超值价 仅售{{item.payFee}}元</span>
                <input class="radioBox" type="radio" :checked="inputDataIndex==index?'true':''" name="radio">
              </p>
            </div>
          </li>
        </ul>
        <div class="FMC_tel_box width100">
          <div class="input flex_align_center flex_left">
            <input class="width100" type="tel" maxlength="11" v-model="rechargeTell" placeholder="请输入您充值的手机号码">
          </div>
          <p @click="SubmitBuy">立即抢购</p>
        </div>
      </div>

      <div class="pos_relative oilposition fs0" @click="GoOil">
        <img class="width100" src="https://cdn.images.qianxingniwo.com/hwapp/iolPosition.png" alt="">
        <p class="absolute_center align_right color_FB475C ">
          <span class="size34 color_FB4742">加油礼金券使用入口</span>
          <i class="icon-fenye-xiayiye1 size34 iconfont color_FB4742"></i>
        </p>
      </div>
      <div class="description color_fff">
        <h3>— 活动说明 —</h3>
        <div class="size24 description_conte" v-for="(item,index) in descriptionlist" :key='index'>
          <span class="diamond"><span></span><span class="color_FB475C size24">{{index+1}}</span></span>
          {{item}}
        </div>
      </div>
    </div>
    <!-- <div class="hw_mask" v-show="showpop">
      <img class='showpop' src="../../../../assets/img/compose/11.png" alt="">
    </div> -->
  </div>
</template>
<script>
import * as Appsettings from '@/Appsettings'
import * as Enum from '@/const/Enum'
import * as Validata from '@/util/Validata'
import * as LocalStoreUtil from '@/util/LocalStoreUtil'
import * as WholeStoreKey from '@/const/WholeStoreKey'
import * as PostProductSer from '../../../../service/PostProductService'

export default {
  data() {
    return {
      getProductData: {
        termId: "",
        productType: Enum.ProductTypeEnum.Fee,//产品类型: 1-话费 2-流量
        partnerUid: "",
        accountNo: '',
        recommendMode: '0',//推荐模式: 0-所有 1-不推荐 2-推荐
        mergeType: 4, //融合类型: 1-非融合 2-仅融合 3-全部
        rechargeMode: '' //快充慢充: 0-快充 1-次日 8-点到账慢充 3-普通慢充
      },
      rechargeTell: '',
      platUid: '',
      list: [],
      descriptionlist: [
        '话费10分钟内到账，油券兑换码将以短信方式下发至充值手机号，需兑换后使用。',
        '本产品为自动充值，无法中途拦截。请认真核对充值号码，一旦充值成功，概不提供退换服务。',
        '加油券兑换码查收：①可在【充值记录】【订单详情】中查看；②查收手机短信；③咨询我司客服热线。',
        '加油券使用入口：登录生活服务APP进入【手机充值】【在线加油】使用手机号验证登录，输入油券兑换码，激活后即可使用。',
        '该加油券仅支持四川千行在线加油页面使用；油券礼金不可一次性抵扣，具体单次优惠金额以支付页面实际显示为准。',
        '如有其他问题，请拨打我司客服热线400-811-1801。',
      ],
      showpop: false,
      inputData:'',
      inputDataIndex:0
    }
  },
  created() {
    let termId = this.$route.query.termId
    let partnerUid = this.$route.query.partnerUid
    this.getProductData.termId = termId
    this.getProductData.partnerUid = partnerUid
    this.platUid = this.$route.query.platUid
    if (LocalStoreUtil.GetItem(WholeStoreKey.RECHAGE_ACCOUNT + this.getProductData.termId)) {
      const phone = LocalStoreUtil.GetItem(WholeStoreKey.RECHAGE_ACCOUNT + this.getProductData.termId)
      this.rechargeTell = phone
    }

    this.queryProduct()
  },
  activated() { },
  mounted() { },
  watch: {
    rechargeTell(val, oval) {
      let v = val ? val.replace(/\D/g, '') : ''
      if ((v.length == 11 && !Validata.ValidTel(v))) {
        this.$toast({ message: "号码格式错误", duration: 2000 })
      }
      if (oval != val && (v.length == 11 && Validata.ValidTel(v))) {
        LocalStoreUtil.RemoveItem(WholeStoreKey.RECHAGE_ACCOUNT + this.getProductData.termId)
        LocalStoreUtil.SetItem(WholeStoreKey.RECHAGE_ACCOUNT + this.getProductData.termId, val)
        this.queryProduct()
      }
    }
  },
  computed: {},
  methods: {
    SelectProduce(item,index) {
      this.inputData = item
      this.inputDataIndex =index 
    },
    SubmitBuy() {
      if (this.inputData) {
        if (!this.platUid) {
          this.$toast({ message: "用户未登录", duration: 2000 })
          return
        }
        let data = JSON.parse(JSON.stringify(this.inputData))
        data['accountNo'] = this.rechargeTell.replace(/\D/g, '')
        data['termId'] = this.getProductData.termId
        data['partnerUid'] = this.getProductData.partnerUid
        data['platUid'] = this.platUid
        data['actualPrice'] = data.payFee
        PostProductSer.Manager18Product(data)
        this.$router.push({ name: 'Order' })
      } else {
        this.$toast({ message: "请选择产品", duration: 2000 });
      }
    },
    GoOil() {
      this.showpop = false 
      location.href = 'https://ljkh5.100100bm.com'
      // location.href = 'http://petrolrights.100bm.cn' //线下
    },
    GoDetail() {
      location.href = 'http://ljkh5.100100bm.com/about_card'
    },
    async queryProduct() {
      this.$indicator.open({ spinnerType: 'fading-circle' })
      this.getProductData['accountNo'] = this.rechargeTell
      const res = await this.$get(Appsettings.ApiUrl.GetProduct18, this.getProductData)
      this.$indicator.close()
      if (res.code == 100) {
        if (res.data && res.data.length > 0) {
          this.list = res.data
          this.inputData = res.data[0]
        }
      } else if (res.code == 900) {
        this.$toast({ message: "系统错误", duration: 2000 })
      } else {
        this.$toast({ message: res.message, duration: 2000 })
      }
    }
  }
}
</script>
<style scoped>
.feeoil {
  background: linear-gradient(right, #f94e45, #f96135);
  min-height: 100vh;
}
.feeoil_box { 
  padding: 0 0.16rem;
}
.feeoil_main {
  padding: 0.46rem 0.26rem;
  background: #fee5e5;
  box-shadow: 0px 0px 0.3rem 0px rgba(180, 25, 26, 0.75);
  border-radius: 0.2667rem;
}
.feeoil_main h3 {
  color: #fb4742;
  text-align: center;
  font-weight: bold;
  font-size: 0.38rem;
  margin-bottom: 0.3rem;
}
.feeoil_main_content {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  /*18px */
  padding: 0 0.36rem;
  box-sizing: border-box;
}
.FMC_top {
  height: 55%;
}
.FMC_top p:first-of-type {
  font-size: 0.38rem;
  color: #fff;
  margin-bottom: 0.1rem;
}
.FMC_top p:last-of-type {
  font-size: 0.24rem;
  color: #8c5033;
}
.FMC_bottom {
  height: 31%;
}
input.radioBox {
  background-image: url(../../../../assets/img/compose/noselect.png);
}
input.radioBox:checked {
  background-image: url(../../../../assets/img/compose/select.png);
}
.FMC_tel_box {
  padding-top: 0.2667rem;
  border-top: 1px solid #ffbdb9;
  padding: 0.2667rem 0 0;
  box-sizing: border-box;
}
.FMC_tel_box .input {
  width: 100%;
  height: 1rem;
  background: #fff;
  margin-bottom: 0.1467rem;
}
.FMC_tel_box input::placeholder {
  font-size: 0.36rem;
  color: #ffadad;
  text-align: center;
}
.FMC_tel_box input {
  text-align: center;
  font-size: 0.4rem;
  color: #333;
}
.FMC_tel_box p {
  line-height: 1rem;
  font-size: 0.36rem;
  color: #fee5e5;
  text-align: center;
  background: linear-gradient(90deg, #fb4943, #ff2d26);
  border-radius: 0.1rem;
}
.oilposition {
  padding: 0.3rem 0 0.44rem;
}
.oilposition p {
  padding-right: 0.32rem;
}
.description {
  padding-bottom: 0.54rem;
}
.description h3 {
  font-size: 0.38rem;
  margin-bottom: 0.44rem;
  text-align: center;
}
.description_conte {
  padding-bottom: 0.28rem;
}
.diamond {
  position: relative;
  display: inline-block;
  width: 0.23rem;
  height: 0.23rem;
  margin-right: 0.2rem;
}
.diamond span:first-of-type {
  position: absolute;
  width: 100%;
  height: 100%;
  background: #fff;
  transform: rotate(-45deg);
}
.diamond span:last-of-type {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.showpop {
  position: absolute;
  top: 0;
  right: 0;
  width: 50%;
}
</style>