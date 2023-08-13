import {
  View,
  StyleSheet,
  TextInput,
  ActivityIndicator,
  Text,
  ImageBackground,
  Image,
  TouchableOpacity
} from "react-native";
import React, { useState } from "react";
import useAuth from "../hooks/useAuth";
import tw from "tailwind-react-native-classnames"
import { FIREBASE_AUTH } from "../FirebaseConfig";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import CustomButton from "../components/customButton";
import GoogleSVG from '../assets/google.svg'
import { SvgXml } from 'react-native-svg'

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const auth = FIREBASE_AUTH;

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
  return (
    <View style={tw`flex-1`
    }>
      <ImageBackground
        resizeMode="cover"
        style={tw`flex-1`}
        source={require("../assets/workout3.jpg")}
      >
        <View style={styles.root}>
          <Image source={require('../assets/lne-12.png')} style={styles.logo} resizeMode="contain"/>
        </View>
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
            <CustomButton text="Log in" onPress={signIn}/>
          )}
          <Text style={styles.options}>
          Or log in with
          </Text>
          <View style={styles.rowForGoogle}>
          <TouchableOpacity onPress={() => {}} style={styles.googleOption}>
            <SvgXml xml={xml} height={24} width={24}/>
          </TouchableOpacity>
          </View>
        </View>
        <View style={styles.signUpRow}>
          <Text style={{color: '#fff'}}>Dont have an account? </Text>
          <TouchableOpacity onPress={() => signUp()}>
          <Text style={{color: '#7eaf34'}}>Sign up</Text>
          </TouchableOpacity>
        </View>
          
      </ImageBackground>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 40,
    justifyContent: "center",
  },
  input: {
    marginVertical: 5,
    paddingHorizontal: 10,
    height: 50,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#e8e8e8',
    backgroundColor: "#fff",
  },
  root: {
    alignItems: 'center',
  },
  options: {
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 20,
    color: '#fff',
  }, googleOption: {
    borderColor: '#ddd',
    borderWidth: 2,
    borderRadius: 10,
    paddingHorizontal: 30,
    paddingVertical: 10,
  }, rowForGoogle: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 30,
  }, signUpRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 30,
  }
});
