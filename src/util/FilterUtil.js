/* eslint-disable no-undef */
import * as ObjectUtil from './ObjectUtil'
import * as DateUtil from './DateUtil'

const SubstituteHolder = (value) => {
    if (value)
        return value
    else
        return '---'
}

const SubstituteDate = (value, format) => {
    let subval = value
    if (subval == '' || subval == undefined || subval == null) {
        return '---'
    } else {
        subval = moment(value).toDate()
        return DateUtil.DateToString(subval, format, false)
    }
}

const SubstituteTof = (value, tof) => {
    let status = tof.split(',')
    let index = parseInt(value)
    return status[index]
}

const SubstituteEllipsis = (value, number) => {
    if (ObjectUtil.IsEmpty(value))
        return '---'
    if (value.length >= number) {
        let subval = value.slice(0, number - 1) + '...'
        return subval
    } else if (0 < value.length < number) {
        let subval = value
        return subval
    } else {
        return '---'
    }
}

const SubstituteNumber = (value) => {
    if (ObjectUtil.IsEmpty(value))
        return 0
    else
        return value
}

const SubstituteNumberFixString = (value, number) => {
    let retVal = value
    if (ObjectUtil.IsEmpty(value))
        retVal = 0
    if (!value && (!ObjectUtil.IsNumber(value) || !ObjectUtil.IsNumber(number)))
        return retVal

    return retVal.toFixed(number)
}

const SubstitueTranFlow = (value, number) => {
    if (ObjectUtil.IsEmpty(value)) {
        return ''
    }
    try {
        let val = Number.parseFloat(value)
        if (val >= 1024) {
            return Math.floor(val / 1024.0 * 100) / 100 + 'G'
        } else if (val > 0) {
            return val + 'M'
        } else {
            return val
        }
    } catch (ex) {
        return value
    }
}

export {
    SubstituteHolder,
    SubstituteDate,
    SubstituteTof,
    SubstituteEllipsis,
    SubstituteNumber,
    SubstituteNumberFixString,
    SubstitueTranFlow
}