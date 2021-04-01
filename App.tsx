import * as React from 'react';
// @ts-ignore
import { ModalPortal } from 'react-native-modals'
import { NavigationContainer, DarkTheme, DefaultTheme } from '@react-navigation/native'
import DrawerNavigator from './navigation/DrawerNavigator'
import { NavigationElements } from './navigation/NavigationTypes'
import { Home } from './screens/Home'
import { Dashboard } from './screens/Dashboard'
import { Playground } from './screens/Playground'


export default function App() {
    return (
        <NavigationContainer>
            <DrawerNavigator initialScreens={initialPaths} />
            <ModalPortal />
        </NavigationContainer>
    );
}

const initialPaths: NavigationElements = [
    {
        name: "Home",
        component: Home,
        initialParams: {
            activeTintColor: '#5c3703',
            inactiveTintColor: '#5c3703',
            iconGroup: 'ionicon',
            iconName: 'home',
            focusedIconName: 'home-outline'
        },
        state: 'visible',
        depth: 0
    },
    {
        name: "Home Child",
        component: Home,
        initialParams: {
            activeTintColor: '#123',
            inactiveTintColor: '#000',
            iconGroup: 'ionicon',
            iconName: 'bug',
            focusedIconName: 'bug-outline'
        },
        state: 'visible',
        depth: 1
    },
    {
        name: "Dashboard",
        component: Dashboard,
        initialParams: {
            activeTintColor: '#345',
            inactiveTintColor: '#123',
            iconGroup: 'ionicon',
            iconName: 'browsers',
            focusedIconName: 'browsers-outline'
        },
        state: 'visible',
        depth: 0
    },
    {
        name: "Dashboard Child",
        component: Dashboard,
        initialParams: {
            activeTintColor: '#123',
            inactiveTintColor: '#000',
            iconGroup: 'ionicon',
            iconName: 'bug',
            focusedIconName: 'bug-outline'
        },
        state: 'visible',
        depth: 1
    },    
    {
        name: "Playground",
        component: Playground,
        initialParams: {
            activeTintColor: '#123',
            inactiveTintColor: '#000',
            iconGroup: 'ionicon',
            iconName: 'bug',
            focusedIconName: 'bug-outline'
        },
        state: 'collapsed',
        depth: 0
    },
    {
        name: "Playground Child 1A",
        component: Playground,
        initialParams: {
            activeTintColor: '#123',
            inactiveTintColor: '#000',
            iconGroup: 'ionicon',
            iconName: 'bug',
            focusedIconName: 'bug-outline'
        },
        state: 'visible',
        depth: 1
    },
    {
        name: "Playground Parent 1A - Child 1",
        component: Playground,
        initialParams: {
            activeTintColor: '#123',
            inactiveTintColor: '#000',
            iconGroup: 'ionicon',
            iconName: 'bug',
            focusedIconName: 'bug-outline'
        },
        state: 'visible',
        depth: 2
    },    
    {
        name: "Playground Child 1B",
        component: Playground,
        initialParams: {
            activeTintColor: '#123',
            inactiveTintColor: '#000',
            iconGroup: 'ionicon',
            iconName: 'bug',
            focusedIconName: 'bug-outline'
        },
        state: 'visible',
        depth: 1
    }
]
