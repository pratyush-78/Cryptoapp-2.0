import React, { useState} from 'react'
import { Select, Typography, Row, Col, Avatar, Card } from 'antd';
import moment from 'moment';

import { useGetNewsQuery } from '../services/NewsApi.js'
import { useGetcryptosQuery } from '../services/CryptoApi'          // it contains all coins name for SEARCH options


const { Text, Title } = Typography;
const { Option } = Select
const demoimgUrl = 'https://images.pexels.com/photos/844124/pexels-photo-844124.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260'

const News = ({ simplified }) => {

    const { data:cryptosList } = useGetcryptosQuery(100);           //
    const [ input, setinput ] = useState('Cryptocurrency')                        // initially
    const { data : News } = useGetNewsQuery({ newsCategory : input, count : simplified ? 6 : 12  })
    console.log(News)

    if(!News?.value)    return <h1 style={{padding : '25% 50%', fontSize:"20px"}}>Loading...</h1>;
    
    // everything is going to be one row

    return (
        <>
        { !simplified ? 
        //                                       to dynamically change input field
        <Col span={24}>
            <Select
                style={{minWidth : "200px"}}
                showSearch
                className='filter-news'
                placeholder='Search a coin'
                optionFilterProp='children'
                onChange={(value) => setinput(value)}
                filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase() >=0)}
                >
                {/* now we have to show all the available options, first one we hard code, next options will be mapped */}
                <Option value="Cryptocurrency">Cryptocurrency</Option>
                {/* <Option >yo</Option> */}
                {cryptosList?.data?.coins?.map((currency) => <Option value={currency.name}>{currency.name}</Option>)}

                

            </Select>
        
        </Col>
        : <></> }
            <Row gutter={[24,24]}>
                {News.value.map((news, i)=> (                 // i is index of array, target = blank to open link in new tab
                    <Col xs={24} sm={12} lg={8} key={i} >
                    <Card hoverable className='news-card'>
                        <a href={news.url} target='_blank' rel='noreferrer'>         
                            <div className='news-image-container'>
                                <Title className='news-title' level={5}>{news.name}</Title>
                                <img style={{maxHeight:'100px', maxWidth:'200px'}} src={news?.image?.thumbnail?.contentUrl || demoimgUrl} alt=""/>
                            </div>
                            <p>
                                {news.description.length > 100 ? `${news.description.substring(0,100)}...` : `${news.description}`}

                            </p>
                            <div className='provider-container'>
                                <div>
                                    <Avatar src={news.provider[0]?.image?.thumbnail?.contentUrl || demoimgUrl} alt=""/>
                                    <Text>     {moment(news.datePublished).startOf('ss').fromNow()}</Text>
                                </div>
                            </div>
                        </a>
                    </Card>
                    </Col>
                ))}
            </Row>
        </>
    )
}

export default News
