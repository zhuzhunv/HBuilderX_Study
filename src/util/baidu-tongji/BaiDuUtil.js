const BaiDuTongJi = (num) => {
    var _hmt = _hmt || [];
    document.getElementById('baidu_tj') && document.getElementById('baidu_tj').remove();
    var hm = document.createElement("script");
    hm.src = "https://hm.baidu.com/hm.js?" + num;
    hm.id = "baidu_tj"
    var s = document.getElementsByTagName("script")[0];
    s.parentNode.insertBefore(hm, s);
}

export {
    BaiDuTongJi
}