/* eslint-disable no-undef */
/**
 * 
 * @param {appId} appId 
 * @param {需要注册的方法数组} methodArray 
 */

import * as LocalStoreUtil from '../LocalStoreUtil'
import * as WholeStoreKey from '../../const/WholeStoreKey'

const HwJSSDKRegister = (appId, methodArray) => { 
    try {
        if (hbs.isSupport()) {
            hbs.config({
                //必填，华为开发者联盟上申请的H5应用的appId
                // appId: "102321379",//正式
                appId: appId,//|| "101104227", //"300156268",//测试
                //必填，申请使用的接口列表，此处固定填写signIn
                jsApiList: methodArray || ["signIn"]
            })
            LocalStoreUtil.SetItem(WholeStoreKey.IS_EXIST_HBS, 1)
        } else {
            LocalStoreUtil.SetItem(WholeStoreKey.IS_EXIST_HBS, 0)
        }
    } catch (e) {
        LocalStoreUtil.SetItem(WholeStoreKey.IS_EXIST_HBS, 0)
    }
}

// const GetJSSDKReady = (readyMethod) => { 
//     hbs.ready(readyMethod()) 
//     hbs.error((res) => {
//         // eslint-disable-next-line no-unused-vars
//         let msg = "res.code=" + res.code + ",message:" + res.message 
//         switch (res.code) {
//             case 10:
//                 msg = "URL不在华为开发联盟上配置的安全URL范围内"
//                 break
//             case 11:
//                 msg = "网络异常"
//                 break
//             case 12:
//                 msg = "无网络"
//                 break
//             case 13:
//                 msg = "参数错误:"
//                 break
//             case 14:
//                 msg = res.message
//                 break
//             case 15:
//                 msg = "在其他环境中,hbs对象提供的相关接口均不可调用"
//                 break
//             case 9999:
//                 msg = "其他错误:" + res.message
//                 break
//             default:
//                 break
//         }
//     })
// }

// const GetJSSDKSignIn = () => {
//     LocalStoreUtil.RemoveItem(WholeStoreKey.HW_JSSDK_OPENID)
//     LocalStoreUtil.RemoveItem(WholeStoreKey.HW_JSSDK_ACCESS_TOKEN)
//     let param = {
//         "scope": "https://www.huawei.com/auth/account/base.profile"
//     }
//     hbs.signIn(param, (res) => {
//         let openId = res.openId
//         let accessToken = res.accessToken
//         LocalStoreUtil.SetItem(WholeStoreKey.HW_JSSDK_OPENID, openId)
//         LocalStoreUtil.SetItem(WholeStoreKey.HW_JSSDK_ACCESS_TOKEN, accessToken)
//     }, (err) => {
//         // eslint-disable-next-line no-unused-vars
//         let msg = "err.code:" + err.code + ',message:' + err.message
//         switch (err.code) {
//             case 10:
//                 msg = "接口未鉴权,未通过config"
//                 break
//             case 12:
//                 msg = "接口不存在:signIn"
//                 break
//             case 13:
//                 msg = "参数格式错误:" + JSON.stringify(param)
//                 break
//             case 9999:
//                 msg = "其他错误:" + error.message
//                 break
//             default:
//                 break
//         }
//     })
// }

const GetJSSDKSignIn = (callbackFun) => {
    LocalStoreUtil.RemoveItem(WholeStoreKey.HW_JSSDK_OPENID)
    LocalStoreUtil.RemoveItem(WholeStoreKey.HW_JSSDK_ACCESS_TOKEN)
    let param = {
        "scope": "https://www.huawei.com/auth/account/base.profile"
    }
    hbs.ready(function () {
        //config成功的回调处理。
        hbs.signIn(param, function (res) {
            let openId = res.openId;
            let at = res.accessToken; 
            LocalStoreUtil.SetItem(WholeStoreKey.HW_JSSDK_OPENID, openId)
            LocalStoreUtil.SetItem(WholeStoreKey.HW_JSSDK_ACCESS_TOKEN, at)
            if (callbackFun)
                callbackFun()
        }, function (error) {
            // eslint-disable-next-line no-unused-vars
            let msg = "" 
            switch (error.code) {
                case 10:
                    msg = "接口未鉴权,未通过config"
                    break
                case 12:
                    msg = "接口不存在:" + "signIn"
                    break
                case 13:
                    msg = "参数格式错误:" + JSON.stringify(param)
                    break
                case 9999:
                    msg = "其他错误:" + error.message
                    break
                default:
                    msg = "error.code:" + error.code + ',message:' + error.message
                    break;
            }
            // myalert.addAlert({ message: msg, icon: "none", duration: 2000 })
        });
    });

    hbs.error(function (res) {
        //config失败会调用error,失败原因在参数res中。可通过res.code 获取失败错误码， res.message 获取失败描述
        // eslint-disable-next-line no-unused-vars
        let msg = "系统错误" 
        switch (res.code) {
            case 10:
                msg = "URL不在华为开发联盟上配置的安全URL范围内"
                break
            case 11:
                msg = "网络异常"
                break
            case 12:
                msg = "无网络"
                break
            case 13:
                msg = "参数错误:" + JSON.stringify(param)
                break
            case 14:
                msg = res.message
                break
            case 15:
                msg = "在其他环境中,hbs对象提供的相关接口均不可调用"
                break
            case 9999:
                msg = "其他错误:" + res.message
                break
            default:
                msg = "res.code=" + res.code + ",message:" + res.message
                break
        }

    });
}

export {
    HwJSSDKRegister,
    // GetJSSDKReady,
    GetJSSDKSignIn,
}