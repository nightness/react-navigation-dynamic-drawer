import * as React from 'react';
// @ts-ignore
import { ModalPortal } from 'react-native-modals'
import { NavigationContainer, DarkTheme, DefaultTheme } from '@react-navigation/native'
import { ThemeProvider } from 'react-native-elements'
import { DrawerNavigator, NavigationElements } from 'react-navigation-dynamic-drawer'
//import { DrawerNavigator, NavigationElements } from './navigation/DynamicNavigation'
import { Home } from './screens/Home'
import { Dashboard } from './screens/Dashboard'
import { Playground } from './screens/Playground'

const sharedTheme = {

}

const darkTheme = {
    View: {
        style: { background: 'red' }
    },
}

export default function App() {
    return (
        <ThemeProvider theme={darkTheme}>
            <NavigationContainer>
                <DrawerNavigator
                    claims={['admin']}
                    initialScreens={initialScreens}                    
                />
                <ModalPortal />
            </NavigationContainer>
        </ThemeProvider>
    )
}

const initialScreens: NavigationElements = [
    {
        label: 'Home',
        routeName: 'Home',
        component: Home,
        initialParams: {
            activeTintColor: '#5c3703',
            inactiveTintColor: '#5c3703',
            iconGroup: 'ionicon',
            iconName: 'home',
            focusedIconName: 'home-outline'
        },
        depth: 0
    },
    {
        label: 'Home Child',
        routeName: 'Home Child 1',
        component: Home,
        initialParams: {
            activeTintColor: '#123',
            inactiveTintColor: '#000',
            iconGroup: 'ionicon',
            iconName: 'bug',
            focusedIconName: 'bug-outline'
        },
        depth: 1
    },
    {
        label: 'Dashboard',
        routeName: 'Dashboard',
        component: Dashboard,
        initialParams: {
            activeTintColor: '#345',
            inactiveTintColor: '#123',
            iconGroup: 'ionicon',
            iconName: 'browsers',
            focusedIconName: 'browsers-outline'
        },
        depth: 0
    },
    {
        label: 'Dashboard Child',
        routeName: 'Dashboard Child 1',
        component: Dashboard,
        initialParams: {
            activeTintColor: '#123',
            inactiveTintColor: '#000',
            iconGroup: 'ionicon',
            iconName: 'bug',
            focusedIconName: 'bug-outline'
        },
        depth: 1
    },
    {
        label: 'Playground',
        routeName: 'Playground',
        component: Playground,
        initialParams: {
            activeTintColor: '#123',
            inactiveTintColor: '#000',
            iconGroup: 'ionicon',
            iconName: 'bug',
            focusedIconName: 'bug-outline'
        },
        claims: ['admin'],
        //isCollapsed: true,
        depth: 0
    },
    {
        label: 'Playground Child 1A',
        routeName: 'Playground Child 1A****',
        component: Playground,
        initialParams: {
            activeTintColor: '#123',
            inactiveTintColor: '#000',
            iconGroup: 'ionicon',
            iconName: 'bug',
            focusedIconName: 'bug-outline'
        },
        depth: 1
    },
    {
        label: 'Playground Parent 1A - Child 1',
        routeName: 'Playground Parent 1A - Child 1',
        component: Playground,
        initialParams: {
            activeTintColor: '#123',
            inactiveTintColor: '#000',
            iconGroup: 'ionicon',
            iconName: 'bug',
            focusedIconName: 'bug-outline'
        },
        depth: 2
    },
    {
        label: 'Playground Child 1B',
        routeName: 'Playground Child 1B',
        component: Playground,
        initialParams: {
            activeTintColor: '#123',
            inactiveTintColor: '#000',
            iconGroup: 'ionicon',
            iconName: 'bug',
            focusedIconName: 'bug-outline'
        },
        depth: 1
    }
]