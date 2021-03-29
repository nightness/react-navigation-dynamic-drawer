import * as React from 'react';
import { NavigationContainer, DarkTheme, DefaultTheme } from '@react-navigation/native'
import DrawerNavigator from './navigation/DrawerNavigator'
import { initialScreens } from './navigation/DefaultRoutes'

export default function App() {
  return (
        <NavigationContainer>
          <DrawerNavigator initialScreens={initialScreens} />
        </NavigationContainer>
  );
}
