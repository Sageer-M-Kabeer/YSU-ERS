// screens/EmergencyFormScreen.js - Update the navigation part
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
  ActivityIndicator
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { CAMPUS_LOCATIONS, EMERGENCY_TYPES } from "../utils/constants";
import AsyncStorage from "@react-native-async-storage/async-storage";

const API_BASE_URL = "http://10.142.124.132:5000/api";

export default function EmergencyFormScreen({ navigation }) {
  const [title, setTitle] = useState("");
  const [type, setType] = useState(EMERGENCY_TYPES[0].id);
  const [location, setLocation] = useState(CAMPUS_LOCATIONS[0]);
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!title || !description) {
      Alert.alert("Missing Info", "Please fill all required fields.");
      return;
    }

    setLoading(true);

    try {
      // Get matric number stored during login
      const savedMatric = await AsyncStorage.getItem("userMatricNumber");
      console.log("Retrieved matric number:", savedMatric);

      if (!savedMatric) {
        Alert.alert("Error", "Unable to verify your account. Please log in again.");
        setLoading(false);
        return;
      }

      // Build payload including matricNumber
      const payload = {
        title,
        type,
        location,
        description,
        matricNumber: savedMatric.trim(),
      };

      console.log("Submitting emergency with payload:", payload);

      const response = await fetch(`${API_BASE_URL}/emergencies/create-emergency`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();
      console.log("Response data:", data);

      if (response.ok && data.success) {
        Alert.alert("Success", "Your emergency has been reported!", [
          {
            text: "OK",
            onPress: () => {
              // Reset form
              setTitle("");
              setDescription("");
              setType(EMERGENCY_TYPES[0].id);
              setLocation(CAMPUS_LOCATIONS[0]);
              
              // Navigate back instead of to "Home"
              navigation.goBack();
            }
          }
        ]);
      } else {
        Alert.alert("Error", data.message || "Failed to submit emergency.");
      }
    } catch (error) {
      console.log("Submit error:", error);
      Alert.alert("Network Error", "Unable to reach the server. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Report an Emergency</Text>

      {/* Title */}
      <Text style={styles.label}>Emergency Title *</Text>
      <TextInput
        style={styles.input}
        placeholder="e.g. Fire outbreak at hostel"
        value={title}
        onChangeText={setTitle}
        placeholderTextColor="#999"
      />

      {/* Type */}
      <Text style={styles.label}>Emergency Type *</Text>
      <View style={styles.pickerBox}>
        <Picker selectedValue={type} onValueChange={setType}>
          {EMERGENCY_TYPES.map((item) => (
            <Picker.Item label={item.label} value={item.id} key={item.id} />
          ))}
        </Picker>
      </View>

      {/* Location */}
      <Text style={styles.label}>Location *</Text>
      <View style={styles.pickerBox}>
        <Picker selectedValue={location} onValueChange={setLocation}>
          {CAMPUS_LOCATIONS.map((loc) => (
            <Picker.Item label={loc} value={loc} key={loc} />
          ))}
        </Picker>
      </View>

      {/* Description */}
      <Text style={styles.label}>Description *</Text>
      <TextInput
        style={[styles.input, styles.textArea]}
        placeholder="Describe the situation in detail..."
        value={description}
        onChangeText={setDescription}
        multiline
        numberOfLines={4}
        placeholderTextColor="#999"
      />

      {/* Submit Button */}
      <TouchableOpacity
        style={[styles.submitBtn, loading && styles.submitBtnDisabled]}
        onPress={handleSubmit}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.submitText}>SUBMIT REPORT</Text>
        )}
      </TouchableOpacity>

      {/* Cancel Button */}
      <TouchableOpacity
        style={styles.cancelBtn}
        onPress={() => navigation.goBack()}
        disabled={loading}
      >
        <Text style={styles.cancelText}>CANCEL</Text>
      </TouchableOpacity>

      <View style={{ height: 40 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#001F3F",
    flex: 1,
    padding: 20,
  },
  header: {
    fontSize: 22,
    fontWeight: "900",
    color: "#FF3B30",
    marginBottom: 20,
    textAlign: "center",
  },
  label: {
    color: "#fff",
    marginTop: 10,
    marginBottom: 5,
    fontWeight: "bold",
    fontSize: 16,
  },
  input: {
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 8,
    fontSize: 16,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  textArea: {
    height: 120,
    textAlignVertical: "top",
  },
  pickerBox: {
    backgroundColor: "#fff",
    borderRadius: 8,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  submitBtn: {
    backgroundColor: "#FF3B30",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 25,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  submitBtnDisabled: {
    backgroundColor: "#FF6B6B",
    opacity: 0.7,
  },
  submitText: {
    color: "#fff",
    fontWeight: "900",
    fontSize: 16,
  },
  cancelBtn: {
    backgroundColor: "transparent",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 10,
    borderWidth: 2,
    borderColor: "#FF3B30",
  },
  cancelText: {
    color: "#FF3B30",
    fontWeight: "900",
    fontSize: 16,
  },
});