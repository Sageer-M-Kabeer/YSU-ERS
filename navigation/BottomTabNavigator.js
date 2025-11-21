// navigation/BottomTabNavigator.js
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";

// Screens
// import HomeScreen from "../screens/HomeScreen";
import PanicButtonScreen from "../screens/PanicButtonScreen";
// import EmergencyHistoryScreen from "../screens/EmergencyHistoryScreen";
import SettingsScreen from "../screens/SettingsScreen";
import AboutScreen from "../screens/AboutScreen";
import EmergencyFormScreen from "../screens/EmergencyFormScreen";

const Tab = createBottomTabNavigator();

export default function BottomTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        paddingBottom: 20,
        headerShown: false,
        tabBarShowLabel: true,
        tabBarActiveTintColor: "#D50000",
        tabBarInactiveTintColor: "#999",
        tabBarStyle: {
          backgroundColor: "#fff",
          height: 60,
          paddingBottom: 8,
          paddingTop: 8,
        },

        tabBarIcon: ({ color, size }) => {
          let iconName = "home-outline";

          switch (route.name) {
            case "panicBtn":
              iconName = "home-outline";
              break;

            case "Panic":
              iconName = "alert-outline";
              break;
            case "Emergency Form":
              iconName = "document-text-outline";
              break;

            case "Settings":
              iconName = "settings-outline";
              break;
          }

          return <Ionicons name={iconName} size={24} color={color} />;
        },
      })}
    >
      {/* <Tab.Screen name="Home" component={HomeScreen} /> */}
      <Tab.Screen name="Panic" component={PanicButtonScreen} />
      <Tab.Screen name="Emergency Form" component={EmergencyFormScreen} />
      <Tab.Screen name="About" component={AboutScreen} />
      {/* <Tab.Screen name="History" component={EmergencyHistoryScreen} /> */}
      <Tab.Screen name="Settings" component={SettingsScreen} />

    </Tab.Navigator>
  );
}
