import { ComponentType } from 'react'

export type Notifications = {
    groups: { [routeName: string] : {} }
}

export type Badges = { [routeName: string] : {} }

//export type Badges = { [routeName: string] : {} }

export type ElementVisibility = 'visible' | 'hidden' | 'collapsed'

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
    depth: number,
    visibility: ElementVisibility,
}

export type NavigationElements = NavigationElement[]

