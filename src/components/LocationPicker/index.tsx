import Taro from '@tarojs/taro'
import {Image, Text, View} from "@tarojs/components";
import {useSelector} from "@tarojs/redux";
import classnames from 'classnames'

import './index.scss';
import gpsImg from "../../static/gps.png";
import editImg from "../../static/edit.png";
import alertImg from "../../static/alert.png";

const LocationPicker = (props) => {
  const location = useSelector(state => state.location);

  const {name, phone, address, province, city, district} = location;

  const isValid = (name && phone && address)
  const wrapperClass = classnames({invalid: !isValid, 'location-picker': true});
  return (<View className={wrapperClass}>
    <Image className='edit-image' src={editImg} mode='widthFix' onClick={props.showForm} />
    <View className='gps-image-wrapper'>
      <Image className='gps-image' src={gpsImg} mode='widthFix'/>
    </View>
    <View>
      <View className='receiver'>
        <Text className='name'>{name}</Text>
        {phone && <Text className='phone'>{phone}</Text>}
        {!name && <View className='hint'><Text>收件人姓名</Text><Image className='alert-image' src={alertImg} mode='widthFix' /></View> }
        {!phone && <View className='hint'><Text>收件人手机号</Text><Image className='alert-image' src={alertImg} mode='widthFix' /></View> }
      </View>
      <View className='overview'>{province}{city}{district}</View>
      <View className='detail'>
        <Text>{address}</Text>
        {!address && <View className='hint'><Text>详细收件地址</Text><Image className='alert-image' src={alertImg} mode='widthFix' /></View> }
      </View>
    </View>
  </View>);
};

export default LocationPicker;
