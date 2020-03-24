import Taro, { Component, useState, useEffect} from '@tarojs/taro'
import {Button, View, Image, Text} from "@tarojs/components";

import './index.scss';

// const itemImgUrl = 'https://res.cloudinary.com/mini-store-2020/image/upload/v1584811882/celery_i76ygd.png';
// const itemName = '香梨';
// const itemSales = 3;
// const itemPrice = 400;
// const itemPriceUnit = '500克'

const HomePageProductItem = (props) => {
  const {itemImgUrl, itemName, itemSales, itemPrice, itemPriceUnit} = props.product;

  return (<View className='home-page-product-item'>
      <Image className='image' src={itemImgUrl} mode='widthFix' />
      <View className='line'>
        <Text className='price'>￥{(itemPrice/100).toFixed(2)}</Text>
      </View>
      <View>
        <Text>{itemName}</Text>
        <Text>{itemPriceUnit}</Text>
      </View>
      <View>
        <Text className='sales'>{itemSales}人已购买</Text>
      </View>
  </View>);
};

export default HomePageProductItem;
