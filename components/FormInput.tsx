import { View ,TextInput} from 'react-native'
import React from 'react'
import { FONTS,SIZES,COLORS } from '../constants'


const FormInput = ({
    containerStyle,
    inputContainerStyle,
    placeholder,
    inputStyle,
    value="",
    prependComponent,
    appendComponent,
    onChange,
    onPress,
    editable,
    secureTextEntry,
    keyboardType = "default",
    autoCompleteType= "off",
    autoCapitalize = "none",
    maxLength,
    placeholderTextColor =COLORS.grey60
}:any) => {

    const [state, setState] = React.useState(value)
  
    const editingEnd = ()=>{
        // value = state
        onChange(state)
        
    }
  return (
    <View style={{
        ...containerStyle
    }}>
        <View style={{flexDirection:'row', height:55, paddingHorizontal:SIZES.radius, alignItems:'center', backgroundColor:COLORS.lightGrey, ...inputContainerStyle}}>
            {prependComponent}

            <TextInput style={{
                flex:1,
                paddingVertical:0,
                ...FONTS.body3,
                ...inputStyle
            }}
            value={state}
            placeholder={placeholder}
            placeholderTextColor={placeholderTextColor}
            secureTextEntry={secureTextEntry}
            keyboardType={keyboardType}
            autoComplete={autoCompleteType}
            maxLength={maxLength}
            onChangeText={(text)=>setState(text)}
            onPressIn={onPress}
            editable={editable}
            onEndEditing={editingEnd}
            />
            {appendComponent}

        </View>
    </View>
  )
}

export default FormInput