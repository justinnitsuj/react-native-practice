import React from 'react';
import { View,Text } from 'react-native';
import HomeScreen from '../Screens/HomeScreen/HomeScreen';
import BookingScreen from '../Screens/BookingScreen/BookingScreen';
import ProfileScreen from '../Screens/ProfileScreen/ProfileScreen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Colors from '../Utils/Colors';
import { FontAwesome } from '@expo/vector-icons';
import HomeNavigation from './HomeNavigation';

const Tab = createBottomTabNavigator();

export default function TabNavigation(){
  
  return (
    <Tab.Navigator screenOptions={{
      headerShown:false,
      // tabBarActiveTintColor:Colors.primary  修改顏色
    }}>
      <Tab.Screen name="Home" component={HomeNavigation} 
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color}) => (
           <Text style={{color:color,fontSize:12,marginTop:-7}}>Home</Text>
          ),
          tabBarIcon:({color,size})=>(
            <FontAwesome name="home" size={size} color={color} />
          )
        }}
      />
      <Tab.Screen name="booking" component={BookingScreen} 
      options={{
        tabBarLabel: 'booking',
        tabBarIcon: ({ color}) => (
         <Text style={{color:color,fontSize:12,marginTop:-7}}>Booking</Text>
        ),
        tabBarIcon:({color,size})=>(
          <FontAwesome name="bookmark" size={size} color={color} />
        )
      }}
      />
      <Tab.Screen name="profile" component={ProfileScreen} 
      options={{
        tabBarLabel: 'profile',
        tabBarIcon: ({ color}) => (
         <Text style={{color:color,fontSize:12,marginTop:-7}}>Profile</Text>
        ),
        tabBarIcon:({color,size})=>(
          <FontAwesome name="user" size={size} color={color} />
        )
      }}
      />
    </Tab.Navigator> 
  );
}