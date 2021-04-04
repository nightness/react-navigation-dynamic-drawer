import 'react-native-gesture-handler'
import React, { useReducer } from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer'
import { DrawerProvider } from '../navigation/DrawerContext'
import { DrawerContent } from './DrawerContent'
import { ScreensReducer } from './RoutingReducer'
import { NavigationElements } from './NavigationTypes'
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
                {screens.map((screen) => {
                    const depthDelta = screen.depth - currentDepth
                    // Depth increased since last screen
                    if (screen.depth > currentDepth) {
                        if (depthDelta !== 1)
                            throw new Error('depth step up change does not equal 1');                          
                        currentDepth++
                        parentStack.push(screen.routeName)
                    }
                    // Depth decreased since last screen
                    if (screen.depth < currentDepth) {
                        for (let i = depthDelta; i < 0; i++) {
                            currentDepth--
                            parentStack.pop()
                        }
                    }
                    return (
                        <Drawer.Screen
                            name={screen.routeName}
                            component={screen.component}
                            initialParams={screen.initialParams}
                            key={`${parentStack.join(String.fromCharCode(255))}`} />
                    )
                })}
            </Drawer.Navigator>
        </DrawerProvider>
    )
}
