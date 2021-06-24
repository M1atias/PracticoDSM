import React, {useEffect, useState} from 'react';
import {Text, View,FlatList,StyleSheet} from 'react-native';
import axios from 'axios';
import AlbumDetail from './AlbumDetail';
import Card from './Card';
import CardSection from './CardSection';
import Button from './Button';

// AlbumList versión Funcional
const AlbumList = (props) => {

  const [photos, setPhotos] = useState({photoset:null})

  const renderAlbum = (album) => {
    return <AlbumDetail
        navigation={props.navigation}
        key={album.id}
        title={album.title._content}
        albumId={album.id}
    />;
  }

  useEffect(()=>{
    axios
      .get(
        'https://api.flickr.com/services/rest/?method=flickr.photosets.getList&api_key=6e8a597cb502b7b95dbd46a46e25db8d&user_id=137290658%40N08&format=json&nojsoncallback=1',
      )
      .then((response) =>
        setPhotos({photoset: response.data.photosets.photoset}),
      );
  },[])

  if(!photos.photoset) {
    return <Text>Loading...</Text>;
  }

  return (
    <View style={{flex: 1}}>
      <Card>
        <CardSection>
          <View style={styles.headerContentStyle}>
            <Text style={styles.headerTextStyle}>Listado Cripto</Text>
          </View>
        </CardSection>
        <CardSection>
          <Button title = 'Cripto Button' onPress={()=> props.navigation.navigate('criptoList')}>See Now!</Button>
        </CardSection>
      </Card>
      <FlatList data={photos.photoset}
      renderItem={({item}) => renderAlbum(item)}/>
    </View>
  );  
}  

const styles = StyleSheet.create({
  headerContentStyle: {
    flexDirection: 'column',
    justifyContent: 'space-around',
  },
  headerTextStyle: {
    fontSize: 18,
  }
})

export default AlbumList;
