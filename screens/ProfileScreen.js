import { View, Text, Button } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { signOut } from 'firebase/auth';
import { useContext } from 'react';
import { FirebaseContext } from '../components/FireBaseContext';
import { UserContext } from '../components/UserContext';
const ProfileScreen = () => {
  const navigation = useNavigation();
  const firebase = useContext(FirebaseContext);
  const [user, setUser] = useContext(UserContext);
  const logOut = async () => {
    const loggedOut = await firebase.logOut();
    if (loggedOut) {
      setUser(state => ({...state, isLoggedIn: false}));
    }
  }
  return (
    <View style={{justifyContent: 'center'}}>
      <Text>dajksnjs</Text>
      <Button onPress={logOut} title="logout"/>
    </View>
  );
}

export default ProfileScreen;