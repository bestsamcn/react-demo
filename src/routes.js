import React from 'react';
import { browserHistory, IndexRoute, Route, Router } from 'react-router';

//开发环境使用同步引入
import App from './App';
import { Add } from './views/user';

//生成环境按需加载
// const App = (location, cb) => {
//     require.ensure([], require => {
//         cb(null, require('./App').default)
//     },'App')
// }

const routes = (
	<div>
        <Router history={browserHistory}>
            <Route path="/" component={App}>
                <IndexRoute component={Add} />
            </Route>
        </Router>
    </div>
)

export default routes;