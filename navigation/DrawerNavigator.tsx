import 'react-native-gesture-handler'
import React, { useContext, useReducer } from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer'
import { DrawerProvider } from '../navigation/DrawerContext'
import { DrawerContent } from './DrawerContent'
import { RoutingReducer } from './RoutingReducer'
import { Screens } from './NavigationTypes'
import { StyleProp, ViewStyle } from 'react-native'

const Drawer = createDrawerNavigator()

interface Props {
    initialScreens: Screens,
    drawerStyle?: StyleProp<ViewStyle>
}

export default ({ initialScreens, ...restProps }: Props) => {
    // The stateful list of screens
    const [screens, screensDispatch] = useReducer(RoutingReducer, initialScreens)

    return (
        <DrawerProvider screens={screens} screensDispatch={screensDispatch}>
            <Drawer.Navigator
                {...restProps}
                drawerContent={props => <DrawerContent {...props} />}                
            >
                {
                    screens.map((screen) => {
                        return (
                            <Drawer.Screen
                                name={screen.name}
                                component={screen.component}
                                initialParams={screen.initialParams}
                                key={`screen-${screen.name}`} />
                        )
                    })
                }
            </Drawer.Navigator>
        </DrawerProvider>
    )
}
