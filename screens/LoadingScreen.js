import { View, Text } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../components/UserContext";
import { Image } from "react-native";
import { FirebaseContext } from "../components/FireBaseContext";

import {
  useFonts,
  SpaceMono_400Regular,
  SpaceMono_400Regular_Italic,
  SpaceMono_700Bold,
  SpaceMono_700Bold_Italic,
} from "@expo-google-fonts/space-mono";

const LoadingScreen = () => {
  const [_, setUser] = useContext(UserContext);
  const firebase = useContext(FirebaseContext);
  const [appIsReady, setAppIsReady] = useState(false);
  useFonts({
    SpaceMono_400Regular,
    SpaceMono_400Regular_Italic,
    SpaceMono_700Bold,
    SpaceMono_700Bold_Italic,
  });

  useEffect(() => {
    setTimeout(async () => {
      const user = firebase.getCurrentUser();

      if (user) {
        const userInfo = await firebase.getUserInfo(user.uid);
        setUser({
          isLoggedIn: true,
          email: userInfo.email,
          uid: userInfo.uid,
          username: userInfo.username,
          profilePhotoUrl: userInfo.profilePhotoUrl,
        });
      } else {
        setUser((state) => ({ ...state, isLoggedIn: false }));
      }
    }, 700);
  }, []);

  return (
    <View style={{flex: 1, align: "center",justifyContent: "center", backgroundColor: "#000"}}>
      <Image source={require("../assets/lne-23.png")} />
    </View>
  );
};

export default LoadingScreen;
