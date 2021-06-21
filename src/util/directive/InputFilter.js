import * as ObjectUtil from '../ObjectUtil'
const addListener = function (el, type, fn) {
    el.addEventListener(type, fn, false)
}

const spaceFilter = function (el) {
    addListener(el, 'keyup', () => {
        el.value = el.value.replace(/\s+/, '')
    })
    // addListener(el, 'paste', () => {
    //     el.value = el.value.replace(/\s+/, '')
    // })
}

const enterFilter = function (el) {
    addListener(el, 'keyup', () => {
        el.value = ObjectUtil.InsertChar(ObjectUtil.InsertChar(el.value.replace(/\D/g, ''), 3, " "), 8, " ")

    })
}

const intFilter = function (el) {
    addListener(el, 'keyup', () => {
        el.value = el.value.replace(/\D/g, '')
    })
    // addListener(el, 'paste', () => {
    //     el.value = el.value.replace(/\D/g, '')
    // })
}

const specialFileFilter = function (el) {
    addListener(el, 'keyup', () => {
        el.value = el.value.replace(/[\\/:*?"<>|]/g, '')
    })
    // addListener(el, 'paste', () => {
    //     // eslint-disable-next-line no-useless-escape
    //     el.value = el.value.replace(/[\\/:*?"<>|]/g, '')
    // })
}

const specialFilter = function (el) {
    addListener(el, 'keyup', () => {
        // eslint-disable-next-line no-useless-escape
        el.value = el.value.replace(/[^\a-\z\A-\Z0-9\u4E00-\u9FA5]/g, '')
    })
    // addListener(el, 'paste', () => {
    //     // eslint-disable-next-line no-useless-escape
    //     el.value = el.value.replace(/[^\a-\z\A-\Z0-9\u4E00-\u9FA5]/g, '')
    // })
}

const emailSpecialFilter = function (el) {
    // eslint-disable-next-line no-useless-escape
    // let pattern = new RegExp("[^\a-\z\A-\Z0-9\u4E00-\u9FA5\@\@\.]/g")

    addListener(el, 'keyup', () => {
        // eslint-disable-next-line no-useless-escape
        el.value = el.value.replace(/[^\a-\z\A-\Z0-9\u4E00-\u9FA5\@\@\.]/g, "")
    })
    // addListener(el, 'paste', () => {
    //     // eslint-disable-next-line no-useless-escape
    //     el.value = el.value.replace(/[^\a-\z\A-\Z0-9\u4E00-\u9FA5\@\@\.]/g, "")
    // })
}

const cardFilter = function (el) {
    // eslint-disable-next-line no-useless-escape
    // let pattern = new RegExp("[^0123456789Xx]")
    addListener(el, 'keyup', () => {
        el.value = el.value.replace(/[^0123456789Xx]/g, "")
    })
    // addListener(el, 'paste', () => {
    //     el.value = el.value.replace(/[^0123456789Xx]/g, "")
    // })
}

export default {
    bind(el, binding) {
        if (el.tagName.toLowerCase() !== 'input') {
            el = el.getElementsByTagName('input')[0]
        }
        spaceFilter(el)
        switch (binding.arg) {
            case 'int':
                intFilter(el)
                break
            case 'special':
                specialFilter(el)
                break
            case 'mobile':
                enterFilter(el)
                break
            case 'emailsp':
                emailSpecialFilter(el)
                break
            case 'card':
                cardFilter(el)
                break
            case 'specialfile':
                specialFileFilter(el)
                break
            default:
                break
        }
    }
}