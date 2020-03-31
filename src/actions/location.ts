import {SET_LOCATION} from "./type";

export const setLocation = (data) => {
  return {
    type: SET_LOCATION,
    data: data
  }
}
