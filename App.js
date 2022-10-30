import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';
import { Alert, Button, StyleSheet, Text, View } from 'react-native';
import { TailwindProvider } from 'tailwindcss-react-native';
import HomeScreen from './screens/HomeScreen';
const Stack = createStackNavigator()
export default function App() {
  return (
    <NavigationContainer>
      <TailwindProvider>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={HomeScreen}/>
        </Stack.Navigator>
      </TailwindProvider>
    </NavigationContainer>
  );
}
