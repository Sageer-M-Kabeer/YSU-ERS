// navigation/DrawerNavigator.js
import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Ionicons } from '@expo/vector-icons';

import HomeScreen from '../screens/HomeScreen';
import PanicButtonScreen from '../screens/PanicButtonScreen';
import EmergencyHistoryScreen from '../screens/EmergencyHistoryScreen';
import SettingsScreen from '../screens/SettingsScreen';
import EmergencyFormScreen from '../screens/EmergencyFormScreen';

const Drawer = createDrawerNavigator();

export default function DrawerNavigator() {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: false,
        drawerType: 'slide',
        drawerStyle: {
          width: 70,              // MINI DRAWER
          backgroundColor: '#fff',
        },
        drawerActiveBackgroundColor: '#E6F2FF',
        drawerInactiveTintColor: '#555',
        drawerActiveTintColor: '#0055AA',
        drawerItemStyle: {
          borderRadius: 10,
          marginVertical: 5,
          paddingLeft: 0, // fits mini drawer
        },
        drawerLabelStyle: {
          display: 'none', // hide text → icons only
        },
      }}
    >

      <Drawer.Screen
        name="Home"
        component={HomeScreen}
        options={{
          drawerIcon: ({ color, size }) => (
            <Ionicons name="home-outline" size={24} color={color} />
          ),
        }}
      />

      <Drawer.Screen
        name="Panic"
        component={PanicButtonScreen}
        options={{
          drawerIcon: ({ color }) => (
            <Ionicons name="alert-circle-outline" size={24} color={color} />
          ),
        }}
      />

      <Drawer.Screen
        name="History"
        component={EmergencyHistoryScreen}
        options={{
          drawerIcon: ({ color }) => (
            <Ionicons name="time-outline" size={24} color={color} />
          ),
        }}
      />

      <Drawer.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          drawerIcon: ({ color }) => (
            <Ionicons name="settings-outline" size={24} color={color} />
          ),
        }}
      />

      <Drawer.Screen
        name="EmergencyForm"
        component={EmergencyFormScreen}
      />


    </Drawer.Navigator>
  );
}
