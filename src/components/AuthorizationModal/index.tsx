import Taro, { Component, useState, useEffect } from '@tarojs/taro'
import {Button} from "@tarojs/components";
import { AtModal, AtModalHeader, AtModalContent, AtModalAction } from "taro-ui"
import './index.scss';
import {wechatLogin} from '../../service/api';

const AuthorizationModal= (isOpened) => {
  const [visibility, setVisibility] = useState(isOpened);

  const handleConfirm = (authResponse) => {
    if(authResponse.currentTarget.errMsg !== 'getUserInfo:ok') {
      return;
    }
    wechatLogin().then(() => {
      setVisibility(false)
    });
  }
  return (
    <AtModal isOpened={visibility}>
      <AtModalHeader>欢迎━(*｀∀´*)ノ亻!</AtModalHeader>
      <AtModalContent>
        第一次进入应用，请授权登陆~
      </AtModalContent>
      <AtModalAction><Button openType='getUserInfo' onGetUserInfo={handleConfirm}>确定</Button></AtModalAction>
    </AtModal>
    );
};

export default AuthorizationModal;
