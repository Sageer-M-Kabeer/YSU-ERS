// components/EmergencyCard.js
import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { EMERGENCY_TYPES, COLORS } from "../utils/constants";

export default function EmergencyCard({ data }) {
  const emergencyType = EMERGENCY_TYPES.find((t) => t.id === data.type);

  return (
    <View style={styles.card}>
      {/* TITLE */}
      <Text style={styles.title}>{data.title}</Text>

      {/* TYPE & LOCATION */}
      <View style={styles.row}>
        <Text style={styles.type}>
          {emergencyType?.icon} {emergencyType?.label}
        </Text>
        <Text style={styles.location}>📍 {data.location}</Text>
      </View>

      {/* DESCRIPTION */}
      {data.description ? (
        <Text style={styles.description}>{data.description}</Text>
      ) : null}

      {/* TIME */}
      <Text style={styles.time}>🕒 {data.time}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: 16,
    marginBottom: 14,
    elevation: 3,
    borderLeftWidth: 6,
    borderLeftColor: COLORS.primary,
  },
  title: {
    fontSize: 18,
    fontWeight: "700",
    color: COLORS.darkBlue,
    marginBottom: 6,
  },
  row: {
    marginBottom: 8,
  },
  type: {
    fontSize: 15,
    fontWeight: "600",
    color: COLORS.primary,
  },
  location: {
    fontSize: 14,
    fontWeight: "500",
    color: COLORS.black,
  },
  description: {
    fontSize: 14,
    marginTop: 6,
    color: COLORS.black,
  },
  time: {
    marginTop: 10,
    fontSize: 13,
    color: "#444",
    fontStyle: "italic",
  },
});
