import Axios from 'axios';
import qs from 'qs';
import * as config from '../config';
Axios.defaults.timeout = 10000;
Axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
// Axios.defaults.headers.get['Content-Type'] = 'text/plain;charset=UTF-8';
// Axios.defaults.withCredentials = true;
var _http = function(type, url, params){
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
        
        return config;
    }, error=> {
        return Promise.reject(error);
    });
    instance.interceptors.response.use(response=> {
        return response;
    }, error=> {
        return Promise.reject(error);
    });

    var __promise = new Promise((resolve, reject)=>{
        instance.request(obj).then(res=>{
            if(res.status == 200 && res.data.code !== "SUCCESS"){
                return false;
            }
            return resolve(res.data);
        }, err=>{
            reject(err);
            console.log(err, '请求失败');
        }).catch(e=>{
            console.log(e, '请求失败');
        });
    });
    return __promise;
}

export default _http;