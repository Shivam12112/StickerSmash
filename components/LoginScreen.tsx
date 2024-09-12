import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  GestureResponderEvent,
} from "react-native";
import { FontAwesome, Feather } from "@expo/vector-icons";
import { NavigationProp, useNavigation } from "@react-navigation/native";

type RootStackParamList = {
  BottomTabView: undefined;
};

export default function LoginScreen() {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);

  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const handleLoginPress = (event: GestureResponderEvent) => {
    navigation.replace("BottomTabView");
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.container}>
          <View style={styles.headerShape} />

          <Text style={styles.title}>Proceed With Your</Text>
          <Text style={styles.loginText}>Login</Text>

          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Enter Username</Text>
            <View style={styles.inputWrapper}>
              <TextInput
                style={styles.input}
                placeholder="Enter Username"
                value={username}
                onChangeText={setUsername}
                placeholderTextColor="#C4C4C4"
              />
              <FontAwesome name="user" size={20} color="#2F4F4F" />
            </View>
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Enter Password</Text>
            <View style={styles.inputWrapper}>
              <TextInput
                style={styles.input}
                placeholder="Enter Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!isPasswordVisible}
                placeholderTextColor="#C4C4C4"
              />
              <TouchableOpacity
                onPress={() => setIsPasswordVisible(!isPasswordVisible)}
              >
                <Feather
                  name={isPasswordVisible ? "eye" : "eye-off"}
                  size={20}
                  color="#2F4F4F"
                />
              </TouchableOpacity>
            </View>
          </View>

          <TouchableOpacity
            style={styles.loginButton}
            onPress={handleLoginPress}
          >
            <Text style={styles.loginButtonText}>LOGIN</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: "center",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  headerShape: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: "25%",
    backgroundColor: "#3A7072",
    borderBottomRightRadius: 80,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#3A7072",
  },
  loginText: {
    fontSize: 36,
    fontWeight: "bold",
    color: "#3A7072",
    marginBottom: 40,
  },
  inputContainer: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 14,
    color: "#3A7072",
    marginBottom: 5,
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderColor: "#C4C4C4",
    paddingHorizontal: 10,
  },
  input: {
    flex: 1,
    height: 40,
    color: "#2F4F4F",
  },
  loginButton: {
    backgroundColor: "#3A7072",
    paddingVertical: 15,
    borderRadius: 5,
    alignItems: "center",
  },
  loginButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
});
