import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {Text, View,FlatList,StyleSheet,TextInput} from 'react-native';
import CriptoDetail from './CriptoDetail';

const CriptoList = (props) => {
    const [coins, setCoins] = useState(null)
    const [search, setSearch] = useState('')
    const [refreshing,setRefreshing] = useState(false)
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

    if(!coins){
        return(
            <View style={styles.container}>
                <Text>Loading...</Text>
            </View>
        )
    }
    
    //Ver si en el FlatList el data se lo puede poner como funcion y retornar un Loading si no se encuentran datos
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TextInput placeholder="Search coin" placeholderTextColor='#858585' style={styles.searchInput} onChangeText={text=>setSearch(text)}/>
            </View>
          <FlatList style={styles.list} data={coins.filter((coin) => coin.name.toLowerCase().includes(search.toLowerCase()) || coin.symbol.toLowerCase().includes(search.toLowerCase()))}
          renderItem={({item}) => {
              console.log(data)
              return <CriptoDetail coin={item}/>
          }} 
          showsVerticalScrollIndicator={false}
          refreshing={refreshing}
          onRefresh={async()=>{
              setRefreshing(true)
              await loadData()
              setRefreshing(false)
          }}
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