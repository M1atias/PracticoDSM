import React, {useEffect, useState} from 'react';
import {ScrollView, Text, View,FlatList} from 'react-native';
import axios from 'axios';
import AlbumDetail from './AlbumDetail';


// AlbumList versión Funcional
const AlbumList = (props) => {
  const [photos, setPhotos] = useState({photoset:null})
  useEffect(()=>{
    axios
      .get(
        'https://api.flickr.com/services/rest/?method=flickr.photosets.getList&api_key=6e8a597cb502b7b95dbd46a46e25db8d&user_id=137290658%40N08&format=json&nojsoncallback=1',
      )
      .then((response) =>
        setPhotos({photoset: response.data.photosets.photoset}),
      );
  },[])

  const renderAlbums = () => {
    return photos.photoset.map((album) => (
      <AlbumDetail
        navigation={props.navigation}
        key={album.id}
        title={album.title._content}
        albumId={album.id}
      />
    ));
  }

    if(!photos.photoset) {
      return <Text>Loading...</Text>;
    }

    return (
      <View style={{flex: 1}}>
        <FlatList data={photos.photoset}
        renderItem={({item}) => renderAlbums(item)}/>
      </View>
    );
    
  }
  
  //<ScrollView>{renderAlbums(photos)}</ScrollView>

// AlbumList versión Componente
/*
class AlbumList extends Component {
  state = {photoset: null};

  componentWillMount() {
    axios
      .get(
        'https://api.flickr.com/services/rest/?method=flickr.photosets.getList&api_key=6e8a597cb502b7b95dbd46a46e25db8d&user_id=137290658%40N08&format=json&nojsoncallback=1',
      )
      .then((response) =>
        this.setState(response.data.photosets.photoset),
      );
  }

  renderAlbums() {
    return this.state.photoset.map((album) => (
      <AlbumDetail
        navigation={this.props.navigation}
        key={album.id}
        title={album.title._content}
        albumId={album.id}
      />
    ));
  }

  render() {
    console.log(this.state);

    if (!this.state.photoset) {
      return <Text>Loading...</Text>;
    }

    return (
      <View style={{flex: 1}}>
        <ScrollView>{this.renderAlbums()}</ScrollView>
      </View>
    );
  }
}*/

export default AlbumList;
