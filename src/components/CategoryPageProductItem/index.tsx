import Taro from '@tarojs/taro'
import {Image, Input, Text, View} from "@tarojs/components";
import {useDispatch, useSelector} from '@tarojs/redux'

import classnames from 'classnames';

import './index.scss';

import buttonAdd from '../../static/button-add.png';
import buttonRemove from '../../static/button-remove.png';
import {UPDATE_PRODUCT_QUANTITY} from "../../actions/type";

const CategoryPageProductItem = (props) => {
  if (!props.product) {
    return;
  }
  const dispatch = useDispatch();
  const cart = useSelector(state => state.cart);

  const {itemId, itemImgUrl, itemName, itemPrice, itemPriceUnit} = props.product;

  const cartProduct = cart[itemId] ? cart[itemId] : {product: props.product, quantity: 0};

  const buttonClass = classnames({isHidden: cartProduct.quantity <= 0});

  const onQuantityAdd = () => {
    cartProduct.quantity = cartProduct.quantity + 1;
    dispatch({
      type: UPDATE_PRODUCT_QUANTITY,
      data: cartProduct
    })
  };

  const onQuantityRemove = () => {
    cartProduct.quantity = cartProduct.quantity - 1;
    dispatch({
      type: UPDATE_PRODUCT_QUANTITY,
      data: cartProduct
    })
  };
  return (<View className='category-page-product-item'>
    <Image className='image' src={itemImgUrl} mode='widthFix'/>
    <View className='content'>
      <View>
        <Text className='name'>{itemName}</Text>
        <Text className='price-unit'>{itemPriceUnit}</Text>
      </View>
      <View className='line'>
        <Text className='price'>￥{(itemPrice / 100).toFixed(2)}</Text>
      </View>
      <View className='float-buttons'>
        <View className={buttonClass}>
          <Image className='button button-remove' src={buttonRemove} mode='widthFix' onClick={onQuantityRemove}/>
          <Input
            className='quantity-input'
            disabled
            type='number'
            maxLength='2'
            value={cartProduct.quantity}
          />
        </View>
        <Image className='button button-add' src={buttonAdd} mode='widthFix' onClick={onQuantityAdd}/>
      </View>
    </View>
  </View>);
};

export default CategoryPageProductItem;
