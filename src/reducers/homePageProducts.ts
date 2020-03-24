import {SET_HOME_PAGE_PRODUCTS} from "../actions/type";

const INITIAL_STATE = [];

export default function homePageProducts (state = INITIAL_STATE, action) {
  switch (action.type) {
    case SET_HOME_PAGE_PRODUCTS:
      return action.data
    default:
      return state
  }
}
