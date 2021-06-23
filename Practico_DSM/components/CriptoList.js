import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {Text, View,FlatList,StyleSheet,TextInput} from 'react-native';
import CriptoDetail from './CriptoDetail';

const CriptoList = (props) => {
    const [coins, setCoins] = useState([])
    const loadData = async () => {
        const res = await fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=250&page=1&sparkline=false')
        setCoins(await res.json())
    }
    useEffect(()=>{
        // Revisar esto con axios
        /*axios.get(
            'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=250&page=1&sparkline=false'
        ).then((res)=>{
            setCoins(await res.json())
        })*/
        loadData()
    },[])

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TextInput style={styles.searchInput}/>
            </View>
          <FlatList style={styles.list} data={coins}
          renderItem={({item}) => {
              return <CriptoDetail coin={item}/>
          }} 
          showsVerticalScrollIndicator={false}
          />
        </View>
      );  
}

const styles = StyleSheet.create({
    container:{
        alignItems:'center',
        flex:1
    },
    list:{
        width:'90%'
    },
    header:{
        flexDirection:'row',
        justifyContent:'space-between',
        width:'90%',
        marginBottom:10
    },
    searchInput:{
        color:'#000000',
        borderBottomColor:'#4657CE',
        borderBottomWidth:1,
        textAlign:'center',
        width:'40%'
    }
})

export default  CriptoList