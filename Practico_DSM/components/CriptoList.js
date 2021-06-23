import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {Text, View,FlatList} from 'react-native';


const CriptoList = (props) => {
    const [coins, setCoins] = useState([])
    const loadData = async () => {
        const res = await fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=250&page=1&sparkline=false')
        setCoins(await res.json())
    }
    useEffect(()=>{
        /*axios.get(
            'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=250&page=1&sparkline=false'
        ).then((res)=>{
            setCoins(await res.json())
        })*/
        loadData()
    },[])

    return (
        <View style={{flex: 1}}>
          <FlatList data={coins}
          renderItem={({item}) => {
              return <Text>{item.name}</Text>
          }}/>
        </View>
      );  
}

export default  CriptoList