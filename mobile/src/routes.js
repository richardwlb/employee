import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';


import List from "./pages/List";
import Detail from "./pages/Detail";
import Login from "./pages/Login";
import New from "./pages/New";

const SignedOutStack = createStackNavigator();
const SignedOutStackScreen = () => (
  <SignedOutStack.Navigator>
    <SignedOutStack.Screen name='Login' component={Login} options={{ title: 'Login' }} />
  </SignedOutStack.Navigator>
);

const SignedInStack = createStackNavigator();
const SignedInStackScreen = () => (
  <SignedInStack.Navigator  >
    <SignedInStack.Screen 
      name='List' 
      component={List} 
      options={{ 
        title: 'List'
      }}/>
    <SignedInStack.Screen 
      name='Detail' 
      component={Detail} 
      options={{ title: 'Detail' }} />
    <SignedInStack.Screen 
      name='New' 
      component={New} 
      options={{ title: 'New Employee' }} />

  </SignedInStack.Navigator>
)

const RootStack = createStackNavigator();
// const RootStackScreen = (signed = false) => {

//   console.log("RootStackScreen_SIGNED: ", signed.signed);

//   return (
//     <RootStack.Navigator initialRouteName={ () => signed ? "App" : "Auth" } >
//       <RootStack.Screen
//         name="App"
//         component={SignedInStackScreen}
//         options={{ animationEnabled: false }}
//       />
//       <RootStack.Screen
//         name="Auth"
//         component={SignedOutStackScreen}
//         options={{ animationEnabled: false }}
//       />
//     </RootStack.Navigator>
//   )
// }

export const RootNavigatior =  ( {signed = false}) => {

  return( 

    <NavigationContainer>
      <RootStack.Navigator 
        initialRouteName={ signed ? "App" : "Auth"} 
        headerMode="none"
      >
        <RootStack.Screen
          name="App"
          component={SignedInStackScreen}
          options={{ animationEnabled: false }}
        />
        <RootStack.Screen
          name="Auth"
          component={SignedOutStackScreen}
          options={{ animationEnabled: false }}
        />
      </RootStack.Navigator>
      {/* <RootStackScreen signed={false} /> */}
    </NavigationContainer>

  )
}
