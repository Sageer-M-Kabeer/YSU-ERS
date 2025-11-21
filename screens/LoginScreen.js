// screens/LoginScreen.js
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  Alert,
  ActivityIndicator,
  ScrollView
} from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';

import { COLORS, IMAGES } from "../utils/constants";

const API_BASE_URL = "https://ysu-ers.vercel.app/api";

export default function LoginScreen({ navigation }) {
  const [activeTab, setActiveTab] = useState("student"); // "student" or "admin"
  const [matricNumber, setMatricNumber] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleStudentLogin = async () => {
    if (!matricNumber || !password) {
      Alert.alert("Missing Fields", "Please enter both matric number and password.");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/users/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          matricNumber: matricNumber.trim(),
          password: password,
        }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        Alert.alert("Success", "Student login successful!");
        
        // Store student matric number
        await AsyncStorage.setItem("userMatricNumber", data.user.matricNumber);
        console.log("Matric number stored:", data.user.matricNumber);
        
        navigation.replace("MainApp", { 
          user: data.user,
          token: data.token 
        });
      } else {
        Alert.alert("Login Failed", data.message || "Invalid credentials");
      }
    } catch (error) {
      console.error("Login error:", error);
      Alert.alert("Error", "Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleAdminLogin = async () => {
    if (!username || !password) {
      Alert.alert("Missing Fields", "Please enter both username and password.");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/admin/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username.trim(),
          password: password,
        }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        Alert.alert("Success", "Admin login successful!");
        
        // Store admin token and data
        await AsyncStorage.setItem('adminToken', data.token);
        await AsyncStorage.setItem('adminData', JSON.stringify(data.admin));
        
        navigation.replace("AdminPanel", { 
          admin: data.admin,
          token: data.token 
        });
      } else {
        Alert.alert("Login Failed", data.message || "Invalid admin credentials");
      }
    } catch (error) {
      console.error("Admin login error:", error);
      Alert.alert("Error", "Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = () => {
    if (activeTab === "student") {
      handleStudentLogin();
    } else {
      handleAdminLogin();
    }
  };

  const clearForm = () => {
    setMatricNumber("");
    setUsername("");
    setPassword("");
  };

  return (
    <ImageBackground
      source={IMAGES.emergencyBg}
      style={styles.bg}
      blurRadius={2}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={styles.container}
      >
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <View style={styles.card}>
            <Text style={styles.title}>YSU-ERS Login</Text>

            {/* Tab Selector */}
            <View style={styles.tabContainer}>
              <TouchableOpacity
                style={[
                  styles.tab,
                  activeTab === "student" && styles.activeTab
                ]}
                onPress={() => {
                  setActiveTab("student");
                  clearForm();
                }}
                disabled={loading}
              >
                <Text style={[
                  styles.tabText,
                  activeTab === "student" && styles.activeTabText
                ]}>
                  Student
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.tab,
                  activeTab === "admin" && styles.activeTab
                ]}
                onPress={() => {
                  setActiveTab("admin");
                  clearForm();
                }}
                disabled={loading}
              >
                <Text style={[
                  styles.tabText,
                  activeTab === "admin" && styles.activeTabText
                ]}>
                  Admin
                </Text>
              </TouchableOpacity>
            </View>

            {/* Student Login Form */}
            {activeTab === "student" && (
              <>
                <TextInput
                  style={styles.input}
                  placeholder="Matric Number"
                  placeholderTextColor="#9EA7B3"
                  value={matricNumber}
                  onChangeText={setMatricNumber}
                  autoCapitalize="none"
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
                  onPress={() => navigation.navigate("Signup")}
                  style={{ marginBottom: 15 }}
                  disabled={loading}
                >
                  <Text style={styles.signupText}>No account? Sign up</Text>
                </TouchableOpacity>
              </>
            )}

            {/* Admin Login Form */}
            {activeTab === "admin" && (
              <>
                <TextInput
                  style={styles.input}
                  placeholder="Admin Username"
                  placeholderTextColor="#9EA7B3"
                  value={username}
                  onChangeText={setUsername}
                  autoCapitalize="none"
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
              </>
            )}

            {/* Login Button */}
            <TouchableOpacity 
              style={[styles.button, loading && styles.buttonDisabled]} 
              onPress={handleLogin}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator color={COLORS.white} />
              ) : (
                <Text style={styles.buttonText}>
                  {activeTab === "student" ? "STUDENT LOGIN" : "ADMIN LOGIN"}
                </Text>
              )}
            </TouchableOpacity>
          </View>
        </ScrollView>
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
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  card: {
    backgroundColor: "rgba(0, 21, 47, 0.85)",
    borderRadius: 12,
    padding: 25,
    shadowColor: "#000",
    shadowOpacity: 0.4,
    shadowRadius: 6,
  },
  title: {
    fontSize: 26,
    fontWeight: "900",
    color: COLORS.primary,
    textAlign: "center",
    marginBottom: 25,
  },
  tabContainer: {
    flexDirection: "row",
    marginBottom: 20,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: 8,
    padding: 4,
  },
  tab: {
    flex: 1,
    paddingVertical: 10,
    alignItems: "center",
    borderRadius: 6,
  },
  activeTab: {
    backgroundColor: COLORS.primary,
  },
  tabText: {
    color: COLORS.white,
    fontWeight: "600",
  },
  activeTabText: {
    color: COLORS.white,
    fontWeight: "bold",
  },
  input: {
    backgroundColor: COLORS.white,
    borderRadius: 8,
    padding: 12,
    marginBottom: 15,
    fontSize: 16,
  },
  button: {
    backgroundColor: COLORS.primary,
    padding: 14,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 5,
  },
  buttonDisabled: {
    backgroundColor: COLORS.primary + '80',
  },
  buttonText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: "bold",
  },
  signupText: {
    color: COLORS.primary,
    textAlign: "center",
  }
});