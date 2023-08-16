import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ProfileScreen from "../screens/ProfileScreen";

const HomeStackScreen= () => {
  const HomeStack = createNativeStackNavigator();
  return (
      <HomeStack.Navigator screenOptions={{ headerShown: false }}>
        <HomeStack.Screen name="Profile" component={ProfileScreen}/>
      </HomeStack.Navigator>
  );
};

export default HomeStackScreen;
