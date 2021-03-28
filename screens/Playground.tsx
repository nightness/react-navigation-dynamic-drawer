import React, { useEffect, useContext, useState } from 'react'
import { DefaultRouterOptions } from '@react-navigation/native'
import Screen from '../components/Screen'
import { Button } from 'react-native-elements'
import { DrawerContext } from '../navigation/DrawerContext'

interface Props {
    navigation: DefaultRouterOptions
}

// Playground
export const Playground = ({ navigation }: Props) => {
    const { setBadge, screensManager } = useContext(DrawerContext)
    return (
        <Screen navigation={navigation} title="Playground">
            <Button
                title='Delete the Playground Screen'
                onPress={() => {
                    if (screensManager) {
                        screensManager('remove', 2)
                    }
                }}
            />
        </Screen>
    )
}
