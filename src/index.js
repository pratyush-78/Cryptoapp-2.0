// import react, dom, router
import React from "react";
import ReactDOM from 'react-dom'
import { BrowserRouter as Router } from "react-router-dom";

import App from './App'
import 'antd/dist/antd.css' // make our app look so much better

ReactDOM.render(
    <Router>
        <App/>
    </Router>
    , document.getElementById('root')
)