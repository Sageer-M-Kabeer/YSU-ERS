// screens/admin/AdminEmergenciesScreen.js
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  Alert,
} from "react-native";

const API_BASE_URL = "http://10.142.124.132:5000/api";

const statusColor = (status) => {
  switch (status) {
    case "pending":
      return "#D4AF37"; // Gold
    case "inProgress":
      return "#4DA6FF"; // Light Blue
    case "completed":
      return "#50C878"; // Emerald
    default:
      return "#999";
  }
};

export default function AdminEmergenciesScreen({ navigation }) {
  const [emergencies, setEmergencies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      fetchEmergencies();
    });
    fetchEmergencies();
    return unsubscribe;
  }, [navigation]);

  const fetchEmergencies = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE_URL}/emergencies`);
      if (!res.ok) {
        const text = await res.text();
        console.error("Server non-OK response:", text);
        throw new Error("Failed to fetch emergencies");
      }
      const json = await res.json();
      setEmergencies(json.data || []);
    } catch (err) {
      console.error("Error fetching emergencies:", err);
      Alert.alert("Error", "Unable to load emergencies from server.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <ActivityIndicator size="large" color="#FF3B30" style={{ marginTop: 60 }} />;
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 40 }}>
      <Text style={styles.title}>All Reported Emergencies</Text>

      {emergencies.length === 0 && <Text style={styles.empty}>No emergencies found.</Text>}

      {emergencies.map((e) => (
        <TouchableOpacity
          key={e._id}
          style={styles.card}
          activeOpacity={0.85}
          onPress={() => navigation.navigate("AdminEmergencyDetail", { emergencyId: e._id })}
        >
          <View style={styles.cardHeader}>
            <Text numberOfLines={1} style={styles.cardTitle}>
              {e.title}
            </Text>
            <View style={[styles.statusPill, { backgroundColor: statusColor(e.status) }]}>
              <Text style={styles.statusText}>
                {e.status === "inProgress" ? "In Progress" : e.status.charAt(0).toUpperCase() + e.status.slice(1)}
              </Text>
            </View>
          </View>

          <Text style={styles.metaLine}>
            {e.type} • {e.location}
          </Text>

          <Text numberOfLines={2} style={styles.description}>
            {e.description}
          </Text>

          <Text style={styles.time}>{new Date(e.createdAt).toLocaleString()}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { backgroundColor: "#001F3F", flex: 1, padding: 16 },
  title: { color: "#fff", fontSize: 26, fontWeight: "800", marginBottom: 12, textAlign: "center" },
  empty: { color: "#fff", marginTop: 20, textAlign: "center" },
  card: {
    backgroundColor: "#04132A",
    padding: 16,
    borderRadius: 14,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 6,
  },
  cardHeader: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 6 },
  cardTitle: { color: "#fff", fontSize: 18, fontWeight: "800", flex: 1, marginRight: 8 },
  statusPill: { paddingHorizontal: 10, paddingVertical: 6, borderRadius: 20 },
  statusText: { color: "#0B0B0B", fontWeight: "700", fontSize: 12 },
  metaLine: { color: "#B7D4FF", marginBottom: 6, fontWeight: "700" },
  description: { color: "#E6F0FF", marginBottom: 8 },
  time: { color: "#9FBFDD", fontSize: 12, fontStyle: "italic" },
});
