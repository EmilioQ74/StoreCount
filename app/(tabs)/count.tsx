import { SafeAreaView, StyleSheet,  View } from 'react-native'
import React from 'react'
import CountScreen from 'compoment/screen/CountScreen'
import { AlertModalProvider } from 'modal/SCAlert'

const count = () => {
  return (
    <SafeAreaView style={{flex:1}}>
        <CountScreen />
    </SafeAreaView>
  )
}

export default count