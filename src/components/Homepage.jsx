import React from 'react'
import { Link } from 'react-router-dom'
import millify from 'millify';
import { Typography, Row, Col, Statistic} from 'antd'
import { Cryptocurrencies, News } from '../components';

import { useGetcryptosQuery } from '../services/CryptoApi';


const { Title } = Typography;   // de-structuring Typography.Title -> Title, so that we dont have to type alot 

const Homepage = () => {

    const { data, isFetching } = useGetcryptosQuery(50);              // call this as hook, then we immediately get the data
    const globalStats = data?.data?.stats;                         // data obj > data > stats or data.data.stats

    console.log(data);                                              // at start the data was undefined, so redux toolkit gives us
                                                                    // the isFetching  state/var, 
    if(isFetching)  return "Loading...";

    return (
        <div>
            <Title level={2} className='heading'>Global Crypto Stats</Title>
            <Row>
                <Col span={12}><Statistic title="Total Cryptocurrencies" value={globalStats.total}/> </Col>           {/*  in antd, there are total 24 spaces, so this (each col) takes half the width */}
                {/* <Col span={12}><Statistic title="Total Exchanges" value={globalStats.totalExchanges}/> </Col>            */}
                <Col span={12}><Statistic title="Total Exchanges" value={millify(globalStats.totalExchanges)}/> </Col>           
                <Col span={12}><Statistic title="Total Market Cap" value={millify(globalStats.totalMarketCap)}/> </Col>           
                <Col span={12}><Statistic title="Total 24-hr Volume" value={millify(globalStats.total24hVolume)}/> </Col>           
                <Col span={12}><Statistic title="Total Markets" value={millify(globalStats.totalMarkets)}/> </Col>           
            </Row>
            <div className='home-heading container'>
                <Title span={12} level={2} className='home-title'>Top 10 Cryptocurrencies</Title>
                <Title span={12} level={3} className='show-more'><Link to="/cryptocurrencies">Show more</Link></Title>
            </div>
            <Cryptocurrencies simplified/>
            {/* simplified is used to render only 10 elements */}
            <div className='home-heading container'>
                <Title span={12} level={2} className='home-title'>Latest Crypto News</Title>
                <Title span={12} level={3} className='show-more'><Link to="/news">Show more</Link></Title>
            </div>
            <News simplified/>
        </div>
    )
}

export default Homepage
