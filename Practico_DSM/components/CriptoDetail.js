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
            <Text>${coin.current_price}</Text>
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
    }
    
})

export default CriptoDetail