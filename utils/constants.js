export const APP_NAME = "Yobe State University Emergency Response App (YSU-ERS)";

// 🔐 Admin Login Credentials
export const ADMIN_CREDENTIALS = {
  username: "admin",
  password: "admin",
};

// 🆘 Emergency Types (dropdown options)
export const EMERGENCY_TYPES = [
  { id: "Fire", label: "Fire Emergency", icon: "🔥" },
  { id: "Medical", label: "Health Emergency", icon: "⚕️" },
  { id: "Security", label: "Security Threat", icon: "🛡️" },
];

// 📍 Preloaded YSU Campus Locations
export const CAMPUS_LOCATIONS = [
  "Main Gate",
  "Admin Block",
  "Faculty of Science",
  "Library",
  "New Male Hostel",
  "Abuja Hostel",
  "Cafeteria",
  "Science Complex",
  "Clinic",
  "ICT Center",
  "Faculty of Arts",
  "Faculty of Social Sciences",
  "Senate Building",
  "Graduate School",
];

// 🖼 Image Assets (used in components/screens)
export const IMAGES = {
  logo: require("../assets/images/ysu-logo.png"),
  splash: require("../assets/splash-icon-1.jpg"),
  emergencyBg: require("../assets/images/emergency-bg-1.jpg"),
  panicIcon: require("../assets/images/emergency-bg.png"),
  fire: require("../assets/images/fire.png"),
  health: require("../assets/images/health.png"),
  security: require("../assets/images/security.png"),
  alert: require("../assets/images/emergency-bg.png"),
};

// 🎨 Theme Colors (synced with your choice A: Red + Dark Blue)
export const COLORS = {
  primary: "#D50000",    // Red
  darkBlue: "#002147",   // YSU Blue
  white: "#FFFFFF",
  gray: "#F2F2F2",
  black: "#000000",
};
