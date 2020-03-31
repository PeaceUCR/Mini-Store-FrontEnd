import Taro, {Component, Config, setStorageSync, getStorageSync} from '@tarojs/taro'
import {View} from '@tarojs/components'
import {connect} from '@tarojs/redux'
import classnames from 'classnames'
import {AtSearchBar} from "taro-ui";

import {get, isEmpty} from 'lodash';
import {categoryPageProducts} from '../../actions/categoryPageProducts';
import {geCategoryPageProducts} from '../../service/api';
import CategoryPageProductItem from '../../components/CategoryPageProductItem'
import CartSum from '../../components/CartSum'
import './index.scss'
import {SET_PRODUCT_QUANTITY} from "../../actions/type";


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
  categoryPageProducts: any
  cart: any
}

type PageDispatchProps = {
  setCategoryPageProducts: () => any
  setProductQuantity: (any) => any
}

type PageOwnProps = {}

type PageState = {
  searchValue: string
  currentTab: string
}

type IProps = PageStateProps & PageDispatchProps & PageOwnProps

interface CategoryPage {
  props: IProps
}

const categories = ['全部', '水果', '蔬菜', '零食'];

const mapStateToProps = (state) => ({
  categoryPageProducts: get(state, 'categoryPageProducts'),
  cart: get(state, 'cart')
});
const mapDispatchToProps = (dispatch) => ({
  setCategoryPageProducts(data) {
    dispatch(categoryPageProducts(data));
  },
  setProductQuantity(data) {
    dispatch({
      type: SET_PRODUCT_QUANTITY,
      data: data
    })
  }
});

@connect(mapStateToProps, mapDispatchToProps)
class CategoryPage extends Component {

  /**
   * 指定config的类型声明为: Taro.Config
   *
   * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
   * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
   * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
   */
  config: Config = {
    navigationBarTitleText: '分类',
  };

  state = {
    searchValue: '',
    currentTab: '全部'
  };

  componentWillReceiveProps(nextProps) {
    console.log(this.props, nextProps)
  }

  componentWillUnmount() {
  }

  componentDidShow() {
    geCategoryPageProducts().then((products) => {
      this.props.setCategoryPageProducts(products);
    });

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

  onSelectTab = (category) => {
    this.setState({
      currentTab: category
    }, () => {
      this.onSearch();
    });

  };

  onSearch = () => {
    const {searchValue, currentTab} = this.state
    geCategoryPageProducts(currentTab, searchValue).then((products) => {
      this.props.setCategoryPageProducts(products);
    })
  }

  onSearchValueChange = (value) => {
    this.setState({
      searchValue: value
    })
  }

  render() {
    const {categoryPageProducts} = this.props;
    const {currentTab} = this.state;
    return (
      <View className='category-page'>
        <AtSearchBar
          actionName='搜一下'
          value={this.state.searchValue}
          onChange={this.onSearchValueChange}
          onActionClick={this.onSearch}
        />
        <View className='category-column'>
          {categories.map((category, index) => {
            const tabClass = classnames({category: true, active: currentTab === category});
            return (<View className={tabClass} key={'category-' + index} onClick={() => {this.onSelectTab(category)}}>{category}</View>)
          })}
        </View>
        <View className='category-content'>
          {categoryPageProducts.map((product, index) => {
            return (<View key={`category-${index}`}>
              <CategoryPageProductItem product={product}/>
            </View>)
          })}
        </View>
        <View className='footer'>
          <CartSum cta='去结算' />
        </View>
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

export default CategoryPage
// as ComponentClass<PageOwnProps, PageState>
