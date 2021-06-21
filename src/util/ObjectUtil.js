const isType = type => (/^\[object\s(.*)\]$/.exec(Object.prototype.toString.call(type)))[1];

const IsNull = (obj) => { return isType(obj).toLowerCase() === 'null' }
const IsDate = (obj) => { return isType(obj).toLowerCase() === 'date' }
const IsArray = (obj) => { return isType(obj).toLowerCase() === 'array' }
const IsRegExp = (obj) => { return isType(obj).toLowerCase() === 'regexp' }
const IsString = (obj) => { return isType(obj).toLowerCase() === 'string' }
const IsObject = (obj) => { return isType(obj).toLowerCase() === 'object' }
const IsNumber = (obj) => { return isType(obj).toLowerCase() === 'number' }
const IsBoolean = (obj) => { return isType(obj).toLowerCase() === 'boolean' }
const IsFunction = (obj) => { return isType(obj).toLowerCase() === 'function' }
const IsUndefined = (obj) => { return isType(obj).toLowerCase() === 'undefined' }

const IsEmpty = (obj) => {
    if (IsUndefined(obj)) {
        return true
    } else if (IsNull(obj)) {
        return true
    } else if (IsArray(obj)) {
        return obj.length <= 0
    } else if (IsString(obj)) {
        return obj === ""
    } else if (IsObject(obj)) {
        return Object.keys(obj) == 0
    } else if (IsBoolean(obj)) {
        return false
    } else if (IsNumber(obj)) {
        return false
    } else if (IsFunction(obj)) {
        return false
    } else if (IsDate(obj)) {
        return false
    } else if (IsRegExp(obj)) {
        return false
    }
}

const InsertChar = (val, index, str) => {
    let strArray = val.split("")
    if (index < strArray.length)
        strArray[index] = str + strArray[index]
    return strArray.join("")
}

const Trim = (str, c) => {
    return trimRight(trimLeft(str, c), c);
}

const trimLeft = (str, c) => {
    // eslint-disable-next-line no-useless-escape
    return str.replace(new RegExp("^" + (c || "\s\s") + "*"), '');
}

const trimRight = (str, c) => {
    let ret = str, i = ret.length;
    //用该 RegExp 对象在一个字符串中检索时，将寻找的是字符 "e"
    // eslint-disable-next-line no-useless-escape 
    while (new RegExp(c || '\s').test(ret.charAt(--i)));

    return ret.slice(0, i + 1);
}

const IphoneScore = () => {
    if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
        //软键盘收起的事件处理
        setTimeout(() => {
            const scrollHeight = document.documentElement.scrollTop || document.body.scrollTop || 0
            window.scrollTo(0, Math.max(scrollHeight - 1, 0));
        }, 100)
    }
}


export {
    IsNull,
    IsDate,
    IsArray,
    IsRegExp,
    IsString,
    IsObject,
    IsNumber,
    IsBoolean,
    IsFunction,
    IsUndefined,
    IsEmpty,
    InsertChar,
    Trim,
    IphoneScore
}