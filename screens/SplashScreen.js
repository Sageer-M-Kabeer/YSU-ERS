// screens/SplashScreen.js
import React, { useEffect } from 'react';
import { View, Text, Image, StyleSheet, StatusBar } from 'react-native';

export default function SplashScreen({ navigation }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace("Login");
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#001F3F" />

      <Image
        source={require('../assets/images/ysu-logo.png')}
        style={styles.logo}
      />

      <Text style={styles.title}>YSU-ERS</Text>
      <Text style={styles.subtitle}>Yobe State University Emergency Response App</Text>
      
      <Text style={styles.bottomText}>Developed By:Nazif</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#001F3F",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
  },

  logo: {
    width: 140,
    height: 140,
    resizeMode: "contain",
    marginBottom: 20,
  },

  title: {
    fontSize: 30,
    fontWeight: "900",
    color: "#FF3B30", // emergency red
    marginBottom: 10,
  },

  subtitle: {
    fontSize: 14,
    color: "#E0E0E0",
    textAlign: "center",
    marginBottom: 10,
  },

  bottomText: {
    fontSize: 12,
    color: "#E0E0E0",
    position: "absolute",
    bottom: 20,
    width: "100%",
    marginHorizontal: "auto",
    textAlign: "center",
  }
});