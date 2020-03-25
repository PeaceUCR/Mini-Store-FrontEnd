import Taro, { setStorageSync, getStorageSync, login } from '@tarojs/taro';
import { get, put, post, handleOtherError } from './httpManager';

export interface LoginResponse {
  hasUnion: boolean
  isInit: boolean
  jwt: string
  isNew: boolean
  uid: string
}

interface UserInfoRequest {
  signature: string
  rawData: string
  encryptedData: string
  iv: string
}



export async function wechatLogin() {
  if(getStorageSync('token')) {
    return getStorageSync('token');
  }
  const res = await login();
  const userInfo = await Taro.getUserInfo();
  const {code} = res;
  const { signature, rawData, encryptedData, iv } = userInfo;
  const token = await post('/user/wechatLogin',{code, signature, rawData, encryptedData, iv});
  setStorageSync('token', token);
  return token;
}

export async function getHomePageProducts() {
  return await get('/items?limit=6', {});
}

export async function getCurrentUser() {
  return await get('/user/current', {});
}
