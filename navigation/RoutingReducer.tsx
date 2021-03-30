import { NavigationElements, NavigationElement } from './NavigationTypes'

export type ReducerActionType =
    'insert' | 'remove' | 'append' |
    'insert-child' | 'remove-child' | 'append-child'

export type ReducerAction = {
    type: ReducerActionType,
    screen?: NavigationElement,
    index?: number,
    name?: string,
    children?: NavigationElements
}

export const RoutingReducer = (currentState: NavigationElements, action: ReducerAction) => {
    const index = typeof action.index === 'number' && 
        action.index >= 0 && action.index < currentState.length ? action.index : -1
    switch (action.type) {
        case 'insert': {
            if (index != -1 && action.screen) {
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
        case 'insert-child': {
            return currentState
        }
        case 'remove-child': {
            return currentState
        }
        case 'append-child': {
            return currentState
        }
    }
}
