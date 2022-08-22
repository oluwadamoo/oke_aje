import { View, Image } from 'react-native'
import React from 'react'
import { FlatList } from 'react-native-gesture-handler'
import { SIZES, constants } from "../../constants"

const ITEM_WIDTH = 120
const WalkThrough1 = () => {
    // row 1
    const [rowImages, setRowImages] = React.useState([
        ...constants.walkthrough_01_01_images,
        ...constants.walkthrough_01_01_images
    ])

    const [currentPosition, setCurrentPosition] = React.useState<number>(0)

    // Row 2
    const [row2Images, setRow2Images] = React.useState([
        ...constants.walkthrough_01_02_images,
        ...constants.walkthrough_01_02_images
    ])

    const [row2CurrentPosition, setRow2CurrentPosition] = React.useState<number>(0)

    // Ref
    const row1FlatlistRef = React.useRef<any>()
    const row2FlatlistRef = React.useRef<any>()

    React.useEffect(() => {
        let positionTimer: number;

        const timer = () => {
            positionTimer = setTimeout(() => {
                // increment scroll position with each new interval
                // Slider 1
                setCurrentPosition((prevPosition: any) => {
                    const position = Number(prevPosition) + 1
                    row1FlatlistRef?.current?.scrollToOffset({ offset: position, animated: false })

                    const maxOffset = constants.walkthrough_01_01_images.length * ITEM_WIDTH

                    if (prevPosition > maxOffset) {
                        const offset = prevPosition - maxOffset
                        row1FlatlistRef?.current?.scrollToOffset({
                            offset,
                            animated: false
                        })

                        return offset
                    } else {
                        return position
                    }

                })
                // Slider 2

                setRow2CurrentPosition((prevPosition: any) => {
                    const position = Number(prevPosition) + 1
                    row2FlatlistRef?.current?.scrollToOffset({ offset: position, animated: false })

                    const maxOffset = constants.walkthrough_01_02_images.length * ITEM_WIDTH

                    if (prevPosition > maxOffset) {
                        const offset = prevPosition - maxOffset
                        row2FlatlistRef?.current?.scrollToOffset({
                            offset,
                            animated: false
                        })

                        return offset
                    } else {
                        return position
                    }

                })

                timer()
            }, 32)
        }
        timer()
        return () => {
            clearTimeout(positionTimer)
        }
    }, [])
    return (
        <View >
            {/* SLider1 */}
            <FlatList
                ref={row1FlatlistRef}
                decelerationRate="fast"
                horizontal
                scrollEnabled={false}
                showsHorizontalScrollIndicator={false}
                listKey="Slider1"
                keyExtractor={(_, index) => `Slider1_${index}`}
                data={rowImages}
                renderItem={({ item, index }) => {
                    return (
                        <View style={{ width: ITEM_WIDTH, alignItems: 'center', justifyContent: 'center' }}>

                            <Image source={item}
                                style={{
                                    width: 110,
                                    height: 110
                                }}
                            />
                        </View>
                    )
                }}
            />

            <FlatList
                ref={row2FlatlistRef}
                style={{
                    marginTop: -200,
                    transform:[{rotate:"180deg"}]
                }}
                decelerationRate="fast"
                horizontal
                showsHorizontalScrollIndicator={false}
                listKey="Slider2"
                keyExtractor={(_, index) => `Slider2_${index}`}
                data={row2Images}
                scrollEnabled={false}
                renderItem={({ item, index }) => {
                    return (
                        <View
                            style={{ width: ITEM_WIDTH, alignItems: 'center', justifyContent: 'center', transform:[{rotate:"180deg"}] }}
                        >

                            <Image source={item}
                                style={{
                                    width: 110,
                                    height: 110
                                }}
                            />
                        </View>
                    )
                }}
            />
            {/* SLider2 */}
        </View>
    )
}

export default WalkThrough1