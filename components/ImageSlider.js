import React from 'react';
import { View, Image, StyleSheet, Dimensions } from 'react-native';
import Swiper from 'react-native-swiper';
import { images } from "../data/data";

const { width } = Dimensions.get("window");

const ImageSlider = ({height=200}) => {
  return (
    <View style={{ height: 200 }}>
      <Swiper autoplay autoplayTimeout={4} showsPagination={true} dotColor="#ccc" activeDotColor="#000">
        {images.map((img , idx)=>{
            return(
                <Image style={[styles.image , {height}]} source={{ uri: img }} key={idx} />
            )
        })}
        
      </Swiper>
    </View>
  );
};

export default ImageSlider;

const styles = StyleSheet.create({
  image: {
    width: width,
    height: 200,
    resizeMode: 'cover',
  },
});
