import 'react-native-gesture-handler'
import React, { useContext, useReducer } from 'react'
import Collapsible from 'react-native-collapsible'
import { createDrawerNavigator } from '@react-navigation/drawer'
import { DrawerProvider } from '../navigation/DrawerContext'
import { DrawerContent } from './DrawerContent'
import { RoutingReducer } from './RoutingReducer'
import { NavigationElements } from './NavigationTypes'
import { StyleProp, ViewStyle } from 'react-native'

const Drawer = createDrawerNavigator()

interface Props {
    initialScreens: NavigationElements,
    drawerStyle?: StyleProp<ViewStyle>
}

export default ({ initialScreens, ...restProps }: Props) => {
    // The stateful list of screens
    const [screens, screensDispatch] = useReducer(RoutingReducer, initialScreens)

    return (
        <DrawerProvider screens={screens} screensDispatch={screensDispatch}>
            <Drawer.Navigator
                {...restProps}
                drawerContent={props => <DrawerContent {...props} />}>
                {/* Root nodes */}
                {screens.map((screen) => {
                    return (<>
                        <Drawer.Screen
                            name={screen.name}
                            component={screen.component}
                            initialParams={screen.initialParams}
                            key={`root-${screen.name}`} />

                        {/* Second level nodes */}
                        {screen.children ? screen.children.map((child) => {
                            return (<>
                                <Drawer.Screen
                                    name={child.name}
                                    component={child.component}
                                    initialParams={child.initialParams}
                                    key={`child1-${child.name}`} />
                                {/* Final level nodes */}
                                {child.children ? child.children.map((child) => {
                                    return (
                                        <Drawer.Screen
                                            name={child.name}
                                            component={child.component}
                                            initialParams={child.initialParams}
                                            key={`child2-${child.name}`} />
                                    )
                                }) : <></>}
                            </>)
                        }) : <></>}
                    </>)
                })}
            </Drawer.Navigator>
        </DrawerProvider>
    )
}
