import React from "react";
import { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  TouchableOpacity,
  ScrollView,
  Alert
} from "react-native";
// import CustomTextField from "./../components/TextField/CustomTextField";
// import CustomTextField from './../components/TextField/CustomTextField';
import CustomTextField from "./../../components/TextField/CustomTextField";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { setUser } from "./../../store/slices/userSlice";

const Profile = ({ navigation }) => {
  const reduxData = useSelector((state) => state.userSlice);
  const dispatch = useDispatch();
  console.log("reduxData", reduxData);
  const user = reduxData.user;
  const [firstName, setFirstName] = React.useState(user.firstName || null);
  const [lastName, setLastName] = React.useState(user.lastName || null);
  const [email, onChangeEmail] = React.useState(user.email || null);
  const updateProfile = async () => {
    let form = {firstName,lastName,email};
    if (!firstName || !lastName || !email) {
      return Alert.alert("All Fields required!");
      console.log("form", form);
    }

    console.log("updateProfile Form>>>> ", form);
    try {

      const result = await axios.post(
        `http://192.168.1.102:5000/user/profileUpdate/${user._id}`,
        form
      );
      Alert.alert("updateProfile successfully completed!");
      dispatch(
        setUser(result.data.updatedData)
      );
      console.log("update Profile data>>>", result.data);

    } catch (error) {
      Alert.alert(error.message);
      console.log("error >>>", error);
    }
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "flex-start",
            width: 290,
            marginBottom: 10,
          }}
        >
          <Text style={styles.heading}>Your Profile</Text>
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
        </View>

        <View style={{ ...styles.buttonView, marginTop: 10 }}>
          <Button
            title="Update"
            color="#002f34"
            onPress={() => {
              updateProfile();
              // navigation.navigate("Home");
            }}
          />
        </View>
      </View>
    </ScrollView>
  );

  // return (
  //   <View style={styles.container}>
  //     <Text>Profile</Text>

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
    marginTop: 20,
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

export default Profile;
