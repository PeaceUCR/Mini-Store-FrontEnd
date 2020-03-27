import {SET_CATEGORY_PAGE_PRODUCTS} from "../actions/type";

const INITIAL_STATE = [];

export default function categoryPageProducts (state = INITIAL_STATE, action) {
  switch (action.type) {
    case SET_CATEGORY_PAGE_PRODUCTS:
      return action.data
    default:
      return state
  }
}
