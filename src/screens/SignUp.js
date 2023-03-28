import {
  View,
  Text,
  StyleSheet,
  Button,
  TouchableOpacity,
  Alert,
} from "react-native";
import CustomTextField from "./../components/TextField/CustomTextField";
import axios from "axios";
// import CustomTextField from './../components/TextField/CustomTextField';

import React from "react";
import { useState } from "react";

const SignUp = ({ navigation }) => {
  const [firstName, setFirstName] = React.useState(null);
  const [lastName, setLastName] = React.useState(null);
  const [email, onChangeEmail] = React.useState(null);
  const [password, setPassword] = useState(null);

  const signup = async () => {
    console.log("signup>>>> ");
    let form = {
      firstName,
      lastName,
      email,
      password,
    };
    if (!firstName || !lastName || !email || !password) {
      Alert.alert("All Fields required!");
      console.log("form", form);
    }

    try {
      const result = await axios.post(
        "http://192.168.1.102:5000/user/register",
        form
      );
      Alert.alert("Signup successfully completed!");
      navigation.navigate("Login");
      console.log("signup user>>>", result.data);
      // const todos = await axios.get("http://localhost:5000/todo/readTodo");
      // setMyTodos([...result.data.todos]);
      // setGetInputValue("");
      // setIsEmpty(false);
    } catch (error) {
      Alert.alert(error.message);
      console.log("error >>>", error);
    }
  };
  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "flex-start",
          width: 290,
          marginBottom: 10,
        }}
      >
        <Text style={styles.heading}>Signup</Text>
      </View>
      <View
        style={{
          width: "100%",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {/* Text input For First Name  */}
        <CustomTextField
          style={styles.input}
          secureTextEntry={false}
          placeholder="First Name"
          keyboardType="default"
          value={firstName}
          onChangeInput={setFirstName}
        />
        {/* Text input For Last Name  */}
        <CustomTextField
          style={styles.input}
          secureTextEntry={false}
          placeholder="Last Name"
          keyboardType="default"
          value={lastName}
          onChangeInput={setLastName}
        />

        {/* Text input For email  */}
        <CustomTextField
          style={styles.input}
          secureTextEntry={false}
          placeholder="Email"
          keyboardType="email-address"
          value={email}
          onChangeInput={onChangeEmail}
        />
        {/* Text input For Password  */}
        <CustomTextField
          style={styles.input}
          secureTextEntry={true}
          placeholder="Password"
          keyboardType="default"
          value={password}
          onChangeInput={setPassword}
        />

        <View style={styles.buttonView}>
          <Button
            title="signup"
            color="#002f34"
            onPress={() => {
              signup();
              // navigation.navigate("Home");
              // navigation.navigate("Login");
            }}
          />
        </View>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("Login");
          }}
        >
          <Text style={{ fontWeight: "bold", color: "#002f34" }}>
            {" "}
            Already have an account?
          </Text>
        </TouchableOpacity>
      </View>
      {/* <View style={{...styles.buttonView, marginTop: 20}}>
        <Button
          title="Go to Home"
          color="#002f34"
          onPress={() => {
    
            navigation.navigate("Home");
          }}
        />
        </View> */}
    </View>
  );

  // return (
  //   <View style={styles.container}>
  //     <Text>SignUp</Text>

  //     <Button title="Go To Home"
  //   onPress={()=>{navigation.navigate("Home")}}
  //   >

  //   </Button>
  //   </View>
  // );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  heading: {
    fontSize: 30,
    // color: "#00ff00"
    color: "#002f34",
  },
  input: {
    height: 40,
    width: 290,
    borderRadius: 5,
    borderColor: "#002f34",
    marginBottom: 20,
    borderWidth: 2,
    padding: 10,
  },
  button: {
    marginBottom: 10,
  },
  logInBtn: {
    backgroundColor: "red",
  },
  buttonView: {
    backgroundColor: "#002f34",
    flexDirection: "row",
    width: 290,
    justifyContent: "center",
    borderRadius: 5,
    marginBottom: 10,
  },
});
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: "center",
//     justifyContent: "center",
//   },
// });

export default SignUp;
