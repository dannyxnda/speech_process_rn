import React, {useState, useEffect} from 'react';
import {
  View,
  Alert,
  StyleSheet,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
} from 'react-native';
import YouTube from 'react-native-youtube';
const YOUTUBE_API_KEY = 'AIzaSyBGZ3EepFcc8lyRrS3hfwu6doSooeZpMA0';

const VideoSearch = ({route}) => {
  const [state, setState] = useState({});
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({});
  const [vidId, setVidId] = useState();

  const getVid = () => {
    fetch(
      `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=10&q=${
        route.params.text
      }&type=video&key=${YOUTUBE_API_KEY}`,
    )
      .then(response => response.json())
      .then(resJson => {
        setLoading(false);
        setData(resJson);
        console.log(resJson);
      })
      .catch(e => {
        setLoading(false);
        Alert.alert(e);
      });
  };

  useEffect(() => {
    getVid();
  }, []);

  return (
    <View style={styles.container}>
      {loading ? (
        <Text style={styles.loading}>Fetching data...</Text>
      ) : (
        <View style={styles.video}>
          {vidId && (
            <YouTube
              apiKey={'AIzaSyBGZ3EepFcc8lyRrS3hfwu6doSooeZpMA0'}
              videoId={vidId} // The YouTube video ID
              play // control playback of video with true/false
              // fullscreen // control whether the video should play in fullscreen or inline
              loop // control whether the video should loop when ended
              onReady={e => setState({...state, isReady: true})}
              onChangeState={e => setState({...state, status: e.state})}
              onChangeQuality={e => setState({...state, quality: e.quality})}
              onError={e => setState({...state, error: e.error})}
              style={styles.youtube}
            />
          )}
          <FlatList
            data={data.items}
            renderItem={({item}) => (
              <TouchableOpacity
                style={styles.div}
                key={data.items.indexOf(item)}
                onPress={() => setVidId(item.id.videoId)}>
                <Image
                  style={styles.thumbnail}
                  source={{uri: item.snippet.thumbnails.default.url}}
                />
                <Text>{item.snippet.description.substring(0, 90)}</Text>
              </TouchableOpacity>
            )}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // alignItems: 'center',
  },
  youtube: {alignSelf: 'stretch', height: 300},
  loading: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  thumbnail: {
    width: 60,
    height: 45,
  },
  div: {
    borderBottomWidth: 1,
    borderBottomColor: '#55AAFF',
    padding: 10,
    flexDirection: 'row',
  },
});

export default VideoSearch;
