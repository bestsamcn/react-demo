import { combineReducers } from 'redux';
import auth from './auth';

let rootReducer = combineReducers({
	auth
});

export default rootReducer;