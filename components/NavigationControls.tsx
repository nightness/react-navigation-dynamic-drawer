import { DrawerNavigationProp } from '@react-navigation/drawer'
import React, { useContext } from 'react'
import { View, Button } from 'react-native'
import { DrawerContext } from '../navigation/DrawerContext'
import { Dynamic } from '../screens/Dynamic'

interface Props {
    style?: object,
    navigation: DrawerNavigationProp<any>,
}

export default ({ style, navigation }: Props) => {
    const { screens, screenIndex, screensManager } = useContext(DrawerContext)

    const getScreenConfig = () => {
        return (
            {
                // Names here needs to be unique for routing to work
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
        
    return (
        <View style={[{ flex: 1 }, style]}>
            <Button
                title='Open Drawer'
                onPress={(d) => {
                    navigation.openDrawer()
                }}
            />
            <Button
                title='Back'
                onPress={(d) => {
                    navigation.goBack()
                }}
            />
            <Button
                title='Delete the Playground Screen'
                onPress={() => {
                    screens.forEach((screen, index) => {
                        if (screensManager && screen.name === 'Playground') {
                            screensManager('remove', index)
                        }                            
                    })
                }}
            />
            <Button
                title='Delete this Screen'
                onPress={() => {
                    if (screensManager && screenIndex) {
                        screensManager('remove', screenIndex)
                    }
                }}
            />            
            <Button
                title='Add a Dynamic'
                onPress={() => {
                    if (screensManager) {
                        screensManager('append', 0, getScreenConfig())
                    }
                }}
            />
        </View>
    )
}
