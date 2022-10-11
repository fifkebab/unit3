import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import CameraScreen from './CameraScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SettingsScreen } from './SettingsScreen';

const Stack = createNativeStackNavigator();

const App = () => {

  return (
    <NavigationContainer>
      <Stack.Navigator 
        screenOptions={{
            headerShown: false,
            statusBarTranslucent: true,
            statusBarColor: 'rgba(0,0,0,0.5)',
            statusBarStyle: 'light'
        }}>
        <Stack.Screen
            name="Home"
            component={CameraScreen}
            options={{}}
        />
        <Stack.Screen
            name="Settings"
            component={SettingsScreen}
            options={{}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;