import Taro, { Component, useState, useEffect} from '@tarojs/taro'
import {Button} from "@tarojs/components";
import { AtModal, AtModalHeader, AtModalContent, AtModalAction } from "taro-ui"
import './index.scss';
import {wechatLogin} from '../../service/api';
import {setToken} from "../../actions/token";
import { useDispatch } from '@tarojs/redux'

const AuthorizationModal= () => {

  // const [visibility, setVisibility] = useState(isOpened);
  const dispatch = useDispatch()

  const handleConfirm = (authResponse) => {
    if(authResponse.currentTarget.errMsg !== 'getUserInfo:ok') {
      return;
    }
    wechatLogin().then((token) => {
      console.log(token);
      dispatch(setToken(token));
    });
  }
  return (
    <AtModal isOpened>
      <AtModalHeader>欢迎━(*｀∀´*)ノ亻!</AtModalHeader>
      <AtModalContent>
        第一次进入应用，请授权登陆~
      </AtModalContent>
      <AtModalAction><Button openType='getUserInfo' onGetUserInfo={handleConfirm}>确定</Button></AtModalAction>
    </AtModal>
    );
};

export default AuthorizationModal;
