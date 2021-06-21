const appVersion = navigator.appVersion;
const uu = navigator.userAgent;

const IsWx = () => {
    return ((appVersion.match(/MicroMessenger/i)) && (appVersion.match(/MicroMessenger/i).toString().toLowerCase() == 'micromessenger'));
}

const IsIos = () => {
    return /iphone|ipod|ipad/i.test(uu.toLowerCase());
}

const IsAndr = () => {
    return /android/i.test(uu.toLowerCase());
}

const IsQQ = () => {
    return appVersion.split('MQQBrowser/').length > 1;
}

const IsUc = () => {
    return appVersion.split('UCBrowser').length > 1;
}

const QQVs = () => {
    return IsQQ() ? parseFloat(appVersion.split('MQQBrowser/')[1]) : 0
}

const UcVs = () => {
    return IsUc() ? parseFloat(appVersion.split('UCBrowser/')[1]) : 0
}

export {
    IsWx,
    IsIos,
    IsAndr,
    IsQQ,
    IsUc,
    QQVs,
    UcVs
}