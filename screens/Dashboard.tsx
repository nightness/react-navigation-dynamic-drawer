import React from 'react'
import { Text } from 'react-native'
import { DrawerNavigationProp } from '@react-navigation/drawer'
import Screen from '../components/Screen'
import TestPanel from '../components/TestPanel'

interface Props {
    navigation: DrawerNavigationProp<any>
}

export const Dashboard = ({ navigation }: Props) => {
    return(
        <Screen navigation = { navigation } title = "Dashboard" >
            <Text>Dashboard</Text>
            <TestPanel navigation={navigation} />  
        </Screen >
    )
}
