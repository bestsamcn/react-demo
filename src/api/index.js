
import $http from './http.js';

//权限
export const add = (params)=>$http('post', '/addnew', params, true);
export const getArticleList = (params)=>$http('get', '/article/getList', params, true);
