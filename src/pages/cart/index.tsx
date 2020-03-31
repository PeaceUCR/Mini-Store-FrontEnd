import Taro, {Component, Config, getStorageSync, setStorageSync} from '@tarojs/taro'
import {View} from '@tarojs/components'
import {connect} from '@tarojs/redux'

import {get, isEmpty} from 'lodash';


import {setLocation} from '../../actions/location';
import LocationPicker from '../../components/LocationPicker';

import './index.scss'
import qqmapsdk from "../../service/qqMap";
import CategoryPageProductItem from "../../components/CategoryPageProductItem";
import {SET_PRODUCT_QUANTITY} from "../../actions/type";
import CartSum from "../../components/CartSum";
import AddressForm from "../../components/AddressForm";


// #region 书写注意
//
// 目前 typescript 版本还无法在装饰器模式下将 Props 注入到 Taro.Component 中的 props 属性
// 需要显示声明 connect 的参数类型并通过 interface 的方式指定 Taro.Component 子类的 props
// 这样才能完成类型检查和 IDE 的自动提示
// 使用函数模式则无此限制
// ref: https://github.com/DefinitelyTyped/DefinitelyTyped/issues/20796
//
// #endregion

type PageStateProps = {
  location: any
  cart: any
}

type PageDispatchProps = {
  setLocation: ({}) => any
  setProductQuantity: ({}) => any
  location: any
  cart: any
}

type PageOwnProps = {}

type PageState = {
  openForm: boolean
}

type IProps = PageStateProps & PageDispatchProps & PageOwnProps

interface CartPage {
  props: IProps
}

const mapStateToProps = (state) => ({
  location: get(state, 'location'),
  cart: get(state, 'cart')
});
const mapDispatchToProps = (dispatch) => ({
  setLocation(data) {
    dispatch(setLocation(data));
  },
  setProductQuantity(data) {
    dispatch({
      type: SET_PRODUCT_QUANTITY,
      data: data
    })
  }
});

@connect(mapStateToProps, mapDispatchToProps)
class CartPage extends Component {

  /**
   * 指定config的类型声明为: Taro.Config
   *
   * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
   * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
   * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
   */
  config: Config = {
    navigationBarTitleText: '我的',
  };

  state = {
    openForm: false
  };

  componentWillReceiveProps(nextProps) {
    console.log(this.props, nextProps)
  }

  componentWillUnmount() {
  }

  componentDidShow() {
    if (isEmpty(this.props.location)) {
      Taro.getLocation({}).then((response) => {
        const {latitude, longitude} = response;
        qqmapsdk.reverseGeocoder({
          location: {
            latitude,
            longitude
          },
          success: (res) => {
            const address = res.result.formatted_addresses.recommend;
            const addressComponent = res.result.address_component;
            const {province, city, district, street} = addressComponent;
            this.props.setLocation({
              address,
              province,
              city,
              district
            })
          },
          fail: (err) => {
            console.log(err);
            Taro.showToast({
              title: '获取地址失败',
              icon: 'none',
              duration: 2000
            })
          }
        });
      }).catch((err) => {
        console.log(err);
        Taro.showToast({
          title: '获取地址失败',
          icon: 'none',
          duration: 2000
        })
      });
    }

    if(isEmpty(this.props.cart)) {
      const savedCart = getStorageSync('cart');
      if(savedCart) {
        this.props.setProductQuantity(savedCart);
      }
    }
  }

  componentDidHide() {
    setStorageSync('cart', this.props.cart)
  }

  showForm = () => {
    this.setState({
      openForm: true
    })
  }

  hideForm = () => {
    this.setState({
      openForm: false
    })
  }

  render() {
    const {cart} = this.props;
    const {openForm} = this.state;
    return (
      <View className='cart-page'>
        <LocationPicker showForm={this.showForm} />
        <View className='cart-list'>{
          Object.keys(cart).map((itemId, index) => {
            const {product} = cart[itemId];
            return (<View key={`cart-${index}`}>
              <CategoryPageProductItem product={product} isCart/>
            </View>)
          })
        }</View>
        <View className='footer'>
          <CartSum cta='去下单' />
        </View>
        {openForm && <AddressForm hideForm={this.hideForm} />}
      </View>
    )
  }
}

// #region 导出注意
//
// 经过上面的声明后需要将导出的 Taro.Component 子类修改为子类本身的 props 属性
// 这样在使用这个子类时 Ts 才不会提示缺少 JSX 类型参数错误
//
// #endregion

export default CartPage
// as ComponentClass<PageOwnProps, PageState>
