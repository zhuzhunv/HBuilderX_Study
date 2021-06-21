/* eslint-disable no-undef */
// import CryptoJS from 'crypto-js'
import * as ObjectUtil from './ObjectUtil'
import * as DateUtil from './DateUtil'
import { LocalStoreKey } from '../Appsettings'


let storge = localStorage

const RemoveItem = (key) => {
    storge.removeItem(CryptoJS.MD5(key))
}

const SetItem = (key, val) => {
    RemoveItem(key)
    storge.setItem(CryptoJS.MD5(key), val.length > 5 ? CryptoJS.TripleDES.encrypt(CryptoJS.enc.Utf8.parse(val), LocalStoreKey) : val)
}

const GetItem = (key) => {
    let retVal = storge.getItem(CryptoJS.MD5(key))
    return retVal && retVal.length > 5 ? CryptoJS.TripleDES.decrypt(retVal, LocalStoreKey).toString(CryptoJS.enc.Utf8) : retVal
}

const SetObject = (key, value) => {
    let val = value
    if (!ObjectUtil.IsString(val))
        val = JSON.stringify(value)
    SetItem(key, val)
}

const GetObject = (key) => {
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
    SetObject(key, value)
}

const GetObjectExpire = (key) => {
    let val = GetObject(key)
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
    SetObject,
    GetObject,
    SetObjectExpire,
    GetObjectExpire
}

