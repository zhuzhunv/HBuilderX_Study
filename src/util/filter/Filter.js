/* eslint-disable no-undef */
// import vue from 'vue'
import * as FilterUtil from '../FilterUtil'
import * as ObjectUtil from '../ObjectUtil'

Vue.filter('sytfilter', function (value, pipeName) {
    return selfFilter(value, pipeName)
})

const selfFilter = (val, pipeName) => {
    try {
        if (!pipeName) {
            return val
        }

        if (!ObjectUtil.IsEmpty(pipeName.placeholder))
            return FilterUtil.SubstituteHolder(val)
        else if (!ObjectUtil.IsEmpty(pipeName.date))
            return FilterUtil.SubstituteDate(val, pipeName.date)
        else if (!ObjectUtil.IsEmpty(pipeName.tof))
            return FilterUtil.SubstituteTof(val, pipeName.tof)
        else if (!ObjectUtil.IsEmpty(pipeName.fix))
            return FilterUtil.SubstituteNumberFixString(val, pipeName.fix)
        else if (!ObjectUtil.IsEmpty(pipeName.number))
            return FilterUtil.SubstituteNumber(val, pipeName.number)
        else if (!ObjectUtil.IsEmpty(pipeName.ellipsis))
            return FilterUtil.SubstituteEllipsis(val, pipeName.ellipsis)
        else if (!ObjectUtil.IsEmpty(pipeName.tranflow))
            return FilterUtil.SubstitueTranFlow(val, pipeName.tranflow)
        else
            return val

    } catch (err) {
        return val
    }
}