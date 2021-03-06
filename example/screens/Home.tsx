import React from 'react'
import { DrawerNavigationProp } from '@react-navigation/drawer'
import { Text } from 'react-native-elements'
import Screen from '../components/Screen'
import TestPanel from '../components/TestPanel'

interface Props {
    navigation: DrawerNavigationProp<any>
}

export const Home = ({ navigation }: Props) => {
    return (
        <Screen navigation={navigation} title="Home">
            <Text>Home</Text>
            <TestPanel navigation={navigation} />
        </Screen>
    )
}
