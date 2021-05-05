import 'react-native-gesture-handler'
import React, { useReducer } from 'react'
import { createDrawerNavigator, DrawerNavigationOptions } from '@react-navigation/drawer'
import { DrawerProvider } from './DrawerContext'
import DrawerContent from './DrawerContent'
import { ScreensReducer } from './RoutingReducer'
import { Gradient, NavigationElements } from './NavigationTypes'
import { StyleProp, TextStyle, ViewStyle } from 'react-native'

const Drawer = createDrawerNavigator()
interface Props extends DrawerNavigationOptions {
    children?: JSX.Element | JSX.Element[],
    claims?: string[],
    background?: string | Gradient,
    initialScreens: NavigationElements,
    drawerStyle?: StyleProp<ViewStyle>,
    labelStyle?: StyleProp<TextStyle>
}

export default ({
    initialScreens,
    claims,
    children: parentChildren,
    ...restProps
}: Props) => {
    // The stateful list of screens
    const [screens, screensDispatch] = useReducer(ScreensReducer, initialScreens)

    const parentStack: string[] = []
    let currentDepth = -1

    return (
        <DrawerProvider activeClaims={claims} screens={screens} screensDispatch={screensDispatch}>
            <Drawer.Navigator
                {...restProps}
                drawerContent={props => <DrawerContent {...restProps} {...props}/>}>
                {screens.map((screen, index) => {
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

                    // This sets isRestricted for each screen based on claims first,
                    // and existing isRestricted value secondly
                    screens[index].isRestricted = !screen.claims ? !!screen?.isRestricted :
                        screen.claims.filter(value => claims?.includes(value)).length === 0

                    // Return the Drawer.Screen
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
    )
}
