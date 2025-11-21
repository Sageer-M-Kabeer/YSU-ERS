// screens/PanicForm.js
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { CAMPUS_LOCATIONS, EMERGENCY_TYPES } from "../utils/constants";

const API_BASE_URL = "http://10.142.124.132:5000/api";

export default function PanicForm({ navigation }) {
  const [type, setType] = useState("Security"); // Default to most common emergency
  const [location, setLocation] = useState(CAMPUS_LOCATIONS[0]);
  const [loading, setLoading] = useState(false);
  const [countdown, setCountdown] = useState(5);
  const [autoSubmit, setAutoSubmit] = useState(false);

  // Auto-submit countdown
  useEffect(() => {
    if (autoSubmit && countdown > 0) {
      const timer = setTimeout(() => {
        setCountdown(countdown - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (autoSubmit && countdown === 0) {
      handlePanicSubmit();
    }
  }, [autoSubmit, countdown]);

  const handlePanicSubmit = async () => {
    setLoading(true);

    try {
      // Get matric number stored during login
      const savedMatric = await AsyncStorage.getItem("userMatricNumber");
      console.log("Panic Form - Retrieved matric:", savedMatric);

      if (!savedMatric) {
        Alert.alert("Error", "Unable to verify your account. Please log in again.");
        setLoading(false);
        setAutoSubmit(false);
        return;
      }

      // Auto-fill all required fields
      const panicData = {
        title: getEmergencyTitle(type),
        type: type,
        location: location,
        description: getEmergencyDescription(type, location),
        matricNumber: savedMatric.trim(),
        status: "pending"
      };

      console.log("Panic Form submitting:", panicData);

      const response = await fetch(`${API_BASE_URL}/emergencies/create-emergency`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(panicData),
      });

      const data = await response.json();
      console.log("Panic Form response:", data);

      if (response.ok && data.success) {
        Alert.alert(
          "🚨 HELP IS ON THE WAY!",
          "Emergency alert sent successfully! Security has been notified.",
          [
            {
              text: "OK",
              onPress: () => navigation.goBack()
            }
          ]
        );
      } else {
        Alert.alert("Error", data.message || "Failed to send emergency alert.");
      }
    } catch (error) {
      console.log("Panic Form submit error:", error);
      Alert.alert("Network Error", "Unable to reach emergency services. Please try again.");
    } finally {
      setLoading(false);
      setAutoSubmit(false);
      setCountdown(5);
    }
  };

  // Helper function to generate appropriate title based on emergency type
  const getEmergencyTitle = (emergencyType) => {
    const titles = {
      "Fire": "🚨 Fire Emergency - Immediate Response Required",
      "Medical": "🚑 Medical Emergency - Urgent Assistance Needed", 
      "Security": "🛡️ Security Emergency - Immediate Intervention Required"
    };
    return titles[emergencyType] || "🚨 Emergency Assistance Required";
  };

  // Helper function to generate appropriate description
  const getEmergencyDescription = (emergencyType, emergencyLocation) => {
    const baseDescription = `URGENT: ${emergencyType} emergency reported via panic button. `;
    const locationInfo = `Location: ${emergencyLocation}. `;
    const instructions = `Please dispatch immediate assistance. User may be in distress and unable to provide details.`;
    
    return baseDescription + locationInfo + instructions;
  };

  const handleQuickSubmit = (emergencyType) => {
    setType(emergencyType);
    setAutoSubmit(true);
    
    Alert.alert(
      `🚨 ${emergencyType.toUpperCase()} EMERGENCY`,
      `Emergency alert will be sent automatically in ${countdown} seconds. Cancel if this was accidental.`,
      [
        {
          text: "CANCEL NOW",
          style: "destructive",
          onPress: () => {
            setAutoSubmit(false);
            setCountdown(5);
          }
        }
      ]
    );
  };

  const handleManualSubmit = () => {
    Alert.alert(
      "Confirm Emergency Alert",
      `Are you sure you want to send a ${type} emergency alert from ${location}?`,
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        {
          text: "SEND ALERT",
          style: "destructive",
          onPress: handlePanicSubmit
        }
      ]
    );
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>🚨 EMERGENCY ALERT</Text>
      <Text style={styles.subtitle}>Quickly report your emergency</Text>

      {/* Auto-submit Countdown */}
      {autoSubmit && (
        <View style={styles.countdownContainer}>
          <Text style={styles.countdownText}>
            🚨 SENDING AUTOMATIC ALERT IN: {countdown}
          </Text>
          <TouchableOpacity 
            style={styles.cancelAutoSubmit}
            onPress={() => {
              setAutoSubmit(false);
              setCountdown(5);
            }}
          >
            <Text style={styles.cancelAutoSubmitText}>CANCEL</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Quick Emergency Buttons */}
      <View style={styles.quickActions}>
        <Text style={styles.sectionTitle}>QUICK EMERGENCY TYPES:</Text>
        
        <TouchableOpacity 
          style={[styles.quickButton, styles.medicalButton]}
          onPress={() => handleQuickSubmit("Medical")}
          disabled={loading || autoSubmit}
        >
          <Text style={styles.quickButtonText}>🚑 MEDICAL</Text>
          <Text style={styles.quickButtonSubtext}>I need medical help immediately</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.quickButton, styles.securityButton]}
          onPress={() => handleQuickSubmit("Security")}
          disabled={loading || autoSubmit}
        >
          <Text style={styles.quickButtonText}>🛡️ SECURITY</Text>
          <Text style={styles.quickButtonSubtext}>I feel unsafe or threatened</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.quickButton, styles.fireButton]}
          onPress={() => handleQuickSubmit("Fire")}
          disabled={loading || autoSubmit}
        >
          <Text style={styles.quickButtonText}>🔥 FIRE</Text>
          <Text style={styles.quickButtonSubtext}>Fire or smoke detected</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.divider}>--- OR CUSTOMIZE BELOW ---</Text>

      {/* Emergency Type Selection */}
      <Text style={styles.label}>Emergency Type</Text>
      <View style={styles.pickerBox}>
        <Picker 
          selectedValue={type} 
          onValueChange={setType}
          enabled={!loading && !autoSubmit}
        >
          {EMERGENCY_TYPES.map((item) => (
            <Picker.Item 
              label={`${item.icon} ${item.label}`} 
              value={item.id} 
              key={item.id} 
            />
          ))}
        </Picker>
      </View>

      {/* Location Selection */}
      <Text style={styles.label}>Your Location</Text>
      <View style={styles.pickerBox}>
        <Picker
          selectedValue={location}
          onValueChange={setLocation}
          enabled={!loading && !autoSubmit}
        >
          {CAMPUS_LOCATIONS.map((loc) => (
            <Picker.Item label={`📍 ${loc}`} value={loc} key={loc} />
          ))}
        </Picker>
      </View>

      {/* Emergency Preview */}
      <View style={styles.previewBox}>
        <Text style={styles.previewTitle}>ALERT PREVIEW:</Text>
        <Text style={styles.previewText}>
          <Text style={styles.previewLabel}>Type:</Text> {type}
        </Text>
        <Text style={styles.previewText}>
          <Text style={styles.previewLabel}>Location:</Text> {location}
        </Text>
        <Text style={styles.previewText}>
          <Text style={styles.previewLabel}>Message:</Text> {getEmergencyDescription(type, location)}
        </Text>
      </View>

      {/* Manual Submit Button */}
      <TouchableOpacity
        style={[styles.submitButton, (loading || autoSubmit) && styles.buttonDisabled]}
        onPress={handleManualSubmit}
        disabled={loading || autoSubmit}
      >
        {loading ? (
          <ActivityIndicator color="#FFFFFF" />
        ) : (
          <Text style={styles.submitButtonText}>🚨 SEND EMERGENCY ALERT</Text>
        )}
      </TouchableOpacity>

      {/* Cancel Button */}
      <TouchableOpacity
        style={styles.cancelButton}
        onPress={() => navigation.goBack()}
        disabled={loading || autoSubmit}
      >
        <Text style={styles.cancelText}>Cancel</Text>
      </TouchableOpacity>

      {/* Emergency Contact Info */}
      <View style={styles.emergencyInfo}>
        <Text style={styles.emergencyTitle}>📞 IMMEDIATE HELP:</Text>
        <Text style={styles.emergencyContact}>Campus Security: 0700-YSU-SAFE</Text>
        <Text style={styles.emergencyContact}>Medical Emergency: 112 or 199</Text>
        <Text style={styles.emergencyContact}>Fire Service: 119</Text>
      </View>

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
    fontSize: 28,
    fontWeight: "900",
    color: "#FF3B30",
    textAlign: "center",
    marginBottom: 5,
    marginTop: 10,
  },
  subtitle: {
    color: "#FFFFFF",
    fontSize: 16,
    textAlign: "center",
    marginBottom: 20,
    opacity: 0.8,
  },
  countdownContainer: {
    backgroundColor: "rgba(255, 59, 48, 0.2)",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 20,
    borderWidth: 2,
    borderColor: "#FF3B30",
  },
  countdownText: {
    color: "#FFD700",
    fontWeight: "900",
    fontSize: 18,
    textAlign: "center",
  },
  cancelAutoSubmit: {
    marginTop: 10,
    padding: 8,
    paddingHorizontal: 20,
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
  },
  cancelAutoSubmitText: {
    color: "#FF3B30",
    fontWeight: "700",
    fontSize: 14,
  },
  quickActions: {
    marginBottom: 20,
  },
  sectionTitle: {
    color: "#FFD700",
    fontWeight: "700",
    fontSize: 16,
    marginBottom: 10,
    textAlign: "center",
  },
  quickButton: {
    padding: 15,
    borderRadius: 10,
    marginVertical: 5,
    alignItems: "center",
  },
  medicalButton: {
    backgroundColor: "#DC3545",
  },
  securityButton: {
    backgroundColor: "#FF6B35",
  },
  fireButton: {
    backgroundColor: "#FF3B30",
  },
  quickButtonText: {
    color: "#FFFFFF",
    fontWeight: "900",
    fontSize: 16,
  },
  quickButtonSubtext: {
    color: "#FFFFFF",
    fontSize: 12,
    opacity: 0.9,
    marginTop: 2,
  },
  divider: {
    color: "#FFD700",
    textAlign: "center",
    marginVertical: 15,
    fontWeight: "600",
  },
  label: {
    color: "#FFFFFF",
    marginTop: 10,
    marginBottom: 5,
    fontWeight: "bold",
    fontSize: 16,
  },
  pickerBox: {
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    marginBottom: 15,
  },
  previewBox: {
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    padding: 15,
    borderRadius: 8,
    marginVertical: 10,
    borderLeftWidth: 4,
    borderLeftColor: "#FF3B30",
  },
  previewTitle: {
    color: "#FFD700",
    fontWeight: "700",
    fontSize: 14,
    marginBottom: 8,
  },
  previewText: {
    color: "#FFFFFF",
    fontSize: 12,
    marginBottom: 4,
  },
  previewLabel: {
    fontWeight: "700",
    color: "#BFDFFF",
  },
  submitButton: {
    backgroundColor: "#FF3B30",
    padding: 20,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 20,
    elevation: 5,
    shadowColor: "#FF3B30",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  buttonDisabled: {
    backgroundColor: "#FF6B6B",
    opacity: 0.7,
  },
  submitButtonText: {
    color: "#FFFFFF",
    fontWeight: "900",
    fontSize: 18,
  },
  cancelButton: {
    backgroundColor: "transparent",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
    borderWidth: 1,
    borderColor: "#FF3B30",
  },
  cancelText: {
    color: "#FF3B30",
    fontWeight: "600",
    fontSize: 16,
  },
  emergencyInfo: {
    backgroundColor: "rgba(220, 53, 69, 0.2)",
    padding: 15,
    borderRadius: 8,
    marginTop: 20,
    borderWidth: 1,
    borderColor: "#DC3545",
  },
  emergencyTitle: {
    color: "#FFD700",
    fontWeight: "700",
    fontSize: 14,
    marginBottom: 8,
  },
  emergencyContact: {
    color: "#FFFFFF",
    fontSize: 12,
    marginBottom: 4,
    fontWeight: "600",
  },
});