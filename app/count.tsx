import { SafeAreaView, StyleSheet,  View } from 'react-native'
import React from 'react'
import SCButtons from '../compoment/SCButtons'
import { router } from 'expo-router'
import SCDisplayProduct from '../compoment/SCDisplayProduct'

const count = () => {
  return (
   <SafeAreaView style={styles.container}>
      <View style={styles.listContainer}>
        <SCDisplayProduct />
      </View>
      <View style={styles.buttonContainer}>
        <SCButtons title="Save" onPress={()=>console.log("Cleared")} unPressedColor="#000" pressedColor="#fff" />
        <SCButtons title="Clear" onPress={()=> console.log("Cleared")} unPressedColor="#000" pressedColor="#fff" />
        <SCButtons title="Back" onPress={() => router.back()} unPressedColor="#000" pressedColor="#fff" />
      </View>
   </SafeAreaView>
  )

}

export default count

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  listContainer: {
    paddingTop: 20,
    width: '95%',
    height: '95%',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 20,
    alignItems: 'center',
    paddingBottom: 20,
  }
})