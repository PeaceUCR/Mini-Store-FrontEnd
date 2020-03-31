import {UPDATE_PRODUCT_QUANTITY, SET_PRODUCT_QUANTITY} from "../actions/type";

const INITIAL_STATE = {};
// {itemId: {product, quantity}}

export default function cart (state = INITIAL_STATE, action) {
  switch (action.type) {
    case SET_PRODUCT_QUANTITY:
      return action.data
    case UPDATE_PRODUCT_QUANTITY:
      const newState = {...state};
      const {product, quantity} = action.data;// {product, quantity}
      const preProduct = newState[product.itemId];

      if(preProduct) {
        preProduct.quantity = quantity
      } else {
        newState[product.itemId] = {
          product: product,
          quantity: quantity
        }
      }

      return newState
    default:
      return state
  }
}

