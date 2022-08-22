import React from 'react';
import {
    View,
    Text,
    Modal,
    TouchableWithoutFeedback,
    FlatList,
    TouchableOpacity,
    Image,
    StyleSheet
} from 'react-native';

import { MotiView, useAnimationState } from 'moti';
import { Shadow } from 'react-native-shadow-2';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import {
    CountryDropDown, TextButton, FormInput, IconButton, Checkbox
} from "../../components";
import { COLORS, FONTS, icons, images, SIZES } from '../../constants';

const AuthMain = ({navigation}:any) => {

    // Country
    const [countries, setCountries] = React.useState<any>([])
    const [showCountryModal, setShowCountryModal] = React.useState(false)
    const [selectedCountry, setSelectedCountry] = React.useState<any>(null)

    // state
    const [mode, setMode] = React.useState("signIn")
    const [isVisible, setIsVisible] = React.useState(false)
    const [termsChecked, setTermsChecked] = React.useState(false)

    const [email, setEmail] = React.useState("")
    const [name, setName] = React.useState("")
    const [password, setPassword] = React.useState("")
    const [phone, setPhone] = React.useState("")
    // animation state
    const animationState = useAnimationState<any>({
        signIn: {
            height: SIZES.height * 0.55
        },
        signUp: {
            height: SIZES.height * 0.75
        }
    })
    React.useEffect(() => {
        // Fetch countires
        fetch("https://restcountries.com/v2/all")
            .then(response => response.json())
            .then(data => {
                let countryData = data.map((item: { alpha2Code: any; name: any; callingCodes: any[]; }) => {
                    return {
                        code: item.alpha2Code,
                        name: item.name,
                        callingCode: `+${item.callingCodes[0]}`,
                        flag: `https://countryflagsapi.com/png/${item.alpha2Code}`
                    }
                })

                setCountries(countryData)
            })
    }, [])

    React.useEffect(() => {
        animationState.transitionTo("signIn")
    }, [])
    // Render

    function RenderCountryModal() {
        return (
            <Modal
                animationType="slide"
                transparent={true}
                visible={showCountryModal}
            >
                <TouchableWithoutFeedback
                    onPress={() => setShowCountryModal(false)}
                >
                    <View
                        style={{
                            flex: 1,
                            alignItems: 'center',
                            justifyContent: 'center',
                            backgroundColor: COLORS.dark80
                        }}
                    >
                        <View
                            style={{
                                height: 400,
                                width: SIZES.width * 0.8,
                                backgroundColor: COLORS.light,
                                borderRadius: SIZES.radius
                            }}
                        >
                            <FlatList
                                data={countries}
                                keyExtractor={(item) => item.code}
                                contentContainerStyle={{
                                    paddingHorizontal: SIZES.padding,
                                    paddingBottom: SIZES.padding,
                                }}
                                renderItem={({ item }) => {
                                    return (
                                        <TouchableOpacity
                                            style={{
                                                flexDirection: 'row',
                                                alignItems: 'center',
                                                marginTop: SIZES.radius
                                            }}
                                            onPress={() => {
                                                setSelectedCountry(item)
                                                setShowCountryModal(false)
                                            }}
                                        >
                                            <Image
                                                source={{ uri: item.flag }}
                                                resizeMode="contain"
                                                style={{
                                                    width: 40,
                                                    height: 30
                                                }}
                                            />
                                            <Text style={{ flex: 1, marginLeft: SIZES.radius, ...FONTS.body3 }}>{item.name}</Text>
                                        </TouchableOpacity>
                                    )
                                }}
                            />
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </Modal>
        )
    }

    function RenderSignIn() {
        return (
            <MotiView
                state={animationState}
                style={{
                    marginTop: SIZES.padding,
                    height: SIZES.height * 0.55
                }}
            >
                <Shadow>
                    <View style={styles.authContainer}>
                        <Text style={{
                            width: '60%',
                            color: COLORS.dark,
                            ...FONTS.h1,
                            lineHeight: 45,

                        }}>
                            Sign in to Continue
                        </Text>

                        <KeyboardAwareScrollView
                            enableOnAndroid={true}
                            keyboardDismissMode="on-drag"
                            keyboardShouldPersistTaps={"handled"}
                            extraScrollHeight={-300}
                            contentContainerStyle={{
                                flexGrow: 1,
                                justifyContent: 'center'
                            }}
                        >
                            {/* Email */}
                            <FormInput containerStyle={{
                                borderRadius: SIZES.radius,
                                backgroundColor: COLORS.error
                            }}
                                placeholder="Email"
                                value={email}
                                onChange={
                                    (text: any) => {
                                        setEmail(text)
                                    }}
                                prependComponent={
                                    <Image
                                        source={icons.email}
                                        style={{
                                            width: 25,
                                            height: 25,
                                            marginRight: SIZES.base
                                        }}
                                    />
                                }
                            />
                            {/* Password */}
                            <FormInput containerStyle={{
                                borderRadius: SIZES.radius,
                                backgroundColor: COLORS.error,
                                marginTop: SIZES.radius

                            }}
                                secureTextEntry={!isVisible}
                                placeholder="Password"
                                value={password}
                                onChange={(text: any) => setPassword(text)}
                                prependComponent={
                                    <Image
                                        source={icons.lock}
                                        style={{
                                            width: 25,
                                            height: 25,
                                            marginRight: SIZES.base
                                        }}
                                    />
                                }
                                appendComponent={
                                    <IconButton
                                        icon={isVisible ? icons.eye_off : icons.eye}
                                        iconStyle={{
                                            tintColor: COLORS.grey
                                        }}
                                        onPress={() => setIsVisible(!isVisible)}
                                    />
                                }
                            />
                            <View style={{ alignItems: 'flex-end' }}>
                                <TextButton
                                    label='Forgot Password?'
                                    contentContainerStyle={{
                                        marginTop: SIZES.radius,
                                        backgroundColor: "transparent"
                                    }}
                                    labelStyle={{
                                        color: COLORS.support3,
                                        ...FONTS.h4
                                    }}
                                />
                            </View>
                        </KeyboardAwareScrollView>

                        <TextButton
                            label='Log In'
                            contentContainerStyle={{
                                height: 55,
                                borderRadius: SIZES.radius,
                                backgroundColor: COLORS.primary
                            }}
                            labelStyle={{
                                ...FONTS.h3
                            }}
                            onPress={() => navigation.navigate("Home")}
                        />
                    </View>
                </Shadow>
            </MotiView>
        )
    }
    function RenderSignUp() {
        return (
            <MotiView
                state={animationState}
                style={{
                    marginTop: SIZES.padding,
                }}
            >
                <Shadow>
                    <View style={styles.authContainer}>
                        <Text style={{
                            ...FONTS.h1,
                            lineHeight: 45,
                            color: COLORS.dark,

                        }}>
                            Create new account
                        </Text>

                        <KeyboardAwareScrollView
                            showsVerticalScrollIndicator={false}
                            enableOnAndroid={true}
                            keyboardDismissMode="on-drag"
                            keyboardShouldPersistTaps={"handled"}
                            extraScrollHeight={-300}
                            contentContainerStyle={{
                                flexGrow: 1,
                                marginTop: SIZES.padding,
                                paddingBottom: SIZES.padding * 2
                            }}
                        >
                            {/* Name */}
                            <FormInput containerStyle={{
                                borderRadius: SIZES.radius,
                                backgroundColor: COLORS.error
                            }}
                                placeholder="Name"
                                value={name}
                                onChange={
                                    (text: any) => {
                                        setName(text)
                                    }}
                                prependComponent={
                                    <Image
                                        source={icons.person}
                                        style={{
                                            width: 25,
                                            height: 25,
                                            marginRight: SIZES.base
                                        }}
                                    />
                                }
                            />

                            {/* Email */}
                            <FormInput containerStyle={{
                                borderRadius: SIZES.radius,
                                backgroundColor: COLORS.error,
                                marginTop: SIZES.radius

                            }}
                                placeholder="Email"
                                value={email}
                                onChange={
                                    (text: any) => {
                                        setEmail(text)
                                    }}
                                prependComponent={
                                    <Image
                                        source={icons.email}
                                        style={{
                                            width: 25,
                                            height: 25,
                                            marginRight: SIZES.base
                                        }}
                                    />
                                }
                            />

                            {/* Phone */}
                            <FormInput containerStyle={{
                                borderRadius: SIZES.radius,
                                backgroundColor: COLORS.error,
                                marginTop: SIZES.radius

                            }}
                                placeholder="Phone"
                                value={phone}
                                onChange={
                                    (text: any) => {
                                        setPhone(text)
                                    }}
                                prependComponent={
                                    <Image
                                        source={icons.phone}
                                        style={{
                                            width: 25,
                                            height: 25,
                                            marginRight: SIZES.base
                                        }}
                                    />
                                }
                            />


                            {/* Country */}
                            <CountryDropDown
                                containerStyle={{
                                    marginTop: SIZES.radius,

                                }}
                                selectedCountry={selectedCountry}
                                onPress={() => setShowCountryModal(!showCountryModal)}
                            />

                            {/* Password */}
                            <FormInput containerStyle={{
                                borderRadius: SIZES.radius,
                                backgroundColor: COLORS.error,
                                marginTop: SIZES.radius

                            }}
                                secureTextEntry={!isVisible}
                                placeholder="Password"
                                value={password}
                                onChange={(text: any) => setPassword(text)}
                                prependComponent={
                                    <Image
                                        source={icons.lock}
                                        style={{
                                            width: 25,
                                            height: 25,
                                            marginRight: SIZES.base
                                        }}
                                    />
                                }
                                appendComponent={
                                    <IconButton
                                        icon={isVisible ? icons.eye_off : icons.eye}
                                        iconStyle={{
                                            tintColor: COLORS.grey
                                        }}
                                        onPress={() => setIsVisible(!isVisible)}
                                    />
                                }
                            />

                            {/* Terms and condition */}
                            <Checkbox
                                containerStyle={{
                                    marginTop: SIZES.radius
                                }}
                                isSelected={termsChecked}
                                onPress={() => setTermsChecked(!termsChecked)}
                            />
                        </KeyboardAwareScrollView>

                        <TextButton
                            label='Create Account'
                            contentContainerStyle={{
                                height: 55,
                                borderRadius: SIZES.radius,
                                backgroundColor: COLORS.primary
                            }}
                            labelStyle={{
                                ...FONTS.h3
                            }}
                            onPress={() => console.log("Create Account")}
                        />
                    </View>

                </Shadow>
            </MotiView>
        )
    }


    function RenderAuthContainerFooter() {
        return (
            <View
                style={{
                    flexDirection: 'row',
                    height: 80,
                    alignItems: 'flex-end',
                    justifyContent: 'center',
                    marginTop: -30,
                    marginHorizontal: SIZES.radius,
                    paddingBottom: SIZES.radius,
                    borderBottomLeftRadius: SIZES.radius,
                    borderBottomRightRadius: SIZES.radius,
                    backgroundColor: COLORS.light60,

                }}
            >
                <Text style={{ color: COLORS.grey, ...FONTS.body5 }}>
                    {mode == "signIn" ? "Don't have an account?" : "I already have an account"}
                </Text>

                <TextButton label={mode == "signIn" ? "Create New Account" : "Sign In"}
                    contentContainerStyle={{
                        marginLeft: SIZES.base,
                        backgroundColor: "transparent"
                    }}
                    labelStyle={{
                        color: COLORS.support3,
                        ...FONTS.h5
                    }} onPress={() => {
                        if (animationState.current === "signIn") {
                            animationState.transitionTo('signUp')
                            setMode('signUp')
                        } else {
                            animationState.transitionTo('signIn')
                            setMode('signIn')
                        }
                    }
                    }
                />
            </View>
        )
    }

    function RenderSocialLogin() {
        return (
            <View
                style={{
                    flex: 1,
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginTop: -30,
                    zIndex: -1
                }}>
                <Text
                    style={{
                        color: COLORS.dark,
                        ...FONTS.body3
                    }}
                >
                    OR login with
                </Text>

                <View
                    style={{
                        flexDirection: 'row',
                        marginTop: SIZES.radius
                    }}
                >
                    <IconButton
                        icon={icons.twitter}
                        iconStyle={{
                            tintColor: COLORS.dark
                        }}
                        containerStyle={
                            styles.socialButtonContainer
                        }
                    />
                    <IconButton
                        icon={icons.google}
                        iconStyle={{
                            tintColor: COLORS.dark
                        }}
                        containerStyle={{
                            ...styles.socialButtonContainer,
                            marginLeft:SIZES.radius
                        }}
                    />
                    <IconButton
                        icon={icons.linkedin}
                        iconStyle={{
                            tintColor: COLORS.dark
                        }}
                        containerStyle={{
                            ...styles.socialButtonContainer,
                            marginLeft:SIZES.radius
                        }}
                    />
                </View>
            </View>
        )

    }
    function RenderAuthContainer() {
        if (mode == "signIn") {
            return <RenderSignIn />
        } else {
            return <RenderSignUp />
        }
    }

    return (
        <View style={{
            zIndex: 1,
            flex: 1,
            paddingHorizontal: SIZES.padding,
            backgroundColor: COLORS.lightGrey
        }}>
            {/* Logo */}
            <Image
                source={images.logo}
                style={{
                    alignSelf: 'center',
                    marginTop: SIZES.padding * 2,
                    width: 50,
                    height: 50
                }}

            />

            {/* Auth container */}
            <View style={{ zIndex: 1 }}>

                {<RenderAuthContainer />}
            </View>

            {/* Footer */}
            {<RenderAuthContainerFooter />}

            {mode == "signIn" && <RenderSocialLogin />}
            {/* Country modal */}
            {<RenderCountryModal />}
        </View>
    )
}


const styles = StyleSheet.create({
    authContainer: {
        flex: 1,
        width: SIZES.width - (SIZES.padding * 2),
        padding: SIZES.padding,
        borderRadius: SIZES.radius,
        backgroundColor: COLORS.light,
        zIndex: 1
    },
    socialButtonContainer: {
        width: 55,
        height: 55,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: SIZES.radius,
        backgroundColor: COLORS.grey20
    }
})
export default AuthMain;