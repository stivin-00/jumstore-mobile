/* eslint-disable prettier/prettier */
import React, {Component} from 'react';
import {StyleSheet, SafeAreaView, View} from 'react-native';
import FastImage from 'react-native-fast-image';

// import {SliderBox} from './components/SliderBox'; // for develop time, first add:>>    yarn add react-native-snap-carousel
import {SliderBox} from 'react-native-image-slider-box';


const images = [
    'https://res.cloudinary.com/dxjprordi/image/upload/v1648935251/jumstore/jumstorebanner3_eewkgz.jpg',
    'https://res.cloudinary.com/dxjprordi/image/upload/v1648935257/jumstore/jumstorebanner6_rwd2ww.jpg',
    'https://res.cloudinary.com/dxjprordi/image/upload/v1648935229/jumstore/jumstorebanner5_msygk3.jpg',
    'https://images.unsplash.com/photo-1542838132-92c53300491e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80',
    'https://images.pexels.com/photos/5650026/pexels-photo-5650026.jpeg?cs=srgb&dl=pexels-karolina-grabowska-5650026.jpg&fm=jpg',
    'https://images.pexels.com/photos/6869053/pexels-photo-6869053.jpeg?cs=srgb&dl=pexels-kindel-media-6869053.jpg&fm=jpg',
    'https://images.pexels.com/photos/5632398/pexels-photo-5632398.jpeg?cs=srgb&dl=pexels-karolina-grabowska-5632398.jpg&fm=jpg',
    'https://images.pexels.com/photos/5624985/pexels-photo-5624985.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  ];

export default function Slider() {
  return (
    <SafeAreaView style={styles.container} >
      <SliderBox
        ImageComponent={FastImage}
        images={images}
        sliderBoxHeight={160}
        onCurrentImagePressed={index => console.warn(`image ${index} pressed`)}
        //currentImageEmitter={index => console.warn(`image ${index} pressed`)}
        dotColor="#3b1369"
        inactiveDotColor="#90A4AE"
        paginationBoxVerticalPadding={20}
        paginationBoxStyle={{
          position: 'absolute',
          bottom: 0,
          padding: 0,
          alignItems: 'center',
          alignSelf: 'center',
          justifyContent: 'center',
          paddingVertical: 10,
        }}
        dotStyle={{
          width: 10,
          height: 10,
          borderRadius: 5,
          marginHorizontal: 0,
          padding: 0,
          margin: 0,
          backgroundColor: 'rgba(128, 128, 128, 0.92)',
        }}
        autoplay
        circleLoop
        ImageComponentStyle={{borderRadius: 15, width: '95%', marginTop: 5, alignSelf: 'center'}}
        imageLoadingColor="#3b1369"
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: 10,
  },
});
