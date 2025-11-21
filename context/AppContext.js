// context/AppContext.js

import React, { createContext, useState, useEffect } from "react";
import { Alert } from "react-native";
import { ADMIN_CREDENTIALS, EMERGENCY_TYPES } from "../utils/constants";
import { STORAGE_KEYS, loadJSON, saveJSON, addToArray } from "../utils/storage";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {

  const [currentUser, setCurrentUser] = useState(null);
  const [emergencies, setEmergencies] = useState([]);

  // Load saved user + emergencies
  useEffect(() => {
    loadInitialData();
  }, []);

  async function loadInitialData() {
    const savedUser = await loadJSON(STORAGE_KEYS.CURRENT_USER, null);
    const savedEmergencies = await loadJSON(STORAGE_KEYS.EMERGENCIES, []);

    // Ensure admin is always in system
    const savedUsers = await loadJSON(STORAGE_KEYS.USERS, []);
    const adminExists = savedUsers.some(
      (u) => u.username === ADMIN_CREDENTIALS.username
    );

    if (!adminExists) {
      savedUsers.push(ADMIN_CREDENTIALS);
      await saveJSON(STORAGE_KEYS.USERS, savedUsers);
    }

    setCurrentUser(savedUser);
    setEmergencies(savedEmergencies);
  }

  // LOGIN
  async function login(identifier, password) {
    const users = await loadJSON(STORAGE_KEYS.USERS, []);

    const found = users.find(
      (u) => u.matric === identifier || u.username === identifier
    );

    if (!found) {
      Alert.alert("User Not Found", "Invalid matric number or username.");
      return false;
    }
    if (found.password !== password) {
      Alert.alert("Wrong Password", "Please check your password.");
      return false;
    }

    await saveJSON(STORAGE_KEYS.CURRENT_USER, found);
    setCurrentUser(found);
    return true;
  }

  // SIGNUP
  async function signup(fullName, matric, password) {
    const users = await loadJSON(STORAGE_KEYS.USERS, []);

    const exists = users.find(
      (u) => u.matric === matric || u.username === matric
    );

    if (exists) {
      Alert.alert("Account Exists", "This matric number is already registered.");
      return false;
    }

    const newUser = {
      fullName,
      matric,
      password,
      role: "user",
      username: matric,
    };

    users.push(newUser);
    await saveJSON(STORAGE_KEYS.USERS, users);

    Alert.alert("Success", "Account created successfully!");

    return true;
  }

  // LOGOUT
  async function logout() {
    await saveJSON(STORAGE_KEYS.CURRENT_USER, null);
    setCurrentUser(null);
  }

  // SUBMIT EMERGENCY
  async function submitEmergency(data) {
    const emergency = {
      id: Date.now().toString(),
      ...data,
      timestamp: new Date().toISOString(),
      status: "pending",
      userMatric: currentUser?.matric,
    };

    const updated = await addToArray(STORAGE_KEYS.EMERGENCIES, emergency);
    setEmergencies(updated);
  }

  return (
    <AppContext.Provider
      value={{
        currentUser,
        emergencies,
        login,
        signup,
        logout,
        submitEmergency,
        EMERGENCY_TYPES,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
