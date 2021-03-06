import React, {useState, useEffect} from 'react';
import {FlatList, Text, View} from 'react-native';
import axios from 'axios';
import PhotoDetail from './PhotoDetail';

const PhotoList = (props) => {

  const [state, setState] = useState({photos: null});
  const addPhotos = (e) => setState(e);
  const renderAlbum = (photo) => {
    return <PhotoDetail
        key={photo.title}
        title={photo.title}
        imageUrl={`https://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}.jpg`}
      />;
  }
  
  console.log(state);

  useEffect( () => {
    axios
    .get(
      `https://api.flickr.com/services/rest/?method=flickr.photosets.getPhotos&api_key=6e8a597cb502b7b95dbd46a46e25db8d&photoset_id=${props.route.params.albumId}&user_id=137290658%40N08&format=json&nojsoncallback=1`,
    )
    .then((response) =>
      addPhotos({photos: response.data.photoset.photo}),
    );
  }, []);

  if (!state.photos) {
    return (
      <View style={{flex: 1}}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={{flex: 1}}>
      <FlatList data={state.photos}
      renderItem={({item}) => renderAlbum(item)}/>
    </View>
  );
}

export default PhotoList;
