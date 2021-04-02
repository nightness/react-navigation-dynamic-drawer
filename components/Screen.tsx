import React, { useContext } from 'react'
import ScreenHeader from './ScreenHeader'
import { SafeAreaView } from 'react-native-safe-area-context'
import { DrawerNavigationProp } from '@react-navigation/drawer'
import { DrawerContext } from '../navigation/DrawerContext'

interface Props {
    children: JSX.Element | JSX.Element[],
    style?: object,
    navigation: DrawerNavigationProp<any>,
    title: string,
}

export default ({ children, style, ...restProps }: Props) => {
    const { hamburgerBadge } = useContext(DrawerContext)
    return (
        <SafeAreaView style={[{ flex: 1 }, style]}>
            <ScreenHeader hamburgerBadgeText={hamburgerBadge} {...restProps}/>
            {children}
        </SafeAreaView>
    )
}
