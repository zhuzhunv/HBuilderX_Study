/* eslint-disable no-undef */
// import CryptoJS from 'crypto-js';
import { IsEmpty } from './ObjectUtil'

const chekcData = (key, str) => {
    let flag = false;
    let strArr = str.split(',');
    for (let i = 0; i < strArr.length; i++) {
        if (key == strArr[i]) {
            flag = true;
            break;
        }
    }
    return flag;
}

/**
 * 
 * @param {*} data 参数
 * @param {*} keyStr 加密key的键字符串
 * @param {*} notStr 不包含
 * @param {*} isNeedEmpty 为空的字符是否进行加密
 */

const LockMd5Java = (data, keyStr, notStr, isNeedEmpty) => {
    let org = AcsAcsJava(data, notStr || "", isNeedEmpty);
    let key = GetKeyJava(data, keyStr)
    // console.log(org)
    // console.log(key)
    // console.log(CryptoJS.MD5(key).toString())
    org = org + CryptoJS.MD5(key).toString()
    data["sign"] = CryptoJS.MD5(org).toString();
    return data;
}

const AcsAcsJava = (data, notStr, isNeedEmpty) => {
    let str = "";
    let orgKey = [];
    for (const key in data) {
        if (!chekcData(key, notStr)) {
            orgKey.push(key);
        }
    }
    let sortKey = orgKey.sort();
    for (let i in sortKey) {
        if (isNeedEmpty || !IsEmpty(data[sortKey[i]]))
            str += sortKey[i] + "=" + data[sortKey[i]] + "&"
    }
    return str.substring(0, str.length - 1);
}

const GetKeyJava = (data, KeyStr) => {
    let str = ""
    let KeyArray = KeyStr.split(',')
    for (let i = 0; i < KeyArray.length; i++) {
        str += data[KeyArray[i]]
    }
    return str
}

export {
    LockMd5Java,
}