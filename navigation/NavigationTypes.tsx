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

/* name was broken up in to label and routeName, only routeName needs to be unique */ 
export interface NavigationElement {
    label: string,
    routeName: string,
    component: ComponentType<any>,
    initialParams: NavigationParams,
    depth: number,
    isHidden?: boolean,
    isCollapsed?: boolean
}

export type NavigationElements = NavigationElement[]

