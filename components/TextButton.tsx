import React from 'react';
import {
    TouchableOpacity,
    Text,
    StyleSheet,
    ViewStyle,
    TextStyle
} from 'react-native';
import { FONTS, COLORS } from "../constants";

interface TextButtonInterface {
    contentContainerStyle?: ViewStyle,
    disabled?:boolean,
    label?:string
    labelStyle?:TextStyle
    onPress?:()=>void
}
const TextButton = ({
    contentContainerStyle,
    disabled,
    label,
    labelStyle,
    onPress
}:TextButtonInterface) => {
    return (
        <TouchableOpacity
            style={{
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: COLORS.primary,
                ...contentContainerStyle
            }}
            disabled={disabled}
            onPress={onPress}
        >
            <Text style={{ color: COLORS.secondary, ...FONTS.h3, ...labelStyle }}>
                {label}
            </Text>
        </TouchableOpacity>
    )
}

export default TextButton;