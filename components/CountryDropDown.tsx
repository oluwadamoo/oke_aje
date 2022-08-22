import React from 'react';
import {
    View,
    TouchableOpacity,
    Text,
    Image,
    ViewStyle
} from 'react-native';

import { FONTS, SIZES, COLORS, icons } from "../constants"

interface CDI {
    containerStyle?:ViewStyle
    selectedCountry?:any
    onPress?:()=>void
}
const CountryDropDown = ({ containerStyle, selectedCountry, onPress }:CDI) => {
    return (
        <TouchableOpacity
            style={{
                flexDirection: 'row',
                height: SIZES.height > 800 ? 55 : 45,
                paddingHorizontal: SIZES.radius,
                borderRadius: SIZES.radius,
                alignItems: 'center',
                backgroundColor: COLORS.lightGrey,
                ...containerStyle
            }}
            onPress={onPress}
        >
            <View
                style={{
                    flex: 1,
                    flexDirection: 'row',
                    alignItems: 'center'
                }}
            >
                {!selectedCountry &&
                    <Text style={{ color: COLORS.grey, ...FONTS.body3 }}>Country</Text>
                }

                {selectedCountry &&
                    <>
                        <Image
                            source={{ uri: selectedCountry?.flag }}
                            resizeMode="cover"
                            style={{
                                width: 30,
                                height: 30,
                                borderRadius: SIZES.radius
                            }}
                        />
                        <Text style={{ flex: 1, marginLeft: SIZES.radius, ...FONTS.h3 }}>{selectedCountry?.name}</Text>
                    </>
                }
            </View>

            <Image
                source={icons.arrow_down_fill}
                style={{
                    width: 30,
                    height: 30
                }}
            />
        </TouchableOpacity>
    )
}

export default CountryDropDown;