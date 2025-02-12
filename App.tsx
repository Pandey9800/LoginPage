import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  StyleSheet,
  KeyboardAvoidingView,
} from "react-native";
import axios from "axios";

const App = () => {
  const [EmpNum, setEmpNum] = useState("");
  const [Pwd, setPwd] = useState("");

  // API URL (replace with your actual API URL or IP)
  const apiUrl = "http://192.168.208.240/api/Users/Login"; // Ensure this is reachable

  // Handle login and call API
  const handleLogin = async () => {
    try {
      const response = await axios.post(apiUrl, { EmpNum, Pwd });

      if (response.status === 200) {
        const { EmpName, Role, AttendanceStatus } = response.data.UserDetails;
        Alert.alert(
          "Success",
          `Welcome, ${EmpName} (${Role})\nAttendance Status: ${AttendanceStatus}`
        );
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <View style={styles.card}>
        <Text style={styles.title}>Attendance Register</Text>
        <TextInput
          style={styles.input}
          placeholder="Emp. Number"
          placeholderTextColor="#aaa"
          value={EmpNum}
          onChangeText={setEmpNum}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#aaa"
          value={Pwd}
          onChangeText={setPwd}
          secureTextEntry
        />
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Log In</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f0f4f8",
  },
  card: {
    width: "90%",
    maxWidth: 400,
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    height: 50,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 15,
    paddingHorizontal: 10,
    backgroundColor: "#f9f9f9",
  },
  button: {
    backgroundColor: "#007BFF",
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default App;
