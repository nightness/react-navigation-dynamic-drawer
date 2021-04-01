import React, { useContext, useEffect, useState } from 'react'
import {
    DrawerContentScrollView,
    DrawerContentComponentProps,
} from '@react-navigation/drawer'
import { DrawerContext } from './DrawerContext'
import DrawerContentItem from './DrawerContentItem'
import { NavigationElement, NavigationElements, NavigationParams } from './NavigationTypes'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Drawer } from 'react-native-paper'
import { View } from 'react-native'

export const DrawerContent = (props: DrawerContentComponentProps) => {
    const { badges, screens, setDrawerContent } = useContext(DrawerContext)
    const { state, navigation } = props;
    const { routeNames, routes } = state
    const navigateTo = (screenName: string) => {
        navigation.closeDrawer()
        navigation.navigate(screenName)
    }

    let parentStack: NavigationElements = []
    let currentDepth = 0

    useEffect(() => {
        setDrawerContent(navigation, state)
    })

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <DrawerContentScrollView bounces={false} {...props}>
                {routeNames.map((routeName, routeIndex) => {
                    const currentRoute = routes.filter(value => value.name === routeName)?.[0]
                    const params = currentRoute.params as NavigationParams
                    const { depth, isHidden } = screens[routeIndex]                    
                    if (depth > currentDepth) {
                        currentDepth++
                        parentStack.push(screens[routeIndex - 1])
                    }
                    else if (depth < currentDepth) {
                        currentDepth--
                        parentStack.pop()
                    }
                    const isParentVisible = parentStack.filter((item) => !item).length > 0

                    if (isHidden || (!isParentVisible && depth > 0))
                        return (<View key={`${routeName}`}></View>)

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
                            key={`route-${routeName}-${Math.random()}`}
                            badgeText={badges[routeName] as string}
                            style={{ marginLeft: false ? 25 : 0 }}  // ToDo
                        />
                    )
                })}
            </DrawerContentScrollView>
        </SafeAreaView>
    )
}