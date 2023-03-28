import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Button } from 'react-native';
import Login from '../screens/Login';
import SignUp from '../screens/SignUp';
import Home from '../screens/Home';
import Profile from '../screens/Profile/Profile';
import CreateCircle from '../screens/CreateCircle/CreateCircle';
import AddMembers from './../screens/AddMembers/AddMembers';
import JoinCircle from './../screens/JoinCircle/JoinCircle';
// import CreateCircle from './../screens/CreateCircle/CreateCircle';

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();


export default function MainStack(){
  return <NavigationContainer>
    <Stack.Navigator  options={{headerShown: false}}>
      {/* <Stack.Screen name='Home' options={{ title: 'My home' ,
      headerRight: () => (
        <Button title="Update count" />
      )
      }}
       component={Home} /> */}
      {/* <Stack.Screen name='AddMembers' component={AddMembers} /> */}
      {/* <Stack.Screen name='JoinCircle' component={JoinCircle} /> */}
      <Stack.Screen  options={{headerShown: false}} name='Login' component={Login} />
      <Stack.Screen  options={{headerShown: false}} name='SignUp' component={SignUp} />
      <Stack.Screen 
     options={{headerShown: false}}
       name='MyDrawer' component={MyDrawer} />
      
    </Stack.Navigator>
  </NavigationContainer>
}


function MyDrawer(){
  // const reduxData =  useSelector(state => state.userSlice);
  // console.log("reduxData navigation", reduxData.userUID)

  // return(
  //   <Drawer.Navigator initialRouteName="Dashboard">
  //     <Drawer.Screen  name="Dashboard" component={Dashboard} />
  //     {reduxData.userUID ? 
  //      <Drawer.Screen  name='CreateAd' component={CreateAd} />
  //     :
  //     <Drawer.Screen  name='Auth' component={AuthStack} />
  //     }
  //   </Drawer.Navigator>
  // )
  return(
    <Drawer.Navigator initialRouteName="Home">
      <Drawer.Screen  name="Home" component={Home} />
      <Drawer.Screen  name="CreateCircle" component={CreateCircle} />
      <Drawer.Screen  name="AddMembers" component={AddMembers} />
      <Drawer.Screen  name="JoinCircle" component={JoinCircle} />
      <Drawer.Screen  name="Edit Profile" component={Profile} />
      {/* <Drawer.Screen  name="AddMembers" component={AddMembers} /> */}






      {/* {reduxData.userUID ? 
       <Drawer.Screen  name='CreateAd' component={CreateAd} />
      :
      <Drawer.Screen  name='Auth' component={AuthStack} />
      } */}
    </Drawer.Navigator>
  )
}