import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

export default function PanicButton({ onPress }) {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.text}>PANIC</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#c62828",
    paddingVertical: 20,
    paddingHorizontal: 60,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    elevation: 5, // shadow for Android
    shadowColor: "#000", // shadow for iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  text: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "bold",
  },
});
