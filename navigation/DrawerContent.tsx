import React, { useContext, useEffect, useState } from 'react'
import {
    DrawerContentScrollView,
    DrawerContentComponentProps,
} from '@react-navigation/drawer'
import { DrawerContext } from './DrawerContext'
import DrawerContentItem from './DrawerContentItem'
import { NavigationParams } from './NavigationTypes'
import { SafeAreaView } from 'react-native-safe-area-context'

export const DrawerContent = ({ navigation, ...restProps }: DrawerContentComponentProps) => {
    const { badges, setDrawerContent } = useContext(DrawerContext)

    const state = restProps.state;
    const routeNames = state.routeNames
    const routes = state.routes

    const navigateTo = (screenName: string) => {
        navigation.closeDrawer()
        navigation.navigate(screenName)
    }

    useEffect(() => {
        setDrawerContent(navigation, state)
    })

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <DrawerContentScrollView bounces={false} {...restProps}>
                {routeNames.map((routeName) => {
                    const currentRoute = routes.filter(value => value.name === routeName)?.[0]
                    const params = currentRoute.params as NavigationParams
                    return (
                        <DrawerContentItem
                            navigation={navigation}
                            {...restProps}
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