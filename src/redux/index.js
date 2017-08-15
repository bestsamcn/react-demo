import { combineReducers, createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import sequenceAction from 'redux-sequence-action';
import { createLogger } from 'redux-logger';
import rootReducer from './reducers';
var middlewareList =  process.env.NODE_ENV === 'production' ? [sequenceAction, thunkMiddleware] : [sequenceAction, thunkMiddleware, createLogger()];
let createStoreWithMiddleware = applyMiddleware(
    ...middlewareList
)(createStore);

export default (function configureStore(initialState) {
	// store负责管理所有reducer，module.hot.accept表示支持热更新
    const store = createStoreWithMiddleware(rootReducer, initialState);
    if (module.hot) {
        module.hot.accept('./reducers', () => {
            const nextRootReducer = require('./reducers/index');
            store.replaceReducer(nextRootReducer);
        });
    }
    return store;
})(window.__initialState__);
