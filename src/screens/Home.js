import {
  View,
  Text,
  StyleSheet,
  Button,
  TouchableOpacity,
  TextInput,
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import { useEffect, useState } from "react";
import { Picker } from "@react-native-picker/picker";
import { setUser } from "../store/slices/userSlice";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { setCircles } from "../store/slices/circleSlice";
import { useRef } from "react";

function Point(x, y, x1, y1) {
  var distance = Math.sqrt(Math.pow(x1 - x, 2) + Math.pow(y1 - y, 2));
  return distance;
}

var newPoint = new Point(10, 100);
var nextPoint = new Point(25, 5);

export default function Home({ navigation }) {
  const [selectedValue, setSelectedValue] = useState([
    {
      _id: "63fdfc36373489cbed17f708",
      firstName: "Muhammad Ayaz",
      lastName: "Ansari",
      location: { latitude: 24.917087994000827, longitude: 67.0863619370626 },
    },
    {
      _id: "63fdfb17373489cbed17f704",
      firstName: "Muhammad Fayyaz",
      lastName: "Ansari",
      location: { latitude: 24.927508168964316, longitude: 67.06455702133196 },
    },
    {
      _id: "64022266a4adc27c2800006a",
      firstName: "Muhammad Faraz",
      lastName: "Ansari",
      location: { latitude: 24.937050470390286, longitude: 67.07590585268697 },
    },
    {
      _id: "63fdfb65373489cbed17f706",
      firstName: "Muhammad Maaz",
      lastName: "Ansari",
      location: { latitude: 24.918482674242483, longitude: 67.05351412258752 },
    },
  ]);
  const [myLocation, setMyLocation] = useState();
  const reduxData = useSelector((state) => state.userSlice);
  const circleRedux = useSelector((state) => state.circleSlice);
  const dispatch = useDispatch();
  const mapRef = useRef(null);
  const pickerRef = useRef(null);
  // const pickerRef =useRef([{_id: "63fdfc36373489cbed17f708",firstName: "Muhammad Ayaz",lastName: "Ansari", location: {latitude: 24.917087994000827, longitude: 67.0863619370626}}, {_id: "63fdfb17373489cbed17f704", firstName: "Muhammad Fayyaz", lastName: "Ansari", location: {latitude: 24.927508168964316, longitude: 67.06455702133196}}, {"_id": "64022266a4adc27c2800006a", "firstName": "Muhammad Faraz", "lastName": "Ansari", "location": {"latitude": 24.937050470390286, "longitude": 67.07590585268697}}, {"_id": "63fdfb65373489cbed17f706", "firstName": "Muhammad Maaz", "lastName": "Ansari", "location": {"latitude": 24.918482674242483, "longitude": 67.05351412258752}}]);

  const handleGroupChange = (group) => {
    const groupMarkers = [group];
    const groupCenter = {
      latitude:
        groupMarkers.reduce((acc, cur) => acc + cur.location.latitude) /
        groupMarkers.length,
      longitude:
        groupMarkers.reduce((acc, cur) => acc + cur.location.longitude) /
        groupMarkers.length,
    };
    pickerRef.selectedValue = selectedValue;
    // console.log("HandleGroup ==> ", groupCenter);
    // mapRef.current.animateToRegion({
    //   ...groupCenter,
    //   latitudeDelta: 0.0922,
    //   longitudeDelta: 0.0421,
    // });
  };

  useEffect(() => {
    if (selectedValue) {
      console.log("useEffect 173");
      var initialRegion = {
        latitude: selectedValue[0].location.latitude,
        longitude: selectedValue[0].location.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      };
      console.log("initialRegion", initialRegion);
      setInitialRegion(initialRegion);
    }
  }, [selectedValue]);

  // console.log("myLocation ==>", myLocation)
  useEffect(() => {
    // console.log("first use efffect");

    if (myLocation) {
      // let latitude = myLocation.coords.latitude;
      // let longitude = myLocation.coords.latitude;
      // Gulshan location for ayaz ansari
      let latitude = 24.917087994000827;
      let longitude = 67.0863619370626;
      dispatch(
        setUser({ ...reduxData.user, location: { latitude, longitude } })
      );

      const getMyCircles = async () => {
        try {
          const result = await axios.get(
            `http://192.168.1.104:5000/trackBuddy/getCircles/${reduxData.user._id}`
            // "http://192.168.0.171:5000/trackBuddy/getCircles/63fdfb17373489cbed17f704"
            // "http://192.168.1.102:5000/trackBuddy/getCircles/63fdfb17373489cbed17f704"
            // "http://192.168.1.102:5000/trackBuddy/getCircles/63fdfc36373489cbed17f708"
          );
          // console.log(
          //   "mycircles data in Home==>",
          //   result.data.circles[0].members
          // );
          dispatch(setCircles(result.data.circles));
          setSelectedValue(result.data.circles[0].members);
        } catch (error) {
          console.log("error in get Circles ==>", error.message);
        }
      };
      getMyCircles();
    }
  }, [myLocation]);

  const [initialRegion, setInitialRegion] = useState({
    latitude: 24.918482674242483,
    longitude: 67.05351412258752,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
    // latitude: 24.917087994000827,
    // longitude: 67.0863619370626,
    // latitudeDelta: 0.01,
    // longitudeDelta: 0.01,
  });

  useEffect(() => {
    (async () => {
      // console.log("second user effect");
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      // set location for gulshan this is for ayaz786@gmail.com
      // setMyLocation({coords : {latitude: 24.917087994000827, longitude: 67.0863619370626}})

      // set location for gulshan this is for ayaz786@gmail.com
      // setMyLocation({coords : {latitude: 24.917087994000827, longitude: 67.0863619370626}})

      // { id: 2, latitude: 24.920027483600287, longitude: 67.08618768538602, title: 'Marker 2' },
      // set location for gulshan this is for fayyaz786@gmail.com
      setMyLocation({
        coords: { latitude: 24.917087994000827, longitude: 67.08618768538602 },
      });

      // setMyLocation(location);
      // console.log("myLocation", myLocation);
    })();
  }, []);
  useEffect(() => {
    // console.log("third use efffect");

    handleGroupChange(selectedValue);
    // console.log("selected value in Home");
    // console.log("selected value in Home", selectedValue);
  }, [selectedValue]);

  if (!myLocation) {
    // console.log("myLocation", myLocation);
    // console.log("selectedValue", selectedValue);
    return (
      <View style={styles.container}>
        <Text>loading...</Text>
      </View>
    );
  }
  console.log("initialRegion", initialRegion);

  return (
    <View style={styles.container}>
      <View style={styles.pickerView}>
        {/* {console.log("Picker selected value", selectedValue)} */}
        <Picker
          // ref={pickerRef}
          selectedValue={selectedValue}
          style={styles.pickerStyle}
          onValueChange={(itemValue, itemIndex) =>
            setSelectedValue(itemValue.members)
          }
        >
          {circleRedux.circles.map((item, index) => {
            return (
              <Picker.Item
                key={item._id}
                label={item.circleName}
                value={item}
              />
            );
          })}
          {/* <Picker.Item label="Select Circle" value="Select Circle" /> */}
        </Picker>
      </View>

      <MapView
        ref={mapRef}
        style={styles.map}
        onRegionChangeComplete={(region) => {
          // do something
          console.log("region", region);
        }}
        region={initialRegion}
      >
        {selectedValue.map((marker) => {
          let fullName = `${marker.firstName} ${marker.lastName}`;
          return (
            <Marker
              key={marker._id}
              coordinate={{
                latitude: marker.location.latitude,
                longitude: marker.location.longitude,
              }}
              title={fullName}
            />
          );
        })}
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 10,
  },
  map: {
    // position: "absolute",
    // left: 0,
    // top: 0,
    height: "100%",
    width: "100%",
  },
  pickerView: {
    marginTop: 40,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    borderWidth: 3,
    borderColor: "grey",
  },
  pickerStyle: {
    height: 50,
    width: "100%",
  },
});

