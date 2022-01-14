import React from 'react'
import { Router, Link, Routes, Route } from 'react-router-dom'
import { Layout, Typography, Space} from 'antd';
import { Navbar, Exchanges, Homepage, Cryptocurrencies, CryptoDetails, News } from './components';
import './App.css'

const App = () => {
    return (
        <div className='app'>
            <div className='navbar'>
                <Navbar/>
            </div>
            <div className='main'>
                <Layout>
                    <div className='routes'>
                            {/* switch/Routes allows you to have multiple routes */}
                        <Routes>
                            {/* <Route exact path="/">
                                <Homepage/>
                            </Route> */}
                            <Route exact path="/" element = {<Homepage/>}/>
                            <Route exact path="/exchanges" element = {<Exchanges/>}/>
                            <Route exact path="/cryptocurrencies" element = {<Cryptocurrencies/>}/>
                            <Route exact path="/crypto/:coinId" element = {<CryptoDetails/>}/>
                            <Route exact path="/news" element = {<News/>}/>
                        </Routes>
                    </div>
                    <>
                    hello</>
                </Layout>
            </div>
            <div className='footer'>

            </div>

            
        </div>
    )
}

export default App
