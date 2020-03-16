import {SET_TOKEN} from "./type";

export const setToken = (token) => {
  return {
    type: SET_TOKEN,
    data: token
  }
}
