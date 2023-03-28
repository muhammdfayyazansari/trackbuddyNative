import React from "react";
import { useState } from "react";
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
import { Picker } from "@react-native-picker/picker";
import CustomTextField from "./../../components/TextField/CustomTextField";
import { useSelector, useDispatch } from "react-redux";
import { setUser } from "./../../store/slices/userSlice";
import axios from "axios";
const JoinCircle = ({ navigation }) => {
  const [circleName, setCircleName] = React.useState(null);
  const [circleCode, setCircleCode] = React.useState(null);
  const [author, setAuthor] = React.useState(null);
  const reduxData = useSelector((state) => state.userSlice);

  const joinCircle = async () => {
    let {firstName, lastName, location, _id}= reduxData.user;
    let memberData = {firstName, lastName, location, _id};
    let joinCircleForm = {
      circleName, circleCode, author, memberData
    }
    console.log("join circle form>>>", joinCircleForm);
    if(!memberData || !circleName || !circleCode || !author){
      return Alert.alert("Please submit all fields.")
    }
      try {
        const result = await axios.post(
          "http://192.168.1.104:5000/trackBuddy/joinCircle",
          // "http://192.168.0.171:5000/trackBuddy/joinCircle",
          // "http://192.168.1.102:5000/trackBuddy/joinCircle",
          {...joinCircleForm}
        );
  
        // dispatch(setUser(result.data.updatedDoc))
        // navigation.navigate("MyDrawer");
        Alert.alert(result.data.message);
  
        console.log("Join circle result >>>", result.data);
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
          <Text style={styles.heading}>Track Buddy </Text>
        </View>
        <View
          style={{
            width: "100%",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {/* Text input For Author Name  */}
          <CustomTextField
            style={styles.input}
            secureTextEntry={false}
            placeholder="Enter Author Name"
            keyboardType="default"
            value={author}
            onChangeInput={setAuthor}
          />
          {/* Text input For Circle Name  */}
          <CustomTextField
            style={styles.input}
            secureTextEntry={false}
            placeholder="Enter Circle Name"
            keyboardType="default"
            value={circleName}
            onChangeInput={setCircleName}
          />
          {/* Text input For Circle Name  */}
          <CustomTextField
            style={styles.input}
            secureTextEntry={false}
            placeholder="Enter Circle Code"
            keyboardType="default"
            value={circleCode}
            onChangeInput={setCircleCode}
          />
        </View>

        <View style={{ ...styles.buttonView, marginTop: 20 }}>
          <Button
            title="Join"
            color="#002f34"
            onPress={() => {
              joinCircle()
              // navigation.navigate("Home");
            }}
          />
        </View>
      </View>
    </ScrollView>
  );

  // return (
  //   <View style={styles.container}>
  //     <Text>JoinCircle</Text>

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
    marginVertical: 20

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

export default JoinCircle;
