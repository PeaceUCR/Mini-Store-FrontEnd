import { ComponentClass } from 'react'
import Taro, { Component, Config } from '@tarojs/taro'
import { View, Button, Text } from '@tarojs/components'
import { connect, bindActionCreators } from '@tarojs/redux'

import { AtSearchBar } from 'taro-ui'
import {get} from 'lodash';


import HomeSlider from '../../components/HomeSlider'
import HomePageProductItem from '../../components/HomePageProductItem'

import './index.scss'
import AuthorizationModal from "../../components/AuthorizationModal";
import { setToken } from '../../actions/token'
import {setHomePageProducts} from '../../actions/homePageProducts'
import getStorageSync = Taro.getStorageSync;
import { getHomePageProducts } from '../../service/api'
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
  token: string
  homePageProducts: any
}

type PageDispatchProps = {
  setToken: (string) => any
  setHomePageProducts: () => any
}

type PageOwnProps = {}

type PageState = {
  searchValue: string
  currentTab: number
}

type IProps = PageStateProps & PageDispatchProps & PageOwnProps

interface Index {
  props: IProps
}

const mapStateToProps = (state) => ({
  token: get(state, 'token'),
  homePageProducts: get(state, 'homePageProducts')
});
const mapDispatchToProps = (dispatch) => ({
  setToken (data) {
    dispatch(setToken(data));
  },
  setHomePageProducts () {
    dispatch(setHomePageProducts());
  }
});
@connect(mapStateToProps, mapDispatchToProps)
class Index extends Component {

    /**
   * 指定config的类型声明为: Taro.Config
   *
   * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
   * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
   * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
   */
    config: Config = {
    navigationBarTitleText: '首页'
  }

  state = {
      searchValue: '',
      currentTab: 0
  }

  componentWillReceiveProps (nextProps) {
    console.log(this.props, nextProps)
  }

  componentWillUnmount () { }

  componentDidShow () {
    this.props.setToken(getStorageSync('token'))
    this.props.setHomePageProducts();
  }

  componentDidHide () { }

  onSearchValueChange = (value) => {
    this.setState({
      searchValue: value
    })
  }

  onActionClick = () => {
    console.log('开始搜索');
  }
// <AtTabBar
// fixed
// tabList={[
//   { title: '待办事项', text: 8 },
//   { title: '拍照' },
//   { title: '通讯录', dot: true }
// ]}
// onClick={this.handleClick}
// current={this.state.currentTab}
// />
// <Button className='add_btn' onClick={this.props.add}>+</Button>
// <Button className='dec_btn' onClick={this.props.dec}>-</Button>
// <Button className='dec_btn' onClick={this.props.asyncAdd}>async</Button>
// <View><Text>{this.props.counter.num}</Text></View>
// <View><Text>Hello, World</Text></View>
  render () {
    const {token, homePageProducts} = this.props;
    const column1 = homePageProducts.slice(0, homePageProducts.length/2);
    const column2 = homePageProducts.slice(homePageProducts.length/2, homePageProducts.length);
    const showAuthorizationModal = token ? false : true;
    return (
      <View className='index'>
        <HomeSlider />
        <AtSearchBar
          actionName='搜一下'
          value={this.state.searchValue}
          onChange={this.onSearchValueChange}
          onActionClick={this.onActionClick.bind(this)}
        />
        {showAuthorizationModal  && <AuthorizationModal />}
        <View className='products-container'>
          <View>
            {column1.map((product) => {
              return (<HomePageProductItem product={product} />)
            })}
          </View>
          <View>
            {column2.map((product) => {
              return (<HomePageProductItem product={product} />)
            })}
          </View>
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

export default Index
// as ComponentClass<PageOwnProps, PageState>
