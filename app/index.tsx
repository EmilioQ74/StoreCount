import { Pressable, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import SCButtons from '../compoment/SCButtons'
import {router} from 'expo-router'

// Home screen with navigation buttons
const index = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.text}>Welcome to Store Count</Text>
      <View style={styles.buttonContainer}>
        {/* Button to go to counting screen */}
        <SCButtons title="Count Products" onPress={() => [console.log("Count Product Page"),router.push("/count")]} unPressedColor="#000" pressedColor="#fff" />
        {/* Button for future modify products feature */}
        <SCButtons title="Modify Products" onPress={() => console.log("Modify Product Page")} unPressedColor="#000" pressedColor="#fff" />
        {/* Button to view saved products */}
        <SCButtons
          title="View Products"
          onPress={() => router.push("/view")}
          unPressedColor="#000"
          pressedColor="#fff"
        />
      </View>
    </SafeAreaView>
  )
}

export default index

// Styles for the home screen
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 20,
    color: '#000',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    width: '100%',
    paddingHorizontal: 20,
    gap: 10,
  }
})