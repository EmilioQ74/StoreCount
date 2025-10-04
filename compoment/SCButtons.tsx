import { Pressable, StyleSheet, Text} from 'react-native'
import React from 'react'

const SCButtons = ({title,onPress}) => {
  return (
    <Pressable onPress={onPress} style={({pressed})=>[{backgroundColor:pressed?'#fff':'#000'},styles.button]}>
        <Text style={styles.text}>{title}</Text>
    </Pressable>
  )
}

export default SCButtons

const styles = StyleSheet.create({
    button: {
        padding:10,
        borderWidth:1,
        borderRadius: 5,
      },
      text: {
        color: '#fff',
      },
})