import TYPES from '../types';
import * as API from '@/api';
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

export const setArticleList = articleList=>{
	return{
		type:TYPES.auth.SET_ARTICLE_LIST,
		articleList
	}
} 

//异步action
export const getArticleList = (params)=>(dispatch)=>{
	API.getArticleList(params).then(res=>{
		dispatch(setArticleList(res.data))
	});
	
}

