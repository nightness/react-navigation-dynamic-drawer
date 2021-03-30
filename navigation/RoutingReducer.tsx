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
    switch (action.type) {
        case 'insert': {
            if (typeof action.index === 'number' && action.screen) {
                currentState.splice(action.index, 0, action.screen)
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
            if (typeof action.index === 'number' && action.index < currentState.length) {
                currentState.splice(action.index, 1)
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
