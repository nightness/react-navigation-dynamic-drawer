import { NavigationElements, NavigationElement } from './NavigationTypes'

export type ScreenActions =
    'insert' | 'remove' | 'append' | 'hide' | 'show' | 'collapse' | 'expand'

export type ScreenAction = {
    type: ScreenActions,
    screen?: NavigationElement,
    index?: number,
    name?: string,
    children?: NavigationElements
}

export const ScreensReducer = (currentState: NavigationElements, action: ScreenAction) => {
    const index = typeof action.index === 'number' && 
        action.index >= 0 && action.index < currentState.length ? action.index : -1
    switch (action.type) {
        case 'insert': {
            if (index != -1 && index < currentState.length && action.screen) {
                currentState.splice(index, 0, action.screen)
                return [...currentState]
            }
            return currentState
        }
        case 'append': {
            if (action.screen)
                return [...currentState, action.screen]
            return currentState
        }
        case 'remove': {
            if (index != -1) {
                currentState.splice(index, 1)
                return [...currentState]
            }
            return currentState
        }
        case 'hide': {
            return currentState
        }
        case 'show': {
            return currentState
        }
        case 'collapse': {
            return currentState
        }
        case 'expand': {
            return currentState
        }
    }
}
