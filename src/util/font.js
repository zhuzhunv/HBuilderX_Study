// 字体
const setRem = () => {
    let deviceWidth = document.documentElement.clientWidth;
    document.documentElement.style.fontSize = deviceWidth / 7.5 + "px";
    document.body.style.fontSize = "14px";//在body上将字体还原大小，避免页面无样式字体超大
    if (deviceWidth > 750) {
        deviceWidth = 750;
        document.documentElement.style.fontSize = deviceWidth / 7.5 + "px";
    }
    // if (deviceWidth < 400) {
    //     document.documentElement.style.fontSize = ((deviceWidth / 7.5) - 5) + "px";
    // }
}
const setHeight = () => {
    let devicesetHeight = document.documentElement.clientHeight;
    setTimeout(() => {
        var o = document.getElementById("qx_com_chilren_item_box").offsetHeight;
        if (o > (devicesetHeight / 2)) {
            let h33 = document.getElementById("h33").offsetHeight
            let butom = document.getElementById("h33").offsetHeight
            document.getElementById("qx_com_chilren_item_box").style.height = (devicesetHeight / 2 - h33 - butom) + 'px'
        }
    }, 50)

}
 
export {
    setRem,
    setHeight
}



