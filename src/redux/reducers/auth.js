let initState={
	isLogin:false,
	userInfo:{
		name:'',
		password:''
	}
}
import TYPES from '../types';
const _auth = (state = initState, action)=>{
	switch(action.type){
		case TYPES.auth.SET_LOGIN:
			return {...state, isLogin:action.isLogin}
		case TYPES.auth.SET_USER_INFO:
			return Object.assign({}, state, {userInfo:action.userInfo})
		default:
			return state;
	}
}
export default _auth;