import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons"; // Import icons

const AdminDashboard = ({ navigation, route }) => {
  const { empId, empName, attendanceStatus } = route.params || {};

  return (
    <View style={styles.container}>
      <Ionicons name="person-circle-outline" size={80} color="#007BFF" />
      <Text style={styles.title}>Welcome, {empName}!</Text>
      <Text style={styles.text}>Employee ID: {empId}</Text>
      <Text style={styles.text}>Attendance Status: {attendanceStatus}</Text>

      <TouchableOpacity
        style={styles.logoutButton}
        onPress={() => navigation.replace("Login")}
      >
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f0f4f8",
    padding: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#333",
    marginTop: 10,
  },
  text: {
    fontSize: 18,
    color: "#555",
    marginTop: 5,
  },
  logoutButton: {
    marginTop: 30,
    backgroundColor: "#d9534f",
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 8,
  },
  logoutText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default AdminDashboard;