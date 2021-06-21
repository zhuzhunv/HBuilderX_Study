import * as ObjectUtil from './ObjectUtil'
let isReset = true
const FocusinHandler = (foucsCallback) => {
    isReset = false
    if (!ObjectUtil.IsEmpty(foucsCallback))
        foucsCallback()
}

const FocusoutHandler = (blurCallback) => {
    isReset = true
    setTimeout(() => {
        if (isReset && !ObjectUtil.IsEmpty(blurCallback)) {
            blurCallback()
        }
    }, 30)
}

const ResizeHandler = (foucsCallback, blurCallback, orgHeight) => {
    const resizeHeight = document.documentElement.clientHeight || document.body.clientHeight
    const activeElement = document.activeElement
    if (resizeHeight < orgHeight - 30) {
        // console.log("smallSize", !ObjectUtil.IsEmpty(foucsCallback))
        if (activeElement && (activeElement.tagName.toUpperCase() === "INPUT" || activeElement.tagName.toUpperCase() === "TEXTAREA")) {
            setTimeout(() => {
                activeElement.scrollIntoView({ block: 'center' });
            }, 0)
            if (!ObjectUtil.IsEmpty(foucsCallback))
                foucsCallback()
        }
    } else {
        // console.log("oldSize", !ObjectUtil.IsEmpty(blurCallback))
        if (!ObjectUtil.IsEmpty(blurCallback))
            blurCallback()
    }
}



export {
    FocusinHandler,
    FocusoutHandler,
    ResizeHandler
}