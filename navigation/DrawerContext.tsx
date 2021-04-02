import { DrawerNavigationState, NavigationHelpers, ParamListBase } from '@react-navigation/native'
import React, { createContext, useState } from 'react'
import { Badges, NavigationElements, NavigationElement } from './NavigationTypes'
import { ScreenActions } from './RoutingReducer'

interface Props {
    children: JSX.Element | JSX.Element[],
    screens: NavigationElements,
    screensDispatch: React.Dispatch<any>,
}

interface ScreenManagerType {
    reducer: (type: ScreenActions, index: number, screen?: NavigationElement) => boolean
}

type ContextType = {
    badges: Badges,
    setBadge: (routeName: string, value: string) => void,
    screens: NavigationElements,
    ScreenManager?: ScreenManagerType,
    hamburgerBadge?: string,
    setHamburgerBadge?: React.Dispatch<React.SetStateAction<string | undefined>>
    navigation?: NavigationHelpers<any>,
    state?: DrawerNavigationState<ParamListBase>,
    screenIndex?: number,
    setDrawerContent: (navigation: NavigationHelpers<any>, state: DrawerNavigationState<ParamListBase>) => void,
}

export const DrawerContext = createContext<ContextType>({
    badges: {},
    screens: [],
    setBadge: (routeName: string, value: string) => undefined,
    setDrawerContent: (navigation: NavigationHelpers<any>, state: DrawerNavigationState<ParamListBase>) => undefined
})

export const DrawerProvider = ({ children, screens, screensDispatch }: Props) => {
    const [badges, setBadges] = useState<Badges>({})
    const [hamburgerBadge, setHamburgerBadge] = useState<string>()
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

    const ScreenManager: ScreenManagerType = {
        reducer: (type: ScreenActions, index: number, screen?: NavigationElement) => {
            // If removing the current screen, go back in the history first, then remove
            if (type === 'remove' && index === screenIndex && navigation && navigation.canGoBack())
                navigation.goBack()
            screensDispatch({ type, index, screen })
            return true
        }
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
                ScreenManager,
                hamburgerBadge,
                setHamburgerBadge,
                setDrawerContent
            }}
        >
            {children}
        </DrawerContext.Provider>
    )
}