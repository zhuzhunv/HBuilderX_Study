import * as LocalStoreUtil from '../LocalStoreUtil'
import * as WholeStoreKey from '../../const/WholeStoreKey'
import * as ObjectUtil from '../ObjectUtil'
const GetHwAppAccount = () => {
    if (process.env.NODE_ENV == 'development' ) {//||process.env.NODE_ENV == 'test'
        return "test"
    }
    if (!ObjectUtil.IsEmpty(LocalStoreUtil.GetItem(WholeStoreKey.HW_JSSDK_OPENID))) {
        return LocalStoreUtil.GetItem(WholeStoreKey.HW_JSSDK_OPENID)
    }

    try {
        let result = window.lives.getAccount("huawei"); //获取账户信息
        if (result != 3) {
            result = JSON.parse(result);
            return result.account; //返回登录的账号
        } else {
            return null;
        }
    } catch (e) {
        return null
    }
}

const PushHwPayState = () => {
    try {
        if (window.lives) {
            window.lives.mineStateChange("qianxing");
        }
        // eslint-disable-next-line no-empty
    } catch (e) { }
}
//判断是否存在微信APP
const IsExitWxHwApp = () => {
    try {
        let res = !window.lives ? true : window.lives.getAppExists("com.tencent.mm");
        return res;
    } catch (e) {
        return true;
    }
} 
//判断是否存在手机QQ
const IsExitQQHwApp = () => {
    try {
        let res = !window.lives ? true : window.lives.getAppExists("com.tencent.mobileqq");
        return res;
    } catch (e) {
        return false;
    }
}

export {
    GetHwAppAccount,
    PushHwPayState,
    IsExitWxHwApp,
    IsExitQQHwApp
}