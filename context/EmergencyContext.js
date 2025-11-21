// context/EmergencyContext.js
import React, { createContext, useContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { CAMPUS_LOCATIONS, EMERGENCY_TYPES } from "../utils/constants";

const EmergencyContext = createContext();

export const EmergencyProvider = ({ children }) => {
  const [emergencies, setEmergencies] = useState([]);

  // Load saved emergencies on app start
  useEffect(() => {
    loadEmergencies();
  }, []);

  const loadEmergencies = async () => {
    try {
      const saved = await AsyncStorage.getItem("EMERGENCIES");
      if (saved) {
        setEmergencies(JSON.parse(saved));
      }
    } catch (error) {
      console.log("Error loading emergencies:", error);
    }
  };

  const saveEmergencies = async (list) => {
    try {
      await AsyncStorage.setItem("EMERGENCIES", JSON.stringify(list));
    } catch (error) {
      console.log("Error saving emergencies:", error);
    }
  };

  // Add new emergency
  const submitEmergency = async (emergency) => {
    const updated = [...emergencies, emergency];
    setEmergencies(updated);
    saveEmergencies(updated);
  };

  return (
    <EmergencyContext.Provider
      value={{
        emergencies,
        submitEmergency,
        EMERGENCY_TYPES,
        CAMPUS_LOCATIONS,
      }}
    >
      {children}
    </EmergencyContext.Provider>
  );
};

// Hook to use the context
export const useEmergency = () => useContext(EmergencyContext);

export default EmergencyProvider;
