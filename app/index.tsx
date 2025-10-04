import { Pressable, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
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
        <SCButtons title="Count Products" onPress={() => [console.log("Count Product Page"),router.push("/(tabs)/count")]}/>
        {/* Button for future modify products feature */}
        <SCButtons title="Modify Products" onPress={() => console.log("Modify Product Page")} />
        {/* Button to view saved products */}
        <SCButtons
          title = "Test"
          onPress={() => router.push("/test1")}
        />
        <SCButtons title="Save Products" onPress={()=> router.push('/saveList')}/>
          
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
    flex:1,
    alignItems: 'center',
    marginTop: 20,
    width: '100%',
    paddingHorizontal: 20,
    gap: 10,
  },
})