import React, { useEffect, useState } from "react";
import { View, ActivityIndicator } from "react-native";
import AppNavigator from "./navigation/AppNavigator";

import { UserProvider } from "./context/UserContext";
import { EmergencyProvider } from "./context/EmergencyContext";
import { AppProvider } from "./context/AppContext";

// Theme colors
const themeColors = {
  primary: "#D50000",     // Red
  darkBlue: "#002147",    // YSU Dark Blue
  white: "#FFFFFF",
  gray: "#F2F2F2",
};

export default function App() {
  const [appReady, setAppReady] = useState(false);

  useEffect(() => {
    // Simulate loading fonts or assets if needed
    const loadApp = async () => {
      await new Promise((resolve) => setTimeout(resolve, 800));
      setAppReady(true);
    };
    loadApp();
  }, []);

  if (!appReady) {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: themeColors.darkBlue,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ActivityIndicator size="large" color={themeColors.primary} />
      </View>
    );
  }

  return (
    <AppProvider theme={themeColors}>
      <UserProvider>
        <EmergencyProvider>
          <AppNavigator />
        </EmergencyProvider>
      </UserProvider>
    </AppProvider>
  );
}
