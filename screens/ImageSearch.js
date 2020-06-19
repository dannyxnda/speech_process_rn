import React, {useState, useEffect} from 'react';
import {View, StyleSheet, Image} from 'react-native';
import {WebView} from 'react-native-webview';

const ImageSearch = ({route}) => {
  // const [text, setText] = useState('');

  // useEffect(() => {
  //   if (text) {
  //     // call api to search image
  //   }
  // }, [text]);

  // return (
  //   <View style={styles.container}>
  //     <View style={styles.image_slide}>
  //       <Image style={styles.image} source={require('../asset/planet.jpg')} />
  //     </View>
  //   </View>
  // );

  return (
    <WebView
      source={{
        uri: `https://www.google.com/search?q=${
          route.params.text
        }&sxsrf=ALeKk02uMIddHWjjM-4zEVU9zxnmwHw2Bg:1592568331244&source=lnms&tbm=isch&sa=X&ved=2ahUKEwiq76et643qAhXaA4gKHUd8DvgQ_AUoAXoECA8QAw&biw=1920&bih=976`,
      }}
      // source={{html: '<h1>love<h1>'}}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image_slide: {
    flex: 4,
    alignItems: 'center',
    // justifyContent: 'center',
  },
  oneFlex: {
    flex: 1,
  },
  image: {
    margin: 10,
    height: 450,
    width: 350,
  },
});

export default ImageSearch;
