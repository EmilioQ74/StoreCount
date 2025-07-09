import { FlatList, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React, { useRef } from 'react'
import ProductListScreen from '../compoment/SCDisplayProduct'
import SCButtons from '../compoment/SCButtons'
import { router } from 'expo-router'

const count = () => {
  const productListRef = useRef(null);

  const handleSave = () => {
    if (productListRef.current?.saveProducts) {
      productListRef.current.saveProducts();
    }
  };

  return (
   <SafeAreaView style={styles.container}>
      <View style={styles.listContainer}>
        <ProductListScreen ref={productListRef} />
      </View>
      <View style={styles.buttonContainer}>
        <SCButtons title="Save" onPress={handleSave} unPressedColor="#000" pressedColor="#fff" />
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
    width: '100%',
    height: '95%',
    alignItems: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 20,
    alignItems: 'center',
    paddingBottom: 20,
  }
})