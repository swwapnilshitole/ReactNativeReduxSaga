import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Platform,
} from "react-native";
import React, { useEffect, useState } from "react";
import { UseDispatch, useDispatch } from "react-redux";
import { addEmployee } from "../redux/action";
import { useNavigation } from "@react-navigation/native";

function Employee() {
  const [name, setName] = useState("");
  const [age, setAge] = useState(null);
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [error, setError] = useState(false);
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const handleAddEmployee = () => {
    if (
      name === "" ||
      age === null ||
      age.length === 0 ||
      address === "" ||
      city === ""
    ) {
      setError(true);
    } else {
      const employee = { name, age, address, city };
      dispatch(addEmployee(employee));
      console.log("Employee", employee);
      setError(false);
      navigation.goBack();
    }
  };
  return (
    <View style={styles.container}>
      <View style={styles.subContainer}>
        <Text style={styles.text}>Name</Text>
        <TextInput
          style={styles.textInput}
          value={name}
          onChangeText={setName}
        />

        <Text style={styles.text}>Age</Text>
        <TextInput
          style={styles.textInput}
          keyboardType="numeric"
          value={age}
          onChangeText={setAge}
        />

        <Text style={styles.text}>Address</Text>
        <TextInput
          style={styles.textInput}
          multiline
          value={address}
          onChangeText={setAddress}
        />

        <Text style={styles.text}>City</Text>
        <TextInput
          style={styles.textInput}
          value={city}
          onChangeText={setCity}
        />

        <TouchableOpacity
          activeOpacity={0.5}
          style={styles.signInButton}
          onPress={handleAddEmployee}
        >
          <Text style={styles.textSignin}>Add</Text>
        </TouchableOpacity>
        {error && (
          <View style={{ alignItems: "flex-start", top: 0, paddingLeft: 20 }}>
            <Text style={{ color: "red", fontSize: 17 }}>
              * All fields are mandatory
            </Text>
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "gray",
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#fff",
  },

  subContainer: {
    backgroundColor: "gray",
    width: "92%",
    height: "70%",
  },

  signInButton: {
    alignSelf: "center",
    backgroundColor: "#085B70",
    justifyContent: "center",
    width: "90%",
    height: "10%",
    borderRadius: 10,
    alignItems: "center",
    margin: 25,
  },
  text: {
    fontSize: 17,
    paddingTop: 15,
    fontWeight: Platform.OS === "ios" ? "700" : "bold",
    paddingLeft: 15,
  },
  textInput: {
    width: "90%",
    backgroundColor: "#fff",
    height: "10%",
    borderRadius: 10,
    top: 5,
    padding: 10,
    paddingTop: 10,
    fontSize: 14,
    justifyContent: "center",
    alignSelf: "center",
  },
  textSignin: {
    fontSize: 18,
    fontWeight: "600",
    color: "#FFF",
  },
});

export default Employee;
