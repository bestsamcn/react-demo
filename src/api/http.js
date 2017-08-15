// import { setLoading, setToast } from '../store/actions';
// import store from '@/redux';
// console.log(store.getState())
import Axios from 'axios';
import qs from 'qs';
import * as config from '../config';
// import MSG from './message.js';
Axios.defaults.baseURL = config.ROOT_API;
Axios.defaults.timeout = 10000;
Axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
// Axios.defaults.headers.get['Content-Type'] = 'text/plain;charset=UTF-8';
// Axios.defaults.withCredentials = true;
var _http = function(type, url, params, isToast){
    type = type || 'get';
    if (!url) throw new Error('请指定url');
    var obj = {};

    params = Object.prototype.toString.call(params) === '[object Object]' ? params : {};
    if(type === 'get'){
        obj.method = 'get';
        obj.url = url;
        obj.params = params;
    }else if(type === 'post'){
        obj.method = 'post';
        obj.url = url;
        params = qs.stringify(params);
        obj.data = params;
    }else{
        throw new Error('请指定请求方式');
    }
    var instance = Axios.create();
    //当创建实例的时候，拦截器放在default无效
    instance.interceptors.request.use(config=>{
        //不能使用null，否则会将token的值变成'null'
        config.headers['x-access-token'] = localStorage.__bestToken__ && JSON.parse(localStorage.__bestToken__).token || '';
        // store.dispatch(setLoading(true));
        return config;
    }, error=> {
        // store.dispatch(setLoading(false));
        return Promise.reject(error);
    });
    instance.interceptors.response.use(response=> {
        // store.dispatch(setLoading(false));
        return response;
    }, error=> {
        // store.dispatch(setLoading(false));
        return Promise.reject(error);
    });

    var __promise = new Promise((resolve, reject)=>{
        instance.request(obj).then(res=>{
            if(res.status == 200 && res.data.retCode !== 0){
                // isToast && store.dispatch(setToast(res.data.msg || '异常'));
                return false;
            }
            return resolve(res.data);
        }, err=>{
            // isToast && store.dispatch(setToast('异常'));
            reject(err);
            console.log(err, '请求失败');
        }).catch(e=>{
            // isToast && store.dispatch(setToast('异常'));
            console.log(e, '请求失败');
        });
    });
    return __promise;
}

export default _http;