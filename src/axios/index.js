import axios from 'axios'
import qs from 'qs';
// import store from '@/store';
import Vue from "vue";
let vue = new Vue();

var instance = axios.create();
// 覆写库的超时默认值
// 现在，在超时前，所有请求都会等待 2.5 秒
// var tokenStr = Vue.$store.state.user.token
var tokenStr =''
instance.defaults.timeout = 60000;
instance.defaults.headers.token = tokenStr;
// console.log("----axios:", --- window.globalUrl.baseURL, window)
instance.defaults.baseURL = 'http://192.168.110.73:10060/';
// 添加请求拦截器
instance.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    // console.log("===config:", config, Vue.$store)
    config.headers.token = vue.$store.state.user.token
    // config.headers.token = ''
    return config;
  }, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  });

// 添加响应拦截器
instance.interceptors.response.use(function (response) {
    // 对响应数据做点什么
    return response;
  }, function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
  });

  export default {
    post(url, data = {}) {
        return instance({
            method: 'post',
            url: url,
            data: qs.stringify(data), 
            headers: {
                'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
            },
        }).then((res) => {
            return res.data
            // return checkStatus(res);
        }).then(
            (res) => {
                return res
                // return checkCode(res);
            }
        )
    },

    get(url, params = {}, responseType = "") {
        let headParams = {
            method: 'get',
            url,
            params,
            headers: {
                'content-type': 'application/json',
            }
        }
        if (responseType) headParams.responseType = responseType;
        return instance(headParams).then(
            (response) => {
                return response.data
                // return checkStatus(response);
            }
        ).then(
            (res) => {
                return res
                // return checkCode(res);
            }
        )
    },

    _post(url, data, jsonStr, responseType = "") {
        let jsonData = jsonStr ? qs.stringify(data) : data;
        // 因为要导出excel表格 通过'js-file-download'下载 
        // 需要接收 {responseType:arraybuffer}参数
        let headParams = {
            method: 'post',
            url: url,
            data: jsonData,
            headers: {
                // 'content-type': 'application/json',
                // 调用税控exe接口的时候，需要传charset=utf-8
                'content-type': 'application/json;charset=utf-8',
            }
        }
        if (responseType) headParams.responseType = responseType
        return instance(headParams).then((res) => {
            return res.data
            // return checkStatus(res);
        }).then(
            (res) => {
                return res.data
                // return checkCode(res);
            }
        )
    }
}
