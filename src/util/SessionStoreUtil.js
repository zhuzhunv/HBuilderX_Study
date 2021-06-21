/* eslint-disable no-undef */
// import CryptoJS from 'crypto-js'
import * as ObjectUtil from './ObjectUtil'
import * as DateUtil from './DateUtil'
import { LocalStoreKey } from '../Appsettings'


let storge = sessionStorage

const RemoveItem = (key) => { storge.removeItem(CryptoJS.MD5(key)) }
const SetItem = (key, val) => { storge.setItem(CryptoJS.MD5(key), val.length > 5 ? CryptoJS.TripleDES.encrypt(CryptoJS.enc.Utf8.parse(val), LocalStoreKey) : val) }

const GetItem = (key) => {
    let retVal = storge.getItem(CryptoJS.MD5(key))
    return retVal && retVal.length > 5 ? CryptoJS.TripleDES.decrypt(retVal, LocalStoreKey).toString(CryptoJS.enc.Utf8) : retVal
}

const SetObjcet = (key, value) => {
    let val = value
    if (!ObjectUtil.IsString(val))
        val = JSON.stringify(value)
    SetItem(key, val)
}

const GetObjcet = (key, value) => {
    let val = GetItem(key)
    try {
        return JSON.parse(val)
    } catch (e) {
        return val
    }
}

const SetObjectExpire = (key, val, expire) => {
    let time = expire ? Date.parse(DateUtil.AddMilliseconds(new Date(), expire)) : Date.parse(DateUtil.AddMilliseconds(new Date(), 365 * 60 * 60 * 24))
    let value = { expire: time, val: val }
    SetObjcet(key, value)
}

const GetObjectExpire = (key) => {
    let val = GetObjcet(key)
    if (val && val.expire) {
        if (val.expire >= Date.parse(new Date()))
            return val.val
        else
            return null
    } else {
        return val
    }
}

export {
    RemoveItem,
    SetItem,
    GetItem,
    SetObjcet,
    GetObjcet,
    SetObjectExpire,
    GetObjectExpire
}

