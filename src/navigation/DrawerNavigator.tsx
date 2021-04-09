import 'react-native-gesture-handler'
import React, { useReducer } from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer'
import { DrawerProvider } from './DrawerContext'
import DrawerContent from './DrawerContent'
import { ScreensReducer } from './RoutingReducer'
import { NavigationElements } from './NavigationTypes'
import { StyleProp, ViewStyle } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'

const Drawer = createDrawerNavigator()

interface Props {
    children: JSX.Element | [JSX.Element]
    initialScreens: NavigationElements,
    drawerStyle?: StyleProp<ViewStyle>
}

export default ({ initialScreens,children, ...restProps }: Props) => {
    // The stateful list of screens
    const [screens, screensDispatch] = useReducer(ScreensReducer, initialScreens)

    const parentStack: [string] = ['[root]']
    let currentDepth = -1

    return (
        <NavigationContainer>
            <DrawerProvider screens={screens} screensDispatch={screensDispatch}>
                <Drawer.Navigator
                    {...restProps}
                    drawerContent={props => <DrawerContent {...props} />}>
                    {screens.map((screen) => {
                        const depthDelta = screen.depth - currentDepth
                        if (depthDelta > 1)
                            throw new Error('depth step up is > 1, grandchildren with no children?');
                        // Depth increased since last screen
                        if (screen.depth > currentDepth) {
                            currentDepth++
                            parentStack.push(screen.routeName)
                        }
                        // Depth decreased since last screen
                        if (screen.depth < currentDepth) {
                            for (let i = depthDelta; i > 0; i--) {
                                parentStack.pop()
                            }
                        }
                        return (
                            <Drawer.Screen
                                name={screen.routeName}
                                component={screen.component}
                                initialParams={screen.initialParams}
                                key={`Drawer.Screen[${parentStack.join(String.fromCharCode(255))}]`} />
                        )
                    })}
                </Drawer.Navigator>
            </DrawerProvider>
            {children}
        </NavigationContainer>
    )
}
