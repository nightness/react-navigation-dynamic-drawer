import React from 'react'
import { DrawerNavigationProp } from '@react-navigation/drawer'
import { Text } from 'react-native'
import Screen from '../components/Screen'
import NavigationControls from '../components/TestPanel'

interface Props {
    navigation: DrawerNavigationProp<any>
}

export const Dynamic = ({ navigation }: Props) => {
    return (
        <Screen navigation={navigation} title="Dynamic">
            <Text>Dynamic</Text>
            <NavigationControls navigation={navigation} />            
        </Screen>
    )
}
