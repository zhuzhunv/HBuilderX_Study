/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.

import '@/assets/css/common.css';   
import App from './App'
import router from './router'

import { get, post } from './httpConfig/http' 
import waves from './util/directive/waves/WavesDirective'
import inputDirective from './util/directive/index'
// eslint-disable-next-line no-unused-vars
import sytfilter from './util/filter/Filter'
import * as font from '@/util/font'

// import Vconsole from 'vconsole'
// let vConsole = new Vconsole()
// Vue.use(vConsole)

Vue.use(inputDirective)
Vue.use(waves)

font.setRem()
window.onresize = () => { 
    font.setRem()
 }

Vue.config.productionTip = process.env.NODE_ENV == 'prod' || process.env.NODE_ENV == 'pre' ? true : false
Vue.$get = Vue.prototype.$get = get
Vue.$post = Vue.prototype.$post = post

let partnerUid = process.env.NODE_ENV == 'test' || process.env.NODE_ENV == 'development' ? 'IBVBF3' : 'aAFZfm'
router.beforeEach(async (to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title
  }

  if (to.name == 'HwApp') {
    to.params.termId = 1
    to.params.partnerUid = partnerUid
  }
  if (to.name == 'HwAppActive') {
    to.params.termId =process.env.NODE_ENV == 'test' || process.env.NODE_ENV == 'development' ? 461 : 142  
    to.params.partnerUid = partnerUid
  }
  next()
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
