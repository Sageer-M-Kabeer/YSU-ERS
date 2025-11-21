import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { locations } from "../data/locations"; // <-- import locations

export default function EmergencyForm({ onSubmit }) {
  const [location, setLocation] = useState(locations[0]); // first location as default
  const [type, setType] = useState("Fire");
  const [description, setDescription] = useState("");

  const handleSubmit = () => {
    if (!description.trim()) {
      Alert.alert("Error", "Please provide a description");
      return;
    }
    onSubmit({ location, type, description });
    setLocation(locations[0]);
    setType("Fire");
    setDescription("");
  };

  return (
    <View>
      <Text style={styles.label}>Location</Text>
      <Picker selectedValue={location} style={styles.picker} onValueChange={setLocation}>
        {locations.map((loc, index) => (
          <Picker.Item key={index} label={loc} value={loc} />
        ))}
      </Picker>

      <Text style={styles.label}>Type of Emergency</Text>
      <Picker selectedValue={type} style={styles.picker} onValueChange={setType}>
        <Picker.Item label="Fire" value="Fire" />
        <Picker.Item label="Health" value="Health" />
        <Picker.Item label="Security" value="Security" />
      </Picker>

      <Text style={styles.label}>Description</Text>
      <TextInput
        style={[styles.input, { height: 100 }]}
        multiline
        placeholder="Describe the emergency..."
        value={description}
        onChangeText={setDescription}
      />

      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitButtonText}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  label: { fontSize: 16, fontWeight: "bold", marginTop: 10 },
  picker: { height: 50, width: "100%", marginTop: 5 },
  input: { borderWidth: 1, borderColor: "#ccc", borderRadius: 8, padding: 10, marginTop: 5, textAlignVertical: "top" },
  submitButton: { backgroundColor: "#c62828", padding: 15, borderRadius: 10, alignItems: "center", marginTop: 20 },
  submitButtonText: { color: "#fff", fontSize: 18, fontWeight: "bold" },
});
