import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import React from 'react'
import { Button, Dimensions, Image, StyleSheet, Text, Touchable, TouchableOpacity, View } from 'react-native'
import Home from '../Screens/Home'
import Profile from '../Screens/Login'
import Appointment from '../Screens/Appointment'
import { Entypo } from '@expo/vector-icons';
const Tab=createBottomTabNavigator()

export default function TabNavigation () {

    
    
    return (
      <Tab.Navigator screenOptions={{headerShow:false}}>
        <Tab.Screen name='orders' component={Home}
        options={{tabBarIcon:({color,size})=>(
        <Entypo name="home" size={size} color={color} />)
    }}
        />
        <Tab.Screen name='Profile' component={Appointment}
        options={{tabBarIcon:({color,size})=>(
          <Entypo name="user" size={size} color={color} />)
        }}
        />
       
      </Tab.Navigator>
    )
  }
  