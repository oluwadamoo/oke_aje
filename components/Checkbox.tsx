import { View, TouchableOpacity, Text, Image } from 'react-native'

import React from 'react'
import { COLORS, FONTS, icons, SIZES } from '../constants'

const Checkbox = ({ containerStyle, isSelected, onPress }: any) => {
    return (
        <TouchableOpacity
            style={{
                flexDirection: "row",
                ...containerStyle
            }}
            onPress={onPress}
        >
            <View
                style={{
                    width: 25,
                    height: 25,
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: SIZES.base,
                    borderWidth: 3,
                    borderColor: isSelected ? COLORS.primary : COLORS.grey,
                    backgroundColor: isSelected ? COLORS.primary : 'transparent'
                }}
            >
                {isSelected && <Image
                    source={icons.checkmark}
                    style={{
                        width: 20,
                        height: 20,
                        tintColor: COLORS.light
                    }}
                />}
            </View>

            <Text style={{
                flex:1,
                marginLeft:SIZES.base,
                ...FONTS.body5,
                lineHeight:20
            }}>
                By registering, you agree to our Terms and that you have read our Data Use Policy
            </Text>
        </TouchableOpacity>
    )
}

export default Checkbox