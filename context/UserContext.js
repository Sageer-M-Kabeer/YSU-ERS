import React, { createContext, useEffect, useState } from "react";
import { saveUser, loadUser, clearUser } from "../utils/storage";
import { ADMIN_CREDENTIALS } from "../utils/constants";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);       // logged in user
  const [loading, setLoading] = useState(true); // waits for storage load

  // Load user from storage when app starts
  useEffect(() => {
    const initUser = async () => {
      const stored = await loadUser();
      if (stored) setUser(stored);
      setLoading(false);
    };
    initUser();
  }, []);

  // ---------------------- SIGNUP ----------------------
  const signup = async (fullName, matricNumber, password) => {
    try {
      const newUser = {
        fullName,
        matricNumber,
        password,
        role: "student",
      };

      await saveUser(newUser);
      setUser(newUser);
      return { success: true };
    } catch (err) {
      return { success: false, message: "Signup failed!" };
    }
  };

  // ---------------------- LOGIN ----------------------
  const login = async (username, password) => {
    // ADMIN LOGIN CHECK
    if (
      username === ADMIN_CREDENTIALS.username &&
      password === ADMIN_CREDENTIALS.password
    ) {
      const adminUser = {
        fullName: "YSU Emergency Admin",
        role: "admin",
        username: "admin",
      };

      await saveUser(adminUser);
      setUser(adminUser);
      return { success: true, role: "admin" };
    }

    // STUDENT LOGIN
    const stored = await loadUser();

    if (
      stored &&
      stored.matricNumber === username &&
      stored.password === password
    ) {
      setUser(stored);
      return { success: true, role: "student" };
    }

    return { success: false, message: "Invalid username or password" };
  };

  // ---------------------- LOGOUT ----------------------
  const logout = async () => {
    await clearUser();
    setUser(null);
  };

  return (
    <UserContext.Provider
      value={{
        user,
        loading,
        signup,
        login,
        logout,
        isAdmin: user?.role === "admin",
        isStudent: user?.role === "student",
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
