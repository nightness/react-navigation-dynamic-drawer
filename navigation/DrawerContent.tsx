import React, { useContext, useEffect, useState } from 'react'
import {
    DrawerContentScrollView,
    DrawerContentComponentProps,
} from '@react-navigation/drawer'
import { DrawerContext } from './DrawerContext'
import DrawerContentItem from './DrawerContentItem'
import { NavigationElements, NavigationParams } from './NavigationTypes'
import { SafeAreaView } from 'react-native-safe-area-context'
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
                    const { depth, visibility: state } = screens[routeIndex]                    
                    if (depth > currentDepth) {
                        currentDepth++
                        parentStack.push(screens[routeIndex - 1])
                    }
                    else if (depth < currentDepth) {
                        currentDepth--
                        parentStack.pop()
                    }
                    const theHidden = parentStack.filter((item) => item.visibility === 'hidden')
                    const isVisible =
                        state !== 'hidden' &&
                        parentStack[0]?.visibility !== 'collapsed' &&
                        (depth === 0 || theHidden.length === 0)
                    
                    if (!isVisible)
                        return (<View key={`${routeName}-${Math.random()}`}></View>)

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
                            style={{ marginLeft: (15 * depth) }}  // ToDo
                        />
                    )
                })}
            </DrawerContentScrollView>
        </SafeAreaView>
    )
}