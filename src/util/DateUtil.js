import * as ObjectUtil from './ObjectUtil'

const DateToString = (date, format, UTC) => {
    format = format || "yyyy-MM-dd HH:mm:ss";
    let o = {
        "M+": (UTC ? date.getUTCMonth() : date.getMonth()) + 1,
        "d+": UTC ? date.getUTCDate() : date.getDate(),
        "h+": UTC ? date.getUTCHours() : date.getHours(),
        "H+": UTC ? date.getUTCHours() : date.getHours(),
        "m+": UTC ? date.getUTCMinutes() : date.getMinutes(),
        "s+": UTC ? date.getUTCSeconds() : date.getSeconds(),
        "q+": Math.floor(((UTC ? date.getUTCMonth() : date.getMonth()) + 3) / 3),
        "S": UTC ? date.getUTCMilliseconds() : date.getMilliseconds(),
        "W": ["日", "一", "二", "三", "四", "五", "六"][date.getDay()]
    };
    if (/(y+)/i.test(format)) {
        let regStr = /(y+)/i.exec(format)[0];
        let len = regStr.length;
        format = format.replace(regStr, ((UTC ? date.getUTCFullYear() : date.getFullYear()) + "").substr(4 - len));
    }
    for (let k in o) {
        let reg = new RegExp("(" + k + ")");
        if (reg.test(format)) {
            let regexpStr = reg.exec(format)[0];
            format = format.replace(regexpStr, regexpStr.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
        }
    } ``
    return format;
}

const StringToDate = (val) => {
    let reg_yyyyMMddHHmmss = new RegExp("^(\\d{4})[-/]?([0-1]\\d{1})[-/]?([0-3]\\d{1})\\s*([0-2]\\d{1})[:]?([0-5]\\d{1})[:]?([0-5]\\d{1})$"),
        reg_yyyyMMddHHmm = new RegExp("^(\\d{4})[-/]?([0-1]\\d{1})[-/]?([0-3]\\d{1})\\s*([0-2]\\d{1})[:]?([0-5]\\d{1})$"),
        reg_yyyyMMddHH = new RegExp("^(\\d{4})[-/]?([0-1]\\d{1})[-/]?([0-3]\\d{1})\\s*([0-2]\\d{1})$"),
        reg_yyyyMMdd = new RegExp("^(\\d{4})[-/]?([0-1]\\d{1})[-/]?([0-3]\\d{1})$"),
        reg_yyyyMM = new RegExp("^(\\d{4})[-/]?([0-1]\\d{1})$"),
        reg_yyyy = new RegExp("^(\\d{4})$"),
        arr = reg_yyyy.exec(val)
            || reg_yyyyMM.exec(val)
            || reg_yyyyMMdd.exec(val)
            || reg_yyyyMMddHH.exec(val)
            || reg_yyyyMMddHHmm.exec(val)
            || reg_yyyyMMddHHmmss.exec(val);

    if (arr && arr.length > 0) {
        let yMdHms = new Array(1970, 1, 1, 0, 0, 0);
        for (let i = 1, len = arr.length; i < len; i++) {
            yMdHms[i - 1] = parseInt(arr[i], 10);
        }
        return new Date(yMdHms[0], yMdHms[1] - 1, yMdHms[2], yMdHms[3], yMdHms[4], yMdHms[5]);
    } else {
        return null;
    }
}

/**
 *
 * @param {*} val 2018-08-30T08:33:20.000+0000 将这个格式转为正常时间
 *
 */
const StringToDate2 = (val) => {
    let date = new Date(val).toJSON()
    let retDate = new Date(+new Date(date) + 8 * 3600 * 1000).toISOString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '')
    return retDate
}

const AddMonths = (date, months) => {
    date.setMonth(date.getMonth() + months);
    return date;
}

const AddDays = (date, days) => {
    if (!ObjectUtil.IsDate(date) && ObjectUtil.IsString(date))
        date = StringToDate(date) || StringToDate2(date);
    let timestamp = Date.parse(date);
    timestamp += days * 86400 * 1000;
    return new Date(timestamp);
}

const AddMilliseconds = (date, Milliseconds) => {
    if (!ObjectUtil.IsDate(date) && ObjectUtil.IsString(date))
        date = StringToDate(date) || StringToDate2(date);
    let timestamp = Date.parse(date)
    timestamp += Milliseconds
    return new Date(timestamp)
}



export {
    DateToString,
    StringToDate,
    StringToDate2,
    AddMonths,
    AddDays,
    AddMilliseconds,
}