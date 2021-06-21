import inputFilter from './InputFilter'


const install = function (Vue) {
    Vue.directive('inputFilter', inputFilter) //v-input-filter:int
}

if (window.Vue) {
    window.inputFilter = inputFilter
    // eslint-disable-next-line no-undef
    Vue.use(install)
}

inputFilter.install = install
export default inputFilter