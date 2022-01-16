import React from 'react'
import millify from 'millify'
import { Link } from 'react-router-dom'
import { Card, Row, Col, Input } from 'antd'

import { useGetcryptosQuery } from '../services/CryptoApi'          // it contains all endpoints for our api call
import { useState } from 'react'
import { useEffect } from 'react'

const Cryptocurrencies = ({ simplified }) => {

    const count = simplified ? 10 : 100;
    const {data:cryptosList, isFetching} = useGetcryptosQuery(count);           // de- structure, RENAME data as cryptosList

    const [ cryptos, setCryptos ] = useState(cryptosList?.data?.coins);     // 'cryptos' will become array of coins (& its details)

    const [ input, setInput ] = useState('')

    useEffect( () => {
        const filteredData = cryptosList?.data?.coins.filter(( coin )=> coin.name.toLowerCase().includes(input) )

        setCryptos(filteredData);

    }, [input])
    if(isFetching)  return 'Loading...'
    // console.log(cryptos)
    return (
        <div>
            {!simplified ? 
                <div className='crypto-search-container'>
                    <input className='crypto-search' placeholder='Search a coin' onChange={(e)=>(setInput(e.target.value))}/>
                </div>
                : <></>
            }


            <Row gutter={[30,30]} className='crypto-card-container' >
                {cryptos?.map((currency) => (
                    <Col xs={24} sm={12} lg={6} className='crypto-card' key={currency.id}>
                        <Link to="/">
                        {/* <p>{currency.name}</p> */}
                        <Card 
                            title={`${currency.rank}. ${currency.name}`}
                            extra={<img src={currency.iconUrl} className='crypto-image' alt=""/>}
                            hoverable
                            >
                            <p>Price: {millify(currency.price)}</p>
                            <p>Market Cap: {millify(currency.marketCap)}</p>
                            <p>Daily Change: <span style={{color : `${currency.change<0 ? 'red':'#26a537'}`}}>{currency.change}</span>%</p>
                            {/* <p>{currency.name}</p> */}
                        </Card>
                        
                        </Link>
                    </Col>
                ))}

            </Row>
        </div>
    )
}

export default Cryptocurrencies
