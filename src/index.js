// import react, dom, router
import React from "react";
import ReactDOM from 'react-dom'
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from 'react-redux';

import App from './App'
import store from './App/Store'
import 'antd/dist/antd.css' // make our app look so much better

ReactDOM.render(
    <Router>
        <Provider store={store}>
            <App/>
        </Provider>
    </Router>
    , document.getElementById('root')
)