import { TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { COLORS } from '../constants'

const IconButton = ({containerStyle, icon, iconStyle, onPress}:any) => {
  return (
   <TouchableOpacity style={{
    alignItems:'center',
    justifyContent:'center',
    ...containerStyle
   }}
   onPress={onPress}
   >
<Image
source={icon}
resizeMode={"contain"}
style={{
    width:30,
    height:30,
    tintColor:COLORS.light,
    ...iconStyle
}}
/>
   </TouchableOpacity>
  )
}

export default IconButton