/* eslint-disable no-undef */

import * as ObjectUtil from '../util/ObjectUtil';
// import promise from 'es6-promise';
// 创建实例
let instanceAxios = axios.create()
instanceAxios.defaults.timeout = 60000
if (process.env.NODE_ENV == "development")
    instanceAxios.defaults.headers = { 'X-Real_IP': "127.0.0.1" }


instanceAxios.interceptors.request.use(config => {
    // 设置请求头
    return config
}, error => {
    return Promise.reject(error)
})

instanceAxios.interceptors.response.use(res => {
    //获取字段表
    let data = res
    if (typeof res == "string")
        data = JSON.parse(res)
    return data
}, error => {
    return Promise.reject(error)
});

function http(url, param, method = "get", header = null) {
    let options
    let urlArry = url.split('/')
    for (let i = 0; i < urlArry.length; i++) {
        let item = urlArry[i]
        if (item.indexOf(':') >= 0) {
            let key = item.split(':')[1]
            if (key) {
                urlArry[i] = param[key]
                Reflect.deleteProperty(param, key)
                // Reflect.deleteProperty(target, propertyKey)
                // target:要删除属性的对象。 propertyKey:要被删除的属性名称。
            }
        }
    }

    // for (let it in urlArry) {
    //     let item = urlArry[it] 
    //     if (item.indexOf(':') >= 0) {
    //         let key = item.split(':')[1]
    //         if (key) { 
    //             urlArry[it] = param[key] 
    //             Reflect.deleteProperty(param, key)
    //             // Reflect.deleteProperty(target, propertyKey)
    //             // target:要删除属性的对象。 propertyKey:要被删除的属性名称。
    //         }
    //     }
    // }

    url = urlArry.join('/') //将数组以分隔符进行分隔的 
    param['vs'] = '1.1.2' //版本号
    if (method == 'get') {
        options = { method: method, params: param, url }
    } else {
        options = { method: method, data: param, url }
        if (!ObjectUtil.IsEmpty(header)) {
            options = { method: method, headers: header, data: param, url }
        }
    }
    let instance = instanceAxios(options)

    return new Promise((resolve, reject) => {
        instance.then(res => {
            resolve(res.data)
        }).catch(err => {
            reject(err)
        })
    })
}

export function get(url, param, header = null) {
    return http(url, param, 'get', header)
}

export function post(url, param, header = null) {
    return http(url, param, 'post', header)
}

export function del(url, param, header = null) {
    return http(url, param, 'delete', header)
}

export function put(url, param, header = null) {
    return http(url, param, 'put', header)
}

export function patch(url, param, header = null) {
    return http(url, param, "patch", header)
}