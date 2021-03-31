import React from 'react'
import { Text } from 'react-native'
import { DrawerNavigationProp } from '@react-navigation/drawer'
import Screen from '../components/Screen'
import NavigationControls from '../components/TestPanel'

interface Props {
    navigation: DrawerNavigationProp<any>
}

export const Playground = ({ navigation }: Props) => {
    return (
        <Screen navigation={navigation} title="Playground">
            <Text>Playground</Text>
            <NavigationControls navigation={navigation} />
        </Screen>
    )
}
