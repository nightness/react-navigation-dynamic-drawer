import React, { useContext, useEffect, useState } from 'react'
import ScreenHeader from './ScreenHeader'
import { LinearGradient } from 'expo-linear-gradient'
import { StyleProp, ViewStyle, View, Dimensions } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

interface Props {
    children: JSX.Element | JSX.Element[],
    style?: object,
    navigation?: any,
    title: string,
}

export default ({ children, style, navigation, title }: Props) => {

    const width = Dimensions.get('window').width;
    const height = Dimensions.get('window').height;
    const [screenStyle, setScreenStyle] = useState<StyleProp<ViewStyle>>({
        flex: 1
    })

    return (
        <View style={screenStyle}>
            <SafeAreaView style={[screenStyle, style]}>
                <ScreenHeader
                    navigation={navigation}
                    title={title}
                />
                {children}
            </SafeAreaView>
        </View>
    )
}
