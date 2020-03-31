import {SET_LOCATION} from "../actions/type";

const INITIAL_STATE = {}

export default function location (state = INITIAL_STATE, action) {
  switch (action.type) {
    case SET_LOCATION:
      return action.data
    default:
      return state
  }
}
