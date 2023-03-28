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
import CustomTextField from "./../../components/TextField/CustomTextField";
import { useSelector, useDispatch } from "react-redux";
import { setUser } from "./../../store/slices/userSlice";
import { setCircles } from "./../../store/slices/circleSlice";
import axios from "axios";

const CreateCircle = ({ navigation }) => {
  const [circle, setCircle] = React.useState(null);
  const reduxData = useSelector((state) => state.userSlice);
  const circleRedux = useSelector((state) => state.circleSlice)
  const dispatch = useDispatch();
  let user = reduxData.user;
  let { firstName, lastName, _id, location } = user;


  const createCircle = async () => {
    let copyId = _id.slice(0).split("");
    let circleCode = copyId.splice(Math.floor(Math.random() * 15), 6).join("");
    console.log("user  >>>>", user);
    console.log("circle code ", circleCode);
      let circleForm = {
        circleName : circle,
        circleCode,
        author : `${firstName} ${lastName}`,
        members : {firstName,lastName, _id, location}
      }
    // : {latitude: 24.860735, longitude: 24.860735}

    console.log("circleForm >>>>", circleForm);
    if(!location){
      Alert.alert("Please allow the location first")
    }
    try {
      const result = await axios.post(
        "http://192.168.1.102:5000/trackBuddy/createCircle",
        {...circleForm}
      );
      // let updateCircleRedux = [...circleRedux.circles, result.data.circle]
      dispatch(setCircles([...circleRedux.circles, result.data.circle]));
      Alert.alert("Circle create Successfully !");

      // dispatch(setUser(result.data.updatedDoc))
      // navigation.navigate("MyDrawer");


      console.log("create circle result >>>", result.data);
      // const todos = await axios.get("http://localhost:5000/todo/readTodo");
      // setMyTodos([...result.data.todos]);
      // setGetInputValue("");
      // setIsEmpty(false);
    } catch (error) {
      Alert.alert(error.message);
      console.log("error >>>", error);
    }










    //   {
    //     "circleName": "dost",
    //     "members": "[{location: {latitude: 24.860735, longitude: 24.860735}}]",
    //     "circleCode": "fayyaz123",
    //     "author": "fayyaz ansari"
    // }
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        {/* <View
          style={{
            width: "100%",
            alignItems: "center",
          }}
        >
          <Text style={styles.heading}>This is a CreateCircle page</Text>
        </View> */}
        <View
          style={{
            width: "100%",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {/* Text input For Circle Name  */}
          <CustomTextField
            style={styles.input}
            secureTextEntry={false}
            placeholder="Enter Circle Name"
            keyboardType="default"
            value={circle}
            onChangeInput={setCircle}
          />
        </View>

        <View style={{ ...styles.buttonView }}>
          <Button
            title="Create Circle"
            color="#002f34"
            onPress={() => {
              createCircle();
              // navigation.navigate("Home");
            }}
          />
        </View>
      </View>
    </ScrollView>
  );

  // return (
  //   <View style={styles.container}>
  //     <Text>CreateCircle</Text>

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

export default CreateCircle;
