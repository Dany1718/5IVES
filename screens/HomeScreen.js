import {
  View,
  Image,
  Text,
  StyleSheet,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import React, { useLayoutEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import {
  useFonts,
  SpaceMono_400Regular,
  SpaceMono_400Regular_Italic,
  SpaceMono_700Bold,
  SpaceMono_700Bold_Italic,
} from "@expo-google-fonts/space-mono";
import tw from "tailwind-react-native-classnames";
import {
  UserIcon,
  ChevronDownIcon,
  MagnifyingGlassIcon,
  AdjustmentsVerticalIcon,
} from "react-native-heroicons/outline";

const HomeScreen = () => {
  const navigation = useNavigation();
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  useFonts({
    SpaceMono_400Regular,
    SpaceMono_400Regular_Italic,
    SpaceMono_700Bold,
    SpaceMono_700Bold_Italic,
  });

  return (
    <SafeAreaView className="bg-black">
      {/*  HEADER  */}
      <View className="flex-row pb-3 items-center mx-4 space-x-2">
        <Text
          style={{
            fontSize: 45,
            color: "#7eaf34",
            fontFamily: "SpaceMono_700Bold",
            alignItems: "center",
            paddingRight: 5,
          }}
        >
          5
        </Text>
        <View style={tw`flex-1`}>
          <Text style={tw`font-bold text-gray-400 text-xs`}>
            Find an event!
          </Text>
          <Text style={tw`font-bold text-lg text-white`}>
            Current Location
            <ChevronDownIcon size={20} color="#7eaf34" />
          </Text>
        </View>
        <UserIcon size={35} color="#7eaf34" style={{ paddingRight: 5 }} />
      </View>
      {/* SEARCH */}

      <View className="flex-row items-center space-x-2  pb-2  mx-4">
        <TouchableWithoutFeedback onPress={Keyboard.dismiss()}>
          <View style={styles.searchStyle}>
            <MagnifyingGlassIcon color="#7eaf34" size={20} />
            <TextInput
              style={{ paddingLeft: 5, width: 300 }}
              placeholder="Search"
              keyboardType="default"
              
            />
          </View>
        </TouchableWithoutFeedback>
        <AdjustmentsVerticalIcon color="#7eaf34" />
      </View>
      {/* Add logic to render ionicons if no picture, and render image if there is a profile picture/*}
          {/*<Image source={require("../assets/defaultProfilePicture2.png")} style={{
    resizeMode: 'contain', overflow: 'hidden',
    borderRadius: 150 / 2,
    overflow: "hidden",
    borderWidth: 3,
          borderColor: "red"}} />*/}
      {/* SEARCH */}

      {/*<Text>HomeScreen</Text>
        <Button
          title="Go to profile screen"
          onPress={() => navigation.navigate("Profile")}
  />*/}
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  headerText: {
    fontWeight: "bold",
    color: "grey",
    fontSize: "text-xs",
  },
  searchStyle: {
    flexDirection: "row",
    width: 300,
    height: 40,
    backgroundColor: "#fff",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 15,
    fontSize: 16,
  },
});
