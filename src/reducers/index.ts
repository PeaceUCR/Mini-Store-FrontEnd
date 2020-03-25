import { combineReducers } from 'redux'
import counter from './counter'
import token from './token'
import homePageProducts from './homePageProducts'
import user from './user'

export default combineReducers({
  counter,
  token,
  homePageProducts,
  user
})
