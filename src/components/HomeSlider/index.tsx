import Taro, { Component } from '@tarojs/taro'
import { Swiper, View, SwiperItem, Image } from '@tarojs/components';
import './index.scss';

const imgs = [
  "https://res.cloudinary.com/mini-store-2020/image/upload/v1584546689/b1_blm2dp-min_u57clc.png",
  "https://res.cloudinary.com/mini-store-2020/image/upload/v1584546689/b2_s6sb9k-min_jvwuco.png",
  "https://res.cloudinary.com/mini-store-2020/image/upload/v1584546689/b3_shdvoe-min_ceoebx.png"
];

const HomeSlider = () => {
  return (
    <Swiper className='swiper' interval={5000} duration={800} indicatorDots autoplay circular>
      {
        imgs.map((img) => {
          return (<View key={`swiper-image-${img}`}>
            <SwiperItem>
              <Image src={img} className='slide-image' />
            </SwiperItem>
          </View>)
        })
      }
    </Swiper>);
};

export default HomeSlider;
