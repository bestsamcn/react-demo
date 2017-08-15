
import $http from './http.js';

//权限
export const add = (params)=>$http('post', '/addnew', params, true);
