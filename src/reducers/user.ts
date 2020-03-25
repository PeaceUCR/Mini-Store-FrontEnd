import {SET_USER} from "../actions/type";

const INITIAL_STATE = null

export default function user (state = INITIAL_STATE, action) {
  switch (action.type) {
    case SET_USER:
      return action.data
    default:
      return state
  }
}
