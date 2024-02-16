import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React, { useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";

const Homescreen = () => {
  const employees = useSelector((state) => state.employeesData.employees);
  const navigation = useNavigation();
  const onPressAddEmployees = () => {
    navigation.navigate("Employee");
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {employees && (
        <View style={styles.cardContainer}>
          <Text style={{ color: "#000", fontSize: 17, fontWeight: "600" }}>
            Name : {employees.name}
          </Text>
          <Text style={{ color: "#000", fontSize: 16, fontWeight: "400" }}>
            Age : {employees.age}
          </Text>
          <Text style={{ color: "#000", fontSize: 16, fontWeight: "400" }}>
            Address : {employees.address}
          </Text>
          <Text
            style={{
              color: "#000",
              fontSize: 16,
              fontWeight: "400",
            }}
          >
            City : {employees.city}
          </Text>
        </View>
      )}

      <TouchableOpacity
        activeOpacity={0.5}
        style={styles.signInButton}
        onPress={onPressAddEmployees}
      >
        <Text style={styles.textSignin}>Add Employees</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default Homescreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#fff",
  },
  signInButton: {
    backgroundColor: "#085B70",
    justifyContent: "center",
    width: "50%",
    height: "7%",
    borderRadius: 10,
    alignItems: "center",
  },
  textSignin: {
    fontSize: 18,
    fontWeight: "600",
    color: "#FFF",
  },
  cardContainer: {
    padding: 10,
    backgroundColor: "gray",
    marginBottom: 10,
    borderRadius: 10,
    width: "95%",
    alignSelf: "center",
  },
});
