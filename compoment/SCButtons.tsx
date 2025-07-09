import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'

const SCButtons = ({title,onPress,unPressedColor,pressedColor}) => {
  return (
    <Pressable onPress={onPress} style={({pressed})=>[{backgroundColor:pressed?pressedColor:unPressedColor},styles.button]}>
        <Text style={styles.text}>{title}</Text>
    </Pressable>
  )
}

export default SCButtons

const styles = StyleSheet.create({
    button: {
        padding: 10,
        borderRadius: 5,
        marginTop: 20,
      },
      text: {
        color: '#fff',
      },
})