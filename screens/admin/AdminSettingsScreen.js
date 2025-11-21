// screens/admin/AdminSettingsScreen.js
import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

export default function AdminSettingsScreen({ navigation }) {
  const logout = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: "Login" }],
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Admin Settings</Text>

      <TouchableOpacity style={styles.btn} onPress={logout}>
        <Text style={styles.btnText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#001F3F", padding: 20 },
  title: { color: "#fff", fontSize: 26, fontWeight: "bold", marginBottom: 20 },
  btn: {
    backgroundColor: "#FF0000",
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
  },
  btnText: { color: "#fff", fontSize: 18, fontWeight: "bold", textAlign: "center" },
});
