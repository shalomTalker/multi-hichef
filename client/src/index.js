import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import { Route, BrowserRouter, Switch } from 'react-router-dom';
import './index.css';

import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import reduxThunk from 'redux-thunk';
import axios from 'axios';

import App from './components/App';
import Home from './components/Home';
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';
import Dashboard from './components/Dashboard';
import reducers from './reducers';

import authGuard from './components/HOCs/authGuard';

axios.defaults.withCredentials = true;

/*
  1) Disable the httpOnly property :(
  2) Fire off a request on app load to the BE which will check if the user is auth-ed
*/

ReactDOM.render(
    <Provider store={createStore(reducers, {}, applyMiddleware(reduxThunk))}>
        <BrowserRouter>
            <App>
                <Route exact path="/" component={Home} />
                <Route exact path="/signup" component={SignUp} />
                <Route exact path="/signin" component={SignIn} />
                <Route exact path="/dashboard" component={authGuard(Dashboard)} />
            </App>
        </BrowserRouter>
    </Provider>,
    document.querySelector('#root'));
registerServiceWorker();



// import App from './components/App';
// import Screen from './components/Screen';
// import Recommend from './components/Recommend';
// import Result from './components/Result';

// const { routes, recipes } = require('./routes-data.json');
// ReactDOM.render(
//     <BrowserRouter>
//         <Switch>
//             <App>
//                 {/* questioins Routes */}
//                 {routes.quest.map((data, i, arr) => (
//                     <Route key={i} exact path={`${data.path}`} render={(props) => (
//                         <Screen {...props} data={data} amount={arr.length} />
//                     )} />
//                 ))}
//                 {/* main routes */}
//                 {routes.index.map((data, i) => (
//                     <Route key={i} exact path={`${data.path}`} render={(props) => (
//                         <Screen {...props} data={data} />
//                     )} />
//                 ))}
//                 {/* selected recieps (recommend and whole recipe)  */}
//                 <Route exact path={`${routes.result.path}`} render={(props) => (
//                     <Result {...props} data={routes.result} recipes={recipes} />
//                 )} />
//                 <Route exact path={`${routes.another.path}`} render={(props) => (
//                     <Screen {...props} data={routes.another} />
//                 )}


//                 />
//             </App>
//         </Switch>
//     </BrowserRouter>,
//     document.getElementById('root')
// );

// // If you want your app to work offline and load faster, you can change
// // unregister() to register() below. Note this comes with some pitfalls.
// // Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();