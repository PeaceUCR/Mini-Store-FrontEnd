import Taro, {useState} from '@tarojs/taro'
import {Image, Text, View} from "@tarojs/components";
import {useDispatch, useSelector} from "@tarojs/redux";
import { AtForm, AtInput, AtButton } from 'taro-ui'

import './index.scss';
import {SET_LOCATION} from "../../actions/type";

const AddressForm = (props) => {
  const dispatch = useDispatch()
  const location = useSelector(state => state.location);
  console.log(location);
  const {name, phone, address, province, city, district} = location;
  const [nameValue, setNameValue] = useState(name);
  const [phoneValue, setPhoneValue] = useState(phone);
  const [provinceValue, setProvinceValue] = useState(province);
  const [cityValue, setCityValue] = useState(city);
  const [districtValue, setDistrictValue] = useState(district);
  const [addressValue, setAddressValue] = useState('');

  const onSubmit = () => {
    dispatch({
      type: SET_LOCATION,
      data: {
        name: nameValue,
        phone: phoneValue,
        address:addressValue,
        province:provinceValue,
        city:cityValue,
        district:districtValue
      }
    });
    props.hideForm();
  }
  const onReset = () => {
      props.hideForm();
  }
  return (<View className='address-form'>
    <AtForm
      onSubmit={onSubmit}
      onReset={onReset}
    >
      <View><Text>收货信息</Text></View>
      <AtInput
        name='value'
        type='text'
        placeholder='收件人'
        value={nameValue}
        onChange={(value) => {
          setNameValue(value)
        }}
      />
      <AtInput
        name='value'
        type='text'
        placeholder='手机号'
        value={phoneValue}
        onChange={(value) => {
          setPhoneValue(value)
        }}
      />
      <AtInput
        name='value'
        type='text'
        placeholder='省'
        value={provinceValue}
        onChange={(value) => {
          setProvinceValue(value)
        }}
      />
      <AtInput
        name='value'
        type='text'
        placeholder='市'
        value={cityValue}
        onChange={(value) => {
          setCityValue(value)
        }}
      />
      <AtInput
        name='value'
        type='text'
        placeholder='区/县'
        value={districtValue}
        onChange={(value) => {
          setDistrictValue(value)
        }}
      />
      <AtInput
        name='value'
        type='text'
        placeholder='详细地址'
        value={addressValue}
        onChange={(value) => {
          setAddressValue(value)
        }}
      />
      <View className='cta'>
        <AtButton formType='reset'>取消</AtButton>
      </View>
      <View className='cta'>
        <AtButton formType='submit'>提交</AtButton>
      </View>
    </AtForm>
  </View>);
};

export default AddressForm;
