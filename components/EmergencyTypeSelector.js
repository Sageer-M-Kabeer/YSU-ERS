// components/EmergencyTypeSelector.js
import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { EMERGENCY_TYPES, COLORS } from "../utils/constants";

export default function EmergencyTypeSelector({ selectedType, onSelect }) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Emergency Type</Text>

      <View style={styles.row}>
        {EMERGENCY_TYPES.map((type) => (
          <TouchableOpacity
            key={type.id}
            style={[
              styles.typeBox,
              selectedType === type.id && styles.activeBox,
            ]}
            onPress={() => onSelect(type.id)}
          >
            <Text style={styles.icon}>{type.icon}</Text>
            <Text
              style={[
                styles.text,
                selectedType === type.id && styles.activeText,
              ]}
            >
              {type.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { marginBottom: 20 },
  label: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 8,
    color: COLORS.darkBlue,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  typeBox: {
    flex: 1,
    marginHorizontal: 5,
    paddingVertical: 12,
    backgroundColor: COLORS.white,
    borderRadius: 10,
    alignItems: "center",
    elevation: 2,
  },
  activeBox: {
    backgroundColor: COLORS.primary,
  },
  icon: {
    fontSize: 22,
    marginBottom: 6,
  },
  text: {
    fontSize: 12,
    color: COLORS.darkBlue,
    fontWeight: "600",
  },
  activeText: {
    color: COLORS.white,
  },
});
