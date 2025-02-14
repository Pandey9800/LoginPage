import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Modal,
  ActivityIndicator,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator, StackNavigationProp } from "@react-navigation/stack";
import { Ionicons } from "@expo/vector-icons";

// Import other screens
import AgentDashboard from "./screens/AgentDashboard";
import ManagerDashboard from "./screens/ManagerDashboard";
import AdminDashboard from "./screens/AdminDashboard";
import AttendancePage from "./screens/AttendancePage";

type RootStackParamList = {
  Login: undefined;
  AdminDashboard: { empId: string; empName: string; attendanceStatus: string };
  ManagerDashboard: { empId: string; empName: string; attendanceStatus: string };
  AgentDashboard: { empId: string; empName: string; attendanceStatus: string };
  AttendancePage: { empId: string; empName: string; attendanceStatus: string };
};

const Stack = createStackNavigator<RootStackParamList>();

type LoginScreenProps = {
  navigation: StackNavigationProp<RootStackParamList, "Login">;
};

const LoginScreen: React.FC<LoginScreenProps> = ({ navigation }) => {
  const [empNum, setEmpNum] = useState("");
  const [pwd, setPwd] = useState("");
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    setModalVisible(true);
    setModalMessage("Checking credentials...");

    setTimeout(() => {
      let role: "Agent" | "Manager" | "Admin" | null = null;
      let screen: "AgentDashboard" | "ManagerDashboard" | "AdminDashboard" | null = null;

      if (empNum === "7879701413") {
        role = "Agent";
        screen = "AgentDashboard";
      } else if (empNum === "7879588727") {
        role = "Manager";
        screen = "ManagerDashboard";
      } else if (empNum === "7999731827") {
        role = "Admin";
        screen = "AdminDashboard";
      }

      if (role && screen) {
        setModalMessage(`Welcome, ${role}! Redirecting...`);
        setTimeout(() => {
          setModalVisible(false);
          setLoading(false);

          // ✅ Fix: Reset navigation and navigate correctly
          navigation.reset({
            index: 0,
            routes: [{ name: screen, params: { empId: empNum, empName: role, attendanceStatus: "N/A" } }],
          });
        }, 1500);
      } else {
        setModalMessage("Invalid number! Try again.");
        setTimeout(() => {
          setModalVisible(false);
          setLoading(false);
        }, 1500);
      }
    }, 1500);
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <View style={styles.card}>
        <Ionicons name="finger-print" size={60} color="#007BFF" />
        <Text style={styles.title}>Attendance Register</Text>

        <View style={styles.inputContainer}>
          <Ionicons name="person" size={24} color="#888" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Emp. Number"
            placeholderTextColor="#aaa"
            value={empNum}
            onChangeText={setEmpNum}
          />
        </View>

        <View style={styles.inputContainer}>
          <Ionicons name="lock-closed" size={24} color="#888" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Password"
            placeholderTextColor="#aaa"
            value={pwd}
            onChangeText={setPwd}
            secureTextEntry={!showPassword}
          />
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Ionicons name={showPassword ? "eye-off" : "eye"} size={24} color="#888" />
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Log In</Text>
        </TouchableOpacity>
      </View>

      <Modal transparent={true} visible={modalVisible} animationType="fade">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            {loading ? (
              <>
                <ActivityIndicator size="large" color="#007BFF" />
                <Text style={styles.modalText}>{modalMessage}</Text>
              </>
            ) : (
              <Text style={styles.modalText}>{modalMessage}</Text>
            )}
          </View>
        </View>
      </Modal>
    </KeyboardAvoidingView>
  );
};

// ✅ Wrap everything in NavigationContainer
const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="AgentDashboard" component={AgentDashboard} />
        <Stack.Screen name="ManagerDashboard" component={ManagerDashboard} />
        <Stack.Screen name="AdminDashboard" component={AdminDashboard} />
        <Stack.Screen name="AttendancePage" component={AttendancePage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;

// ✅ Styles
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
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 20,
    textAlign: "center",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    marginBottom: 15,
    paddingHorizontal: 10,
    backgroundColor: "#f9f9f9",
    width: "100%",
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: 50,
    fontSize: 16,
    color: "#333",
  },
  button: {
    backgroundColor: "#007BFF",
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: "center",
    width: "100%",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: 250,
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 10,
    alignItems: "center",
  },
  modalText: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
});
