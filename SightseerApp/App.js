import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import CameraScreen from './CameraScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SettingsScreen } from './SettingsScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Stack = createNativeStackNavigator();

const App = () => {
  const SettingsCheck = async() => {
    const Settings = await AsyncStorage.getItem('Settings');
    if (Settings == null) {
      await AsyncStorage.setItem('Settings', JSON.stringify({
        'read-aloud': true,
        'high-contrast': false,
        'transparency': true,
        'scan-automatically': false
      }));
    }
  }
  
  SettingsCheck();

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