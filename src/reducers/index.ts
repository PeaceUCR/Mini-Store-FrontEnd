import { combineReducers } from 'redux'
import counter from './counter'
import token from './token'
import homePageProducts from './homePageProducts'

export default combineReducers({
  counter,
  token,
  homePageProducts
})
