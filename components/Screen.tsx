import React from 'react'
import ScreenHeader from './ScreenHeader'
import { SafeAreaView } from 'react-native-safe-area-context'

interface Props {
    children: JSX.Element | JSX.Element[],
    style?: object,
    navigation?: any,
    title: string,
}

export default ({ children, style, navigation, title }: Props) => {
    return (
        <SafeAreaView style={[{ flex: 1 }, style]}>
            <ScreenHeader
                navigation={navigation}
                title={title}
            />
            {children}
        </SafeAreaView>
    )
}
