// screens/admin/AdminDashboardScreen.js
import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

export default function AdminDashboardScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Admin Dashboard</Text>

      <TouchableOpacity
        style={styles.card}
        onPress={() => navigation.navigate("AdminEmergencies")}
      >
        <Text style={styles.cardText}>View All Emergencies</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.card}
        onPress={() => navigation.navigate("AdminSettings")}
      >
        <Text style={styles.cardText}>Settings</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#001F3F", padding: 20 },
  title: { color: "#fff", fontSize: 26, fontWeight: "bold", marginBottom: 20 },
  card: {
    backgroundColor: "#FF0000",
    padding: 20,
    borderRadius: 12,
    marginVertical: 10,
  },
  cardText: { color: "#fff", fontSize: 18, fontWeight: "bold" },
});
