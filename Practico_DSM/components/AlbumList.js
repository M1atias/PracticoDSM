import React, {useEffect, useState} from 'react';
import {Text, View,FlatList} from 'react-native';
import axios from 'axios';
import AlbumDetail from './AlbumDetail';

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
      <FlatList data={photos.photoset}
      renderItem={({item}) => renderAlbum(item)}/>
    </View>
  );  
}  

export default AlbumList;
