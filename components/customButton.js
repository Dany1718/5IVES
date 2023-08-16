import { View, Text, StyleSheet, Pressable } from 'react-native'
import React from 'react'

const CustomButton = ({ onPress, text }) => {
  return (
    <Pressable onPress={onPress} style={styles.container}>
      <Text style={styles.text}>{text}</Text>
    </Pressable>
  )
} 

export default CustomButton;

const styles = StyleSheet.create({
    container: {
      backgroundColor: '#7eaf34',
      width: '100%',
      padding: 10,
      marginVertical: 5,
      alignItems: 'center',
      borderRadius: 10,

    },
    text: {
        fontWeight: 'bold',
        color: 'white',
    },
  });