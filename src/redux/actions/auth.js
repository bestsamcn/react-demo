import TYPES from '../types';

export const setLogin = isLogin=>{
	return {
		type:TYPES.auth.SET_LOGIN,
		isLogin
	}
}
export const setUserInfo = userInfo=>{
	return {
		type:TYPES.auth.SET_USER_INFO,
		userInfo
	}
}