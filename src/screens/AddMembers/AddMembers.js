import React from "react";
import * as SMS from "expo-sms";
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
import { setCircles } from "../../store/slices/circleSlice";
import axios from "axios";

const AddMembers = ({ navigation }) => {
  const [selectedValue, setSelectedValue] = useState();
  console.log("picker selected value in members==>", selectedValue)
  const [member, setMember] = React.useState(null);
  const reduxData = useSelector((state) => state.userSlice);
  const circleRedux = useSelector((state)=> state.circleSlice);
  const {circles} = circleRedux;
  console.log("circleRedux in add members==>>", circleRedux.circles);
  const dispatch = useDispatch();
  let user = reduxData.user;
  let { firstName, lastName, _id, location } = user;

  const AddMember = async () => {
    if(!member){
      return Alert.alert("Please submit phone number first.")
    }
    else if (member.length !== 11){
      return Alert.alert("Please submit correct phone number first. ex: 03122868175")

    }
    const isAvailable = await SMS.isAvailableAsync();
    if (isAvailable) {
      // do your SMS stuff here
      Alert.alert("do your SMS stuff here")

      const { result } = await SMS.sendSMSAsync(
        member,
        'My sample HelloWorld message'
      );
    } else {
      // misfortune... there's no SMS available on this device
      Alert.alert("misfortune... there's no SMS available on this device")

    }
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
       <View style={styles.pickerView}>
        <Picker
          selectedValue={selectedValue}
          style={styles.pickerStyle}
          onValueChange={(itemValue, itemIndex) => {
            // console.log("Item value>>>", itemValue)
            
            return setSelectedValue(itemValue)}}
        >

          {circles.length === 0?
          <Picker.Item label="No Circle Yet" value="circle empty" />:
          circles.map((item, index)=>{
            return <Picker.Item key={index} label={item.circleName} value={item} />
          })}
        
        </Picker>
      </View>
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
            placeholder="Enter Phone Number"
            keyboardType="numeric"
            value={member}
            onChangeInput={setMember}
          />
        </View>

        <View style={{ ...styles.buttonView }}>
          <Button
            title="Add Member"
            color="#002f34"
            onPress={() => {
              AddMember();
              // navigation.navigate("Home");
            }}
          />
        </View>
      </View>
    </ScrollView>
    // <View style={styles.container}>
    //   <View
    //     style={{
    //       flexDirection: "row",
    //       justifyContent: "flex-start",
    //       width: 290,
    //       marginBottom: 10,
    //     }}
    //   >
    //     {/* <Picker
    //       selectedValue={selectedLanguage}
    //       onValueChange={(itemValue, itemIndex) =>
    //         setSelectedLanguage(itemValue)
    //       }
    //     >
    //       <Picker.Item label="Java" value="java" />
    //       <Picker.Item label="JavaScript" value="js" />
    //     </Picker> */}
    //     <Text style={styles.heading}>This is a AddMembers page</Text>
    //   </View>

    //   <View style={{ ...styles.buttonView, marginTop: 20 }}>
    //     <Button
    //       title="Go to Home"
    //       color="#002f34"
    //       onPress={() => {
    //         navigation.navigate("Home");
    //       }}
    //     />
    //   </View>
    // </View>
  );

  // return (
  //   <View style={styles.container}>
  //     <Text>AddMembers</Text>

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
  pickerView: {
    marginTop: 40,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    width: 290,
    borderWidth: 3,
    marginBottom: 15,
    borderColor: "grey",
  },
  pickerStyle: {
    height: 40,
    width: "100%",
  },
});
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: "center",
//     justifyContent: "center",
//   },
// });

export default AddMembers;
