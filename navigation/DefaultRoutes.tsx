import { Screens } from './NavigationTypes'
import { Home } from '../screens/Home'
import { Dashboard } from '../screens/Dashboard'
import { Playground } from '../screens/Playground'

export const initialScreens: Screens = [
    {
        name: "Home",
        component: Home,
        initialParams: {
            activeTintColor: '#5c3703',
            inactiveTintColor: '#5c3703',
            iconGroup: 'ionicon',
            iconName: 'home',
            focusedIconName: 'home-outline'
        }
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
        }
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
        }
    }
]
