// components/LocationDropdown.js
import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { CAMPUS_LOCATIONS, COLORS } from "../utils/constants";

export default function LocationDropdown({ value, onChange }) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Location</Text>

      <View style={styles.dropdownWrapper}>
        <Picker
          selectedValue={value}
          onValueChange={onChange}
          style={styles.picker}
        >
          <Picker.Item label="Select Location" value="" />
          {CAMPUS_LOCATIONS.map((loc, index) => (
            <Picker.Item key={index} label={loc} value={loc} />
          ))}
        </Picker>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { marginBottom: 20 },
  label: {
    fontSize: 16,
    fontWeight: "600",
    color: COLORS.darkBlue,
    marginBottom: 8,
  },
  dropdownWrapper: {
    backgroundColor: COLORS.white,
    borderRadius: 10,
    elevation: 2,
  },
  picker: {
    height: 50,
    color: COLORS.black,
  },
});
