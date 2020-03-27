import {SET_CATEGORY_PAGE_PRODUCTS} from "../actions/type";


export const categoryPageProducts = (data) => {
  return {
    type: SET_CATEGORY_PAGE_PRODUCTS,
    data: data
  }
}
