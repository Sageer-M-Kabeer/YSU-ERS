// screens/PanicButtonScreen.js
import React, { useEffect, useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Animated,
  StyleSheet,
  Image,
} from "react-native";
import PanicSVG from "../assets/images/panic.svg";


export default function PanicButtonScreen({ navigation }) {
  const pulseAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.15,
          duration: 700,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 700,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Emergency Panic Mode</Text>
      <Text style={styles.subheader}>
        Tap the button below to report an emergency immediately.
      </Text>

      <Animated.View style={{ transform: [{ scale: pulseAnim }] }}>
        <TouchableOpacity
          style={styles.panicButton}
          onPress={() => navigation.navigate("PanicForm")}
        >
          {/* <Image
            source={require("../assets/images/emergency-bg.png")}
            style={styles.icon}
          /> */}
          <Text style={styles.panicText}>REPORT EMERGENCY</Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#001F3F",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },

  header: {
    color: "#FF3B30",
    fontSize: 24,
    fontWeight: "900",
    marginBottom: 10,
    textAlign: "center",
  },

  subheader: {
    color: "#fff",
    fontSize: 15,
    textAlign: "center",
    marginBottom: 40,
    opacity: 0.8,
  },
panicButton: {
  backgroundColor: "#FF0000",
  borderRadius: 120,
  alignItems: "center",
  justifyContent: "center",
  width: 220,
  height: 220,
  shadowColor: "#FF0000",
  shadowOpacity: 0.9,
  shadowRadius: 14,
  overflow: 'hidden',
},

buttonContent: {
  alignItems: "center",
  justifyContent: "center",
  width: '100%',
  height: '100%',
},

panicText: {
  color: "#fff",
  fontSize: 13,
  fontWeight: "800",
  textAlign: "center",
  zIndex: 1, // Ensure text appears above image
},

icon: {
  width: "100%",
  height: "100%",
  tintColor: "#fff",
  position: "absolute",
  opacity: 0.7, // Make image slightly transparent so text is readable
},
});