// import React, { useRef, useState } from 'react';
// import MapView from 'react-native-maps';

// const markerGroups = {
//   group1: [
//     { id: 1, coordinate: { latitude: 37.78825, longitude: -122.4324 } },
//     { id: 2, coordinate: { latitude: 37.78925, longitude: -122.4324 } },
//     { id: 3, coordinate: { latitude: 37.78825, longitude: -122.4314 } },
//     { id: 4, coordinate: { latitude: 37.78725, longitude: -122.4324 } },
//   ],
//   group2: [
//     { id: 5, coordinate: { latitude: 37.78125, longitude: -122.4424 } },
//     { id: 6, coordinate: { latitude: 37.78225, longitude: -122.4424 } },
//     { id: 7, coordinate: { latitude: 37.78125, longitude: -122.4414 } },
//     { id: 8, coordinate: { latitude: 37.78025, longitude: -122.4424 } },
//   ],
// };

// const Home = ({ navigation }) => {
//   const mapRef = useRef(null);
//   const [selectedGroup, setSelectedGroup] = useState('group1');

//   const handleGroupChange = (group) => {
//     setSelectedGroup(group);
//     const groupMarkers = markerGroups[group];
//     const groupCenter = {
//       latitude: groupMarkers.reduce((acc, cur) => acc + cur.coordinate.latitude, 0) / groupMarkers.length,
//       longitude: groupMarkers.reduce((acc, cur) => acc + cur.coordinate.longitude, 0) / groupMarkers.length,
//     };
//     mapRef.current.animateToRegion({
//       ...groupCenter,
//       latitudeDelta: 0.0922,
//       longitudeDelta: 0.0421,
//     });
//   };

//   return (
//     <>
//       <div>
//         <button onClick={() => handleGroupChange('group1')}>Group 1</button>
//         <button onClick={() => handleGroupChange('group2')}>Group 2</button>
//       </div>
//       <MapView
//         ref={mapRef}
//         style={{ flex: 1 }}
//         initialRegion={{
//           latitude: 37.78825,
//           longitude: -122.4324,
//           latitudeDelta: 0.0922,
//           longitudeDelta: 0.0421,
//         }}
//       >
//         {markerGroups[selectedGroup].map(marker => (
//           <MapView.Marker
//             key={marker.id}
//             coordinate={marker.coordinate}
//             pinColor='red'
//           />
//         ))}
//       </MapView>
//     </>
//   );
// };

// export default Home;
