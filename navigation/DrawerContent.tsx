import React, { useContext, useEffect } from 'react'
import {
    DrawerContentScrollView,
    DrawerContentComponentProps,
} from '@react-navigation/drawer'
import { DrawerContext } from './DrawerContext'
import DrawerContentItem from './DrawerContentItem'
import { NavigationParams } from './NavigationTypes'
import { SafeAreaView } from 'react-native-safe-area-context'

export const DrawerContent = (props: DrawerContentComponentProps) => {
    const { badges, setDrawerContent } = useContext(DrawerContext)
    const { state, navigation } = props;
    const { routeNames, routes } = state
    const navigateTo = (screenName: string) => {
        navigation.closeDrawer()
        navigation.navigate(screenName)
    }

    useEffect(() => {
        setDrawerContent(navigation, state)
    })

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <DrawerContentScrollView bounces={false} {...props}>
                {routeNames.map((routeName) => {
                    const currentRoute = routes.filter(value => value.name === routeName)?.[0]
                    const params = currentRoute.params as NavigationParams
                    return (
                        <DrawerContentItem
                            {...props}
                            activeTintColor={params?.activeTintColor}
                            inactiveTintColor={params?.inactiveTintColor}
                            labelText={routeName}
                            iconGroup={params?.iconGroup}
                            iconName={params?.iconName}
                            focusedIconName={params?.focusedIconName}
                            onPress={() => navigateTo(routeName)}
                            key={`route-${routeName}`}
                            badgeText={badges[routeName] as string}
                            style={{ marginLeft: false ? 25 : 0 }}  // ToDo
                        />
                    )
                })}
            </DrawerContentScrollView>
        </SafeAreaView>
    )
}