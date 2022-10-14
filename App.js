import 'react-native-gesture-handler';
import React, { useEffect } from 'react';
import {
  Button,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Routes from './src/navigation/Routes';
// import { requestUserPermission, Notificationservices, Foreground } from './src/utils/pushNotifications';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from './src/screens/HomeScreen';
import ChatScreen from './src/screens/ChatScreen';
import Signup from './src/screens/Signup';

const App = () => {

  const Stack = createStackNavigator();

  // useEffect(() => {
  //   requestUserPermission();
  //   Notificationservices();
  //   Foreground();
  // });


  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="HomeScreen" component={HomeScreen} options={{ headerShown: false }} />
        <Stack.Screen name="ChatScreen" component={ChatScreen} />
        <Stack.Screen name='Signup' component={Signup} />
      </Stack.Navigator>
    </NavigationContainer>
  )
};




export default App;
