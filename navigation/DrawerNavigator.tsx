import 'react-native-gesture-handler'
import React, { useContext, useReducer } from 'react'
import { createDrawerNavigator, DrawerContentScrollView } from '@react-navigation/drawer'
import { DrawerProvider } from '../navigation/DrawerContext'
import { DrawerContent } from './DrawerContent'
import { ScreensReducer } from './RoutingReducer'
import { NavigationElement, NavigationElements } from './NavigationTypes'
import { StyleProp, ViewStyle } from 'react-native'

const Drawer = createDrawerNavigator()

interface Props {
    initialScreens: NavigationElements,
    drawerStyle?: StyleProp<ViewStyle>
}

export default ({ initialScreens, ...restProps }: Props) => {
    // The stateful list of screens
    const [screens, screensDispatch] = useReducer(ScreensReducer, initialScreens)

    let parentStack: [string] = ['[root]']
    let currentDepth = -1

    return (
        <DrawerProvider screens={screens} screensDispatch={screensDispatch}>
            <Drawer.Navigator
                {...restProps}
                drawerContent={props => <DrawerContent {...props} />}>
                {/* Root nodes */}                
                {screens.map((screen) => {                 
                    if (screen.depth > currentDepth) {
                        if (screen.depth !== (currentDepth + 1))
                            throw new Error('depth step change more than 1');                            
                        currentDepth++
                        parentStack.push(screen.name)
                    }
                    if (screen.depth < currentDepth) {
                        if (screen.depth !== (currentDepth - 1))
                            throw new Error('depth step change more than 1');                            
                        currentDepth--
                        parentStack.pop()
                    }
                    return (
                        <Drawer.Screen
                            name={screen.name}
                            component={screen.component}
                            initialParams={screen.initialParams}
                            key={`${parentStack.join(String.fromCharCode(255))}`} />
                    )
                })}
            </Drawer.Navigator>
        </DrawerProvider>
    )
}
