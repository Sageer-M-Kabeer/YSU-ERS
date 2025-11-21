import AsyncStorage from "@react-native-async-storage/async-storage";

const USER_KEY = "@ysu_user";
const EMERGENCIES_KEY = "@ysu_emergencies";
const LAST_ADMIN_CHECK_KEY = "@ysu_last_check";

// ---------------------- USER STORAGE ----------------------

export const saveUser = async (user) => {
  try {
    await AsyncStorage.setItem(USER_KEY, JSON.stringify(user));
  } catch (error) {
    console.log("Error saving user:", error);
  }
};

export const loadUser = async () => {
  try {
    const storedUser = await AsyncStorage.getItem(USER_KEY);
    return storedUser ? JSON.parse(storedUser) : null;
  } catch (error) {
    console.log("Error loading user:", error);
    return null;
  }
};

export const clearUser = async () => {
  try {
    await AsyncStorage.removeItem(USER_KEY);
  } catch (error) {
    console.log("Error clearing user:", error);
  }
};

// ---------------------- EMERGENCY STORAGE ----------------------

export const saveEmergencies = async (list) => {
  try {
    await AsyncStorage.setItem(EMERGENCIES_KEY, JSON.stringify(list));
  } catch (error) {
    console.log("Error saving emergencies:", error);
  }
};

export const loadEmergencies = async () => {
  try {
    const stored = await AsyncStorage.getItem(EMERGENCIES_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.log("Error loading emergencies:", error);
    return [];
  }
};

export const addEmergency = async (emergency) => {
  try {
    const existing = await loadEmergencies();
    const updated = [emergency, ...existing]; // newest first
    await saveEmergencies(updated);
    return updated;
  } catch (error) {
    console.log("Error adding emergency:", error);
    return null;
  }
};

// ---------------------- ADMIN NEW EMERGENCY CHECK ----------------------

export const saveLastAdminCheck = async () => {
  try {
    const now = Date.now().toString();
    await AsyncStorage.setItem(LAST_ADMIN_CHECK_KEY, now);
  } catch (err) {
    console.log("Error saving admin last check:", err);
  }
};

export const hasNewEmergencies = async () => {
  try {
    const lastCheck = await AsyncStorage.getItem(LAST_ADMIN_CHECK_KEY);
    const emergencies = await loadEmergencies();

    if (!lastCheck) return emergencies.length > 0;

    const lastTime = parseInt(lastCheck);

    // check for any emergency created AFTER last check
    const newOnes = emergencies.filter(
      (e) => new Date(e.timeSubmitted).getTime() > lastTime
    );

    return newOnes.length > 0;
  } catch (error) {
    console.log("Error checking new emergencies:", error);
    return false;
  }
};

// ---------------------- CLEAR ALL STORAGE (Developer Tool) ----------------------

export const clearAllStorage = async () => {
  try {
    await AsyncStorage.clear();
  } catch (error) {
    console.log("Error clearing all storage:", error);
  }
};
