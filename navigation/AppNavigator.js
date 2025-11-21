// navigation/AppNavigator.js
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// Screens
import SplashScreen from "../screens/SplashScreen";
import LoginScreen from "../screens/LoginScreen";
import SignupScreen from "../screens/SignupScreen";
import SettingsScreen from "../screens/SettingsScreen";
import AdminSettings from "../screens/admin/AdminSettingsScreen"
import AdminEmergencies from "../screens/admin/AdminEmergenciesScreen"
import AdminEmergencyDetailScreen from "../screens/admin/AdminEmergencyDetailScreen"
import PanicForm from "../screens/PanicForm";
// NEW: Bottom Navigation
import BottomTabNavigator from "./BottomTabNavigator";

// Admin Navigation
// import AdminNavigator from "./AdPanicFormminNavigator";

// Emergency Form
import EmergencyFormScreen from "../screens/EmergencyFormScreen";
import AdminDashboardScreen from "../screens/admin/AdminDashboardScreen";

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>

        {/* Auth Flow */}
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Signup" component={SignupScreen} />
        <Stack.Screen name="Settings" component={SettingsScreen} />
        <Stack.Screen name="PanicForm" component={PanicForm} />


        {/* USER APP (now bottom navigation) */}
        <Stack.Screen name="MainApp" component={BottomTabNavigator} />

        {/* Emergency Form */}
        <Stack.Screen name="EmergencyForm" component={EmergencyFormScreen} />

        {/* ADMIN */}
        <Stack.Screen name="AdminPanel" component={AdminDashboardScreen} />
        <Stack.Screen name="AdminSettings" component={AdminSettings} />
        <Stack.Screen name="AdminEmergencies" component={AdminEmergencies} />
        <Stack.Screen
  name="AdminEmergencyDetail"
  component={AdminEmergencyDetailScreen}
/>


      </Stack.Navigator>
    </NavigationContainer>
  );
}
