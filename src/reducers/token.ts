import {SET_TOKEN} from "../actions/type";

const INITIAL_STATE = ''

export default function token (state = INITIAL_STATE, action) {
  switch (action.type) {
    case SET_TOKEN:
      return action.data
    default:
      return state
  }
}
