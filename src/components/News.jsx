import React from 'react'
import { Select, Typography, Row, Col, Avatar, Card } from 'antd';
import moment from 'moment';

import { useGetNewsQuery } from '../services/NewsApi.js'

const { Text, Title } = Typography;
const { Option } = Select
const demoimgUrl = 'https://images.pexels.com/photos/844124/pexels-photo-844124.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260'

const News = ({ simplified }) => {

    const { data : News } = useGetNewsQuery({ newsCategory : 'Cryptocurrency', count : simplified ? 6 : 19  })
    console.log(News)

    if(!News?.value)    return <h1 style={{padding : '25% 50%', fontSize:"20px"}}>Loading...</h1>;
    
    // everything is going to be one row

    return (
        <Row gutter={[24,24]}>
            {News?.value?.map((news, i)=> (                 // i is index of array, target = blank to open link in new tab
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
    )
}

export default News
