import { View, Text } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../Screens/HomeScreen/HomeScreen';
import BusinesslistByCategory from '../Screens/BusinesslistByCategoryScreen/BusinesslistByCategoryScreen';
import BusinessDetailScreen from '../Screens/BusinessDetailScreen/BusinessDetailScreen';
import BookingScreen from '../Screens/BookingScreen/BookingScreen';
const Stack = createStackNavigator();
export default function HomeNavigation() {
  return (
    <Stack.Navigator screenOptions={{
        headerShown:false,
        
    }}>
      <Stack.Screen name="home" component={HomeScreen} />
      <Stack.Screen name="business-list" component={BusinesslistByCategory} />
      <Stack.Screen name="booking-screen" component={BookingScreen} />
      <Stack.Screen name="business-detail" component={BusinessDetailScreen} />
    </Stack.Navigator>
  )
}