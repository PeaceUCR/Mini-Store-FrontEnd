import Taro, { setStorageSync, getStorageSync, login } from '@tarojs/taro';
import { get, put, post, handleOtherError } from './httpManager';
import { GetUserInfo } from '../utils/user';

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
    return ;
  }
  const res = await login();
  const userInfo = await Taro.getUserInfo();
  const {code} = res;
  const { signature, rawData, encryptedData, iv } = userInfo;
  const token = await post('/user/wechatLogin',{code, signature, rawData, encryptedData, iv});
  setStorageSync('token', token);
}


