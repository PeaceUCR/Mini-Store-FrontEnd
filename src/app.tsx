import Taro, { Component, Config } from '@tarojs/taro'
import { Provider } from '@tarojs/redux'

import Index from './pages/index'

import configStore from './store'

import './app.scss'

// 如果需要在 h5 环境中开启 React Devtools
// 取消以下注释：
// if (process.env.NODE_ENV !== 'production' && process.env.TARO_ENV === 'h5')  {
//   require('nerv-devtools')
// }

const store = configStore()

class App extends Component {

  /**
   * 指定config的类型声明为: Taro.Config
   *
   * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
   * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
   * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
   */
  config: Config = {
    pages: [
      'pages/cart/index',
      'pages/index/index',
      'pages/category/index',
      'pages/user/index'
    ],
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#AB956D',
      navigationBarTextStyle: 'white'
    },
    tabBar: {
      color: '#b7b7b7',
      selectedColor: '#AB956D',
      borderStyle: 'white',
      backgroundColor: '#f5f5f5',
      list: [
        {
          pagePath: 'pages/index/index',
          iconPath: 'static/home.png',
          selectedIconPath: 'static/home-highlight.png',
          text: '主页'
        },
        {
          pagePath: 'pages/category/index',
          iconPath: 'static/category.png',
          selectedIconPath: 'static/category-highlight.png',
          text: '分类'
        },
        {
          pagePath: 'pages/cart/index',
          iconPath: 'static/cart.png',
          selectedIconPath: 'static/cart-highlight.png',
          text: '购物车'
        },
        {
          pagePath: 'pages/user/index',
          iconPath: 'static/user.png',
          selectedIconPath: 'static/user-highlight.png',
          text: '我的'
        }
      ]
    },
    permission: {
      "scope.userLocation": {
        "desc": "你的位置信息将用于小程序位置接口的效果展示"
      }
    }
  }

  componentDidMount () {}

  componentDidShow () {}

  componentDidHide () {}

  componentDidCatchError () {}

  // 在 App 类中的 render() 函数没有实际作用
  // 请勿修改此函数
  render () {
    return (
      <Provider store={store}>
        <Index />
      </Provider>
    )
  }
}

Taro.render(<App />, document.getElementById('app'))
