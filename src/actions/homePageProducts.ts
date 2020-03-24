import {SET_HOME_PAGE_PRODUCTS} from "./type";

export const setHomePageProducts = (products) => {
  return {
    type: SET_HOME_PAGE_PRODUCTS,
    data: products
  }
}
