import React from "react";
import { View, Text, StyleSheet } from "react-native";

const AttendancePage = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to Admin Dashboard</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f0f4f8",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
  },
});

export default AttendancePage; // Ensure this export is present
