// screens/SignupScreen.js
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Alert,
  ImageBackground,
  ActivityIndicator
} from "react-native";

const API_BASE_URL = "https://ysu-ers.vercel.app/api";

export default function SignupScreen({ navigation }) {
  const [matric, setMatric] = useState("");
  const [fullName, setFullName] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignup = async () => {
    if (!matric || !fullName || !password) {
      Alert.alert("Missing Fields", "All fields are required.");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/users/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          matricNumber: matric.trim(),
          fullName: fullName.trim(),
          password: password,
        }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        Alert.alert("Success", "Account created successfully!");
        navigation.navigate("Login");
      } else {
        Alert.alert("Signup Failed", data.message || "Could not create account.");
      }
    } catch (error) {
      console.error("Signup error:", error);
      Alert.alert("Error", "Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ImageBackground
      source={require("../assets/images/emergency-bg.png")}
      style={styles.bg}
      blurRadius={2}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={styles.container}
      >
        <View style={styles.card}>
          <Text style={styles.title}>Create Account</Text>

          <TextInput
            style={styles.input}
            placeholder="Matric Number"
            placeholderTextColor="#9EA7B3"
            value={matric}
            onChangeText={setMatric}
            autoCapitalize="none"
            editable={!loading}
          />

          <TextInput
            style={styles.input}
            placeholder="Full Name"
            placeholderTextColor="#9EA7B3"
            value={fullName}
            onChangeText={setFullName}
            editable={!loading}
          />

          <TextInput
            style={styles.input}
            placeholder="Password"
            placeholderTextColor="#9EA7B3"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
            editable={!loading}
          />

          <TouchableOpacity 
            style={[styles.button, loading && styles.buttonDisabled]} 
            onPress={handleSignup}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.buttonText}>SIGN UP</Text>
            )}
          </TouchableOpacity>

          <TouchableOpacity 
            onPress={() => navigation.goBack()}
            disabled={loading}
          >
            <Text style={styles.loginText}>Already have an account? Login</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  bg: {
    flex: 1,
    width: "100%",
    height: "100%",
  },

  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 20,
  },

  card: {
    backgroundColor: "rgba(0, 31, 63, 0.85)",
    borderRadius: 12,
    padding: 25,
  },

  title: {
    fontSize: 26,
    fontWeight: "900",
    color: "#FF3B30",
    textAlign: "center",
    marginBottom: 25,
  },

  input: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 12,
    marginBottom: 15,
  },

  button: {
    backgroundColor: "#FF3B30",
    padding: 14,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 5,
  },

  buttonDisabled: {
    backgroundColor: "#FF3B3080", // Add transparency when disabled
  },

  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },

  loginText: {
    color: "#FF3B30",
    textAlign: "center",
    marginTop: 12,
  },
});