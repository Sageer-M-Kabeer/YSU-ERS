import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
} from "react-native";

export default function AboutScreen({ navigation }) {
  return (
    <ScrollView style={styles.container}>
      {/* Header Section */}
      <View style={styles.header}>
        <Image
          source={require("../assets/images/ysu-logo.png")}
          style={styles.logo}
        />
        <Text style={styles.title}>YSU Emergency Response System</Text>
        <Text style={styles.subtitle}>Safety First. Always.</Text>
      </View>

      {/* Image Banner */}
      <Image
        source={require("../assets/images/emergency-bg.png")}
        style={styles.banner}
      />

      {/* About Text */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>About the System</Text>
        <Text style={styles.sectionText}>
          The Yobe State University Emergency Response System (YSU-ERS) helps
          students and staff report emergencies quickly and efficiently.  
          With a single tap, alerts are sent directly to the University's
          Security & Response Unit.
        </Text>
      </View>

      {/* Features Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Features</Text>

        <View style={styles.featureCard}>
          <Image
            source={require("../assets/images/fire.png")}
            style={styles.featureIcon}
          />
          <Text style={styles.featureText}>
            Fast emergency reporting with Panic Button
          </Text>
        </View>

        <View style={styles.featureCard}>
          <Image
            source={require("../assets/images/security.png")}
            style={styles.featureIcon}
          />
          <Text style={styles.featureText}>
            Security, Fire, and Health emergency types
          </Text>
        </View>

        <View style={styles.featureCard}>
          <Image
            source={require("../assets/images/health.png")}
            style={styles.featureIcon}
          />
          <Text style={styles.featureText}>
            Quick location selection inside campus
          </Text>
        </View>
      </View>

      <View style={{ height: 40 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#001F3F",
    flex: 1,
  },

  header: {
    alignItems: "center",
    padding: 20,
  },

  logo: {
    width: 80,
    height: 80,
    marginBottom: 12,
    borderRadius: 40,
  },

  title: {
    fontSize: 22,
    fontWeight: "900",
    color: "#FF3B30",
  },

  subtitle: {
    fontSize: 14,
    color: "#fff",
    marginTop: 4,
  },

  banner: {
    width: "100%",
    height: 150,
    resizeMode: "cover",
    opacity: 0.9,
  },

  section: {
    padding: 20,
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#FF3B30",
    marginBottom: 10,
  },

  sectionText: {
    color: "#fff",
    lineHeight: 20,
    fontSize: 15,
  },

  featureCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.08)",
    padding: 12,
    borderRadius: 8,
    marginTop: 10,
  },

  featureIcon: {
    width: 35,
    height: 35,
    marginRight: 15,
  },

  featureText: {
    color: "#fff",
    fontSize: 15,
    flex: 1,
  },

  panicButton: {
    backgroundColor: "#FF0000",
    marginHorizontal: 40,
    marginTop: 20,
    paddingVertical: 20,
    borderRadius: 100,
    alignItems: "center",
    shadowColor: "#FF0000",
    shadowOpacity: 0.8,
    shadowRadius: 10,
  },

  panicText: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "900",
  },
});
