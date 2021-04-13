import React, { useContext } from 'react'
import ScreenHeader from './ScreenHeader'
import { View } from 'react-native'
import { DrawerNavigationProp } from '@react-navigation/drawer'

interface Props {
    children: JSX.Element | JSX.Element[],
    style?: object,
    navigation: DrawerNavigationProp<any>,
    title: string,
}

export default ({ children, style, ...restProps }: Props) => {
    return (
        <View style={[{ flex: 1 }, style]}>
            <ScreenHeader {...restProps}/>
            {children}
        </View>
    )
}