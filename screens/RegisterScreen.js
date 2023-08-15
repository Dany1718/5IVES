import {
  View,
  StyleSheet,
  TextInput,
  ActivityIndicator,
  Text,
  ImageBackground,
  Image,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import tw from "tailwind-react-native-classnames";
import { FIREBASE_AUTH } from "../FirebaseConfig";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import CustomButton from "../components/customButton";
import { SvgXml } from "react-native-svg";
import { KeyboardAvoidingView } from "react-native";
import {
  GoogleSignin,
  statusCodes,
} from "@react-native-google-signin/google-signin";
import { GoogleAuthProvider, signInWithCredential } from "firebase/auth";
import { useNavigation } from "@react-navigation/native";

GoogleSignin.configure({
  webClientId:
    "323061027026-67go2ubi9im7crevaeo7oi7hlqc8op7m.apps.googleusercontent.com", // client ID of type WEB for your server (needed to verify user ID and offline access)
});

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const auth = FIREBASE_AUTH;
  const navigation = useNavigation();

  const signUp = async () => {
    setLoading(true);
    try {
      const response = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log(response);
    } catch (error) {
      console.log(error);
      alert("Sign in failed: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={tw`flex-1`}>
      <ImageBackground
        resizeMode="cover"
        style={tw`flex-1`}
        source={require("../assets/workout3.jpg")}
      >
        <View style={styles.root}>
          <Image
            source={require("../assets/lne-12.png")}
            style={styles.logo}
            resizeMode="contain"
          />
        </View>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : null}
          style={{ flex: 1 }}
        >
          <View style={styles.container}>
            <TextInput
              value={email}
              style={styles.input}
              placeholder="Email"
              autoCapitalize="none"
              onChangeText={(text) => setEmail(text)}
            ></TextInput>
            <TextInput
              secureTextEntry={true}
              value={password}
              style={styles.input}
              placeholder="Password"
              autoCapitalize="none"
              onChangeText={(text) => setPassword(text)}
            ></TextInput>

            {loading ? (
              <ActivityIndicator size="large" color="#7eaf34" />
            ) : (
              <CustomButton text="Log in" onPress={signUp} />
            )}
          </View>
        </KeyboardAvoidingView>
        <View style={styles.container2}>
          <View style={styles.signUpRow}>
            <Text style={{ color: "#fff" }}>Already have an account? </Text>
            <TouchableOpacity onPress={() => navigation.navigate("LogIn")}>
              <Text style={{ color: "#7eaf34" }}>Sign in</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 40,
    justifyContent: "flex-end",
  },
  container2: {
    marginHorizontal: 40,
    justifyContent: "flex-end",
    paddingBottom: 50,
  },
  input: {
    marginVertical: 5,
    paddingHorizontal: 10,
    height: 50,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: "#e8e8e8",
    backgroundColor: "#fff",
  },
  root: {
    alignItems: "center",
  },
  options: {
    textAlign: "center",
    marginTop: 20,
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 20,
    color: "#fff",
  },
  googleOption: {
    borderColor: "#ddd",
    borderWidth: 2,
    borderRadius: 10,
    paddingHorizontal: 30,
    paddingVertical: 10,
  },
  rowForGoogle: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 30,
  },
  signUpRow: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 30,
  },
  horizontalRule: {
    backgroundColor: "grey",
    height: 1,
    flex: 1,
    alignSelf: "center",
  },
});
