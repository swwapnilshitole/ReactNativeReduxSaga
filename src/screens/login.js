import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { API_URL } from "../../utils/api";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isEmailErr, setIsEmailErr] = useState(false);
  const [isPasswordErr, setIsPasswordErr] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);
  const [loginErr, setLoginErr] = useState(false);
  const navigation = useNavigation();

  const api = axios.create({
    baseURL: API_URL,
  });

  useEffect(() => {
    updateButtonState(email, password);
    const getAsyncStorageValue = async () => {
      try {
        const isLoggedIn = await AsyncStorage.getItem("isLoggedIn");
        console.log("isLoggedIn:", isLoggedIn);
        if (isLoggedIn == "true") {
          navigation.navigate("Homescreen");
        }
      } catch (error) {
        console.error("Error retrieving AsyncStorage value:", error);
      }
    };

    getAsyncStorageValue();
  }, [email, password]);

  const onChangeUsername = (value) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValidEmail = emailRegex.test(value);
    setIsEmailErr(!isValidEmail);
    setEmail(value);
    updateButtonState(value, password);
  };

  const onChangePassword = (value) => {
    const isValidPassword = value.length >= 8;
    setIsPasswordErr(!isValidPassword);
    setPassword(value);
    updateButtonState(email, value);
  };

  const updateButtonState = (emailValue, passwordValue) => {
    const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailValue);
    const isValidPassword = passwordValue.length >= 8;

    setIsDisabled(
      !(isValidEmail && isValidPassword) ||
        emailValue === "" ||
        passwordValue === ""
    );
  };

  const handleLogin = async () => {
    if (!isDisabled) {
      setIsPasswordErr(false);

      try {
        let data = {
          email: email,
          password: password,
        };
        const response = await api.post("login", data);
        await AsyncStorage.setItem("isLoggedIn", "true");
        navigation.navigate("Homescreen");
        return response.data;
      } catch (error) {
        setLoginErr(true);
        throw error;
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.signInTitle}>Login</Text>
      <View style={styles.inputContainer}>
        <View style={styles.inputSubContainer}>
          <Text style={styles.textUsername}>Email</Text>
          <TextInput
            style={styles.textInput}
            onChangeText={(value) => onChangeUsername(value)}
            autoCapitalize="none"
            value={email}
          />
          {isEmailErr && (
            <Text style={styles.errorMessage}>
              * Please enter a valid email address
            </Text>
          )}
          <Text style={styles.textPassword}>Password</Text>
          <TextInput
            style={styles.textInput}
            onChangeText={(value) => onChangePassword(value)}
            autoCapitalize="none"
            value={password}
            maxLength={10}
          />
          {isPasswordErr && (
            <Text style={styles.errorMessage}>
              * Password must be at least 8 characters long
            </Text>
          )}
        </View>
        <TouchableOpacity
          activeOpacity={0.5}
          style={isDisabled ? styles.disableSignInButton : styles.signInButton}
          onPress={handleLogin}
          disabled={isDisabled}
        >
          <Text style={styles.textSignin}>Login</Text>
        </TouchableOpacity>
        {loginErr && (
          <Text style={styles.errorMessage}>
            * Please enter a valid username or password
          </Text>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  signInTitle: {
    fontSize: 27,
    fontWeight: "700",
    color: "#000",
    marginBottom: 20,
  },
  inputContainer: {
    width: "80%",
  },
  inputSubContainer: {
    marginBottom: 20,
  },
  textUsername: {
    fontWeight: "600",
    color: "#000",
    paddingBottom: 5,
  },
  textPassword: {
    marginTop: 20,
    fontWeight: "600",
    color: "#000",
    paddingBottom: 5,
  },
  textInput: {
    backgroundColor: "#f0f0f0",
    borderRadius: 10,
    padding: 10,
    fontSize: 14,
    marginBottom: 10,
  },
  signInButton: {
    backgroundColor: "#085B70",
    justifyContent: "center",
    alignItems: "center",
    height: 40,
    borderRadius: 10,
  },
  disableSignInButton: {
    backgroundColor: "#5B8088",
    justifyContent: "center",
    alignItems: "center",
    height: 40,
    borderRadius: 10,
  },
  textSignin: {
    fontSize: 18,
    fontWeight: "600",
    color: "#FFF",
  },
  errorMessage: {
    color: "red",
    marginBottom: 10,
  },
});

export default Login;
