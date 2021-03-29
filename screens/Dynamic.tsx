import React, { useEffect, useContext, useState } from 'react'
import { DefaultRouterOptions } from '@react-navigation/native'
import { Button } from 'react-native-elements'
import Screen from '../components/Screen'
import { DrawerContext } from '../navigation/DrawerContext'

interface Props {
    navigation: DefaultRouterOptions
}

export const Dynamic = ({ navigation }: Props) => {
    const { screensManager, screenIndex } = useContext(DrawerContext)
    
    return (
        <Screen navigation={navigation} title="Dynamic">
            <Button
                title='Delete this Screen'
                onPress={() => {
                    if (screensManager && screenIndex) {
                        screensManager('remove', screenIndex)
                    }
                }}
            />
        </Screen>
    )
}
