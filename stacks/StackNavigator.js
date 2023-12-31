import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React, { useContext } from "react";
import MainStackScreens from "./MainStackScreens";
import AuthStackScreens from "./AuthStackScreens";
import LoadingScreen from "../screens/LoadingScreen";
import { useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { FirebaseContext } from "../components/FireBaseContext";
import { UserContext } from "../components/UserContext";
//import { FIREBASE_AUTH } from "../FirebaseConfig";

const Stack = createNativeStackNavigator();

const StackNavigator = () => {
  const [user] = useContext(UserContext);
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      {user.isLoggedIn === null ? (
        <Stack.Screen name="Loading" component={LoadingScreen}/>
      ) : user.isLoggedIn ?(
        <Stack.Screen name="Main" component={MainStackScreens}/>
      ) : (
        <Stack.Screen name="Auth" component={AuthStackScreens}/>
        /*<>
          <Stack.Screen
            name="LogIn"
            component={LoginScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Register"
            component={RegisterScreen}
            options={{ headerShown: false }}
          />
        </>*/
      )}
    </Stack.Navigator>
  );
};

export default StackNavigator;
