import { combineReducers } from 'redux'
import counter from './counter'
import token from './token'

export default combineReducers({
  counter,
  token
})
