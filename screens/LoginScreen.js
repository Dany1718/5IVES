import {
  View,
  StyleSheet,
  TextInput,
  ActivityIndicator,
  Text,
  ImageBackground,
  Image,
  TouchableOpacity,
  Platform,
} from "react-native";
import styled from "styled-components/native";
import React, { useEffect, useState, useCallback } from "react";
import tw from "tailwind-react-native-classnames";
import { FIREBASE_AUTH } from "../FirebaseConfig";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import CustomButton from "../components/customButton";
import { SvgXml } from "react-native-svg";
import { KeyboardAvoidingView } from "react-native";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { GoogleAuthProvider, signInWithCredential } from "firebase/auth";
import * as ImagePicker from "expo-image-picker";
import { AntDesign } from "@expo/vector-icons";
import {
  useFonts,
  SpaceMono_400Regular,
  SpaceMono_400Regular_Italic,
  SpaceMono_700Bold,
  SpaceMono_700Bold_Italic,
} from "@expo-google-fonts/space-mono";

GoogleSignin.configure({
  webClientId:
    "323061027026-67go2ubi9im7crevaeo7oi7hlqc8op7m.apps.googleusercontent.com", // client ID of type WEB for your server (needed to verify user ID and offline access)
});

const LoginScreen = () => {
  const [name, setName] = useState("");
  const [profilePicture, setProfilePicture] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [register, setRegister] = useState(false);
  const [appIsReady, setAppIsReady] = useState(false);
  const auth = FIREBASE_AUTH;
  useFonts({
    SpaceMono_400Regular,
    SpaceMono_400Regular_Italic,
    SpaceMono_700Bold,
    SpaceMono_700Bold_Italic,
  });

  useEffect(() => {
    async function prepare() {
      try {
        await new Promise((resolve) => setTimeout(resolve, 1));
      } catch (e) {
        console.warn(e);
      } finally {
        // Tell the application to render
        setAppIsReady(true);
      }
    }

    prepare();
  }, []);

  const handlePageChange = () => {
    register ? setRegister(false) : setRegister(true);
  };

  const getPermission = async () => {
    if (Platform.OS !== "web") {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync(
        ImagePicker.CAMERA_ROLL
      );
      return status;
    }
  };
  const pickImage = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.5,
      });

      if (!result.canceled) {
        setProfilePicture(result.assets[0].uri);
      }
    } catch (error) {
      console.log("Error @pickImage: ", error);
    }
  };

  const addProfilePicture = async () => {
    const status = await getPermission();

    if (status !== "granted") {
      alert("We need permission to access your camera roll.");
      return;
    }

    pickImage();
  };

  const signInGoogle = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const { idToken } = await GoogleSignin.signIn();
      const googleCredentials = GoogleAuthProvider.credential(idToken);
      await signInWithCredential(auth, googleCredentials);
    } catch (error) {
      console.log("got error: ", error.message);
    }
  };

  const signIn = async () => {
    setLoading(true);
    try {
      const response = await signInWithEmailAndPassword(auth, email, password);
      console.log(response);
    } catch (error) {
      console.log(error);
      alert("Sign in failed: " + error.message);
    } finally {
      setLoading(false);
    }
  };

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

  const xml = `<?xml version="1.0" encoding="utf-8"?>
  <svg viewBox="0 0 24 24" width="24" height="24" xmlns="http://www.w3.org/2000/svg">
    <g transform="matrix(1, 0, 0, 1, 27.009001, -39.238998)">
      <path fill="#4285F4" d="M -3.264 51.509 C -3.264 50.719 -3.334 49.969 -3.454 49.239 L -14.754 49.239 L -14.754 53.749 L -8.284 53.749 C -8.574 55.229 -9.424 56.479 -10.684 57.329 L -10.684 60.329 L -6.824 60.329 C -4.564 58.239 -3.264 55.159 -3.264 51.509 Z"/>
      <path fill="#34A853" d="M -14.754 63.239 C -11.514 63.239 -8.804 62.159 -6.824 60.329 L -10.684 57.329 C -11.764 58.049 -13.134 58.489 -14.754 58.489 C -17.884 58.489 -20.534 56.379 -21.484 53.529 L -25.464 53.529 L -25.464 56.619 C -23.494 60.539 -19.444 63.239 -14.754 63.239 Z"/>
      <path fill="#FBBC05" d="M -21.484 53.529 C -21.734 52.809 -21.864 52.039 -21.864 51.239 C -21.864 50.439 -21.724 49.669 -21.484 48.949 L -21.484 45.859 L -25.464 45.859 C -26.284 47.479 -26.754 49.299 -26.754 51.239 C -26.754 53.179 -26.284 54.999 -25.464 56.619 L -21.484 53.529 Z"/>
      <path fill="#EA4335" d="M -14.754 43.989 C -12.984 43.989 -11.404 44.599 -10.154 45.789 L -6.734 42.369 C -8.804 40.429 -11.514 39.239 -14.754 39.239 C -19.444 39.239 -23.494 41.939 -25.464 45.859 L -21.484 48.949 C -20.534 46.099 -17.884 43.989 -14.754 43.989 Z"/>
    </g>
  </svg>`;
  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }
  return (
    <View style={tw`flex-1`}>
      <ImageBackground
        resizeMode="cover"
        style={tw`flex-1`}
        source={require("../assets/workout3.jpg")}
      >
        {register ? (
          <>
            <View style={styles.root2}>
            <Text
                style={{
                  fontSize: 35,
                  justifyContent: "center",
                  color: "#7eaf34",
                  paddingBottom: 20,
                  letterSpacing: 5,
                  height: 60,
                  fontFamily: "SpaceMono_700Bold",
                  fontWeight: 500,
                }}
              >
                5
              </Text>
              <Text
                style={{
                  fontSize: 35,
                  justifyContent: "center",
                  color: "#7eaf34",
                  letterSpacing: 5,
                  fontFamily: "SpaceMono_400Regular",
                  fontWeight: 500,
                  paddingBottom: 10,
                }}
              >
                IVES
              </Text>
            </View>
            <View style={styles.root3}></View>
            <KeyboardAvoidingView
              behavior={Platform.OS === "ios" ? "padding" : null}
              style={{ flex: 1 }}
            >
              <View style={styles.container3}>
                <View style={styles.root4}>
                  <Text
                    style={{
                      fontSize: 25,
                      justifyContent: "center",
                      color: "#7eaf34",
                      letterSpacing: 2,
                      fontFamily: "SpaceMono_400Regular",
                      fontWeight: 500,
                      alignItems: "center",
                    }}
                  >
                    LETS GET STARTED!
                  </Text>
                </View>

                <ProfilePhotoContainer onPress={addProfilePicture}>
                  {profilePicture ? (
                    <ProfilePicture source={{ uri: profilePicture }} />
                  ) : (
                    <DefaultProfilePhoto>
                      <AntDesign name="plus" size={24} color="#ffffff" />
                    </DefaultProfilePhoto>
                  )}
                </ProfilePhotoContainer>
                <View
                  style={{
                    justifyContent: "center",
                    paddingBottom: 20,
                    alignItems: "center",
                    paddingTop: 10,
                  }}
                >
                  <Text
                    style={{
                      fontSize: 15,
                      justifyContent: "center",
                      color: "#7eaf34",
                      fontFamily: "SpaceMono_400Regular",
                      fontWeight: 500,
                    }}
                  >
                    ADD A PROFILE PICTURE
                  </Text>
                </View>
                <TextInput
                  value={name}
                  style={styles.input}
                  placeholder="Name"
                  autoCapitalize="none"
                  onChangeText={(text) => setName(text)}
                ></TextInput>
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
                  <CustomButton text="Create an account" onPress={signIn} />
                )}
              </View>
            </KeyboardAvoidingView>
            <View style={styles.container2}>
              <View style={styles.signUpRow}>
                <Text style={{ color: "#fff" }}>Already have an account? </Text>
                <TouchableOpacity onPress={handlePageChange}>
                  <Text style={{ color: "#7eaf34" }}>Sign In</Text>
                </TouchableOpacity>
              </View>
            </View>
          </>
        ) : (
          <>
            <View style={styles.root}>
              <Text
                style={{
                  fontSize: 35,
                  justifyContent: "center",
                  color: "#7eaf34",
                  paddingBottom: 20,
                  letterSpacing: 5,
                  height: 60,
                  fontFamily: "SpaceMono_700Bold",
                  fontWeight: 500,
                }}
              >
                5
              </Text>
              <Text
                style={{
                  fontSize: 35,
                  justifyContent: "center",
                  color: "#7eaf34",
                  paddingBottom: 20,
                  letterSpacing: 5,
                  height: 60,
                  fontFamily: "SpaceMono_400Regular",
                  fontWeight: 500,
                }}
              >
                IVES
              </Text>
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
                  <CustomButton text="Log in" onPress={signIn} />
                )}
              </View>
            </KeyboardAvoidingView>
            <View style={styles.container2}>
              <View style={{ flexDirection: "row" }}>
                <View style={styles.horizontalRule} />
                <Text style={styles.options}>Or log in with</Text>
                <View style={styles.horizontalRule} />
              </View>

              <View style={styles.rowForGoogle}>
                <TouchableOpacity
                  onPress={signInGoogle}
                  style={styles.googleOption}
                >
                  <SvgXml xml={xml} height={24} width={24} />
                </TouchableOpacity>
              </View>

              <View style={styles.signUpRow}>
                <Text style={{ color: "#fff" }}>Dont have an account? </Text>
                <TouchableOpacity onPress={handlePageChange}>
                  <Text style={{ color: "#7eaf34" }}>Sign up</Text>
                </TouchableOpacity>
              </View>
            </View>
          </>
        )}
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
  container3: {
    marginHorizontal: 40,
    justifyContent: "flex-end",
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
    justifyContent: "center",
    height: 475,
    flexDirection: "row"
  },
  root2: {
    alignItems: "center",
    justifyContent: "center",
    height: 100,
    paddingTop: 40,
    flexDirection: "row"
  },
  root3: {
    alignItems: "center",
    justifyContent: "center",
    height: 125,
    paddingBottom: 100,
  },
  root4: {
    alignItems: "center",
    justifyContent: "center",
    height: 50,
  },
  logo: {
    marginTop: 0,
    height: 200,
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

const ProfilePhotoContainer = styled.TouchableOpacity`
  background-color: #e1e2e6;
  width: 100px;
  height: 100px;
  border-radius: 50px;
  align-self: center;
  overflow: hidden;
  marginbottom: 20px;
`;

const DefaultProfilePhoto = styled.View`
  align-items: center;
  justify-content: center;
  flex: 1;
`;
const ProfilePicture = styled.Image`
  flex: 1;
`;
