// screens/admin/AdminEmergencyDetailScreen.js
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  Alert,
  ScrollView,
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

export default function AdminEmergencyDetailScreen({ route, navigation }) {
  const { emergencyId } = route.params;
  const [em, setEm] = useState(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    fetchDetail();
  }, []);

  // Fetch emergency detail
  const fetchDetail = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE_URL}/emergencies/${emergencyId}`);
      const json = await res.json();
      if (!res.ok) throw new Error(json.message || "Failed to load emergency");
      setEm(json.data);
    } catch (err) {
      console.error("Error fetching emergency detail:", err);
      Alert.alert("Error", "Unable to fetch emergency details.");
      navigation.goBack();
    } finally {
      setLoading(false);
    }
  };

  // Update status
  const updateStatus = async (newStatus) => {
    if (!em || em.status === newStatus) return;

    setUpdating(true);
    try {
      const res = await fetch(`${API_BASE_URL}/emergencies/${emergencyId}/status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });

      const text = await res.text();
      let json;
      try { 
        json = JSON.parse(text); 
      } catch (e) { 
        json = null; 
      }

      if (!res.ok) throw new Error((json && json.message) || text || "Failed to update");

      setEm(json.data);
      Alert.alert("Success", "Status updated successfully");
    } catch (err) {
      console.error("Update error:", err);
      Alert.alert("Error", err.message);
    } finally {
      setUpdating(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#FF3B30" />
      </View>
    );
  }

  if (!em) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Emergency not found</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 40 }}>
      <View style={styles.headerRow}>
        <Text style={styles.title}>{em.title}</Text>
        <View style={[styles.statusPill, { backgroundColor: statusColor(em.status) }]}>
          <Text style={styles.statusPillText}>
            {em.status === "inProgress"
              ? "In Progress"
              : em.status.charAt(0).toUpperCase() + em.status.slice(1)}
          </Text>
        </View>
      </View>

      <Text style={styles.meta}>
        Type: <Text style={styles.metaValue}>{em.type}</Text>
      </Text>
      <Text style={styles.meta}>
        Location: <Text style={styles.metaValue}>{em.location}</Text>
      </Text>
      <Text style={styles.meta}>
        Reported by: <Text style={styles.metaValue}>{em.matricNumber || "Unknown"}</Text>
      </Text>
      <Text style={styles.meta}>
        Reported at: <Text style={styles.metaValue}>
          {new Date(em.createdAt).toLocaleString()}
        </Text>
      </Text>

      <Text style={styles.sectionTitle}>Description</Text>
      <Text style={styles.description}>{em.description}</Text>

      <View style={styles.actionsRow}>
        <TouchableOpacity
          style={[styles.actionBtn, { backgroundColor: "#D4AF37" }]}
          onPress={() => updateStatus("pending")}
          disabled={updating || em.status === "pending"}
        >
          <Text style={styles.actionText}>Set Pending</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.actionBtn, { backgroundColor: "#4DA6FF" }]}
          onPress={() => updateStatus("inProgress")}
          disabled={updating || em.status === "inProgress"}
        >
          <Text style={styles.actionText}>Set In Progress</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.actionBtn, { backgroundColor: "#50C878" }]}
          onPress={() => updateStatus("completed")}
          disabled={updating || em.status === "completed"}
        >
          <Text style={styles.actionText}>Set Completed</Text>
        </TouchableOpacity>
      </View>

      {updating && (
        <ActivityIndicator size="small" color="#fff" style={{ marginTop: 12 }} />
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { 
    backgroundColor: "#001F3F", 
    flex: 1, 
    padding: 18 
  },
  loadingContainer: {
    flex: 1,
    backgroundColor: "#001F3F",
    justifyContent: "center",
    alignItems: "center"
  },
  headerRow: { 
    flexDirection: "row", 
    justifyContent: "space-between", 
    alignItems: "center", 
    marginBottom: 10 
  },
  title: { 
    color: "#FF3B30", 
    fontSize: 22, 
    fontWeight: "900", 
    flex: 1, 
    marginRight: 10 
  },
  statusPill: { 
    paddingHorizontal: 12, 
    paddingVertical: 6, 
    borderRadius: 20 
  },
  statusPillText: { 
    color: "#0B0B0B", 
    fontWeight: "800" 
  },
  meta: { 
    color: "#BFDFFF", 
    marginTop: 8, 
    fontWeight: "700" 
  },
  metaValue: { 
    color: "#E6F0FF", 
    fontWeight: "600" 
  },
  sectionTitle: { 
    color: "#fff", 
    marginTop: 14, 
    fontSize: 16, 
    fontWeight: "800" 
  },
  description: { 
    color: "#E6F0FF", 
    marginTop: 8, 
    fontSize: 15, 
    lineHeight: 20 
  },
  actionsRow: { 
    flexDirection: "row", 
    justifyContent: "space-between", 
    marginTop: 18, 
    flexWrap: "wrap" 
  },
  actionBtn: { 
    flex: 1, 
    padding: 12, 
    borderRadius: 10, 
    alignItems: "center", 
    margin: 4,
    minWidth: 100
  },
  actionText: { 
    color: "#0B0B0B", 
    fontWeight: "900" 
  },
  errorText: {
    color: "#FF3B30",
    fontSize: 18,
    textAlign: "center",
    marginTop: 50
  }
});