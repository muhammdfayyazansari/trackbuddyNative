import {
  View,
  Text,
  StyleSheet,
  Button,
  TouchableOpacity,
  Alert,
  TextInput
} from "react-native";
import CustomTextField from "./../components/TextField/CustomTextField";
import React from "react";
import { useState, useEffect} from "react";
import axios from "axios";
import { useSelector , useDispatch} from "react-redux";
import { setUser } from "../store/slices/userSlice";


const Login = ({ navigation }) => {
  const [email, onChangeEmail] = React.useState(null);
  const [password, setPassword] = useState(null);
  const reduxData =  useSelector(state => state.userSlice);
  const dispatch = useDispatch();
  console.log("reduxData", reduxData);

  const logIn = async () => {
    console.log("logIn>>>> ", email);
    console.log("logIn>>>> ", password);
    let form = {
      email,
      password,
    };
    if (!email || !password) {
      Alert.alert("Both Fields required!");
      console.log("form", form);
    } else {
      try {
        const result = await axios.post(
          "http://192.168.1.104:5000/user/login",
          // "http://192.168.0.171:5000/user/login",
          // "http://192.168.1.102:5000/user/login",
          form
        );
        dispatch(setUser(result.data.updatedDoc))
        navigation.navigate("MyDrawer");
        console.log("Login user>>>", result.data);
        // const todos = await axios.get("http://localhost:5000/todo/readTodo");
        // setMyTodos([...result.data.todos]);
        // setGetInputValue("");
        // setIsEmpty(false);
      } catch (error) {
        Alert.alert(error.message);
        console.log("error >>>", error);
      }
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
        <Text style={styles.heading}>Login</Text>
      </View>
      <View
        style={{
          width: "100%",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
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
            title="Login"
            color="#002f34"
            onPress={() => {
              logIn();
              // navigation.navigate("Home");
            }}
          />
        </View>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("SignUp");
          }}
        >
          <Text style={{ fontWeight: "bold", color: "#002f34" }}>
            {" "}
            Or Create an account?
          </Text>
        </TouchableOpacity>
      </View>
      <View style={{ ...styles.buttonView, marginTop: 20 }}>
        <Button
          title="Go to Home"
          color="#002f34"
          onPress={() => {
            navigation.navigate("MyDrawer");
          }}
        />
      </View>
    </View>
  );
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

export default Login;
