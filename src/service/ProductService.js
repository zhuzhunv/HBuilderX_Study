import * as ComEnum from '../const/Enum'

const FeeManager = (list, defaultValue) => {
    let obj = {}
    list.forEach(it => {
        let key = it.face,
            unit = '元', remark = ''
        if (it.businessType == ComEnum.BusinessTypeEnum.Vp) {
            key = '语音包'; unit = ''; remark = ''
        }
        // if (it.face=='100') {
        //     key = '语音包'; unit = '';remark=''
        // }

        //特惠话费-慢充产品
        // if (it.rechargeMode != '0') {
        //     key = '特惠话费'; unit = ''; remark = '最高省15元'
        // }
        if (Object.keys(obj).indexOf(key + "") < 0) {
            obj[key] = {
                name: key + unit,
                key: key,
                unit: unit,
                productType: ComEnum.ProductTypeEnum.Fee,
                actualPrice: it.payFee,
                isRecommend: it.activity,
                hasActivity: it.showPromote,
                remark: remark,
                defaultSeleted: false, children: []
            }
        }

        //是否推荐 isRecommend 2代表推荐 1代表不推荐
        if (obj[key].isRecommend != ComEnum.Activity18.Yes && it.activity == ComEnum.Activity18.Yes) {
            obj[key].isRecommend = it.activity
        }

        //是否有活动 hasActivity 0代表存在活动 1代表没有活动
        if (obj[key].hasActivity != ComEnum.ShowPromote18.Yes && it.showPromote == ComEnum.ShowPromote18.Yes) {
            obj[key].hasActivity = it.showPromote
        }

        //最小支付价格
        if (it.payFee < obj[key].actualPrice) {
            obj[key].actualPrice = it.payFee
        }

        //默认选中面值
        if (!obj[key].defaultSeleted && it.face == defaultValue) {
            obj[key].defaultSeleted = true
        }
        obj[key].children.push(it)
    });

    let arry = new Array()
    let flag = true
    Object.keys(obj).forEach(ele => {
        if (obj[ele].defaultSeleted)
            flag = false
        arry.push(obj[ele])
    })

    if (flag)
        arry[0].defaultSeleted = true
    arry.forEach((item, index) => {
        if (item.key == '特惠话费') {
            arry.splice(index, 1)
            arry.splice(5, 0, item);
        }
    })
    return arry
}
const FastFlowManager = (list, defaultValue) => {
    let obj = {}
    let defaultKey = ""
    let initPrice = 0
    list.forEach(it => {
        let key
        if (it.flowType == '2') {// 流量类型:1-直充,2-个性 
            key = '更多流量'
        } else {
            key = parseInt(it.face / 1024) ? parseInt(it.face / 1024) : it.face
        }
        let unit = parseInt(it.face / 1024) ? 'G' : 'M'
        if (Object.keys(obj).indexOf(key + "") < 0) {
            obj[key] = {
                name: key == '更多流量' ? '更多流量' : key + unit,
                key: key,
                unit: key == '更多流量' ? '多类型随心选' : unit,
                productType: ComEnum.ProductTypeEnum.Flow,
                actualPrice: it.payFee,
                isRecommend: it.activity,
                hasActivity: it.showPromote,
                defaultSeleted: false,
                children: []
            }
        }

        //是否推荐 isRecommend 2代表推荐 1代表不推荐
        if (obj[key].isRecommend != ComEnum.Activity18.Yes && it.activity == ComEnum.Activity18.Yes) {
            obj[key].isRecommend = it.activity == 2 ? 0 : 1
        }

        if (it.showPromote == ComEnum.ShowPromote18.Yes && (initPrice == 0 || initPrice > it.payFee)) {
            defaultKey = key
        }

        //是否有活动 hasActivity 0代表存在活动 1代表没有活动
        if (obj[key].hasActivity != ComEnum.ShowPromote18.Yes && it.showPromote == ComEnum.ShowPromote18.Yes) {
            obj[key].hasActivity = it.showPromote
        }

        if (it.payFee < obj[key].actualPrice) {
            obj[key].actualPrice = it.payFee
        }
        obj[key].children.push(it)
    });
    let arry = new Array()
    let flag = true
    Object.keys(obj).forEach(ele => {
        if (defaultKey && defaultKey == ele) {
            obj[ele].defaultSeleted = true
            flag = false
        } else if (!defaultKey && flag && ele == defaultValue) {
            obj[ele].defaultSeleted = true
            flag = false
        }
        if (ele != 0)
            arry.push(obj[ele])
    })
    if (obj[0])
        arry.push(obj[0])
    if (flag)
        arry[0].defaultSeleted = true
    return arry
}

const FastFlowManagerPush = (list, defaultValue) => {
    let obj = {}
    let defaultKey = ""
    let initPrice = 0
    list.forEach(it => {
        let key
        // if (it.flowType == '2') {// 流量类型:1-直充,2-个性
        //     key = '个性流量'
        // } else {
        //     key = parseInt(it.face / 1024) ? parseInt(it.face / 1024) : it.face
        // }
        key = parseInt(it.face / 1024) ? parseInt(it.face / 1024) : it.face
        
        let unit = parseInt(it.face / 1024) ? 'G' : 'M'
        if (Object.keys(obj).indexOf(key + "") < 0) {
            obj[key] = {
                name: key == '个性流量' ? '个性流量' : key + unit,
                key: key,
                unit: key == '个性流量' ? '' : unit,
                productType: ComEnum.ProductTypeEnum.Flow,
                actualPrice: it.payFee,
                isRecommend: it.activity,
                hasActivity: it.showPromote,
                defaultSeleted: false,
                children: []
            }
        }

        //是否推荐 isRecommend 2代表推荐 1代表不推荐
        if (obj[key].isRecommend != ComEnum.Activity18.Yes && it.activity == ComEnum.Activity18.Yes) {
            obj[key].isRecommend = it.activity == 2 ? 0 : 1
        }

        if (it.showPromote == ComEnum.ShowPromote18.Yes && (initPrice == 0 || initPrice > it.payFee)) {
            defaultKey = key
        }

        //是否有活动 hasActivity 0代表存在活动 1代表没有活动
        if (obj[key].hasActivity != ComEnum.ShowPromote18.Yes && it.showPromote == ComEnum.ShowPromote18.Yes) {
            obj[key].hasActivity = it.showPromote
        }

        if (it.payFee < obj[key].actualPrice) {
            obj[key].actualPrice = it.payFee
        }
        obj[key].children.push(it)
    });
    let arry = new Array()
    let flag = true
    Object.keys(obj).forEach(ele => {
        if (defaultKey && defaultKey == ele) {
            obj[ele].defaultSeleted = true
            flag = false
        } else if (!defaultKey && flag && ele == defaultValue) {
            obj[ele].defaultSeleted = true
            flag = false
        }
        if (ele != 0)
            arry.push(obj[ele])
    })
    if (obj[0])
        arry.push(obj[0])
    if (flag)
        arry[0].defaultSeleted = true
    return arry
}
export {
    FeeManager,
    FastFlowManager,
    FastFlowManagerPush
}