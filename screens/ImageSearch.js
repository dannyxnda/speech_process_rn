import React, {useState, useEffect} from 'react';

import {
  Text,
  View,
  Image,
  Alert,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';

const GOOGLE_IMG_API_KEY2 = 'AIzaSyA1RIYqhDW_gzdIBaJh1VQL52zsW7zdcb8';

const Imagesearch = ({route, navigation}) => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({});

  const [currentImg, setCurrentImg] = useState(0);

  const getImages = () => {
    fetch(
      `https://customsearch.googleapis.com/customsearch/v1?key=${GOOGLE_IMG_API_KEY2}&cx=003065293810097962413:vnsaycilphc&q=${
        route.params.text
      }&searchType=image&imgSize=medium&num=9`,
    )
      .then(response => response.json())
      .then(resJson => {
        setLoading(false);
        setData(resJson);
      })
      .catch(e => {
        setLoading(false);
        Alert.alert(e);
      });
  };

  useEffect(() => {
    getImages();
  }, []);

  const styles = StyleSheet.create({
    container: {
      alignItems: 'center',
      flex: 1,
      marginHorizontal: 5,
      justifyContent: 'center',
    },
    content: {
      flex: 7,
    },
    imageContainer: {
      flex: 3,
      margin: 10,
      paddingBottom: 20,
      justifyContent: 'center',
      borderBottomWidth: 3,
      borderBottomColor: '#55AAFF',
    },
    img: {
      width: 350,
      height:
        data && data.items && data.items[currentImg]
          ? (data.items[currentImg].image.height * 350) /
            data.items[currentImg].image.width
          : 50,
    },
    reload: {
      flex: 1,
    },
    listImg: {
      flex: 3,
      flexDirection: 'row',
      justifyContent: 'space-around',
      flexWrap: 'wrap',
      alignItems: 'center',
    },
  });

  return (
    <View style={styles.container}>
      {data && data.items && data.items[currentImg] ? (
        <View style={styles.content}>
          <View style={styles.imageContainer}>
            <Image
              style={styles.img}
              source={{
                uri: data.items[currentImg].link,
              }}
            />
          </View>
          <View style={styles.listImg}>
            {data.items.map((item, index) => (
              <TouchableOpacity
                key={item.link}
                onPress={() => setCurrentImg(index)}>
                <Image
                  style={{
                    width: item.image.thumbnailWidthx || '100%',
                    height: item.image.thumbnailHeight || 200,
                    aspectRatio: 1,
                  }}
                  source={{uri: item.link}}
                />
              </TouchableOpacity>
            ))}
          </View>
        </View>
      ) : (
        <Text>{loading ? 'Fetching data...' : 'Error :['}</Text>
      )}
      {/* <View style={styles.reload}>
        {!loading && (
          <TouchableOpacity
            onPress={() => {
              setData({});
              getImages;
            }}>
            <Icon name="rotate-left" size={50} color="#FFC0CB" />
          </TouchableOpacity>
        )}
      </View> */}
    </View>
  );
};

export default Imagesearch;
