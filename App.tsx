import * as React from 'react';
import { NavigationContainer, DarkTheme, DefaultTheme } from '@react-navigation/native'
import DrawerNavigator from './navigation/DrawerNavigator'

export default function App() {
  return (
        <NavigationContainer>
          <DrawerNavigator />
        </NavigationContainer>
  );
}
