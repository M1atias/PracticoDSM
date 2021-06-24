import React, {useEffect, useState} from 'react';
import {Text, View,FlatList,StyleSheet,Image} from 'react-native';

const CriptoDetail = ({coin}) => {
    
    return (
        <View style={styles.containerItem}>
           <View style={styles.coinName}>
               <Image source={{uri:coin.image}} style={styles.image}/>
               <View style={styles.containerName}>
                   <Text>{coin.name}</Text>
                   <Text style={styles.textSymbol}>{coin.symbol}</Text>
               </View>
           </View>
            <View>
            <Text style={styles.textPrice}>${coin.current_price}</Text>
            <Text style={[styles.pricePercentae, coin.price_change_percentage_24h > 0 ? styles.priceUp: styles.priceDown]}>{coin.price_change_percentage_24h}</Text>
            </View>
        </View>
    )
            
    
}

const styles = StyleSheet.create({
    containerItem:{
        paddingTop:10,
        flexDirection:'row',
        justifyContent:'space-between'
    },
    image:{
        width:30,
        height:30
    },
    coinName:{
        flexDirection:'row'
    },
    textSymbol:{
        color:'#7E7573',
        textTransform:'uppercase'
    },
    containerName:{
        marginLeft:10
    },
    pricePercentae:{
        textAlign:'right'
    },
    priceUp:{
        color:'#00B5B9'
    },
    priceDown:{
        color:'#fc4422'
    },
    textPrice:{
        color:'#000000',
        textAlign:'right'
    }
    
})

export default CriptoDetail