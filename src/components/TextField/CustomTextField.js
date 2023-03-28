import React from "react";
import { SafeAreaView, StyleSheet, TextInput , Button, View} from "react-native";

const UselessTextInput = (props) => {
  // console.log("Props>>>", props)
  
  const [password, onChangePassword] = React.useState(null);
  return (
    <SafeAreaView>
      <TextInput
        style={props.style}
        secureTextEntry={props.secureTextEntry}
        onChangeText={props.onChangeInput}
        value={props.value}
        placeholder={props.placeholder} 
        keyboardType={props.keyboardType}
      />
    </SafeAreaView>
  );
};

// const styles = StyleSheet.create({

//   input: {
//     height: 40,
//     width: "100%",
//     margin: 12,
//     borderWidth: 1,
//     padding: 10,
    
//   },

// });

export default UselessTextInput;