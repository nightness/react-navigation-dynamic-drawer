# ****EARLY DOCUMENTATION****
# react-navigation-dynamic-drawer
Dynamically add or remove components to/from a react-navigation/drawer. I'm working on developing a robust drawer navigator.

# Setup

```
npm i -g expo-cli
yarn
```

# Expo Server Startup

```
expo start
```

# Component Layout

```tsx

<NavigationContainer>
    <DrawerNavigator initialScreens={initialScreens} />
</NavigationContainer>
```

DrawerNavigator generates it's own children based on initialScreens, and contains the stateful array of those screens. Here is DrawerNavigator...

```tsx
export default ({ initialScreens, ...restProps }: Props) => {
    // The stateful array of screens
    const [screens, screensDispatch] = useReducer(RoutingReducer, initialScreens)

    return (
        <DrawerProvider screens={screens} screensDispatch={screensDispatch}>
            <Drawer.Navigator
                {...restProps}
                drawerContent={props => <DrawerContent {...props} />}                
            >
                {
                    screens.map((screen) => {
                        // The <Drawer.Screen />'s
                    })
                }
            </Drawer.Navigator>
        </DrawerProvider>
    )
}
```

The DrawerProvider is a Context.Provider that contains badge text state, the stateful Drawer screens and it's reducer function. It also has the navigation and state objects from the DrawerContent.
