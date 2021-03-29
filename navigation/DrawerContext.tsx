//import { DrawerNavigationHelpers } from '@react-navigation/drawer/lib/typescript/src/types'
import { DrawerNavigationState, NavigationHelpers, ParamListBase } from '@react-navigation/native'
import React, { ComponentType, createContext, useContext, useEffect, useState, useReducer, ReducerAction } from 'react'
//import { NavigationParams } from './DrawerParams'
import { rootScreens } from './DefaultRoutes'
import { Badges, Screens, ScreenConfig, Notifications } from './NavigationTypes'
import { ReducerActionType } from './RoutingReducer'

type ContextType = {
    badges: Badges,
    setBadge: (routeName: string, value: string) => void,
    screens: Screens,
    screensManager?: (action: ReducerActionType, index: number, screen?: ScreenConfig) => boolean,
    navigation?: NavigationHelpers<any>,
    state?: DrawerNavigationState<ParamListBase>,
    screenIndex?: number,
    setDrawerContent: (navigation: NavigationHelpers<any>, state: DrawerNavigationState<ParamListBase>) => void,
}

export const DrawerContext = createContext<ContextType>({
    badges: {},
    screens: rootScreens,
    setBadge: (routeName: string, value: string) => undefined,
    setDrawerContent: (navigation: NavigationHelpers<any>, state: DrawerNavigationState<ParamListBase>) => undefined
})

interface Props {
    children: JSX.Element | JSX.Element[],
    screens: Screens,
    screensDispatch: React.Dispatch<any>,
}

export const DrawerProvider = ({ children, screens, screensDispatch }: Props) => {
    const [badges, setBadges] = useState<Badges>({})
    const [navigation, setNavigation] = useState<NavigationHelpers<any>>()
    const [state, setState] = useState<DrawerNavigationState<ParamListBase>>()
    const screenIndex = state ? state.index : -1
    
    const setBadge = (routeName: string, value: string): void => {
        let newState = {...badges}
        newState[routeName] = value
        setBadges(newState)
    }

    const setDrawerContent = (currentNavigation: NavigationHelpers<any>, state: DrawerNavigationState<ParamListBase>) => {
        if (currentNavigation != navigation)
            setNavigation(currentNavigation)
        setState(state)
    }

    const screensManager = (action: ReducerActionType, index: number, screen?: ScreenConfig) => {
        // If removing the current screen, go back in the history first, then remove
        if (action === 'remove' && index === screenIndex && navigation)
            navigation.goBack()
        screensDispatch({
            type: action,
            index,
            screen
        })        
        return true
    }

    return (
        <DrawerContext.Provider
            value={{
                badges,
                setBadge,
                navigation,
                state,
                screenIndex,
                screens,
                screensManager,
                setDrawerContent
            }}
        >
            {children}
        </DrawerContext.Provider>
    )
}