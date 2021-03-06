import { combineReducers } from 'redux'
import counter from './counter'
import token from './token'
import homePageProducts from './homePageProducts'
import user from './user'
import categoryPageProducts from './categoryPageProducts'
import cart from './cart'
import location from './location'

export default combineReducers({
  counter,
  token,
  homePageProducts,
  user,
  categoryPageProducts,
  cart,
  location
})
