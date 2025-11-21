// utils/helpers.js

// Format timestamp into readable text
export const formatTimestamp = (date = new Date()) => {
  return `${date.toDateString()} • ${date.toLocaleTimeString()}`;
};

// Generate unique ID for emergency reports
export const generateId = () => {
  return "ER-" + Math.random().toString(36).substring(2, 9).toUpperCase();
};

// Simple validation for login fields
export const isEmpty = (value) => {
  return !value || value.trim() === "";
};

// Validate matric number (basic)
export const validateMatric = (matric) => {
  return /^[A-Za-z0-9/_-]{4,20}$/.test(matric);
};

// Format emergency object before saving
export const prepareEmergency = (data) => {
  return {
    id: generateId(),
    title: data.title,
    type: data.type,
    location: data.location,
    description: data.description || "",
    submittedAt: formatTimestamp(),
  };
};
