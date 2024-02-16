import React, { useEffect, useState } from "react";
import { TouchableOpacity, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SplashScreen from "react-native-splash-screen";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Homescreen from "./src/screens/homescreen";
import Login from "./src/screens/login";
import Employee from "./src/screens/employee";

const App = () => {
  const Stack = createNativeStackNavigator();

  useEffect(() => {
    console.log("Splash screen displayed");
    setTimeout(() => {
      SplashScreen.hide();
      console.log("Hiding splash screen");
    }, 2000);
  }, []);

  return (
    <NavigationContainer initialParams={{ autoLogin: false }}>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen
          name="Homescreen"
          component={Homescreen}
          options={({ navigation }) => ({
            headerTitle: "Home",
            headerRight: () => <LogoutButton navigation={navigation} />,
            headerRightContainerStyle: { paddingRight: 20 },
            headerLeft: null,
            headerBackVisible: false,
            headerTitleAlign: "center",
          })}
        />
        <Stack.Screen
          name="Login"
          component={Login}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Employee"
          component={Employee}
          options={({}) => ({
            headerTitle: "Add Employee",
            headerRightVisible: false,
            headerTitleAlign: "center",
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const LogoutButton = ({ navigation }) => {
  const handleLogout = async () => {
    try {
      await AsyncStorage.setItem("isLoggedIn", "false");
      navigation.replace("Login");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <TouchableOpacity onPress={handleLogout}>
      <Text style={{ color: "black", marginRight: 10 }}>Logout</Text>
    </TouchableOpacity>
  );
};

export default App;
