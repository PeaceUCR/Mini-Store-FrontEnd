import {SET_USER} from "./type";
import { getCurrentUser } from '../service/api'

export const setUser = () => {
  return dispatch => {
    getCurrentUser().then((user) => {
      return dispatch({
        type: SET_USER,
        data: user
      });
    });
  }
}
