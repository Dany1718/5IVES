import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import MainStackScreens from "./MainStackScreens";
import AuthStackScreens from "./AuthStackScreens";
import { useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { FIREBASE_AUTH } from "../FirebaseConfig";

const Stack = createNativeStackNavigator();

const StackNavigator = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    onAuthStateChanged(FIREBASE_AUTH, (user) => {
      setUser(user);
    });
  }, []);

  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      {user ? (
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
