import React, { useEffect, useContext, useState } from 'react'
import { DefaultRouterOptions } from '@react-navigation/native'
import Screen from '../components/Screen'
import { Button } from 'react-native'
import { DrawerContext } from '../navigation/DrawerContext'
import { Dynamic } from './Dynamic'
import { PathConfig } from '../navigation/NavigationTypes'

interface Props {
    navigation: DefaultRouterOptions
}

// Playground
export const Dashboard = ({ navigation }: Props) => {
    const { setBadge, screensManager } = useContext(DrawerContext)

    const getScreenConfig = () => {
        return (
            {
                // Names here needs to be unique for routing to work (refactor the random out later)
                name: `Dynamic ${(Math.floor(Math.random() * 10000))}`,
                component: Dynamic,
                initialParams: {
                    activeTintColor: '#123',
                    inactiveTintColor: '#000',
                    iconGroup: 'antdesign',
                    iconName: 'paperclip',
                    focusedIconName: 'bug-outline'
                }
            }            
        )
    }

    return(
        <Screen navigation = { navigation } title = "Dashboard" >
            <Button
                title='Add a Dynamic'
                onPress={() => {
                    if (screensManager) {
                        screensManager('append', 0, getScreenConfig())
                    }
                }}
            />
        </Screen >
    )
}
