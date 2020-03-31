import Taro from '@tarojs/taro'
import {Image, Input, Text, View} from "@tarojs/components";
import {useDispatch, useSelector} from '@tarojs/redux'

import classnames from 'classnames';

import './index.scss';

import cartImg from "../../static/cart.png"
import rightImg from "../../static/right.png"

const CartSum = (props) => {

  const dispatch = useDispatch();
  const cart = useSelector(state => state.cart);

  let sum = 0;
  let totalQuantity = 0;
  Object.keys(cart).forEach((itemId) => {
    sum = sum + cart[itemId].product.itemPrice * cart[itemId].quantity;
    totalQuantity = totalQuantity + cart[itemId].quantity;
  });

  totalQuantity = totalQuantity > 99 ? 99 : totalQuantity;

  const numberClass = classnames({isHidden: totalQuantity <= 0, 'cart-number': true});

  return (<View className='cart-sum'>
    <View className='sum-wrapper'>
      <View className='cart-image-container'>
        <Text className={numberClass}>{totalQuantity}</Text>
        <Image className='cart-image' src={cartImg} mode='widthFix' />
      </View>
      <View className='sum'>
        ￥<View className='sum-value'>{(sum/100).toFixed(2)}</View>
      </View>
    </View>
    <View className='check-out'>
      <Text className='text'>{props.cta}</Text>
      <Image className='right-image' src={rightImg} mode='widthFix' />
    </View>
  </View>);
};

export default CartSum;
