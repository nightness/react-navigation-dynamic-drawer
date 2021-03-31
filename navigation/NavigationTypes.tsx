import { ComponentType } from 'react'

export type Notifications = {
    groups: { [routeName: string] : {} }
}

export type Badges = { [routeName: string] : {} }

export interface NavigationParams {
    activeTintColor?: string,
    inactiveTintColor?: string,
    iconGroup?: string,
    iconName: string,
    focusedIconName?: string,
}

export interface NavigationElement {
    name: string,
    component: ComponentType<any>,
    initialParams: NavigationParams,
    claims?: string[],
    children?: NavigationElements
    childrenCollapsed?: boolean
}

export type NavigationElements = NavigationElement[]

