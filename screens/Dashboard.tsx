import React from 'react'
import { Text } from 'react-native'
import { DrawerNavigationProp } from '@react-navigation/drawer'
import Screen from '../components/Screen'
import NavigationControls from '../components/TestPanel'

interface Props {
    navigation: DrawerNavigationProp<any>
}

// Playground
export const Dashboard = ({ navigation }: Props) => {
    return(
        <Screen navigation = { navigation } title = "Dashboard" >
            <Text>Dashboard</Text>
            <NavigationControls navigation={navigation} />  
        </Screen >
    )
}
