import {SET_HOME_PAGE_PRODUCTS} from "./type";
import { getHomePageProducts } from '../service/api'

export const setHomePageProducts = () => {
  return dispatch => {
    getHomePageProducts().then((products) => {
      return dispatch({
        type: SET_HOME_PAGE_PRODUCTS,
        data: products
      });
    });
  }
}
