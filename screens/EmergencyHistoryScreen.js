// screens/EmergencyHistoryScreen.js
import React, { useContext } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { EmergencyContext } from "../context/EmergencyContext";
import EmergencyCard from "../components/EmergencyCard";
import { COLORS } from "../utils/constants";

export default function EmergencyHistoryScreen() {
  const { emergencies } = useContext(EmergencyContext);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Emergency History</Text>

      {emergencies.length === 0 ? (
        <Text style={styles.empty}>No emergencies submitted yet.</Text>
      ) : (
        <FlatList
          data={emergencies}
          keyExtractor={(item) => item.id.toString()}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => <EmergencyCard data={item} />}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: COLORS.gray,
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 10,
    color: COLORS.darkBlue,
  },
  empty: {
    marginTop: 30,
    textAlign: "center",
    fontSize: 16,
    color: COLORS.black,
  },
});
