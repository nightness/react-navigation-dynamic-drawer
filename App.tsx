import * as React from 'react';
import { NavigationContainer, DarkTheme, DefaultTheme } from '@react-navigation/native'
import DrawerNavigator from './navigation/DrawerNavigator'
import { rootScreens } from './navigation/DefaultRoutes'

export default function App() {
  return (
        <NavigationContainer>
          <DrawerNavigator initialScreens={rootScreens} />
        </NavigationContainer>
  );
}
