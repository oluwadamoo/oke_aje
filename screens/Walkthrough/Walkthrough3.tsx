import { View, Image, StyleSheet } from 'react-native'
import { SIZES, images } from '../../constants'
import React from 'react'
import { useDynamicAnimation, MotiImage } from "moti"


const Walkthrough3 = ({ animate }: any) => {

    // Moti initial position
    const motiImage1 = useDynamicAnimation(() => {
        return {
            top: "20%",
            left: "40%"
        }

    })
    const motiImage2 = useDynamicAnimation(() => {
        return {
            top: "33%",
            left: "58%"
        }

    })
    const motiImage3 = useDynamicAnimation(() => {
        return {
            top: "40%",
            left: "26%"

        }

    })
    const motiImage4 = useDynamicAnimation(() => {
        return {
            top: "55%",
            left: "43%"

        }

    })


    React.useEffect(() => {
        if (animate) {
            motiImage1.animateTo({
                top: "10%",
                left: "15%"
            })
            motiImage2.animateTo({
                top: "25%",
                left: "48%"
            })
            motiImage3.animateTo({
                top: "54%",
                left: "20%"

            })
            motiImage4.animateTo({
                top: "65%",
                left: "53%"

            })

        }
    }, [animate])
    return (
        <View
            style={{ minHeight: 400, minWidth: 400, overflow: 'hidden' }}
        >

            <MotiImage
                state={motiImage1}
                source={images.walkthrough_03_01}
                style={styles.image}
            />
            <MotiImage
                state={motiImage2}
                source={images.walkthrough_03_02}
                style={styles.image}
            />
            <MotiImage
                state={motiImage3}
                source={images.walkthrough_01_04}
                style={styles.image}
            />
            <MotiImage
                state={motiImage4}
                source={images.walkthrough_01_05}
                style={styles.image}
            />

        </View>
    )
}


const styles = StyleSheet.create({
    image: {
        position: 'absolute',
        width: 122,
        height: 110,
        zIndex: 0,
        borderRadius: SIZES.radius
    }
})
export default Walkthrough3