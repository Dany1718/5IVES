import { View, Text, Button } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { FIREBASE_AUTH } from '../FirebaseConfig';
import { signOut } from 'firebase/auth';

const logOut = async () => {
  await signOut(FIREBASE_AUTH);
}

const ProfileScreen = () => {
  const navigation = useNavigation();
  return (
    <View>
      <Button onPress={() => logOut()} title="logout"/>
    </View>
  );
}

export default ProfileScreen;